import { Directive, ElementRef, Input, OnInit, ViewContainerRef, inject } from '@angular/core';

import { FocusMonitor, FocusOrigin, InteractivityChecker } from '@angular/cdk/a11y';
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

  private _hostElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private _hostFocusMonitor = inject(FocusMonitor);
  private _interactivityChecker = inject(InteractivityChecker);

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

  // Keys keep MatMenuTrigger's own handling: Enter and Space press the trigger, and the click
  // that follows opens the menu with its first entry focused. Every other key, Tab and the
  // arrows included, leaves the menu alone.

  /** Handles click events on the trigger. */
  public _handleClick(event: MouseEvent): void {
    this._triggerClick();
  }

  // The menu gives the focus back to its trigger when it closes. A trigger can be a component
  // whose own button takes the focus, so the focus goes to that button rather than being dropped.
  public override focus(origin?: FocusOrigin, options?: FocusOptions): void {
    const innerFocusable = this._innerFocusable();
    if (!innerFocusable) {
      super.focus(origin, options);
    } else if (origin) {
      this._hostFocusMonitor.focusVia(innerFocusable, origin, options);
    } else {
      innerFocusable.focus(options);
    }
  }

  // The first element inside the trigger that can take the focus, when the trigger itself cannot
  private _innerFocusable(): HTMLElement | undefined {
    if (this._interactivityChecker.isFocusable(this._hostElement)) {
      return undefined;
    }

    return Array.from(this._hostElement.querySelectorAll<HTMLElement>('*'))
      .find((element) => this._interactivityChecker.isFocusable(element));
  }

  private _triggerClick() {
    if (this.fsMenu.menuOpened) {
      this.fsMenu.closeMenu();
    } else {
      // Several triggers can share one fs-menu, so open it from the one that was pressed: the
      // menu then sits under that trigger and the focus goes back to it when the menu closes
      this.fsMenu.externalMatMenuTrigger = this;
      this.fsMenu.openMenu();
    }
  }
}
