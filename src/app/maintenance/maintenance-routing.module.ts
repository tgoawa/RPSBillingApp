import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceComponent } from 'app/maintenance/maintenance.component';
import { MaintenanceDataComponent } from 'app/maintenance/maintenance-data/maintenance-data.component';

const routes: Routes = [
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    children: [
      {path: '', component: MaintenanceDataComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
