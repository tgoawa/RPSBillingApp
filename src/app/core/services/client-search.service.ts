import { Injectable } from '@angular/core';

import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Client } from 'app/client';

const api = environment.envGateway;
@Injectable()
export class ClientSearchService {
  isFormDirty$: Observable<boolean>
  private _isFormDirty = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.isFormDirty$ = this._isFormDirty.asObservable();
  }

  getClients() {
    return this.http.get<Client[]>(api + 'GetRPSClients/')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  setFormDirtyState(val: boolean) {
    this._isFormDirty.next(val);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
