import { Component, OnInit } from '@angular/core';

import { MaintenanceFeeService } from './services/maintenance-fee.service';
import { Client, RpsClientFee } from 'app/client';

@Component({
  selector: 'app-maintenance-entry',
  templateUrl: './maintenance-entry.component.html',
  styleUrls: ['./maintenance-entry.component.css']
})
export class MaintenanceEntryComponent implements OnInit {
  rpsClientFee: RpsClientFee;
  isLoading = false;

  constructor(private feeService: MaintenanceFeeService) { }

  ngOnInit() {
  }

  clientFeeSearch(event) {
    if (this.isSearchEmpty(event)) {
      this.rpsClientFee = undefined;
    } else {
      this.getRPSFee(event);
    }
  }

  getRPSFee(client: Client) {
    this.isLoading = true;
    this.feeService.getRPSFee(client.ClientId)
    .subscribe(data => {
      this.isLoading = false;
      this.rpsClientFee = data;
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  destroyForm(event) {
    this.rpsClientFee = undefined;
  }

  private isSearchEmpty(val) {
    if (val === '') {
      return true;
    }
    return false;
  }

}
