import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService, ToastConfig } from 'ngx-toastr';

import { MaintenanceFeeService } from '../services/maintenance-fee.service';
import { RpsClientFee } from 'app/client';

const toastConfig: ToastConfig = { positionClass: 'toast-center-center',
                                    timeOut: 10000,
                                    closeButton: true };

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit {
  @Input() rpsClientFee: RpsClientFee;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>();

  maintenanceForm: FormGroup;

  constructor(private fb: FormBuilder, private feeService: MaintenanceFeeService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.maintenanceForm = this.fb.group({
      ClientId: this.rpsClientFee.ClientId,
      Fee: [this.rpsClientFee.Fee],
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
    }, error => {
      console.log(error);
      this.showFailedSave();
    });
  }

  formIsSaved() {
    this.isSaved.emit(true);
  }

  showFailedSave() {
    this.toastrService.error('Error trying to update, please try again or contact help desk if issue persists',
    'Error updating Maintenance Fee!',
    toastConfig);
  }
}
