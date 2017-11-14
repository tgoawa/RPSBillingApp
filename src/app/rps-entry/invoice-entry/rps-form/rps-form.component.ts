import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatSnackBar } from '@angular/material';
import { RpsClient, RpsCurrentBill } from 'app/client';
import { RpsService } from '../services/rps.service';

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
  form5500List = [0, 375, 750, 1000];
  form8955List = [0, 75];

  private calculatedForm5500 = 0;
  private calculatedForm8955 = 0;

  constructor(public snackBar: MatSnackBar, private fb: FormBuilder, private rpsService: RpsService) { }

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
      this.rpsForm.patchValue({
        Form5500: +form5500.value
      });
      this.calculateSubTotal();
    }
  }

  calculateForm8955() {
    const form8955 = this.rpsForm.get('Form8955');

    if (form8955 !== undefined) {
      this.rpsForm.patchValue({
        Form8955: +form8955.value
      });
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

    this.invoiceSubtotal =
      this.rpsClient.MaintenanceFees +
      participantDollars +
      loanDollars +
      form5500 +
      form8955 +
      specialFees +
      distributionDollars +
      basisPointFee;
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
    console.log(formValue);
    this.saveInvoice(formValue);
  }

  createForm() {
      this.rpsForm = this.fb.group({
      Id: [this.rpsClient.Id],
      ClientId: [this.rpsClient.ClientId],
      MaintenanceFees: [{value: this.rpsClient.MaintenanceFees, disabled: true}],
      Year: [{value: this.rpsClient.Year, disabled: true}],
      Quarter: [{value: this.rpsClient.Quarter, disabled: true}],
      NumParticipants: [this.rpsClient.NumParticipants, [Validators.required, CustomValidators.number]],
      DollarPerParticipant: [this.rpsClient.DollarPerParticipant, [Validators.required, CustomValidators.number]],
      ParticipantDollars: [{value: this.rpsClient.ParticipantDollars, disabled: true}, [Validators.required, CustomValidators.number]],
      NumLoans: [this.rpsClient.NumLoans, [Validators.required, CustomValidators.number]],
      DollarsPerLoan: [this.rpsClient.DollarsPerLoan, [Validators.required, CustomValidators.number]],
      LoanDollars: [{value: this.rpsClient.LoanDollars, disabled: true}, [Validators.required, CustomValidators.number]],
      Form5500: [this.rpsClient.Form5500, Validators.required],
      Form8955: [this.rpsClient.Form8955, Validators.required],
      SpecialFeesText: [this.rpsClient.SpecialFeesText],
      SpecialFeesDollars: [this.rpsClient.SpecialFeesDollars, [Validators.required, CustomValidators.number]],
      NumDistributions: [this.rpsClient.NumDistributions , [Validators.required, CustomValidators.number]],
      DollarsPerDistribution: [this.rpsClient.DollarsPerDistribution, [Validators.required, CustomValidators.number]],
      DistributionDollars: [{value: this.rpsClient.DistributionDollars, disabled: true}, [Validators.required, CustomValidators.number]],
      Assets: [this.rpsClient.Assets, [Validators.required, CustomValidators.number]],
      BasisPoint: [this.rpsClient.AssetBasePoint],
      BasisPointFee: [this.rpsClient.BasisPointFee, [Validators.required, CustomValidators.number]]
    });
  }

  saveInvoice(formVal) {
    this.rpsService.saveRPSInvoice(formVal)
      .subscribe(data => {
        this.openSnackBar('Invoice updated successfully!', '');
        this.formIsSaved();
      }, error => {
        console.log(error);
        this.openSnackBar('Issue updating invoice!', '');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  formIsSaved() {
    this.isSaved.emit(true);
  }

}
