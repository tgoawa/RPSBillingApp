import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap';
import { ClientSearchComponent } from './client-search.component';
import { ClientSearchService } from './services/client-search.service';

@NgModule({
  imports: [
    CommonModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientSearchComponent
  ],
  declarations: [
    ClientSearchComponent
  ],
  providers: [ ClientSearchService ]
})
export class ClientSearchModule { }
