import { Component } from '@angular/core';


@Component({
  selector: 'groups',
  templateUrl: 'groups-menu.component.html',
})
export class GroupsMenuComponent {

  constructor() {}

  public clicked(): void {
    console.log('Item has been clicked');
  }

  public disabledTooltip = (): string => {
    return 'The item is disabled';
  }
}
