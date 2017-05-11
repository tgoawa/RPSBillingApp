import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import { Client } from '../../client';

@Injectable()
export class ClientSearchService {
  clients: Observable<Client[]>;
  private _clients: BehaviorSubject<Client[]>;
  private url: string;
  private clientStore: {
    clients: Client[]
  };

  constructor(private http: Http) {
    this.clientStore = { clients: [] };
    this._clients = <BehaviorSubject<Client[]>>new BehaviorSubject([]);
    this.clients = this._clients.asObservable();
  }

  getClients() {
    this.http.get(this.url + 'getClients')
    .map(response => response.json())
    .subscribe(data => {
      this.clientStore.clients = data;
      this._clients.next(Object.assign({}, this.clientStore).clients);
    }, error => console.log('Could not load clients'));
  }

}
