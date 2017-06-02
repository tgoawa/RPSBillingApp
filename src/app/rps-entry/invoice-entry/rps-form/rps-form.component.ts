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
  private calculatedForm5500 = 0;
  private calculatedForm8955 = 0;

  constructor(private fb: FormBuilder, private rpsService: RpsService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.calculateSubTotal();
  }

  calculateParticipantDollars() {
    const participants = this.rpsForm.get('NumParticipants');
    const dollars = this.rpsForm.get('DollarPerParticipant');
    let calculatedParticipantDollars = 0;

    if (participants !== undefined && dollars !== undefined) {
      calculatedParticipantDollars = participants.value * dollars.value;
      this.rpsForm.patchValue({
        ParticipantDollars: calculatedParticipantDollars
      });
      this.calculateSubTotal();
    }
  }

  calculateLoanDollars() {
    const numberOfLoans = this.rpsForm.get('NumLoans');
    const dollars = this.rpsForm.get('DollarsPerLoan');
    let calculatedLoanDollars = 0;

    if (numberOfLoans !== undefined && dollars !== undefined) {
      calculatedLoanDollars = numberOfLoans.value * dollars.value;
      this.rpsForm.patchValue({
        LoanDollars: calculatedLoanDollars
      });
      this.calculateSubTotal();
    }
  }

  calculateDistributionDollars() {
    const numberOfDistributions = this.rpsForm.get('NumDistributions');
    const dollars = this.rpsForm.get('DollarsPerDistribution');
    let calculatedDistributionDollars = 0;

    if (numberOfDistributions !== undefined && dollars !== undefined) {
      calculatedDistributionDollars = numberOfDistributions.value * dollars.value;
      this.rpsForm.patchValue({
        DistributionDollars: calculatedDistributionDollars
      });
      this.calculateSubTotal();
    }
  }

  calculateBasisPointFee() {
    const assets = this.rpsForm.get('Assets');
    const points = this.rpsForm.get('BasisPoint').value / 10000;
    const multiplier = points / 4;
    let calculatedBasisPointFee = 0;

    if (assets !== undefined) {
      const result = (assets.value * multiplier).toFixed(2);
      calculatedBasisPointFee = parseFloat(result);
      this.rpsForm.patchValue({
        BasisPointFee: calculatedBasisPointFee
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
    let specialFees = 0;

    if (specFee !== undefined) {
      specialFees = specFee.value;
      this.calculateSubTotal();
    }
  }

  calculateSubTotal() {
    const participantDollars = this.rpsForm.get('ParticipantDollars').value;
    const loanDollars = this.rpsForm.get('LoanDollars').value;
    const form5500 = parseInt(this.rpsForm.get('Form5500').value, 10);
    const form8955 = parseInt(this.rpsForm.get('Form8955').value, 10);
    const specialFees = this.rpsForm.get('SpecialFeesDollars').value;
    const distributionDollars = this.rpsForm.get('DistributionDollars').value;
    const basisPointFee = this.rpsForm.get('BasisPointFee').value;

    this.invoiceSubtotal = participantDollars + loanDollars + form5500 + form8955 + specialFees + distributionDollars + basisPointFee;
  }

  calculateCredit() {
    const enteredCredit = this.rpsForm.get('Credits');
    const result = this.invoiceSubtotal - enteredCredit.value;

    if (result >= 0) {
      this.adjustedCredit = enteredCredit.value;
      this.invoiceTotal = result;
      this.creditDifference = 0;
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
      NumParticipants: [this.rpsClient.NumParticipants, [Validators.required, CustomValidators.number]],
      DollarPerParticipant: [this.rpsClient.DollarPerParticipant, [Validators.required, CustomValidators.number]],
      ParticipantDollars: [this.rpsClient.ParticipantDollars, [Validators.required, CustomValidators.number]],
      NumLoans: [this.rpsClient.NumLoans, [Validators.required, CustomValidators.number]],
      DollarsPerLoan: [this.rpsClient.DollarsPerLoan, [Validators.required, CustomValidators.number]],
      LoanDollars: [this.rpsClient.LoanDollars, [Validators.required, CustomValidators.number]],
      Form5500: [this.rpsClient.Form5500, Validators.required],
      Form8955: [this.rpsClient.Form8955, Validators.required],
      SpecialFeesText: [this.rpsClient.SpecialFeesText],
      SpecialFeesDollars: [this.rpsClient.SpecialFeesDollars, [Validators.required, CustomValidators.number]],
      NumDistributions: [this.rpsClient.NumDistributions , [Validators.required, CustomValidators.number]],
      DollarsPerDistribution: [this.rpsClient.DollarsPerDistribution, [Validators.required, CustomValidators.number]],
      DistributionDollars: [this.rpsClient.DistributionDollars, [Validators.required, CustomValidators.number]],
      Assets: [this.rpsClient.Assets, [Validators.required, CustomValidators.number]],
      BasisPoint: [this.rpsClient.AssetBasePoint],
      BasisPointFee: [this.rpsClient.BasisPointFee, [Validators.required, CustomValidators.number]],
      Credits: [this.rpsClient.Credits, [Validators.required, CustomValidators.number]]
    });
  }

  mapFormToCurrentBill(formvalue) {
    this.currentBill.Assets = formvalue.Assets;
    this.currentBill.AssetBasePoint = formvalue.AssetBasePoint;
    this.currentBill.BasisPointFee = formvalue.BasisPointFee;
    this.currentBill.ClientId = this.rpsClient.ClientId;
    this.currentBill.Credits = formvalue.Credits;
    this.currentBill.DistributionDollars = formvalue.DistributionDollars;
    this.currentBill.DollarPerParticipant = formvalue.DollarPerParticipant;
    this.currentBill.DollarsPerLoan = formvalue.DollarsPerLoan;
    this.currentBill.DollarsPerDistribution = formvalue.DollarsPerDistribution;
    this.currentBill.Form5500 = this.calculatedForm5500;
    this.currentBill.Form8955 = this.calculatedForm8955;
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
