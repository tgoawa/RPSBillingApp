import { Component, OnInit } from '@angular/core';

import { ToastrService, ToastConfig } from 'ngx-toastr';

import { RpsService } from './services/rps.service';
import { RpsClient, Client } from 'app/client';

const toastConfig: ToastConfig = {
  positionClass: 'toast-center-center',
  timeOut: 10000,
  closeButton: true
};

@Component({
  selector: 'app-rps-data',
  templateUrl: './rps-data.component.html',
  styleUrls: ['./rps-data.component.css']
})
export class RPSDataComponent implements OnInit {
  rpsClient: RpsClient;
  isLoading = false;
  private client: Client;

  constructor(private rpsService: RpsService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  clientSearch(event) {
    this.rpsClient = undefined;
    this.client = event;
    this.getRPSCurrentBill();
  }

  getRPSCurrentBill() {
    this.isLoading = true;
    this.rpsService.getRPSCurrentBill(this.client.ClientId)
      .subscribe(data => {
        this.isLoading = false;
          this.rpsClient = data;
          this.rpsClient.ClientName = this.client.ClientName;
      }, error => {
        console.log(error);
        this.showFailedSearch();
        this.isLoading = false;
      });
  }

  destroyClient(event) {
    this.rpsClient = null;
    this.showSuccessfulSave();
  }

  showSuccessfulSave() {
    this.toastrService.success('Invoice was saved successfully', 'Invoice saved!', toastConfig);
  }

  showFailedSearch() {
    this.toastrService.error('Error finding client data, please try again or contact help desk if issue persists',
      'Error finding client data!',
      toastConfig);
  }
}
