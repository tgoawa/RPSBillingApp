import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalModule } from 'ngx-bootstrap';

import { RpsRoutingModule } from './rps-routing.module';
import { RpsComponent } from './rps.component';
import { RPSDataComponent } from './invoice-entry/rps-data.component';
import { RpsFormComponent } from './invoice-entry/rps-form/rps-form.component';
import { ClientSearchModule } from 'app/client-search/client-search.module';
import { RpsService } from 'app/rps-entry/invoice-entry/services/rps.service';



@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RpsRoutingModule,
    ClientSearchModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    ModalModule.forRoot()
  ],
  declarations: [
    RpsComponent,
    RPSDataComponent,
    RpsFormComponent
    ],
  providers: [ RpsService ]
})
export class RpsModule { }
