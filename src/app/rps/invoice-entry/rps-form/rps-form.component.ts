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
  @Input() rpsClient: RpsClient;

  rpsForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.rpsForm = this.fb.group({
      ClientId: [this.rpsClient.ClientId, Validators.required],
      ClientName: [this.rpsClient.ClientName, Validators.required],
      Year: [this.rpsClient.Year, Validators.required],
      Quarter: [this.rpsClient.Quarter, Validators.required],
      NumberParticipants: [this.rpsClient.NumberParticipants, CustomValidators.number],
      DollarPerParticipant: [this.rpsClient.DollarPerParticipant, CustomValidators.number],
      ParticipantDollars: [this.rpsClient.ParticipantDollars, CustomValidators.number],
      NumberLoans: [this.rpsClient.NumberLoans, CustomValidators.number],
      DollarPerLoan: [this.rpsClient.DollarPerLoan, CustomValidators.number],
      LoanDollars: [this.rpsClient.LoanDollars, CustomValidators.number],
      Form5500: [this.rpsClient.Form5500],
      Form8955: [this.rpsClient.Form8955],
      SpecialFeesText: [this.rpsClient.SpecialFeesText, CustomValidators.number],
      SpecialFeesDollars: [this.rpsClient.SpecialFeesDollars, CustomValidators.number],
      NumberDistributions: [this.rpsClient.NumberDistributions, CustomValidators.number],
      DollarPerDistribution: [this.rpsClient.DollarPerDistribution, CustomValidators.number],
      DistributionDollars: [this.rpsClient.DistributionDollars, CustomValidators.number]
    });
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

  onSubmit(formValue) {
    //push form value
  }
}
