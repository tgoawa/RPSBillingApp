import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RpsRoutingModule } from './rps-routing.module';
import { RpsComponent } from './rps.component';
import { RPSDataComponent } from './invoice-entry/rps-data.component';
import { RpsFormComponent } from './invoice-entry/rps-form/rps-form.component';
import { ClientSearchModule } from 'app/client-search/client-search.module';
import { RpsService } from 'app/rps/invoice-entry/services/rps.service';



@NgModule({
  imports: [
    CommonModule,
    RpsRoutingModule,
    ClientSearchModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RpsComponent,
    RPSDataComponent,
    RpsFormComponent
    ],
  providers: [ RpsService ]
})
export class RpsModule { }
