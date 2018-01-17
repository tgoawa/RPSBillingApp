import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule,
  MatToolbarModule } from '@angular/material';

import { throwIfAlreadyLoaded } from 'app/core/module-import.guard';
import { LoggerService } from 'app/core/services/logger.service';
import { HeaderComponent } from './header/header.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [ HeaderComponent ],
  declarations: [ HeaderComponent ],
  providers: [
    LoggerService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}