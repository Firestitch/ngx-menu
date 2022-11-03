import {
  EventEmitter,
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ContentChildren,
  TemplateRef,
  SimpleChanges,
  Optional,
  SkipSelf,
  ContentChild,
  forwardRef,
} from '@angular/core';

import { Subject } from 'rxjs';

import { MenuItemDirective } from './menu-item.directive';


@Directive({
  selector: 'fs-menu-group,[fs-menu-item]',
  providers: [
    {
      provide:MenuItemDirective,
      useExisting: forwardRef(() => FsMenuItemDirective)
    },
  ]
})
export class FsMenuItemDirective extends MenuItemDirective {

}