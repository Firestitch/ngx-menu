import { merge } from 'rxjs';

export function createItemsObserver(data) {
  const itemsObservables = data.reduce((acc, item) => {

    if (item.hiddenChange$) {
      acc.push(item.hiddenChange$);
    }

    return acc;
  }, []);

  return merge(...itemsObservables);
}
