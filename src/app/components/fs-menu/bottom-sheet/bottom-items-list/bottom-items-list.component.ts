import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'fs-bottom-items-list',
  templateUrl: './bottom-items-list.component.html',
  styleUrls: [ './bottom-items-list.component.scss' ],
})
export class BottomItemsListComponent {

  @Input()
  public items;

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>) {}

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
  public click(event, item) {
    event.preventDefault();

    const subscription = this._bottomSheetRef.afterDismissed()
      .pipe(
        take(1),
      )
      .subscribe(() => {

        if (item && item.elementRef && item.elementRef.click) {
          item.elementRef.click(event)
        }

        subscription.unsubscribe();
      });

    if (item && item.elementRef && item.elementRef.dismissAfterClick) {
      this._bottomSheetRef.dismiss();
    }
  }

}
