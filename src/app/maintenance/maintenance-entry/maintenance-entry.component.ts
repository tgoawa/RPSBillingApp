import { Component, OnInit } from '@angular/core';

import { ToastrService, ToastConfig } from 'ngx-toastr';

import { MaintenanceFeeService } from './services/maintenance-fee.service';
import { Client, RpsClientFee } from 'app/client';

const toastConfig: ToastConfig = {
  positionClass: 'toast-center-center',
  timeOut: 10000,
  closeButton: true
};

@Component({
  selector: 'app-maintenance-entry',
  templateUrl: './maintenance-entry.component.html',
  styleUrls: ['./maintenance-entry.component.css']
})
export class MaintenanceEntryComponent implements OnInit {
  rpsClientFee: RpsClientFee;
  isLoading = false;
  private client: Client;

  constructor(private feeService: MaintenanceFeeService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  clientFeeSearch(event) {
    this.client = event;
    this.getRPSFee();
  }

  getRPSFee() {
    this.isLoading = true;
    this.feeService.getRPSFee(this.client.ClientId)
    .subscribe(data => {
      this.isLoading = false;
      this.rpsClientFee = data;
      this.rpsClientFee.ClientName = this.client.ClientName;
    }, error => {
      this.isLoading = false;
      console.log(error);
      this.showFailedSearch();
    });
  }

  showFailedSearch() {
    this.toastrService.error('Error finding client, please try again or contact help desk if issue persists',
    'Error finding client!',
    toastConfig);
  }

}
