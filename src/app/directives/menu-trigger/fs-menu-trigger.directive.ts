import { Directive, ElementRef, Input, OnInit, ViewContainerRef, inject } from '@angular/core';

import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY, MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import { FsMenuComponent } from '../../components/fs-menu/fs-menu.component';


@Directive({
    selector: '[fsMenuTriggerFor]',
    standalone: true,
})
export class FsMenuTriggerDirective extends MatMenuTrigger implements OnInit {

  @Input('fsMenuTriggerFor') public fsMenu: FsMenuComponent = null;

  constructor() {
    const _overlay = inject(Overlay);
    const _element = inject<ElementRef<HTMLElement>>(ElementRef);
    const _viewContainerRef = inject(ViewContainerRef);
    const scrollStrategy = inject(MAT_MENU_SCROLL_STRATEGY);
    const _parentMenu = inject(MatMenu, { optional: true });
    const _menuItemInstance = inject(MatMenuItem, { optional: true, self: true });
    const _dir = inject(Directionality, { optional: true });
    const _focusMonitor = inject(FocusMonitor);

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
