import {
  Directive,
  forwardRef,
} from '@angular/core';


import { MenuItemDirective } from './menu-item.directive';


@Directive({
  selector: 'fs-menu-group,[fs-menu-item]',
  providers: [
    {
      provide:MenuItemDirective,
      useExisting: forwardRef(() => FsMenuItemDirective),
    },
  ],
})
export class FsMenuItemDirective extends MenuItemDirective {

}
