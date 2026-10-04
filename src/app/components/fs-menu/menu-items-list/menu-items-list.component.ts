import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, OnChanges, OnDestroy, Output, QueryList, SimpleChanges, ViewChildren, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import {
  FsMenuDividerItemDirective, FsMenuFileItemDirective, FsMenuItemDirective,
} from '../../../directives';
import { createItemsObserver } from '../../../helpers/create-items-observer';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FsFileComponent, FsFileModule } from '@firestitch/file';


@Component({
    selector: 'fs-menu-items-list',
    templateUrl: './menu-items-list.component.html',
    styleUrls: ['./menu-items-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatDivider,
        MatTooltip,
        MatMenuItem,
        RouterLink,
        NgClass,
        NgTemplateOutlet,
        FsFileModule,
    ],
})
export class MenuItemsListComponent implements OnChanges, AfterViewInit, OnDestroy {
  private _cdRef = inject(ChangeDetectorRef);


  @Input()
  public items: (FsMenuItemDirective | FsMenuFileItemDirective | FsMenuDividerItemDirective)[];

  @Input()
  public parentVisible: boolean;

  @Output()
  public clicked = new EventEmitter<void>();

  // A QueryList rather than a signal query: its changes arrive within the render that added or
  // removed an entry, so the menu knows its entries before it focuses the first one
  @ViewChildren(MatMenuItem)
  public menuItems: QueryList<MatMenuItem>;

  private _destroy$ = new Subject();
  private _menu = inject(MatMenu);
  private _destroyRef = inject(DestroyRef);
  private _registeredMenuItems: MatMenuItem[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.items
        .forEach((item) => item.generateTooltip());

      this._cdRef.detectChanges();
      this._destroy$.next(null);

      this._subscribeToChanges();
    }
  }

  public ngAfterViewInit(): void {
    this._registerMenuItems(this.menuItems.toArray());
    this.menuItems.changes
      .pipe(
        tap((menuItems: QueryList<MatMenuItem>) => this._registerMenuItems(menuItems.toArray())),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  public ngOnDestroy() {
    this._registerMenuItems([]);
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  /**
   * For improve ngFor perf
   * @param index
   */
  public trackBy(index) {
    return index;
  }


  public fileSelected(item, event): void {
    item.select.emit(event);
    this.clicked.emit();
  }

  // A mouse click on a file entry lands on fs-file, which opens the file picker and leaves the menu
  // open until a file is picked or the picker is canceled. Enter and Space click the entry itself,
  // so hand that click to fs-file, and keep it from reaching the menu, which would close.
  public openFilePicker(file: FsFileComponent, event: MouseEvent): void {
    event.stopPropagation();
    file.fileContainer.nativeElement.click();
  }

  /**
   * Subscribe to changes in directive parameters.
   * For example we must start detect changes if [hidden] param was changed
   */
  private _subscribeToChanges() {
    if (this.items && this.items.length) {
      createItemsObserver(this.items)
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this._cdRef.detectChanges();
        });
    }
  }

  // The mat-menu only looks for entries in its own content, and fs-menu draws them here, so its
  // key manager had nothing to move the focus between. Hand this list's entries to the menu, in
  // page order next to those of the other lists (each group draws a list of its own).
  private _registerMenuItems(menuItems: MatMenuItem[]): void {
    const menuEntries = this._menu._directDescendantItems;
    const otherEntries = menuEntries
      .filter((menuItem) => !this._registeredMenuItems.includes(menuItem));

    this._registeredMenuItems = menuItems;
    menuEntries.reset([...otherEntries, ...menuItems].sort(byPageOrder));
    menuEntries.notifyOnChanges();
  }
}

function byPageOrder(a: MatMenuItem, b: MatMenuItem): number {
  const position = a._getHostElement().compareDocumentPosition(b._getHostElement());

  return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
