import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { RpsClient, RpsCurrentBill } from '../../../client';

@Injectable()
export class RpsService {
  private url = 'http://webdev.schencksolutions.com:1016/RPSBillingService/';

  constructor(private http: Http) { }

  getRPSCurrentBill(clientId: number) {

    return this.http.get(this.url + 'GetRPSCurrentBill/' + clientId)
    .map(response => response.json(), error => console.log(error));
  }

  saveRPSInvoice(invoice: RpsCurrentBill) {

    return this.http.post(this.url + 'saveRPSInvoice/', invoice)
    .map(response => response.json(), error => console.log(error));
  }
}
