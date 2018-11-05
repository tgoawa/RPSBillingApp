import { Component, OnInit, ViewChild } from '@angular/core';

import { RpsService } from './services/rps.service';
import { RpsClient, Client } from 'app/client';
import { ClientSearchService } from '../../core/services/client-search.service';

@Component({
  selector: 'app-rps-data',
  templateUrl: './rps-data.component.html',
  styleUrls: ['./rps-data.component.css']
})
export class RPSDataComponent implements OnInit {
  clients: Client[];
  isLoading: boolean;
  rpsClient: RpsClient;

  constructor(private rpsService: RpsService, private clientSearchService: ClientSearchService) { }

  ngOnInit() {
    this.getClients();
  }

  clientSearch(event: Client) {
    if (this.isSearchEmpty(event)) {
      this.rpsClient = undefined;
    } else {
      this.getRPSCurrentBill(event);
    }
  }

  getRPSCurrentBill(client: Client) {
    this.rpsService.getRPSCurrentBill(client.ClientId)
      .subscribe((data: RpsClient) => {
        this.rpsClient = data;
      }, error => {
        console.log(error);
      });
  }

  destroyClient(event) {
    this.rpsClient = undefined;
  }

  private getClients() {
    this.isLoading = true;
    this.clientSearchService.getClients()
      .subscribe(data => {
        this.isLoading = false;
        this.clients = data;
      }, error => {
        this.isLoading = false;
        console.error(error);
      })
  }

  private isSearchEmpty(val) {
    if (val === '') {
      return true;
    }
    return false;
  }
}
