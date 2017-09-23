import highlighter from 'utils/highlighter';

/**
 * Render list item function
 * @type {{
  * [key]: string,
  * [index]: (number|string)
  * [container]: {[tag]:string, [className]: string}
  * text: {[tag]:string, [className]: string, value: string, [onClick]: callback  }
  * button: {[tag]:string, [className]: string, value: string, [onClick]: callback  }
  * }} data.
 * @returns { HTMLElement } (div|*).
 */
export default function renderItem(data) {
  const { key, index, container, text, button } = data;
  const textValue = key ? highlighter(text.value, key) : text.value;

  // Create container
  let itemContainer;
  if (container) {
    itemContainer = document.createElement(container.tag || 'div');
    itemContainer.setAttribute('class', container.className);
  } else {
    itemContainer = document.createElement('div');
    itemContainer.setAttribute('class', 'list-item');
  }

  // Create text block
  const itemText = document.createElement(text.tag || 'span');
  itemText.onclick = text.onClick ? text.onClick : null;
  itemText.setAttribute('class', text.className || 'list-item__text');
  itemText.innerHTML = index ? `${index}. ${textValue}` : textValue;

  // Create action button
  const itemButton = document.createElement(button.tag || 'button');
  itemButton.onclick = button.onClick ? button.onClick : null;
  itemButton.setAttribute('class', button.className || 'list-item__button');
  itemButton.innerHTML = button.value;

  // Combine and return item
  itemContainer.appendChild(itemText);
  itemContainer.appendChild(itemButton);
  return itemContainer;
}
