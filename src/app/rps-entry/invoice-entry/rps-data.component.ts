import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { RpsService } from './services/rps.service';
import { RpsClient, Client } from 'app/client';
import { ClientSearchService } from '../../core/services/client-search.service';

@Component({
  selector: 'app-rps-data',
  templateUrl: './rps-data.component.html',
  styleUrls: ['./rps-data.component.css']
})
export class RPSDataComponent implements OnInit {
  // @ViewChild('isLoading') isLoading: ElementRef;
  clients: Client[];
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
      .subscribe(data => {
        this.rpsClient = data;
      }, error => {
        console.log(error);
      });
  }

  destroyClient(event) {
    this.rpsClient = undefined;
  }

  private getClients() {
    this.clientSearchService.getClients()
      .subscribe(data => {
        this.clients = data;
      }, error => {
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
