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
      <div class="fs-menu-title" *ngIf="data.titleTemplate">
        <ng-template [ngTemplateOutlet]="data.titleTemplate"></ng-template>
      </div>
      <div class="fs-menu-container" [ngClass]="{ 'with-title': !!data.titleTemplate }">
        <ng-template ngFor [ngForOf]="data.items" [ngForTrackBy]="trackBy" let-item>
          <a *ngIf="!item.elementRef.hidden"
             (click)="click($event, item)"
             [class]="'mat-menu-item ' + item.elementRef.cssClass"
             [ngClass]="item.elementRef.ngClass"
             [id]="item.elementRef.cssId"
          >
            <ng-template [ngTemplateOutlet]="item.templateRef"></ng-template>
          </a>
        </ng-template>
      </div>
    </mat-nav-list>
  `,
  styleUrls: ['./fs-bottom-sheet.component.scss']
})
export class FsBottomSheetComponent implements OnInit, OnDestroy {

  public destroy$ = new EventEmitter();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _cd: ChangeDetectorRef
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

    const subscription = this._bottomSheetRef.afterDismissed()
    .subscribe(() => {

      if (item && item.elementRef && item.elementRef.click) {
        item.elementRef.click(event)
      }
      subscription.unsubscribe();
    });

    if (item.dismissAfterClick) {
      this._bottomSheetRef.dismiss();
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
