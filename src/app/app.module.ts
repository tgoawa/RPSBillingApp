import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TypeaheadModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClientSearchService } from './client-search/services/client-search.service';
import { NameSearchComponent } from './client-search/name-search/name-search.component';
import { IdSearchComponent } from './client-search/id-search/id-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientSearchComponent,
    NameSearchComponent,
    IdSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    TypeaheadModule.forRoot()
  ],
  providers: [ClientSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
