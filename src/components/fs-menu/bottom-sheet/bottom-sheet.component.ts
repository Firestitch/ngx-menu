import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';


@Component({
  selector: 'fs-bottom-sheet',
  template: `
    <mat-nav-list>
      <ng-template ngFor [ngForOf]="data.items" let-item>
        <a mat-list-item (click)="click($event, item)">
          <ng-template [ngTemplateOutlet]="item.templateRef"></ng-template>
        </a>
      </ng-template>
    </mat-nav-list>
  `,
})
export class FsBottomSheetComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<any>
  ) {}


  public click(event, item) {
    event.preventDefault();

    if (item && item.elementRef && item.elementRef.click) {
      item.elementRef.click(event)
    }

    this.bottomSheetRef.dismiss();
  }

}
