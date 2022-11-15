import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { BreakpointObserver } from '@angular/cdk/layout';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { FsBottomSheetComponent } from './bottom-sheet/fs-bottom-sheet.component';

import { MenuItemDirective } from '../../directives/menu-item';


@Component({
  selector: 'fs-menu',
  templateUrl: 'fs-menu.component.html',
  styleUrls: [ 'fs-menu.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('class') public klass = null;
  @Input('buttonClass') public buttonClass = '';

  @Output()
  public opened = new EventEmitter<void>();

  @Output()
  public closed = new EventEmitter<void>();

  public static MOBILE_BREAKPOINT = '(max-width: 599px)';

  // Items with TemplateRefs and DirectiveRef for passing to bottomSheet
  public items: MenuItemDirective[] = [];

  public useInternalTrigger = false;
  public mobile = false;
  public menuOpened = false;
  public initialized = false;

  @ContentChildren(MenuItemDirective)
  set itemsElements(value) {
    this.items = value.toArray();
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

    this._cd.detectChanges();
  }

  @ViewChild('fsMenu', { static: true })
  public fsMenuRef: MatMenu;

  private _internalMatMenuTrigger;
  private _externalMatMenuTrigger;

  private _resolutionChanged = false;

  // Active bottom sheet that was opened
  private _activeSheetRef: MatBottomSheetRef = null;

  private _destroy$ = new Subject();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _breakpointObserver: BreakpointObserver,
    private _cd: ChangeDetectorRef,
  ) {
    this._cd.detach();
  }

  set resolutionChanged(val) {
    this._resolutionChanged = val;
  }

  get resolutionChanged() {
    return this._resolutionChanged;
  }

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

    this._cd.detectChanges();
  }

  public ngAfterViewInit(): void {
    if (!this._externalMatMenuTrigger) {
      this.useInternalTrigger = true;
      this._cd.detectChanges();
    }
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
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
        debounceTime(500),
        takeUntil(this._destroy$),
      )
      .subscribe(result => {
        // Set mobile/desktop flag
        this.mobile = result.breakpoints[FsMenuComponent.MOBILE_BREAKPOINT];

        if (this.menuOpened) {

          // Flag that menus was closed not by user
          this.resolutionChanged = true;

          if (this.mobile) {
            this.closeMatMenu();
            this.openSheetMenu();
          } else {
            this.closeSheetMenu();

            // Must be here because we should wait till menuTrigger will be catched by @ViewChild
            setTimeout(() => {
              if (this.matMenuTrigger) {
                this.matMenuTrigger.openMenu();

                // Detect changes because for strategies like OnPush if won't detected by default
                this._cd.detectChanges();
              }
            });
          }

          // Detect changes because for strategies like OnPush if won't detected by default
          this._cd.detectChanges();
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

    this.opened.emit();

    this._cd.detectChanges();
  }

  /**
   * Close fs menu depends from mode
   */
  public closeMenu(): void {
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
    this.menuOpened = true;
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
      this.menuOpened = false;
    }

    this.resolutionChanged = false;

    this.closed.emit();
  }

  /**
   * Open Mat Bottom Sheet
   */
  public openSheetMenu() {
    this._activeSheetRef = this._bottomSheet.open(FsBottomSheetComponent, {
      data: { items: this.items, klass: this.klass }
    });

    this.menuOpened = true;

    this._activeSheetRef.afterDismissed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        if (!this.resolutionChanged) {
          this.menuOpened = false;
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
}
