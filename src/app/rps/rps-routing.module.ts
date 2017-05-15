import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpsComponent } from './rps.component';
import { RPSDataComponent } from './invoice-entry/rps-data.component';

const routes: Routes = [
  {
    path: 'rps',
    component: RpsComponent,
    children: [
      {path: '', component: RPSDataComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpsRoutingModule { }
