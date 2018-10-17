import {
  EventEmitter,
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';


@Directive({
  selector: '[fs-menu-item]'
})
export class MenuItemDirective implements OnChanges, OnDestroy {
  @Input('class') public cssClass = '';
  @Input('id') public cssId = '';
  @Input() public hidden = false;

  @Output('click') public click$ = new EventEmitter();

  public hiddenChange$ = new EventEmitter();

  constructor(public cd: ChangeDetectorRef) {

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
