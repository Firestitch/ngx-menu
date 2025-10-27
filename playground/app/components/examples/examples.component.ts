import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { SimpleMenuComponent } from '../simple-menu/simple-menu.component';
import { RemoteMenuComponent } from '../remote-menu/remote-menu.component';
import { GroupsMenuComponent } from '../groups-menu/groups-menu.component';


@Component({
    templateUrl: './examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsExampleModule,
        SimpleMenuComponent,
        RemoteMenuComponent,
        GroupsMenuComponent,
    ],
})
export class ExamplesComponent {
  public config = environment;
}
