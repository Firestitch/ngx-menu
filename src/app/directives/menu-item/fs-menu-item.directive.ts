import {
  EventEmitter,
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ContentChildren,
  TemplateRef,
  SimpleChanges,
  Optional, SkipSelf,
} from '@angular/core';
import { Subject } from 'rxjs';


@Directive({
  selector: 'fs-menu-group,[fs-menu-item]'
})
export class FsMenuItemDirective implements OnChanges, OnDestroy {
  @Input('fsClass') public ngClass = [];
  @Input('class') public cssClass = '';
  @Input('id') public cssId = '';
  @Input() public label;
  @Input() public hidden = false;
  @Input() public groupHidden; // used only for groups
  @Input() public dismissAfterClick = true;
  @Input() public link: any[] | string;
  @Input() public queryParams: { [k: string]: any } = {};

  @Output('click') public click$ = new EventEmitter();

  @ContentChildren(FsMenuItemDirective)
  public set itemsElements(value) {
    this.childrenItems = value.toArray()
      .filter((child) => child !== this);

    this._isGroup = !!this.childrenItems;
    this.checkChildrenVisibility();

    this.itemChange$.next();
  }

  public childrenItems: FsMenuItemDirective[];

  public itemChange$ = new Subject();

  private _isGroup = false;

  constructor(
    public cd: ChangeDetectorRef,
    @Optional() public templateRef: TemplateRef<any>,
    @SkipSelf() @Optional() public parent: FsMenuItemDirective,
  ) {}

  get isGroup() {
    return this._isGroup;
  }

  get visible() {
    if (this.groupHidden !== void 0) {
      return !this.groupHidden;
    } else {
      return !this.hidden;
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!this.isGroup && this.parent && changes.hidden && !changes.hidden.firstChange) {
      this.parent.checkChildrenVisibility();
    }

    this.itemChange$.next();
  }

  public checkChildrenVisibility() {
    if (this.childrenItems) {
      this.hidden = this.childrenItems.every((item) => item.hidden);
    }
  }

  public ngOnDestroy() {
    this.itemChange$.complete();
  }

  public click(event) {
    this.click$.next(event);
  }
}
