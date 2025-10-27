import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { MenuItemDirective } from '../../directives/menu-item/menu-item.directive';

import { FsBottomSheetComponent } from './bottom-sheet/fs-bottom-sheet.component';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MenuItemsListComponent } from './menu-items-list/menu-items-list.component';


@Component({
    selector: 'fs-menu',
    templateUrl: './fs-menu.component.html',
    styleUrls: ['./fs-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatIconButton,
        NgClass,
        MatMenuTrigger,
        MatIcon,
        MatMiniFabButton,
        MatMenu,
        MenuItemsListComponent,
    ],
})
export class FsMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  private _bottomSheet = inject(MatBottomSheet);
  private _breakpointObserver = inject(BreakpointObserver);
  private _cdRef = inject(ChangeDetectorRef);


  public static MobileBreakpoint = '(max-width: 599px)';
  
  @Input('class') public klass = null;
  @Input() public buttonClass = '';
  @Input() public buttonType: 'icon' | 'miniFab' = 'icon';
  @Input() public buttonColor = 'primary';

  @Output()
  public opened = new EventEmitter<PointerEvent>();

  @Output()
  public closed = new EventEmitter<void>();

  // Items with TemplateRefs and DirectiveRef for passing to bottomSheet
  public items: MenuItemDirective[] = [];

  public useInternalTrigger = false;
  public mobile = false;
  public menuOpened = false;
  public initialized = false;

  @ContentChildren(MenuItemDirective)
  public set itemsElements(value) {
    this.items = value.toArray();
  }

  // Catch trigger for matMenu
  @ViewChild(MatMenuTrigger)
  public set internalMatMenuTrigger(val) {
    if (val) {
      this.useInternalTrigger = true;
    }

    this._internalMatMenuTrigger = val;
  }

  public set externalMatMenuTrigger(val) {
    this.useInternalTrigger = false;
    this._externalMatMenuTrigger = val;
    this._cdRef.detectChanges();
  }

  @ViewChild('fsMenu', { static: true })
  public fsMenuRef: MatMenu;

  private _internalMatMenuTrigger;
  private _externalMatMenuTrigger;

  private _resolutionChanged = false;

  // Active bottom sheet that was opened
  private _activeSheetRef: MatBottomSheetRef = null;

  private _destroy$ = new Subject();

  public set resolutionChanged(val) {
    this._resolutionChanged = val;
  }

  public get resolutionChanged() {
    return this._resolutionChanged;
  }

  public get matMenuTrigger() {
    if (this.useInternalTrigger) {
      return this._internalMatMenuTrigger;
    }
 
    return this._externalMatMenuTrigger;
    
  }

  public ngOnInit() {
    this.subscribeToResChanges();
    this.initialized = true;
    this._cdRef.detectChanges();
  }

  public ngAfterViewInit(): void {
    if (!this._externalMatMenuTrigger) {
      this.useInternalTrigger = true;
      this._cdRef.detectChanges();
    }
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  /**
   * Subscribe to window resolution changes
   * and switch between mobile and desktop
   */
  public subscribeToResChanges() {
    const layoutChanges = this._breakpointObserver.observe([
      FsMenuComponent.MobileBreakpoint,
    ]);

    layoutChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy$),
      )
      .subscribe((result) => {
        // Set mobile/desktop flag
        this.mobile = result.breakpoints[FsMenuComponent.MobileBreakpoint];

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
                this._cdRef.detectChanges();
              }
            });
          }

          // Detect changes because for strategies like OnPush if won't detected by default
          this._cdRef.detectChanges();
        } else {
          // Detect changes because for strategies like OnPush if won't detected by default
          this._cdRef.detectChanges();
        }
      });
  }

  /**
   * Open fs menu depends from mode
   */
  public openMenu($event?) {    
    this._updateHidden(this.items);
    this._cdRef.detectChanges();

    if (this.mobile) {
      this.openSheetMenu();
    } else {
      this.openMatMenu();
    }

    this.opened.emit($event);

    this._cdRef.detectChanges();
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
    // Give time for the fade out effect to finish before hiding items
    setTimeout(() => {
      if (!this.resolutionChanged) {
        this.menuOpened = false;
      }
  
      this.resolutionChanged = false;
      this._cdRef.detectChanges();
    }, 100); 

    this.closed.emit();
  }

  /**
   * Open Mat Bottom Sheet
   */
  public openSheetMenu() {
    this._activeSheetRef = this._bottomSheet.open(FsBottomSheetComponent, {
      data: { items: this.items, klass: this.klass },
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
      });
  }

  /**
   * Close Mat Bottom Sheet
   */
  public closeSheetMenu() {
    if (this._activeSheetRef) {
      this._activeSheetRef.dismiss();
    }
  }
  
  private _updateHidden(items: MenuItemDirective[]) {
    items.forEach((item) => {
      this._updateHidden(item.childrenItems || []);
          
      if(item.show) {
        item.hidden = !item.show();
      }
    });
  }
}
