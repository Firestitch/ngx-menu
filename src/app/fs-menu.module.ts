import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatListModule,
  MatButtonModule,
} from '@angular/material';

import { FsMenuComponent } from './components/fs-menu/fs-menu.component';
import { FsBottomSheetComponent } from './components/fs-menu/bottom-sheet/fs-bottom-sheet.component';
import { MenuItemsListComponent } from './components/fs-menu/menu-items-list/menu-items-list.component';
import { MenuGroupItemsListComponent } from
    './components/fs-menu/menu-group-items-list/menu-group-items-list.component';

import { FsMenuItemDirective } from './directives/menu-item/fs-menu-item.directive';
import { FsMenuTriggerDirective } from './directives/menu-trigger/fs-menu-trigger.directive';
import { FsMenuTitleDirective } from './directives/menu-title/fs-menu-title.directive';
import { FsMenuGroupDirective } from './directives/menu-group/fs-menu-group.directive';



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule
  ],
  exports: [
    FsMenuComponent,
    FsMenuItemDirective,
    FsMenuTriggerDirective,
    FsMenuTitleDirective,
    FsMenuGroupDirective,
  ],
  entryComponents: [
    FsBottomSheetComponent,
  ],
  declarations: [
    FsMenuComponent,
    FsBottomSheetComponent,
    MenuGroupItemsListComponent,
    MenuItemsListComponent,

    FsMenuItemDirective,
    FsMenuTriggerDirective,
    FsMenuTitleDirective,
    FsMenuGroupDirective,
  ]
})
export class FsMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsMenuModule
    };
  }
}
