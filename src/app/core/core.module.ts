import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule,
  MatDialogModule,
  MatToolbarModule } from '@angular/material';

import { throwIfAlreadyLoaded } from 'app/core/module-import.guard';
import { LoggerService } from 'app/core/services/logger.service';
import { HeaderComponent } from './header/header.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule
  ],
  exports: [ HeaderComponent ],
  declarations: [ HeaderComponent, ConfirmationDialogComponent ],
  entryComponents: [ ConfirmationDialogComponent ],
  providers: [
    LoggerService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
