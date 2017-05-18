import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ToastrService, ToastConfig } from 'ngx-toastr';

import { RpsClient, RpsCurrentBill } from 'app/client';
import { RpsService } from '../services/rps.service';

const toastConfig: ToastConfig = { positionClass: 'toast-top-full-width',
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
  private currentBill = new RpsCurrentBill();
  constructor(private fb: FormBuilder, private rpsService: RpsService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  calculateParticipantDollars() {
    const participants = this.rpsForm.get('NumParticipants');
    const dollars = this.rpsForm.get('DollarPerParticipant');

    if (participants !== undefined && dollars !== undefined) {
      this.rpsForm.patchValue({
        ParticipantDollars: participants.value * dollars.value
      });
    }
  }

  calculateLoanDollars() {
    const numberOfLoans = this.rpsForm.get('NumLoans');
    const dollars = this.rpsForm.get('DollarPerLoan');

    if (numberOfLoans !== undefined && dollars !== undefined) {
      this.rpsForm.patchValue({
        LoanDollars: numberOfLoans.value * dollars.value
      });
    }
  }

  calculateDistributionDollars() {
    const numberOfDistributions = this.rpsForm.get('NumDistributions');
    const dollars = this.rpsForm.get('DollarPerDistribution');

    if (numberOfDistributions !== undefined && dollars !== undefined) {
      this.rpsForm.patchValue({
        DistributionDollars: numberOfDistributions.value * dollars.value
      });
    }
  }

  calculateBasisPointFee() {
    const assets = this.rpsForm.get('Assets');
    const multiplier = 0.0003 / 4;

    if (assets !== undefined) {
      this.rpsForm.patchValue({
        BasisPointFee: (assets.value * multiplier).toFixed(2)
      });
    }

  }

  onSubmit(formValue) {
    this.mapFormToCurrentBill(formValue);
    this.saveInvoice();
  }

  createForm() {
    this.rpsForm = this.fb.group({
      NumParticipants: [this.rpsClient.NumberParticipants, CustomValidators.number],
      DollarPerParticipant: [this.rpsClient.DollarPerParticipant, CustomValidators.number],
      ParticipantDollars: [this.rpsClient.ParticipantDollars, CustomValidators.number],
      NumLoans: [this.rpsClient.NumberLoans, CustomValidators.number],
      DollarPerLoan: [this.rpsClient.DollarPerLoan, CustomValidators.number],
      LoanDollars: [this.rpsClient.LoanDollars, CustomValidators.number],
      Form5500: [this.rpsClient.Form5500],
      Form8955: [this.rpsClient.Form8955],
      SpecialFeesText: [this.rpsClient.SpecialFeesText, CustomValidators.number],
      SpecialFeesDollars: [this.rpsClient.SpecialFeesDollars, CustomValidators.number],
      NumDistributions: [this.rpsClient.NumberDistributions, CustomValidators.number],
      DollarPerDistribution: [this.rpsClient.DollarPerDistribution, CustomValidators.number],
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
    this.currentBill.Form5500 = formvalue.Form5500;
    this.currentBill.Form8955 = formvalue.Form8955;
    this.currentBill.Id = this.rpsClient.Id;
    this.currentBill.LoanDollars = formvalue.LoanDollars;
    this.currentBill.MaintenanceFees = formvalue.MaintenanceFees;
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
        if (data.isSuccessful) {

        } else {
          this.showFailedSave();
        }
      }, error => {
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
