import { Component } from '@angular/core';


@Component({
  selector: 'groups',
  templateUrl: 'groups-menu.component.html',
})
export class GroupsMenuComponent {

  constructor() {}

  public clicked(item) {
    console.log(item + ' has been clicked');
  }
}
