import { ClientCredit } from './client-credit';
import { all } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayCSVError: boolean;
  CreditData: ClientCredit[] = [];

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

  private extractData(data) {

    const csvData = data;
    const allTextLines = csvData.split(/\r\n|\n/);

    for (let x = 0; x < allTextLines.length; x++) {
      const credit = new ClientCredit;
      const allData = allTextLines[x].split(',');
      credit.ClientId = this.mapToClientId(allData[0]);
      credit.Credit = this.mapToClientCredit(allData[1]);
      this.CreditData.push(credit);
    }
    console.log(this.CreditData);
  }

  private mapToClientId(data): number {
    if (isNaN(parseInt(data, 10))) {
      this.displayCSVError = true;
      return;
    } else {
      return parseInt(data, 10);
    }
  }

  private mapToClientCredit(data): number {
    if (isNaN(parseFloat(data))) {
      this.displayCSVError = true;
      return;
    } else {
      return parseFloat(data);
    }
  }

}
