import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RpsRoutingModule } from './rps-routing.module';
import { RpsComponent } from './rps.component';
import { RPSDataComponent } from './invoice-entry/rps-data.component';
import { ClientSearchModule } from 'app/client-search/client-search.module';
import { RpsFormComponent } from './invoice-entry/rps-form/rps-form.component';


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
    RpsFormComponent,
    ]
})
export class RpsModule { }
