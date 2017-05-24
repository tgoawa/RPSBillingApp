import { Component, OnInit } from '@angular/core';
import { Client, RpsClientFee } from 'app/client';

@Component({
  selector: 'app-maintenance-entry',
  templateUrl: './maintenance-entry.component.html',
  styleUrls: ['./maintenance-entry.component.css']
})
export class MaintenanceEntryComponent implements OnInit {
  rpsClientFee: RpsClientFee;
  isLoading = false;
  private client: Client;
  constructor() { }

  ngOnInit() {
  }

  clientFeeSearch(event) {
    this.client = event;
  }

  getRPSFee() {
    this.isLoading = true;
  }

}
