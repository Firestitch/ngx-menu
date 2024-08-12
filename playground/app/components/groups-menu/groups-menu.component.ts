import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'groups',
  templateUrl: './groups-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsMenuComponent {

  public clicked(): void {
    console.log('Item has been clicked');
  }

  public disabledTooltip = (): string => {
    return 'The item is disabled';
  };
}
