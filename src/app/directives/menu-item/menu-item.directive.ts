import {
  ChangeDetectorRef,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  SkipSelf,
  TemplateRef,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { FsGroupMenuItemTemplateDirective } from '../group-menu-item-template';

type stringFn = () => string;


@Directive()
export class MenuItemDirective implements OnChanges, OnDestroy {

  @Input('fsClass') public ngClass = [];
  @Input('class') public cssClass = '';
  @Input('id') public cssId = '';
  @Input('tooltip') public set setTooltip(tooltip: stringFn | string) { 
    this._tooltip = tooltip;
  }

  @Input() public label;
  @Input() public hidden = false;
  @Input() public show: () => boolean;
  @Input() public dismissAfterClick = true;
  @Input() public link: any[] | string;
  @Input() public target: string = null;
  @Input() public disabled = false;  
  @Input() public queryParams: { [k: string]: any } = {};

  @Output('click') public click$ = new EventEmitter();

  @ContentChildren(MenuItemDirective)
  public set itemsElements(value) {
    this.childrenItems = value.toArray()
      .filter((child) => child !== this);

    this._isGroup = !!this.childrenItems;
    this.checkChildrenVisibility();

    this._itemChange$.next(null);
  }

  public childrenItems: MenuItemDirective[];
  public isDivider = false;

  private _itemChange$ = new Subject();

  @ContentChild(FsGroupMenuItemTemplateDirective, { read: TemplateRef })
  private _groupItemTemplateRef;

  private _isGroup = false;
  private _tooltip: stringFn | string;
  private _tooltipValue: string;

  constructor(
    public cd: ChangeDetectorRef,
    @Optional() public templateRef: TemplateRef<any>,
    @SkipSelf() @Optional() public parent: MenuItemDirective,
  ) {}

  public get isGroup() {
    return this._isGroup;
  }

  public get itemChange$(): Observable<any> {
    return this._itemChange$.asObservable();  
  }

  public get visible() {
    return !this.hidden;
  }

  public get tooltip(): string {
    return this._tooltipValue;
  }

  public generateTooltip(): void {
    if(typeof this._tooltip === 'function') {
      this._tooltipValue = this._tooltip();
    } else if(typeof this._tooltip === 'string') {
      this._tooltipValue = this._tooltip;
    }
  }

  public get groupItemTemplateRef(): TemplateRef<FsGroupMenuItemTemplateDirective> {
    return this._groupItemTemplateRef;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!this.isGroup && this.parent && changes.hidden && !changes.hidden.firstChange) {
      this.parent.checkChildrenVisibility();
    }

    this._itemChange$.next(null);
  }

  public checkChildrenVisibility() {
    if (this.childrenItems && !this.hidden) {
      this.hidden = this.childrenItems
        .every((item) => item.hidden);
    }
  }

  public ngOnDestroy() {
    this._itemChange$.complete();
  }

  public click(event) {
    this.click$.next(event);
  }
}
