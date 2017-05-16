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
  private client: Client;

  constructor(private rpsService: RpsService) { }

  ngOnInit() {
  }

  clientSearch(event) {
    this.client = event;
    this.getRPSCurrentBill();
  }

  getRPSCurrentBill() {
    this.rpsService.getRPSCurrentBill(this.client.ClientId)
    .subscribe(data => {
      this.rpsClient.ClientName = this.client.ClientName;
      this.rpsClient = data;
    });
  }
}
