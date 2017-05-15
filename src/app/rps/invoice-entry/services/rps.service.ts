import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { RpsClient } from '../../../client';

@Injectable()
export class RpsService {

  constructor(private http: Http) { }

  getRPSCurrentBill(clientId: number) {
    const url = 'http://webdev.schencksolutions.com:1016/RPSBillingService/';

    return this.http.get(url + 'GetRPSCurrentBill/' + clientId)
    .map(response => response.json(), error => console.log(error));
  }
}
