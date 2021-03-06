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
MatProgressSpinnerModule,
MatTooltipModule } from '@angular/material';

import { ClientSearchComponent } from './client-search.component';

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
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  exports: [
    ClientSearchComponent
  ],
  declarations: [
    ClientSearchComponent
  ]
})
export class ClientSearchModule { }
