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
  ElementRef,
} from '@angular/core';


@Directive({
  selector: '[fs-menu-item]'
})
export class FsMenuItemDirective implements OnChanges, OnDestroy {
  @Input('fsClass') public ngClass = [];
  @Input('class') public cssClass = '';
  @Input('id') public cssId = '';
  @Input() public groupLabel;
  @Input() public hidden = false;
  @Input() public dismissAfterClick = true;

  @Output('click') public click$ = new EventEmitter();

  @ContentChildren(FsMenuItemDirective)
  public set itemsElements(value) {
    this.childItems = value.toArray()
      .filter((child) => child !== this);
  }

  @ContentChildren(FsMenuItemDirective, { read: TemplateRef })
  set itemsTemplates(value) {
    this.childTemplates = value.toArray()
      .filter((child) => child.elementRef.nativeElement != this._el.nativeElement);
  }

  public childItems;
  public childTemplates;

  public hiddenChange$ = new EventEmitter();

  constructor(
    public cd: ChangeDetectorRef,
    private _el: ElementRef
  ) {

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
}
