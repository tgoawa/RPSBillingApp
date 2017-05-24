import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RpsClientFee } from 'app/client';

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit {
  @Input() rpsClientFee: RpsClientFee;

  maintenanceForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  onSubmit(formvalue) {

  }

}
