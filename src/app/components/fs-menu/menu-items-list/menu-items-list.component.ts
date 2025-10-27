import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, inject } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  FsMenuDividerItemDirective, FsMenuFileItemDirective, FsMenuItemDirective,
} from '../../../directives';
import { createItemsObserver } from '../../../helpers/create-items-observer';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenuItem } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FsFileModule } from '@firestitch/file';


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
export class MenuItemsListComponent implements OnChanges, OnDestroy {
  private _cdRef = inject(ChangeDetectorRef);


  @Input()
  public items: (FsMenuItemDirective | FsMenuFileItemDirective | FsMenuDividerItemDirective)[];

  @Input()
  public parentVisible: boolean;

  @Output()
  public clicked = new EventEmitter<void>();

  private _destroy$ = new Subject();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.items
        .forEach((item) => item.generateTooltip());

      this._cdRef.detectChanges();
      this._destroy$.next(null);

      this._subscribeToChanges();
    }
  }

  public ngOnDestroy() {
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
}
