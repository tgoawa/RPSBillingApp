import { RpsService } from '../rps-entry/invoice-entry/services/rps.service';
import { RPSCreditModel } from './client-credit';
import { all } from 'codelyzer/util/function';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService, ToastConfig } from 'ngx-toastr';

import { ModalDirective } from 'ngx-bootstrap';

const toastConfig: ToastConfig = {
  positionClass: 'toast-center-center',
  timeOut: 10000,
  closeButton: true
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('csvErrorModal') public csvErrorModal: ModalDirective;
  @ViewChild('fileImport') public fileImport: any;
  ErrorMsg: string;
  ErrorList: string[][] = [];
  DuplicateMsg: string;
  DuplicateList: RPSCreditModel[] = [];
  CreditData: RPSCreditModel[] = [];
  disableImport = true;

  constructor(private rpsService: RpsService, private toastrService: ToastrService) { }

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
    this.resetFile();
  }

  onUpload() {
    this.rpsService.saveCSV(this.CreditData)
      .subscribe(data => {
        this.showSuccessImport();
      }, error => {
        this.showFailImport();
        console.log(error);
      });
  }

  private showErrorModal() {
    this.csvErrorModal.show();
  }

  private extractData(data) {

    const csvData = data;
    const allTextLines = csvData.split(/\r\n|\n/);

    for (let x = 0; x < allTextLines.length; x++) {
      const credit = new RPSCreditModel;
      const allData = allTextLines[x].split(',');

      if (isNaN(parseInt(allData[0], 10))) {
        this.ErrorList.push(allData);
        continue;
      }

      if (isNaN(parseFloat(allData[1]))) {
        this.ErrorList.push(allData);
        continue;
      }

      credit.ClientId = parseInt(allData[0], 10);
      credit.Credit = parseFloat(allData[1]);

      if (this.checkForDuplicates(credit)) {
        this.DuplicateList.push(credit);
        continue;
      }

      this.CreditData.push(credit);
    }

    if (this.ErrorList.length > 0) {
      this.ErrorMsg = 'These values are not formatted properly';
      this.showErrorModal();
    }

    if (this.DuplicateList.length > 0) {
      this.DuplicateMsg = 'The following are duplicate Client Ids!';
      this.showErrorModal();
    }

    console.log(this.CreditData);
    console.log(this.ErrorList);
  }

  private checkForDuplicates(data: RPSCreditModel): boolean {
    for (let x = 0; x < this.CreditData.length; x++) {
      if (this.CreditData[x].ClientId === data.ClientId) {
        return true;
      }
      return false;
    }
  }

  private showSuccessImport() {
    this.toastrService.success(null, 'Success importing CSV!', toastConfig);
  }

  private showFailImport() {
    this.toastrService.error('Error importing CSV, try again or call help desk if contines', 'Error importing CSV!', toastConfig);
  }

  private resetFile() {
    this.fileImport.nativeElement.value = '';
  }

}
