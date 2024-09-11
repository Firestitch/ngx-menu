import { FsMenuFileItemDirective } from '../directives/menu-file-item/fs-menu-file-item.directive';
import { FsMenuItemDirective } from '../directives/menu-item/fs-menu-item.directive';

/**
 * type checking of directive
 * @param dir 
 */
export const isFileItemDirective = (dir: FsMenuItemDirective | FsMenuFileItemDirective): dir is FsMenuFileItemDirective => {
  return dir instanceof FsMenuFileItemDirective;
};
