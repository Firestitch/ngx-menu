export function itemsBuilder(templates, elements) {
  if ((!templates || templates.length === 0) || (!elements || elements.length === 0)) { return; }

  return templates.reduce((acc, item, index) => {

    acc.push({
      templateRef: templates[index],
      elementRef: elements[index]
    });

    return acc;
  }, []);
}
