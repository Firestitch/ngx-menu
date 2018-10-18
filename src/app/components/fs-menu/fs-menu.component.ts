import {
  TemplateRef,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ViewChild,
  OnInit,
} from '@angular/core';

import { MatBottomSheet, MatMenu, MatMenuTrigger } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet/typings/bottom-sheet-ref';
import { BreakpointObserver } from '@angular/cdk/layout';

import { debounceTime } from 'rxjs/operators';

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

  public useInternalTrigger = true;
  public mobile = false;
  public opened = false;
  set resolutionChanged(val) {
    this._resolutionChanged = val;
  }
  get resolutionChanged() {
    return this._resolutionChanged;
  }
  public _resolutionChanged = false;
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
  set internalMatMenuTrigger(val) {
    if (val) {
      this.useInternalTrigger = true;
    }

    this._internalMatMenuTrigger = val;
  };

  set externalMatMenuTrigger(val) {
    this.useInternalTrigger = false;
    this._externalMatMenuTrigger = val;
  }

  @ViewChild('fsMenu')
  public fsMenuRef: MatMenu;

  private _internalMatMenuTrigger;
  private _externalMatMenuTrigger;
  private _itemsTemplates;
  private _itemsElements;

  // Active bottom sheet that was opened
  private _activeSheetRef: MatBottomSheetRef = null;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _breakpointObserver: BreakpointObserver,
    private _cd: ChangeDetectorRef,
  ) {}

  get matMenuTrigger() {
    if (this.useInternalTrigger) {
      return this._internalMatMenuTrigger;
    } else {
      return this._externalMatMenuTrigger;
    }
  }

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
      .pipe(
        debounceTime(500)
      )
      .subscribe(result => {
        // Set mobile/desktop flag
        this.mobile = result.breakpoints[FsMenuComponent.MOBILE_BREAKPOINT];

        if (this.opened) {

          // Flag that menus was closed not by user
          this.resolutionChanged = true;

          // Detect changes because for strategies like OnPush if won't detected by default
          this._cd.detectChanges();

          if (this.mobile) {
            this.closeMatMenu();
            this.openSheetMenu();
          } else {
            this.closeSheetMenu();

            // Must be here because we should wait till menuTrigger will be catched by @ViewChild
            setTimeout(() => {
              if (this.matMenuTrigger) {
                this.matMenuTrigger.openMenu();
              }
            });
          }
        } else {
          // Detect changes because for strategies like OnPush if won't detected by default
          this._cd.detectChanges();
        }
      });
  }

  /**
   * Open fs menu depends from mode
   */
  public openMenu() {
    if (this.mobile) {
      this.openSheetMenu();
    } else {
      this.openMatMenu();
    }

    this._cd.detectChanges();
  }

  /**
   * Close fs menu depends from mode
   */
  public closeMenu() {
    if (this.mobile) {
      this.closeSheetMenu();
    } else {
      this.closeMatMenu();
    }
  }

  /**
   * Open Mat Menu
   */
  public openMatMenu() {
    this.opened = true;
    this.resolutionChanged = false;

    this.matMenuTrigger.openMenu();
  }

  /**
   * Close Mat Menu
   */
  public closeMatMenu() {
    if (this.matMenuTrigger) {
      this.matMenuTrigger.closeMenu();
    }
  }

  /**
   * After menu close event
   */
  public closedMatMenu() {
    if (!this.resolutionChanged) {
      this.opened = false;
    }

    this.resolutionChanged = false;
  }

  /**
   * Open Mat Bottom Sheet
   */
  public openSheetMenu() {
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
  public closeSheetMenu() {
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
