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
  Optional,
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
  @Input() public dismissAfterClick = true;
  @Input() public link: any[] | string;
  @Input() public queryParams: { [k: string]: any } = {};

  @Output('click') public click$ = new EventEmitter();

  @ContentChildren(FsMenuItemDirective)
  public set itemsElements(value) {
    this.childrenItems = value.toArray()
      .filter((child) => child !== this);

    this._isGroup = !this.templateRef;
  }

  public childrenItems;

  public hiddenChange$ = new Subject();

  private _isGroup = false;

  constructor(
    public cd: ChangeDetectorRef,
    @Optional() public templateRef: TemplateRef<any>,
  ) {}

  get isGroup() {
    return this._isGroup;
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.hiddenChange$.next();
  }

  public ngOnDestroy() {
    this.hiddenChange$.complete();
  }

  public click(event) {
    this.click$.next(event);
  }
}
