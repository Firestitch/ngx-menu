import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FsFile } from '@firestitch/file';
import { DialogComponent } from '../dialog';


@Component({
  selector: 'simple',
  templateUrl: 'simple-menu.component.html',
})
export class SimpleMenuComponent {

  constructor(private _dialog: MatDialog) {}

  public clicked(item) {
    console.log(item + ' has been clicked');
  }

  public openDialog(e) {
    this._dialog.open(DialogComponent, {
    });
  }

  public fileSelect(fsFiles: FsFile[]) {
    debugger;
  }
}
