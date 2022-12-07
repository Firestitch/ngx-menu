import { Component } from '@angular/core';


@Component({
  selector: 'groups',
  templateUrl: 'groups-menu.component.html',
})
export class GroupsMenuComponent {

  constructor() {}

  public clicked() {
    console.log('Item has been clicked');
  }

  public disabledToolip = (): string => {
    return 'The item is disabled';
  }
}
