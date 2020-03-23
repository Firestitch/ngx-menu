import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { createItemsObserver } from '../../../helpers/create-items-observer';


@Component({
  selector: 'fs-bottom-sheet',
  templateUrl: './fs-bottom-sheet.component.html',
  styleUrls: ['./fs-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsBottomSheetComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _cd: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.subscribeToChanges();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * For improve ngFor perf
   * @param index
   */
  public trackBy(index) {
    return index;
  }

  /**
   * Subscribe to changes in directive parameters.
   * For example we must start detect changes if [hidden] param was changed
   */
  private subscribeToChanges() {
    if (this.data.items && this.data.items.length) {
      createItemsObserver(this.data.items)
        .pipe(
          takeUntil(this._destroy$)
        )
        .subscribe(() => {
          this._cd.detectChanges();
        });
    }
  }
}
