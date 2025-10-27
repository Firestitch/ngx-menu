import { Component } from '@angular/core';
import { FsMenuTriggerDirective } from '../../../../src/app/directives/menu-trigger/fs-menu-trigger.directive';
import { FsMenuComponent } from '../../../../src/app/components/fs-menu/fs-menu.component';
import { FsMenuItemDirective } from '../../../../src/app/directives/menu-item/fs-menu-item.directive';


@Component({
    selector: 'remote',
    templateUrl: 'remote-menu.component.html',
    standalone: true,
    imports: [
        FsMenuTriggerDirective,
        FsMenuComponent,
        FsMenuItemDirective,
    ],
})
export class RemoteMenuComponent {

  constructor() {}

  public clicked(item) {
    console.log(item + ' has been clicked');
  }
}
