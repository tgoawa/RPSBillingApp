import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MaintenanceFeeService } from '../services/maintenance-fee.service';
import { RpsClientFee } from 'app/client';


@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit {
  @Input() rpsClientFee: RpsClientFee;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>();

  maintenanceForm: FormGroup;

  constructor(public snackBar: MatSnackBar, private fb: FormBuilder, private feeService: MaintenanceFeeService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.maintenanceForm = this.fb.group({
      ClientId: this.rpsClientFee.ClientId,
      Fee: [this.rpsClientFee.Fee.toFixed(2)],
      IsDeleted: [this.rpsClientFee.IsDeleted],
      MaintenanceFeeId: this.rpsClientFee.MaintenanceFeeId
    });
  }

  onSubmit(formvalue: RpsClientFee) {
    this.updateRpsFee(formvalue);
  }

  updateRpsFee(value: RpsClientFee) {
    this.feeService.updateRPSFee(value)
    .subscribe(data => {
      this.formIsSaved();
      this.openSnackBar('Update Successful!', '');
    }, error => {
      console.log(error);
      this.openSnackBar('Error trying to update, please try again or contact help desk if issue persists', '');
    });
  }

  formIsSaved() {
    this.isSaved.emit(true);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
