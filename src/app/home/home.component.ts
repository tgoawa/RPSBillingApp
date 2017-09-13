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
  CreditData: ClientCredit[];

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
    const headers = allTextLines[0].split(',');
    const lines = [];

    for (let x = 0; x < allTextLines.length; x++) {
      const allData = allTextLines[x].split(',');
      lines.push(allData);
    }
    console.log(lines);
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
