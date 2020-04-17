import { merge } from 'rxjs';
import { FsMenuItemDirective } from '../directives/menu-item/fs-menu-item.directive';


export function createItemsObserver(data: FsMenuItemDirective[]) {
  const itemsObservables = data.reduce((acc, item) => {

    if (item.itemChange$) {
      acc.push(item.itemChange$);
    }

    return acc;
  }, []);

  return merge(...itemsObservables);
}
