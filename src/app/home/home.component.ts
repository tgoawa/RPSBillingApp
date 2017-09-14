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
  hasErrors: boolean;

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
    this.resetState();
  }

  onUpload() {
    this.rpsService.saveCSV(this.CreditData)
      .subscribe(data => {
        this.showSuccessImport();
        this.resetState();
      }, error => {
        this.showFailImport();
        this.resetState();
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
        this.hasErrors = true;
        continue;
      }

      if (isNaN(parseFloat(allData[1]))) {
        this.ErrorList.push(allData);
        this.hasErrors = true;
        continue;
      }

      credit.ClientId = parseInt(allData[0], 10);
      credit.Credit = parseFloat(allData[1]);

      if (this.checkForDuplicates(credit)) {
        this.DuplicateList.push(credit);
        this.hasErrors = true;
        continue;
      }

      this.CreditData.push(credit);

    }
    this.checkForErrors();
  }

  private checkForDuplicates(data: RPSCreditModel): boolean {
    for (let x = 0; x < this.CreditData.length; x++) {
      if (this.CreditData[x].ClientId === data.ClientId) {
        return true;
      }
      return false;
    }
  }

  private checkForErrors() {
    if (this.hasErrors) {
      this.checkErrorList();
      this.checkDuplicateList();
    } else {
      this.disableImport = false;
    }
  }

  private checkErrorList() {
    if (this.ErrorList.length > 0) {
      this.ErrorMsg = 'These values are not formatted properly';
      this.showErrorModal();
    }
    return;
  }

  private checkDuplicateList() {
    if (this.DuplicateList.length > 0) {
      this.DuplicateMsg = 'The following has duplicate Client Ids!';
      this.showErrorModal();
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

  private resetState() {
    this.csvErrorModal.hide();
    this.ErrorMsg = '';
    this.ErrorList = [];
    this.DuplicateList = [];
    this.CreditData = [];
    this.resetFile();
    this.hasErrors = false;
  }

}
