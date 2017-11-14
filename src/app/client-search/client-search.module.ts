import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'

import { MatAutocompleteModule,
MatButtonModule,
MatCardModule,
MatIconModule,
MatInputModule,
MatProgressSpinnerModule } from '@angular/material';

import { ClientSearchComponent } from './client-search.component';
import { ClientSearchService } from './services/client-search.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
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
