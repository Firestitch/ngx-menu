import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { FsMenuComponent } from './components/fs-menu/fs-menu.component';
import { FsBottomSheetComponent } from './components/fs-menu/bottom-sheet/fs-bottom-sheet.component';
import { MenuItemsListComponent } from './components/fs-menu/menu-items-list/menu-items-list.component';
import { BottomItemsListComponent } from
    './components/fs-menu/bottom-sheet/bottom-items-list/bottom-items-list.component';

import { FsMenuItemDirective } from './directives/menu-item/fs-menu-item.directive';
import { FsMenuTriggerDirective } from './directives/menu-trigger/fs-menu-trigger.directive';
import { FsMenuTitleDirective } from './directives/menu-title/fs-menu-title.directive';
import { FsGroupMenuItemTemplateDirective } from './directives/group-menu-item-template/fs-group-menu-item-template.directive';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  exports: [
    FsMenuComponent,
    FsMenuItemDirective,
    FsMenuTriggerDirective,
    FsMenuTitleDirective,
    FsGroupMenuItemTemplateDirective,
  ],
  declarations: [
    FsMenuComponent,
    FsBottomSheetComponent,
    MenuItemsListComponent,
    BottomItemsListComponent,

    FsMenuItemDirective,
    FsMenuTriggerDirective,
    FsMenuTitleDirective,
    FsGroupMenuItemTemplateDirective,
  ]
})
export class FsMenuModule {
  static forRoot(): ModuleWithProviders<FsMenuModule> {
    return {
      ngModule: FsMenuModule
    };
  }
}
