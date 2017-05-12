import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpsRoutingModule } from './rps-routing.module';
import { RpsComponent } from './rps.component';
import { InvoiceEntryComponent } from './invoice-entry/invoice-entry.component';
import { ClientSearchModule } from 'app/client-search/client-search.module';


@NgModule({
  imports: [
    CommonModule,
    RpsRoutingModule,
    ClientSearchModule
  ],
  declarations: [
    RpsComponent,
    InvoiceEntryComponent,
    ]
})
export class RpsModule { }
