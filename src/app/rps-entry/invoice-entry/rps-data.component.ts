import { Component, OnInit, ViewChild } from '@angular/core';

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

  constructor(private rpsService: RpsService) { }

  ngOnInit() {
  }

  clientSearch(event: Client) {
    if (this.isSearchEmpty(event)) {
      this.rpsClient = undefined;
    } else {
      this.isLoading = true;
      this.getRPSCurrentBill(event);
    }
  }

  getRPSCurrentBill(client: Client) {
    this.rpsService.getRPSCurrentBill(client.ClientId)
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

  private isSearchEmpty(val) {
    if (val === '') {
      return true;
    }
    return false;
  }
}
