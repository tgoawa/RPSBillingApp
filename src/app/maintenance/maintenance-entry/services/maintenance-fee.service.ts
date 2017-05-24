import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { RpsClientFee } from '../../../client';

const api = environment.envApi;

@Injectable()
export class MaintenanceFeeService {

  constructor(private http: Http) { }

  getRPSFee(clientId: number) {
    return this.http.get(api + 'GetRPSFee/' + clientId)
    .map(response => response.json(), error => console.log(error));
  }

}
