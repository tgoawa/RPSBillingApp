import { Component, OnInit } from '@angular/core';

import { RpsService } from './services/rps.service';
import { RpsClient } from 'app/client';

@Component({
  selector: 'app-rps-data',
  templateUrl: './rps-data.component.html',
  styleUrls: ['./rps-data.component.css']
})
export class RPSDataComponent implements OnInit {
  client: RpsClient;
  private clientId: number;

  constructor(private rpsService: RpsService) { }

  ngOnInit() {
  }

  clientSearch(event) {
    this.clientId = event;
    this.getRPSCurrentBill();
  }

  getRPSCurrentBill() {
    console.log(this.clientId);
    this.rpsService.getRPSCurrentBill(this.clientId)
    .subscribe(data => this.client = data);
  }
}
