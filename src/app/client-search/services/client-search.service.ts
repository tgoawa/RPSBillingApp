import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Client } from '../../client';

@Injectable()
export class ClientSearchService {

  constructor(private http: Http) {
  }

  getClients() {
    const url = 'http://webdev.schencksolutions.com:1016/RPSBillingService/';

    return this.http.get(url + 'GetRPSClients/')
    .map(response => response.json(), error => console.log(error));
  }

}
