import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-list-dialog',
  templateUrl: './error-list-dialog.component.html',
  styleUrls: ['./error-list-dialog.component.css']
})
export class ErrorListDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    close() {
      this.dialogRef.close();
    }

}
