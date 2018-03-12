import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MaintenanceFeeService } from './services/maintenance-fee.service';
import { Client, RpsClientFee } from 'app/client';
import { ClientSearchService } from '../../core/services/client-search.service';

@Component({
  selector: 'app-maintenance-entry',
  templateUrl: './maintenance-entry.component.html',
  styleUrls: ['./maintenance-entry.component.css']
})
export class MaintenanceEntryComponent implements OnInit {
  @ViewChild('isLoading') isLoading: ElementRef;
  clients: Client[];
  rpsClientFee: RpsClientFee;

  constructor(private feeService: MaintenanceFeeService, private clientSearchService: ClientSearchService) { }

  ngOnInit() {
    this.getClients();
  }

  clientFeeSearch(event) {
    if (this.isSearchEmpty(event)) {
      this.rpsClientFee = undefined;
    } else {
      this.getRPSFee(event);
    }
  }

  getRPSFee(client: Client) {
    this.feeService.getRPSFee(client.ClientId)
    .subscribe(data => {
      this.rpsClientFee = data;
    }, error => {
      console.log(error);
    });
  }

  destroyForm(event) {
    this.rpsClientFee = undefined;
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
