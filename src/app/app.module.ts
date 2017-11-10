import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout'

import { MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule } from '@angular/material';

import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClientSearchService } from './client-search/services/client-search.service';
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
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    RpsModule,
    ReactiveFormsModule,
    MaintenanceModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [
        ErrorListDialogComponent,
        DuplicateListDialogComponent
  ],
  providers: [
    ClientSearchService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
