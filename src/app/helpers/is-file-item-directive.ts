import { FsMenuFileItemDirective, FsMenuItemDirective } from "../directives";

/**
 * type checking of directive
 * @param dir 
 */
export const isFileItemDirective = (dir: FsMenuItemDirective | FsMenuFileItemDirective): dir is FsMenuFileItemDirective => {
  return dir instanceof FsMenuFileItemDirective;
}
