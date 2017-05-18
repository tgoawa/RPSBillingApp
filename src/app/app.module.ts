import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClientSearchService } from './client-search/services/client-search.service';
import { RpsModule } from './rps-entry/rps.module';
import { NavComponent } from './nav/nav.component';
import { MaintenanceModule } from './maintenance/maintenance.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    RpsModule,
    MaintenanceModule,
    ToastrModule.forRoot()
  ],
  providers: [ClientSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
