import { FsMenuFileItemDirective, FsMenuItemDirective } from "../directives";


export const isFileItemDirective = (dir: FsMenuItemDirective | FsMenuFileItemDirective): dir is FsMenuFileItemDirective => {
  return dir instanceof FsMenuFileItemDirective;
}
