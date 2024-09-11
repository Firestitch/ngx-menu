import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Optional,
  Self,
  ViewContainerRef,
} from '@angular/core';

import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY, MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import { FsMenuComponent } from '../../components/fs-menu/fs-menu.component';


@Directive({
  selector: '[fsMenuTriggerFor]',
})
export class FsMenuTriggerDirective extends MatMenuTrigger implements OnInit {

  @Input('fsMenuTriggerFor') public fsMenu: FsMenuComponent = null;

  constructor(
    _overlay: Overlay,
    _element: ElementRef<HTMLElement>,
    _viewContainerRef: ViewContainerRef,
    @Inject(MAT_MENU_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() _parentMenu: MatMenu,
    @Optional() @Self() _menuItemInstance: MatMenuItem,
    @Optional() _dir: Directionality,
    _focusMonitor?: FocusMonitor,
  ) {
    super(
      _overlay,
      _element,
      _viewContainerRef,
      scrollStrategy,
      _parentMenu,
      _menuItemInstance,
      _dir,
      _focusMonitor,
    );
  }

  public ngOnInit(): void {
    this.menu = this.fsMenu.fsMenuRef;
    this.fsMenu.externalMatMenuTrigger = this;
  }

  public _handleKeydown(event: KeyboardEvent): void {
    this._triggerClick();
  }

  /** Handles click events on the trigger. */
  public _handleClick(event: MouseEvent): void {
    this._triggerClick();
  }

  private _triggerClick() {
    if (this.fsMenu.menuOpened) {
      this.fsMenu.closeMenu();
    } else {
      this.fsMenu.openMenu();
    }
  }
}
