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
  SkipSelf,
  ContentChild,
} from '@angular/core';

import { Subject } from 'rxjs';

import { FsGroupMenuItemTemplateDirective } from '../group-menu-item-template/fs-group-menu-item-template.directive';


@Directive()
export class MenuItemDirective implements OnChanges, OnDestroy {

  @Input('fsClass') public ngClass = [];
  @Input('class') public cssClass = '';
  @Input('id') public cssId = '';
  @Input('tooltip') public set setTooltip(tooltip: () => string | string) { 
    this._tooltip = tooltip;
  }

  @Input() public label;
  @Input() public hidden = false;
  @Input() public groupHidden; // used only for groups
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

    this.itemChange$.next();
  }

  public childrenItems: MenuItemDirective[];

  public itemChange$ = new Subject();

  @ContentChild(FsGroupMenuItemTemplateDirective, { read: TemplateRef })
  private _groupItemTemplateRef;

  private _isGroup = false;
  private _tooltip: () => string | string;
  private _tooltipValue: string;

  constructor(
    public cd: ChangeDetectorRef,
    @Optional() public templateRef: TemplateRef<any>,
    @SkipSelf() @Optional() public parent: MenuItemDirective,
  ) {}

  public get isGroup() {
    return this._isGroup;
  }

  public get visible() {
    if (this.groupHidden !== void 0) {
      return !this.groupHidden;
    } else {
      return !this.hidden;
    }
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
