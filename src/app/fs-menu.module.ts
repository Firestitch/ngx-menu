import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { FsFileModule } from '@firestitch/file';

import { FsMenuComponent } from './components/fs-menu/fs-menu.component';
import { FsBottomSheetComponent } from './components/fs-menu/bottom-sheet/fs-bottom-sheet.component';
import { MenuItemsListComponent } from './components/fs-menu/menu-items-list/menu-items-list.component';
import { BottomItemsListComponent } from './components/fs-menu/bottom-sheet/bottom-items-list/bottom-items-list.component';

import { FsMenuItemDirective } from './directives/menu-item/fs-menu-item.directive';
import { FsMenuTriggerDirective } from './directives/menu-trigger/fs-menu-trigger.directive';
import { FsGroupMenuItemTemplateDirective } from './directives/group-menu-item-template/fs-group-menu-item-template.directive';
import { FsMenuFileItemDirective } from './directives/menu-file-item';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
    MatTooltipModule,

    FsFileModule,
  ],
  exports: [
    FsMenuComponent,
    FsMenuItemDirective,
    FsMenuTriggerDirective,
    FsMenuFileItemDirective,
    FsGroupMenuItemTemplateDirective,
  ],
  declarations: [
    FsMenuComponent,
    FsBottomSheetComponent,
    MenuItemsListComponent,
    BottomItemsListComponent,

    FsMenuItemDirective,
    FsMenuFileItemDirective,
    FsMenuTriggerDirective,
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
