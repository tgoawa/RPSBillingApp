import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RPSCreditModel } from './client-credit';
import { RpsService } from '../rps-entry/invoice-entry/services/rps.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorListDialogComponent } from './error-list-dialog/error-list-dialog.component';
import { DuplicateListDialogComponent } from './duplicate-list-dialog/duplicate-list-dialog.component';


@Component({
  selector: 'app-client-credit-import',
  templateUrl: './client-credit-import.component.html',
  styleUrls: ['./client-credit-import.component.css']
})
export class ClientCreditImportComponent implements OnInit {
  @ViewChild('fileImport') public fileImport: any;
  csvImport: FormGroup;
  CreditData: RPSCreditModel[] = [];
  DuplicateList: RPSCreditModel[] = [];
  ErrorList: string[][] = [];
  hasErrors: boolean;

  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private rpsService: RpsService,
    private fb: FormBuilder,
    ) { }

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
    this.rpsService.saveCSV(this.CreditData)
      .subscribe((data: RPSCreditModel[]) => {
        if (data.length < 1) {
          this.openSnackBar('CSV Data uploaded successfully!');
          this.resetState();
        } else {
          this.DuplicateList = data;
          this.showDuplicateModal();
        }
      }, error => {
        this.openSnackBar('Error while uploading CSV data!');
        this.resetState();
        console.log(error);
      });
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
            console.log(credit)
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
        }
      }

      private checkForErrors() {
        if (this.hasErrors) {
          this.checkErrorList();
          this.checkDuplicateList();
        }
      }

      private checkErrorList() {
        if (this.ErrorList.length > 0) {
          this.showErrorModal();
          console.log('error!');
        }
        return;
      }

      private checkDuplicateList() {
        if (this.DuplicateList.length > 0) {
          this.showDuplicateModal();
          console.log('error!');
        }
      }

      private openSnackBar(message: string) {
        this.snackBar.open(message, '', {
          duration: 2000
        });
      }

      private showErrorModal() {
        const dialogRef = this.dialog.open(ErrorListDialogComponent, {
          width: '600px',
          data: this.ErrorList
        });

        dialogRef.afterClosed().subscribe(result => {
          this.ErrorList = [];
          this.resetFile();
        });
      }

      private showDuplicateModal() {
        const dialogRef = this.dialog.open(DuplicateListDialogComponent, {
          width: '600px',
          data: this.DuplicateList
        });

        dialogRef.afterClosed().subscribe(result => {
          this.DuplicateList = [];
          this.resetFile();
        });
      }

      private resetFile() {
        this.setForm();
      }

      private resetState() {
        this.ErrorList = [];
        this.DuplicateList = [];
        this.CreditData = [];
        this.resetFile();
        this.hasErrors = false;
      }

      private setForm() {
        this.csvImport = this.fb.group({
          requiredfile: [{ value: undefined, disabled: false }, [Validators.required]],
        });
      }

}
