import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FsMenuTriggerDirective } from '../../../../src/app/directives/menu-trigger/fs-menu-trigger.directive';
import { FsMenuComponent } from '../../../../src/app/components/fs-menu/fs-menu.component';
import { FsMenuItemDirective } from '../../../../src/app/directives/menu-item/fs-menu-item.directive';
import { FsGroupMenuItemTemplateDirective } from '../../../../src/app/directives/group-menu-item-template/fs-group-menu-item-template.directive';


@Component({
    selector: 'groups',
    templateUrl: './groups-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsMenuTriggerDirective,
        FsMenuComponent,
        FsMenuItemDirective,
        FsGroupMenuItemTemplateDirective,
    ],
})
export class GroupsMenuComponent {

  public clicked(): void {
    console.log('Item has been clicked');
  }

  public disabledTooltip = (): string => {
    return 'The item is disabled';
  };
}
