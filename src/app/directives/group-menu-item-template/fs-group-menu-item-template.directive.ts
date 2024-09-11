import {
  ContentChildren,
  Directive,
  TemplateRef,
} from '@angular/core';


@Directive({
  selector: '[fs-group-menu-item-template]',
})
export class FsGroupMenuItemTemplateDirective {

  @ContentChildren(FsGroupMenuItemTemplateDirective)
  public groupMenuItemTemplateRef: TemplateRef<FsGroupMenuItemTemplateDirective>;
}
