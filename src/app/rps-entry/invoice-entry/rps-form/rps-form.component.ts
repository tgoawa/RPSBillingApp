import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ToastrService, ToastConfig } from 'ngx-toastr';

import { RpsClient, RpsCurrentBill } from 'app/client';
import { RpsService } from '../services/rps.service';

const toastConfig: ToastConfig = { positionClass: 'toast-center-center',
                                    timeOut: 10000,
                                    closeButton: true };

@Component({
  selector: 'app-rps-form',
  templateUrl: './rps-form.component.html',
  styleUrls: ['./rps-form.component.css']
})
export class RpsFormComponent implements OnInit {
  @Input() rpsClient: RpsClient;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>();

  rpsForm: FormGroup;
  invoiceSubtotal = 0;
  invoiceTotal = 0;
  creditDifference: number;
  adjustedCredit = 0;

  private currentBill = new RpsCurrentBill();
  private calculatedParticipantDollars = 0;
  private calculatedLoanDollars = 0;
  private calculatedDistributionDollars = 0;
  private calculatedBasisPointFee = 0;
  private calculatedForm5500 = 0;
  private calculatedForm8955 = 0;
  private specialFees = 0;

  constructor(private fb: FormBuilder, private rpsService: RpsService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  calculateParticipantDollars() {
    const participants = this.rpsForm.get('NumParticipants');
    const dollars = this.rpsForm.get('DollarPerParticipant');

    if (participants !== undefined && dollars !== undefined) {
      this.calculatedParticipantDollars = participants.value * dollars.value;
      this.rpsForm.patchValue({
        ParticipantDollars: this.calculatedParticipantDollars
      });
      this.calculateSubTotal();
    }
  }

  calculateLoanDollars() {
    const numberOfLoans = this.rpsForm.get('NumLoans');
    const dollars = this.rpsForm.get('DollarsPerLoan');

    if (numberOfLoans !== undefined && dollars !== undefined) {
      this.calculatedLoanDollars = numberOfLoans.value * dollars.value;
      this.rpsForm.patchValue({
        LoanDollars: this.calculatedLoanDollars
      });
      this.calculateSubTotal();
    }
  }

  calculateDistributionDollars() {
    const numberOfDistributions = this.rpsForm.get('NumDistributions');
    const dollars = this.rpsForm.get('DollarsPerDistribution');

    if (numberOfDistributions !== undefined && dollars !== undefined) {
      this.calculatedDistributionDollars = numberOfDistributions.value * dollars.value;
      this.rpsForm.patchValue({
        DistributionDollars: this.calculatedDistributionDollars
      });
      this.calculateSubTotal();
    }
  }

  calculateBasisPointFee() {
    const assets = this.rpsForm.get('Assets');
    const multiplier = 0.0003 / 4;

    if (assets !== undefined) {
      this.calculatedBasisPointFee = +(assets.value * multiplier).toFixed(2);
      this.rpsForm.patchValue({
        BasisPointFee: this.calculateBasisPointFee
      });
      this.calculateSubTotal();
    }

  }

  calculateForm5500() {
    const form5500 = this.rpsForm.get('Form5500');

    if (form5500 !== undefined) {
      this.calculatedForm5500 = +form5500.value;
      this.calculateSubTotal();
    }
  }

  calculateForm8955() {
    const form8955 = this.rpsForm.get('Form8955');

    if (form8955 !== undefined) {
      this.calculatedForm8955 = +form8955.value;
      this.calculateSubTotal();
    }
  }

  calculateSpecialFees() {
    const specFee = this.rpsForm.get('SpecialFeesDollars');

    if (specFee !== undefined) {
      this.specialFees = specFee.value;
      this.calculateSubTotal();
    }
  }

  calculateSubTotal() {

    this.invoiceSubtotal = this.calculatedParticipantDollars
                            + this.calculatedLoanDollars
                            + this.calculatedDistributionDollars
                            + this.calculatedBasisPointFee
                            + this.specialFees
                            + this.calculatedForm5500
                            + this.calculatedForm8955;
  }

  calculateCredit() {
    const enteredCredit = this.rpsForm.get('Credits');
    const result = this.invoiceSubtotal - enteredCredit.value;

    if (result >= 0) {
      this.adjustedCredit = enteredCredit.value;
      this.invoiceTotal = result;
    } else {
      this.calculateAdjustedCredit(this.invoiceSubtotal, enteredCredit.value);
    }
  }

  calculateAdjustedCredit(invoiceSubtotal, enteredCredit) {
    this.creditDifference = Math.abs(invoiceSubtotal - enteredCredit);
    this.adjustedCredit = enteredCredit - this.creditDifference;
    this.invoiceTotal = invoiceSubtotal - this.adjustedCredit;

  }

  onSubmit(formValue) {
    this.mapFormToCurrentBill(formValue);
    this.saveInvoice();
  }

  createForm() {
      this.rpsForm = this.fb.group({
      NumParticipants: [this.rpsClient.NumParticipants, CustomValidators.number],
      DollarPerParticipant: [this.rpsClient.DollarPerParticipant, CustomValidators.number],
      ParticipantDollars: [this.rpsClient.ParticipantDollars, CustomValidators.number],
      NumLoans: [this.rpsClient.NumLoans, CustomValidators.number],
      DollarsPerLoan: [this.rpsClient.DollarsPerLoan, CustomValidators.number],
      LoanDollars: [this.rpsClient.LoanDollars, CustomValidators.number],
      Form5500: [this.rpsClient.Form5500],
      Form8955: [this.rpsClient.Form8955],
      SpecialFeesText: [this.rpsClient.SpecialFeesText],
      SpecialFeesDollars: [this.rpsClient.SpecialFeesDollars, CustomValidators.number],
      NumDistributions: [this.rpsClient.NumDistributions , CustomValidators.number],
      DollarsPerDistribution: [this.rpsClient.DollarsPerDistribution, CustomValidators.number],
      DistributionDollars: [this.rpsClient.DistributionDollars, CustomValidators.number],
      Assets: [this.rpsClient.Assets, CustomValidators.number],
      BasisPointFee: [this.rpsClient.BasisPointFee, CustomValidators.number],
      Credits: [this.rpsClient.Credits, CustomValidators.number]
    });
  }

  mapFormToCurrentBill(formvalue) {
    this.currentBill.Assets = formvalue.Assets;
    this.currentBill.BasisPointFee = formvalue.BasisPointFee;
    this.currentBill.ClientId = this.rpsClient.ClientId;
    this.currentBill.Credits = formvalue.Credits;
    this.currentBill.DistributionDollars = formvalue.DistributionDollars;
    this.currentBill.DollarPerParticipant = formvalue.DollarPerParticipant;
    this.currentBill.DollarsPerLoan = formvalue.DollarsPerLoan;
    this.currentBill.DollarsPerDistribution = formvalue.DollarsPerDistribution;
    this.currentBill.Form5500 = formvalue.Form5500;
    this.currentBill.Form8955 = formvalue.Form8955;
    this.currentBill.Id = this.rpsClient.Id;
    this.currentBill.LoanDollars = formvalue.LoanDollars;
    this.currentBill.MaintenanceFees = this.rpsClient.MaintenanceFees;
    this.currentBill.NumDistributions = formvalue.NumDistributions;
    this.currentBill.NumLoans = formvalue.NumLoans;
    this.currentBill.NumParticipants = formvalue.NumParticipants;
    this.currentBill.ParticipantDollars = formvalue.ParticipantDollars;
    this.currentBill.Quarter = this.rpsClient.Quarter;
    this.currentBill.SpecialFeesDollars = formvalue.SpecialFeesDollars;
    this.currentBill.SpecialFeesText = formvalue.SpecialFeesText;
    this.currentBill.Year = this.rpsClient.Year;
  }

  saveInvoice() {
    this.rpsService.saveRPSInvoice(this.currentBill)
      .subscribe(data => {
        this.formIsSaved();
      }, error => {
        console.log(error);
        this.showFailedSave();
      });
  }

  formIsSaved() {
    this.isSaved.emit(true);
  }

  showFailedSave() {
    this.toastrService.error('Error trying to save, please try again or contact help desk if issue persists',
    'Error saving invoice!',
    toastConfig);
  }
}
