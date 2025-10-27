import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FsMenuItemDirective } from '../../../../directives/menu-item/fs-menu-item.directive';
import { createItemsObserver } from '../../../../helpers/create-items-observer';
import { RouterLink } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FsFileModule } from '@firestitch/file';

@Component({
    selector: 'fs-bottom-items-list',
    templateUrl: './bottom-items-list.component.html',
    styleUrls: ['./bottom-items-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterLink,
        NgClass,
        NgTemplateOutlet,
        FsFileModule,
    ],
})
export class BottomItemsListComponent implements OnInit, OnChanges {

  @Input()
  public items: FsMenuItemDirective[];

  @Input()
  public parentVisible: boolean;

  private _destroy$ = new Subject();

  constructor(
    private _bottomSheetRef: MatBottomSheetRef,
    private _cdRef: ChangeDetectorRef,
  ) {
    //this._cdRef.detach();
  }

  public ngOnInit() {
    this._cdRef.detectChanges();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.items
        .forEach((item) => item.generateTooltip());

      this._destroy$.next(null);
      this.subscribeToChanges();
    }
  }

  /**
   * For improve ngFor perf
   * @param index
   */
  public trackBy(index) {
    return index;
  }

  /**
   * Click on element
   * @param event
   * @param item
   */
  public click(event: MouseEvent, item) {   
    if (item.select || item.disabled) {
      event.stopPropagation();

      return;
    }

    event.preventDefault();

    const subscription = this._bottomSheetRef.afterDismissed()
      .pipe(
        take(1),
      )
      .subscribe(() => {
        if (item?.click) {
          item.click(event);
        }

        subscription.unsubscribe();
      });

    if (item?.dismissAfterClick) {
      this._bottomSheetRef.dismiss();
    }
  }

  /**
   * Subscribe to changes in directive parameters.
   * For example we must start detect changes if [hidden] param was changed
   */
  private subscribeToChanges() {
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
