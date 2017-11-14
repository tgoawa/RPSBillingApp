import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';

import { RpsService } from './services/rps.service';
import { RpsClient, Client } from 'app/client';

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

  constructor(private rpsService: RpsService) { }

  ngOnInit() {
  }

  clientSearch(event) {
    this.rpsClient = undefined;
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
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  destroyClient(event) {
    this.rpsClient = undefined;
  }

  showConfirmModal() {
    this.confirmModal.show();
  }
}
