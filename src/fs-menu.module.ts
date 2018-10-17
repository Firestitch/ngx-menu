import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatListModule,
  MatButtonModule,
} from '@angular/material';

import { FsMenuComponent, FsBottomSheetComponent } from './components';
import { MenuItemDirective, MenuTriggerDirective } from './directives';
// import { FsComponentService } from './services';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  exports: [
    FsMenuComponent,
    MenuItemDirective,
    MenuTriggerDirective,
  ],
  entryComponents: [
    FsBottomSheetComponent,
  ],
  declarations: [
    FsMenuComponent,
    FsBottomSheetComponent,

    MenuItemDirective,
    MenuTriggerDirective,
  ],
  providers: [
    // FsComponentService,
  ],
})
export class FsMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsMenuModule,
      // providers: [FsComponentService]
    };
  }
}
