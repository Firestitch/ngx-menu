import { Component, Input } from '@angular/core';

@Component({
  selector: 'fs-menu-group-items-list',
  templateUrl: './menu-group-items-list.component.html',
  styleUrls: [
    './menu-group-items-list.component.scss',
  ]
})
export class MenuGroupItemsListComponent {

  @Input()
  public groups;

}
