import {
  Directive,
  Input,
  ContentChildren,
  TemplateRef,
} from '@angular/core';
import { FsMenuItemDirective } from '../menu-item/fs-menu-item.directive';


@Directive({
  selector: 'fs-menu-group'
})
export class FsMenuGroupDirective {

  @Input() public label;
  @Input() public hidden = false;

  public items = [];

  public itemsTemplates;
  public itemsElements;

  @ContentChildren(FsMenuItemDirective, { read: TemplateRef })
  set templates(value) {
    this.itemsTemplates = value.toArray();
    this.updateItems();
  }

  @ContentChildren(FsMenuItemDirective)
  set elements(value) {
    this.itemsElements = value.toArray();
    this.updateItems();
  }

  constructor() {}

  private updateItems() {
    if (!this.itemsTemplates || !this.itemsElements) { return; }

    this.items = this.itemsTemplates.reduce((acc, item, index) => {

      acc.push({
        templateRef: this.itemsTemplates[index],
        elementRef: this.itemsElements[index]
      });

      return acc;
    }, []);
  }
}
