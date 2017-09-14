import { ArrayOfRPSCreditModel, RPSCreditModel } from '../../../home/client-credit';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { RpsClient, RpsCurrentBill } from '../../../client';

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
    const ArrayOfRPSCreditModel = credit;
    console.log(ArrayOfRPSCreditModel);
    return this.http.post(api + 'LoadCredits/', ArrayOfRPSCreditModel)
    .map(response => response.json(), error => console.log(error));
  }
}
