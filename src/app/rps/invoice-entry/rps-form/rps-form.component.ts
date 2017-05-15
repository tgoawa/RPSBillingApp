import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

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
      NumberParticipants: [this.rpsClient.NumberParticipants],
      DollarPerParticipant: [this.rpsClient.DollarPerParticipant],
      ParticipantDollars: [this.rpsClient.ParticipantDollars],
      NumberLoans: [this.rpsClient.NumberLoans],
      DollarPerLoan: [this.rpsClient.DollarPerLoan],
      LoanDollars: [this.rpsClient.LoanDollars],
      Form5500: [this.rpsClient.Form5500],
      Form8955: [this.rpsClient.Form8955],
      SpecialFeesText: [this.rpsClient.SpecialFeesText],
      SpecialFeesDollars: [this.rpsClient.SpecialFeesDollars],
      NumberDistributions: [this.rpsClient.NumberDistributions],
      DollarPerDistribution: [this.rpsClient.DollarPerDistribution],
      DistributionDollars: [this.rpsClient.DistributionDollars]
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
