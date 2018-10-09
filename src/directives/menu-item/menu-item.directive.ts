import { Directive, EventEmitter, Output } from '@angular/core';


@Directive({
  selector: '[fs-menu-item]'
})
export class MenuItemDirective {
  @Output('click') public click$ = new EventEmitter();

  public click(event) {
    this.click$.next(event);
  }
}
