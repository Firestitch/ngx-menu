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
import { BottomItemsListComponent } from
    './components/fs-menu/bottom-sheet/bottom-items-list/bottom-items-list.component';

import { FsMenuItemDirective } from './directives/menu-item/fs-menu-item.directive';
import { FsMenuTriggerDirective } from './directives/menu-trigger/fs-menu-trigger.directive';
import { FsMenuTitleDirective } from './directives/menu-title/fs-menu-title.directive';


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
  ],
  entryComponents: [
    FsBottomSheetComponent,
  ],
  declarations: [
    FsMenuComponent,
    FsBottomSheetComponent,
    MenuItemsListComponent,
    BottomItemsListComponent,

    FsMenuItemDirective,
    FsMenuTriggerDirective,
    FsMenuTitleDirective,
  ]
})
export class FsMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsMenuModule
    };
  }
}
