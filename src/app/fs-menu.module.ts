import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsFileModule } from '@firestitch/file';

import { BottomItemsListComponent } from './components/fs-menu/bottom-sheet/bottom-items-list/bottom-items-list.component';
import { FsBottomSheetComponent } from './components/fs-menu/bottom-sheet/fs-bottom-sheet.component';
import { FsMenuComponent } from './components/fs-menu/fs-menu.component';
import { MenuItemsListComponent } from './components/fs-menu/menu-items-list/menu-items-list.component';
import { FsMenuDividerItemDirective } from './directives';
import { FsGroupMenuItemTemplateDirective } from './directives/group-menu-item-template/fs-group-menu-item-template.directive';
import { FsMenuFileItemDirective } from './directives/menu-file-item';
import { FsMenuItemDirective } from './directives/menu-item/fs-menu-item.directive';
import { FsMenuTriggerDirective } from './directives/menu-trigger/fs-menu-trigger.directive';


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
        FsMenuComponent,
        FsBottomSheetComponent,
        MenuItemsListComponent,
        BottomItemsListComponent,
        FsMenuItemDirective,
        FsMenuFileItemDirective,
        FsMenuTriggerDirective,
        FsGroupMenuItemTemplateDirective,
        FsMenuDividerItemDirective,
    ],
    exports: [
        FsMenuComponent,
        FsMenuItemDirective,
        FsMenuTriggerDirective,
        FsMenuFileItemDirective,
        FsGroupMenuItemTemplateDirective,
        FsMenuDividerItemDirective,
    ],
})
export class FsMenuModule {
  public static forRoot(): ModuleWithProviders<FsMenuModule> {
    return {
      ngModule: FsMenuModule,
    };
  }
}
