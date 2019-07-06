import { Component, Input } from '@angular/core';

@Component({
  selector: 'fs-menu-items-list',
  templateUrl: './menu-items-list.component.html',
})
export class MenuItemsListComponent {

  @Input()
  public items;

  /**
   * For improve ngFor perf
   * @param index
   */
  public trackBy(index) {
    return index;
  }
}
