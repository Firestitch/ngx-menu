import {
  Directive, EventEmitter, forwardRef, Input, Output,
} from '@angular/core';

import { FsFile } from '@firestitch/file';

import { MenuItemDirective } from '../menu-item/menu-item.directive';


@Directive({
  selector: '[fs-menu-file-item]',
  providers: [
    {
      provide: MenuItemDirective,
      useExisting: forwardRef(() => FsMenuFileItemDirective)
    },
  ]
})
export class FsMenuFileItemDirective extends MenuItemDirective {

  @Input() public multiple = false;

  @Output() public select = new EventEmitter<FsFile>();

}

