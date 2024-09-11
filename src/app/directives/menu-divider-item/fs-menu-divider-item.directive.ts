import {
  Directive,
  forwardRef,
} from '@angular/core';


import { MenuItemDirective } from '../menu-item/menu-item.directive';


@Directive({
  selector: '[fs-menu-divider-item]',
  providers: [
    {
      provide: MenuItemDirective,
      useExisting: forwardRef(() => FsMenuDividerItemDirective),
    },
  ],
})
export class FsMenuDividerItemDirective extends MenuItemDirective {

  public isDivider = true;
}

