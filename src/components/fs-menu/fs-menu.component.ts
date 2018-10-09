import {
  TemplateRef,
  Component,
  ContentChildren,
  ViewChild, OnInit,
} from '@angular/core';
import { MatBottomSheet, MatMenuTrigger } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet/typings/bottom-sheet-ref';
import { BreakpointObserver } from '@angular/cdk/layout';

import { FsBottomSheetComponent } from './bottom-sheet';
import { MenuItemDirective } from '../../directives/menu-item/menu-item.directive';


@Component({
  selector: 'fs-menu',
  templateUrl: 'fs-menu.component.html',
  styleUrls: [ 'fs-menu.component.scss' ],
})
export class FsMenuComponent implements OnInit {

  public static MOBILE_BREAKPOINT = '(max-width: 599px)';

  // Items with TemplateRefs and DirectiveRef for passing to bottomSheet
  public items = [];

  public mobile = false;
  public opened = false;
  public resolutionChanged = false;
  public initialized = false;

  @ContentChildren(MenuItemDirective, { read: TemplateRef })
  set itemsTemplates(value) {
    this._itemsTemplates = value.toArray();
    this.updateItems();
  }

  @ContentChildren(MenuItemDirective)
  set itemsElements(value) {
    this._itemsElements = value.toArray();
    this.updateItems();
  }

  // Catch trigger for matMenu
  @ViewChild(MatMenuTrigger)
  public menuTrigger;

  private _itemsTemplates;
  private _itemsElements;

  // Active bottom sheet that was opened
  private _activeSheetRef: MatBottomSheetRef = null;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _breakpointObserver: BreakpointObserver
  ) {}

  public ngOnInit() {
    this.subscribeToResChanges();
    this.initialized = true;
  }

  /**
   * Subscribe to window resolution changes
   * and switch between mobile and desktop
   */
  public subscribeToResChanges() {
    const layoutChanges = this._breakpointObserver.observe([
      FsMenuComponent.MOBILE_BREAKPOINT,
    ]);

    layoutChanges
      .subscribe(result => {
        // Set mobile/desktop flag
        this.mobile = result.breakpoints[FsMenuComponent.MOBILE_BREAKPOINT];

        if (this.opened) {
          // Flag that menus was closed not by user
          this.resolutionChanged = true;

          if (this.mobile) {
            this.openSheet();
          } else {
            this.closeSheet();

            // Must be here because we should wait till menuTrigger will be catched by @ViewChild
            setTimeout(() => {
              this.menuTrigger.openMenu();
            });
          }
        }
      });
  }

  /**
   * Open Mat Menu
   * @param menu { MatMenuTrigger }
   */
  public openMenu(menu: MatMenuTrigger) {
    this.opened = true;
    this.resolutionChanged = false;

    menu.openMenu();
  }

  /**
   * Close Mat Menu
   */
  public closeMenu() {
    if (!this.resolutionChanged) {
      this.opened = false;
    }

    this.resolutionChanged = false;
  }

  /**
   * Open Mat Bottom Sheet
   */
  public openSheet() {
    this._activeSheetRef = this._bottomSheet.open(FsBottomSheetComponent, {
      data: { items: this.items, }
    });

    this.opened = true;

    this._activeSheetRef.afterDismissed().subscribe(() => {
      if (!this.resolutionChanged) {
        this.opened = false;
      }

      this.resolutionChanged = false;
    })
  }

  /**
   * Close Mat Bottom Sheet
   */
  public closeSheet() {
    if (this._activeSheetRef) {
      this._activeSheetRef.dismiss();
    }
  }

  /**
   * Update items for collect templateRefs and elementRefs
   */
  private updateItems() {
    if (!this._itemsTemplates || !this._itemsElements) { return; }

    this.items = this._itemsTemplates.reduce((acc, item, index) => {

      acc.push({
        templateRef: this._itemsTemplates[index],
        elementRef: this._itemsElements[index]
      });

      return acc;
    }, []);
  }
}
