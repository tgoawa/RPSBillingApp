import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { RpsClient } from 'app/client';

@Component({
  selector: 'app-rps-form',
  templateUrl: './rps-form.component.html',
  styleUrls: ['./rps-form.component.css']
})
export class RpsFormComponent implements OnInit {
  @Input() rpsCurrentBill: RpsClient;

  rpsForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  calculateParticipantDollars() {
    const participants = this.rpsForm.get('NumberParticipants');
    const dollars = this.rpsForm.get('DollarPerParticipant');

    if (participants !== undefined && dollars !== undefined) {
      this.rpsForm.patchValue({
        ParticipantDollars: participants.value * dollars.value
      });
    }
  }

  calculateLoanDollars() {
    const numberOfLoans = this.rpsForm.get('NumberLoans');
    const dollars = this.rpsForm.get('DollarPerLoan');

    if (numberOfLoans !== undefined && dollars !== undefined) {
      this.rpsForm.patchValue({
        LoanDollars: numberOfLoans.value * dollars.value
      });
    }
  }

  calculateDistributionDollars() {
    const numberOfDistributions = this.rpsForm.get('NumberDistributions');
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
    //push form value
  }

  createForm() {
    this.rpsForm = this.fb.group({
      ClientId: [this.rpsCurrentBill.ClientId, Validators.required],
      NumberParticipants: [this.rpsCurrentBill.NumberParticipants, CustomValidators.number],
      DollarPerParticipant: [this.rpsCurrentBill.DollarPerParticipant, CustomValidators.number],
      ParticipantDollars: [this.rpsCurrentBill.ParticipantDollars, CustomValidators.number],
      NumberLoans: [this.rpsCurrentBill.NumberLoans, CustomValidators.number],
      DollarPerLoan: [this.rpsCurrentBill.DollarPerLoan, CustomValidators.number],
      LoanDollars: [this.rpsCurrentBill.LoanDollars, CustomValidators.number],
      Form5500: [this.rpsCurrentBill.Form5500],
      Form8955: [this.rpsCurrentBill.Form8955],
      SpecialFeesText: [this.rpsCurrentBill.SpecialFeesText, CustomValidators.number],
      SpecialFeesDollars: [this.rpsCurrentBill.SpecialFeesDollars, CustomValidators.number],
      NumberDistributions: [this.rpsCurrentBill.NumberDistributions, CustomValidators.number],
      DollarPerDistribution: [this.rpsCurrentBill.DollarPerDistribution, CustomValidators.number],
      DistributionDollars: [this.rpsCurrentBill.DistributionDollars, CustomValidators.number],
      Assets: [this.rpsCurrentBill.Assets, CustomValidators.number],
      BasisPointFee: [this.rpsCurrentBill.BasisPointFee, CustomValidators.number],
      Credits: [this.rpsCurrentBill.Credits, CustomValidators.number]
    });
  }
}
