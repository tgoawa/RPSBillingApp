import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceEntryComponent } from './maintenance-entry/maintenance-entry.component';
import { ClientSearchModule } from 'app/client-search/client-search.module';
import { MaintenanceFeeService } from './maintenance-entry/services/maintenance-fee.service';
import { MaintenanceFormComponent } from './maintenance-entry/maintenance-form/maintenance-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    ClientSearchModule,
    ReactiveFormsModule
  ],
  declarations: [MaintenanceComponent,
    MaintenanceEntryComponent,
    MaintenanceFormComponent
  ],
  providers: [ MaintenanceFeeService ]
})
export class MaintenanceModule { }
