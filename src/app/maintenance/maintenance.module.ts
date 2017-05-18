import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceDataComponent } from './maintenance-data/maintenance-data.component';

@NgModule({
  imports: [
    CommonModule,
    MaintenanceRoutingModule
  ],
  declarations: [MaintenanceComponent, MaintenanceDataComponent]
})
export class MaintenanceModule { }
