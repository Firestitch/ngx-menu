import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { concat } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fs-bottom-sheet',
  templateUrl: './fs-bottom-sheet.component.html',
  styleUrls: ['./fs-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsBottomSheetComponent implements OnInit, OnDestroy {

  public destroy$ = new EventEmitter();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _cd: ChangeDetectorRef
  ) {
    this._cd.detach();
  }

  public ngOnInit() {
    this.subscribeToChanges();

    this._cd.detectChanges();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

    if (this.data.items && this.data.items.length > 0) {
      const itemsObservables = this.data.items.reduce((acc, item) => {

        if (item.elementRef && item.elementRef.hiddenChange$) {
          acc.push(item.elementRef.hiddenChange$);
        }

        return acc;
      }, []);

      concat(...itemsObservables)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this._cd.detectChanges();
        })

    }
  }


}
