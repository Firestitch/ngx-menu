import { Component } from '@angular/core';


@Component({
  selector: 'simple',
  templateUrl: 'simple-menu.component.html',
})
export class SimpleMenuComponent {

  constructor() {}

  public clicked(item) {
    console.log(item + ' has been clicked');
  }
}
