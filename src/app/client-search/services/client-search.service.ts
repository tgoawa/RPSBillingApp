import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import { Client } from '../../client';

@Injectable()
export class ClientSearchService {
  private url: string;

  constructor(private http: Http) {
  }

  getClients(): Observable<Client[]> {
    return this.http.get(this.url + 'getClients')
    .map(response => response.json(), error => console.log(error));
  }

}
