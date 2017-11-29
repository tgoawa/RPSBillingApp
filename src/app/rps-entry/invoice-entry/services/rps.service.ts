import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { RpsClient, RpsCurrentBill } from '../../../client';
import { RPSCreditModel } from '../../../client-credit-import/client-credit';

const api = environment.envApi;
@Injectable()
export class RpsService {

  constructor(private http: Http) { }

  getRPSCurrentBill(clientId: number) {

    return this.http.get(api + 'GetRPSCurrentBill/' + clientId)
    .map(response => response.json(), error => console.log(error));
  }

  saveRPSInvoice(invoice: RpsCurrentBill) {

    return this.http.put(api + 'updateRPSInvoice/', invoice)
    .map(response => response.json(), error => console.log(error));
  }

  saveCSV(credit: RPSCreditModel[]) {
    console.log(credit);
    return this.http.post(api + 'LoadCredits/', credit)
    .map(response => response.json(), error => console.log(error));
  }
}
