import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout'

import { MatButtonModule } from '@angular/material';

import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClientSearchService } from './client-search/services/client-search.service';
import { RpsModule } from './rps-entry/rps.module';
import { HomeComponent } from './home/home.component';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { CoreModule } from 'app/core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    RpsModule,
    MaintenanceModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    ClientSearchService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
