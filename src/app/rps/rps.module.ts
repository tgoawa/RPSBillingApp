import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpsRoutingModule } from './rps-routing.module';
import { RpsComponent } from './rps.component';
import { InvoiceEntryComponent } from './invoice-entry/invoice-entry.component';

@NgModule({
  imports: [
    CommonModule,
    RpsRoutingModule
  ],
  declarations: [RpsComponent, InvoiceEntryComponent]
})
export class RpsModule { }
