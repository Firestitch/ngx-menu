import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { createItemsObserver } from '../../../helpers/create-items-observer';
import { FsMenuFileItemDirective, FsMenuItemDirective } from '../../../directives';
import { isFileItemDirective } from '../../../helpers/is-file-item-directive';


@Component({
  selector: 'fs-menu-items-list',
  templateUrl: './menu-items-list.component.html',
  styleUrls: [ './menu-items-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemsListComponent implements OnChanges, OnDestroy {

  @Input()
  public items: Array<FsMenuItemDirective | FsMenuFileItemDirective>;

  @Input()
  public parentVisible: boolean;

  private _destroy$ = new Subject();

  constructor(private _cdRef: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.items
        .forEach((item) => item.generateTooltip());

      this._cdRef.detectChanges();
      this._destroy$.next();

      this.subscribeToChanges();
    }
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

  public isFileItemDirective = isFileItemDirective;

  /**
   * Subscribe to changes in directive parameters.
   * For example we must start detect changes if [hidden] param was changed
   */
  private subscribeToChanges() {
    if (this.items && this.items.length) {
      createItemsObserver(this.items)
        .pipe(
          takeUntil(this._destroy$)
        )
        .subscribe(() => {
          this._cdRef.detectChanges();
        });
    }
  }
}
