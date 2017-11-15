import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-duplicate-list-dialog',
  templateUrl: './duplicate-list-dialog.component.html',
  styleUrls: ['./duplicate-list-dialog.component.css']
})
export class DuplicateListDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DuplicateListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    close() {
      this.dialogRef.close();
    }

}
