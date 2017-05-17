import { Component, OnInit } from '@angular/core';

import { RpsService } from './services/rps.service';
import { RpsClient, Client } from 'app/client';

@Component({
  selector: 'app-rps-data',
  templateUrl: './rps-data.component.html',
  styleUrls: ['./rps-data.component.css']
})
export class RPSDataComponent implements OnInit {
  rpsClient: RpsClient;
  isLoading = false;
  private client: Client;

  constructor(private rpsService: RpsService) { }

  ngOnInit() {
  }

  clientSearch(event) {
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
    });
  }

  destroyClient(event) {
    this.rpsClient = null;
  }
}
