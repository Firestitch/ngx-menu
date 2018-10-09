import { Component } from '@angular/core';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  public clicked(item) {
    console.log(item + ' has been clicked');
  }
}
