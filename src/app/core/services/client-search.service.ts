import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Client } from '../../client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const api = environment.envApi;
@Injectable()
export class ClientSearchService {
  isFormDirty$: Observable<boolean>
  private _isFormDirty = new BehaviorSubject<boolean>(false);

  constructor(private http: Http) {
    this.isFormDirty$ = this._isFormDirty.asObservable();
  }

  getClients() {
    return this.http.get(api + 'GetRPSClients/')
    .map(response => response.json(), error => console.log(error));
  }

  setFormDirtyState(val: boolean) {
    this._isFormDirty.next(val);
  }

}
