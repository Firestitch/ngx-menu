import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FsFile } from '@firestitch/file';

import { DialogComponent } from '../dialog';
import { FsMenuComponent } from '../../../../src/app/components/fs-menu/fs-menu.component';
import { FsMenuItemDirective } from '../../../../src/app/directives/menu-item/fs-menu-item.directive';
import { MatIcon } from '@angular/material/icon';
import { FsMenuDividerItemDirective } from '../../../../src/app/directives/menu-divider-item/fs-menu-divider-item.directive';
import { FsMenuFileItemDirective } from '../../../../src/app/directives/menu-file-item/fs-menu-file-item.directive';


@Component({
    selector: 'simple',
    templateUrl: './simple-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsMenuComponent,
        FsMenuItemDirective,
        MatIcon,
        FsMenuDividerItemDirective,
        FsMenuFileItemDirective,
    ],
})
export class SimpleMenuComponent {

  public toggle = false;

  constructor(private _dialog: MatDialog) {}

  public clicked(item) {
    console.log(`${item  } has been clicked`);
  }

  public openDialog(e) {
    this._dialog.open(DialogComponent, {
    });
  }

  public fileSelect(fsFiles: FsFile) {
    console.log(fsFiles);
  }

  public toggleToggle() {
    this.toggle = !this.toggle;
  }

  public isShowToggle = () => {
    return this.toggle;
  };

  public isHideToggle = () => {
    return !this.toggle;
  };
}
