import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout'

import { MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RpsModule } from './rps-entry/rps.module';
import { HomeComponent } from './home/home.component';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { CoreModule } from 'app/core/core.module';
import { ClientCreditImportComponent } from './client-credit-import/client-credit-import.component';
import { InputFileComponent } from './client-credit-import/input-file/input-file.component';
import { ErrorListDialogComponent } from './client-credit-import/error-list-dialog/error-list-dialog.component';
import { DuplicateListDialogComponent } from './client-credit-import/duplicate-list-dialog/duplicate-list-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientCreditImportComponent,
    InputFileComponent,
    ErrorListDialogComponent,
    DuplicateListDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    RpsModule,
    ReactiveFormsModule,
    MaintenanceModule
  ],
  entryComponents: [
        ErrorListDialogComponent,
        DuplicateListDialogComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
