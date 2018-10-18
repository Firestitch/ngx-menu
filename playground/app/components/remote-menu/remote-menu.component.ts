import { Component } from '@angular/core';


@Component({
  selector: 'remote',
  templateUrl: 'remote-menu.component.html',
})
export class RemoteMenuComponent {

  constructor() {}

  public clicked(item) {
    console.log(item + ' has been clicked');
  }
}
