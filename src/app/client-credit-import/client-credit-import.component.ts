import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RPSCreditModel } from './client-credit';
import { RpsService } from '../rps-entry/invoice-entry/services/rps.service';


@Component({
  selector: 'app-client-credit-import',
  templateUrl: './client-credit-import.component.html',
  styleUrls: ['./client-credit-import.component.css']
})
export class ClientCreditImportComponent implements OnInit {
  @ViewChild('fileImport') public fileImport: any;
  csvImport: FormGroup;
  alreadyInDB: RPSCreditModel[] = [];
  CreditData: RPSCreditModel[] = [];
  DuplicateList: RPSCreditModel[] = [];
  ErrorList: string[][] = [];
  disableImport = true;
  hasErrors: boolean;

  constructor(private rpsService: RpsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.setForm();
  }

  onCsvImport(csvFile) {
    const files = csvFile.requiredfile._files;
    const file = files[0];
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (event: any) => {
      const csv = event.target.result;
      this.extractData(csv);
    };
  }

  onSubmit() {
    console.log(this.csvImport.value);
    this.onCsvImport(this.csvImport.value);
    // this.rpsService.saveCSV(this.CreditData)
    //   .subscribe(data => {
    //     if (data.length < 1) {
    //       // this.showSuccessImport();
    //       this.resetState();
    //     } else {
    //       this.alreadyInDB = data;
    //       // this.showErrorModal();
    //     }
    //   }, error => {
    //     // this.showFailImport();
    //     this.resetState();
    //     console.log(error);
    //   });
  }

  private extractData(data) {
        const csvData = data;
        const allTextLines = csvData.split(/\r\n|\n/);
        for (let x = 0; x < allTextLines.length; x++) {
          const credit = new RPSCreditModel;
          const allData = allTextLines[x].split(',');
          if (isNaN(Number(allData[0]))) {
            this.ErrorList.push(allData);
            this.hasErrors = true;
            continue;
          }
          if (isNaN(Number(allData[1]))) {
            this.ErrorList.push(allData);
            this.hasErrors = true;
            continue;
          }
          credit.ClientId = Number(allData[0]);
          credit.Credit = Number(allData[1]);
          if (this.checkForDuplicates(credit)) {
            this.DuplicateList.push(credit);
            this.hasErrors = true;
            continue;
          }
          this.CreditData.push(credit);
        }
        console.log(this.CreditData);
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
          // this.showErrorModal();
          console.log('error!');
        }
        return;
      }

      private checkDuplicateList() {
        if (this.DuplicateList.length > 0) {
          // this.showErrorModal();
          console.log('error!');
        }
      }

      private resetFile() {
        this.setForm();
      }

      private resetState() {
        // this.csvErrorModal.hide();
        this.alreadyInDB = [];
        this.ErrorList = [];
        this.DuplicateList = [];
        this.CreditData = [];
        this.resetFile();
        this.hasErrors = false;
        this.disableImport = true;
      }

      private setForm() {
        this.csvImport = this.fb.group({
          requiredfile: [{ value: undefined, disabled: false }, [Validators.required]],
        });
      }

}
