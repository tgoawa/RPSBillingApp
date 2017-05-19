import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Client } from '../../client';

const api = environment.envApi;
@Injectable()
export class ClientSearchService {
  constructor(private http: Http) {
  }

  getClients() {

    return this.http.get(api + 'GetRPSClients/')
    .map(response => response.json(), error => console.log(error));
  }

}
