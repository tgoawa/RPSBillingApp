import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClientSearchService } from './client-search/services/client-search.service';
import { RpsModule } from './rps/rps.module';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    RpsModule,
  ],
  providers: [ClientSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
