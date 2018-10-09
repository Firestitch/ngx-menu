import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatListModule,
} from '@angular/material';

import { FsMenuComponent, FsBottomSheetComponent } from './components';
import { MenuItemDirective } from './directives/menu-item/menu-item.directive';
// import { FsComponentService } from './services';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  exports: [
    FsMenuComponent,
    MenuItemDirective,
  ],
  entryComponents: [
    FsBottomSheetComponent,
  ],
  declarations: [
    FsMenuComponent,
    FsBottomSheetComponent,

    MenuItemDirective,
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
