import {
  Directive,
  Input,
  HostListener,
  Optional,
  Inject,
  Self,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem, MAT_MENU_SCROLL_STRATEGY } from '@angular/material';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { FsMenuComponent } from '../../components/fs-menu/fs-menu.component';


@Directive({
  selector: '[fsMenuTriggerFor]'
})
export class FsMenuTriggerDirective extends MatMenuTrigger implements AfterContentInit {

  @Input('fsMenuTriggerFor') fsMenu: FsMenuComponent;

  @HostListener('mousedown')
  @HostListener('keydown')
  @HostListener('click')
  public click(event) {
    if (this.fsMenu.opened) {
      this.fsMenu.closeMenu();
    } else {
      this.fsMenu.openMenu();
    }
  }

  constructor(
    _overlay: Overlay,
    _element: ElementRef<HTMLElement>,
    _viewContainerRef: ViewContainerRef,
    @Inject(MAT_MENU_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() _parentMenu: MatMenu,
    @Optional() @Self() _menuItemInstance: MatMenuItem,
    @Optional() _dir: Directionality,
    _focusMonitor?: FocusMonitor
  ) {
    super(
      _overlay,
      _element,
      _viewContainerRef,
      scrollStrategy,
      _parentMenu,
      _menuItemInstance,
      _dir,
      _focusMonitor
    );
  }

  public ngAfterContentInit() {
    this.menu = this.fsMenu.fsMenuRef;
    this.fsMenu.externalMatMenuTrigger = this;

    super.ngAfterContentInit();
  }

}
