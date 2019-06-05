import { Component } from '@angular/core';


@Component({
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {

  constructor() {}

  public clicked(item) {
    console.log(item + ' has been clicked');
  }
}
