import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';

import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';


@Component({
  selector: 'fs-bottom-sheet',
  templateUrl: './fs-bottom-sheet.component.html',
  styleUrls: ['./fs-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsBottomSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this._cd.detectChanges();
  }
}
