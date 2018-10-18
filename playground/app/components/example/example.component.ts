import { Component } from '@angular/core';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html',
})
export class ExampleComponent {

  public show = true;

  constructor() {
    setTimeout(() => {
      this.show = false;
      console.log('fire');
    }, 10000)
  }

  public clicked(item) {
    console.log(item + ' has been clicked');
  }
}
