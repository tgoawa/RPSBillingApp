import { ClientCredit } from './client-credit';
import { all } from 'codelyzer/util/function';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('csvErrorModal') public csvErrorModal: ModalDirective;
  ErrorMsg: string;
  CreditData: ClientCredit[] = [];
  duplicateClient: number;

  constructor() { }

  ngOnInit() {
  }

  onCsvImport(evt) {
    const files = evt.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (event: any) => {
      const csv = event.target.result;
      this.extractData(csv);
    };
  }

  hideModal() {
    this.csvErrorModal.hide();
    this.ErrorMsg = '';
  }

  private showErrorModal() {
    this.csvErrorModal.show();
  }

  private extractData(data) {

    const csvData = data;
    const allTextLines = csvData.split(/\r\n|\n/);

    for (let x = 0; x < allTextLines.length; x++) {
      const credit = new ClientCredit;
      const allData = allTextLines[x].split(',');
      credit.ClientId = this.mapToClientId(allData[0]);
      credit.Credit = this.mapToClientCredit(allData[1]);
      if (this.checkForDuplicates(credit)) {
        this.showErrorModal();
        this.ErrorMsg = 'Client Id of ' + this.duplicateClient + ' is duplicated!';
      } else {
        this.CreditData.push(credit);
      }
    }
    console.log(this.CreditData);
  }

  private mapToClientId(data): number {
    if (isNaN(parseInt(data, 10))) {
      this.showErrorModal();
      this.ErrorMsg = 'Value for Client Id is not a number!';
      return;
    } else {
      return parseInt(data, 10);
    }
  }

  private mapToClientCredit(data): number {
    if (isNaN(parseFloat(data))) {
      this.showErrorModal();
      this.ErrorMsg = 'Value for Client Credit is not a number!';
      return;
    } else {
      return parseFloat(data);
    }
  }

  private checkForDuplicates(data: ClientCredit): boolean {
    this.duplicateClient = undefined;
    for (let x = 0; x < this.CreditData.length; x++) {
      if (data.ClientId === this.CreditData[x].ClientId) {
        this.duplicateClient = data.ClientId;
        return true;
      } else {
        return false;
      }
    }
  }

}
