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
            useExisting: forwardRef(() => FsMenuFileItemDirective),
        },
    ],
    standalone: true,
})
export class FsMenuFileItemDirective extends MenuItemDirective {

  @Input() public multiple = false;
  @Input() public accept;
  @Input() public minWidth;
  @Input() public minHeight;
  @Input() public imageWidth;
  @Input() public imageHeight;

  @Output() public select = new EventEmitter<FsFile>();
  @Output() public error = new EventEmitter<any>();

  public isFile = true;
  
}

