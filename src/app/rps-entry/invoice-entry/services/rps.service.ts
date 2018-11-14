import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { RpsClient, RpsCurrentBill } from '../../../client';
import { RPSCreditModel } from '../../../client-credit-import/client-credit';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retry, catchError } from 'rxjs/operators';

const api = environment.envApi;
@Injectable()
export class RpsService {

  constructor(private http: HttpClient) { }

  getRPSCurrentBill(clientId: number) {
    return this.http.get<RpsClient>(api + 'GetCurrentInvoice/' + clientId)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  saveRPSInvoice(invoice: RpsCurrentBill) {
    return this.http.put(api + 'updateRPSInvoice/', invoice)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  saveCSV(credit: RPSCreditModel[]) {
    return this.http.post<RPSCreditModel[]>(api + 'LoadCredits/', credit)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
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
