import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceEntryComponent } from './maintenance-entry/maintenance-entry.component';
import { ClientSearchModule } from 'app/client-search/client-search.module';
import { MaintenanceFeeService } from './maintenance-entry/services/maintenance-fee.service';

@NgModule({
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    ClientSearchModule
  ],
  declarations: [MaintenanceComponent,
    MaintenanceEntryComponent
  ],
  providers: [ MaintenanceFeeService ]
})
export class MaintenanceModule { }
