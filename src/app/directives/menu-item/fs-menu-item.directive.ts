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
} from '@angular/core';
import { itemsBuilder } from '../../helpers/items-builer';


@Directive({
  selector: 'fs-menu-item, [fs-menu-item]'
})
export class FsMenuItemDirective implements OnChanges, OnDestroy {
  @Input('fsClass') public ngClass = [];
  @Input('class') public cssClass = '';
  @Input('id') public cssId = '';
  @Input() public label;
  @Input() public hidden = false;
  @Input() public dismissAfterClick = true;

  @Output('click') public click$ = new EventEmitter();

  @ContentChildren(FsMenuItemDirective)
  public set itemsElements(value) {
    this._childElements = value.toArray()
      .filter((child) => child !== this);

    this.updateItems();
  }

  @ContentChildren(FsMenuItemDirective, { read: TemplateRef })
  set itemsTemplates(value) {
    this._childTemplates = value.toArray()
      .filter((child) => !!child);

    this.updateItems();
  }

  public childItems;

  public hiddenChange$ = new EventEmitter();

  private _childElements;
  private _childTemplates;
  private _isGroup = false;

  constructor(public cd: ChangeDetectorRef) {}

  get isGroup() {
    return this._isGroup;
  }

  public ngOnChanges(changes) {
    if (changes.hidden) {
      this.hiddenChange$.next();
    }
  }

  public ngOnDestroy() {
    this.hiddenChange$.complete();
  }

  public click(event) {
    this.click$.next(event);
  }

  private updateItems() {
    this.childItems = itemsBuilder(this._childTemplates, this._childElements);

    this._isGroup = Array.isArray(this.childItems);
  }
}
