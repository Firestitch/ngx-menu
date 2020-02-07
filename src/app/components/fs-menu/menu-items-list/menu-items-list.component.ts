import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'fs-menu-items-list',
  templateUrl: './menu-items-list.component.html',
  styleUrls: [ './menu-items-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemsListComponent implements OnChanges {

  @Input()
  public items;

  constructor(private _cdRef: ChangeDetectorRef) {
    this._cdRef.detach();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._cdRef.detectChanges();
  }

  /**
   * For improve ngFor perf
   * @param index
   */
  public trackBy(index) {
    return index;
  }
}
