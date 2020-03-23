import { merge } from 'rxjs';

export function createItemsObserver(data) {
  const itemsObservables = data.reduce((acc, item) => {

    if (item.elementRef && item.elementRef.hiddenChange$) {
      acc.push(item.elementRef.hiddenChange$);
    }

    return acc;
  }, []);

  return merge(...itemsObservables);
}
