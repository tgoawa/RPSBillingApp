import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpsComponent } from './rps.component';
import { InvoiceEntryComponent } from './invoice-entry/invoice-entry.component';

const routes: Routes = [
  {
    path: 'rps',
    component: RpsComponent,
    children: [
      {path: '', component: InvoiceEntryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpsRoutingModule { }
