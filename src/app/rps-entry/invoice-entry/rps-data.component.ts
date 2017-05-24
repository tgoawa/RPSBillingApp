import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService, ToastConfig } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';

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
  @ViewChild('confirmModal') public confirmModal: ModalDirective;
  rpsClient: RpsClient;
  isLoading = false;
  private client: Client;

  constructor(private rpsService: RpsService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  clientSearch(event) {
    this.client = event;
    if (this.rpsClient !== undefined) {
      this.showConfirmModal();
    } else {
    this.getRPSCurrentBill();
    }
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
    this.rpsClient = undefined;
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

  showConfirmModal() {
    this.confirmModal.show();
  }

  hideConfirmModal() {
    this.confirmModal.hide();
  }

  onConfirm() {
    this.rpsClient = undefined;
    this.hideConfirmModal();
    this.getRPSCurrentBill();
  }
}
