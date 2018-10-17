import {
  EventEmitter,
  ChangeDetectorRef,
  Inject,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { concat } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'fs-bottom-sheet',
  template: `
    <mat-nav-list>
      <ng-template ngFor [ngForOf]="data.items" let-item>
        <a mat-list-item
           *ngIf="!item.elementRef.hidden"
           (click)="click($event, item)"
           [ngClass]="item.elementRef.cssClass"
           [id]="item.elementRef.cssId"
        >
          <ng-template [ngTemplateOutlet]="item.templateRef"></ng-template>
        </a>
      </ng-template>
    </mat-nav-list>
  `,
})
export class FsBottomSheetComponent implements OnInit, OnDestroy {

  public destroy$ = new EventEmitter();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _cd: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.subscribeToChanges();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Click on element
   * @param event
   * @param item
   */
  public click(event, item) {
    event.preventDefault();

    if (item && item.elementRef && item.elementRef.click) {
      item.elementRef.click(event)
    }

    this._bottomSheetRef.dismiss();
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
          console.log('hh?');
          this._cd.detectChanges();
        })

    }
  }


}
