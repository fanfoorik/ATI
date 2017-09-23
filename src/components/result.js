import store from 'utils/store';
import events from 'utils/events';
import renderItem from 'components/renderItem';

/**
 * Search an get random item result component
 * @param { HTMLElement } node - element to place result
 */
export default function (node) {
  // Search result limiter
  let limit = null;
  // Temp items array
  let items = [];
  let searchKey = '';
  const searchResult = node;

  /**
   * Render items function
   * @returns { HTMLElement } (div|*) - returns argument node with rendered items in it
   */
  const renderItems = () => {
    if (items.length) {
      const itemsArr = limit ? items.slice(0, limit) : items;
      searchResult.innerHTML =
        `<div class="result__label">Search result: 
         <span class="result__fraction">
            ${itemsArr.length === items.length ? items.length : `${itemsArr.length} of ${items.length}`} 
         </span>
         </div>`;

      itemsArr.forEach((item, index) => {
        searchResult.appendChild(
          renderItem({
            key: searchKey,
            index: (index + 1),
            container: {
              className: 'item-list',
            },
            text: {
              value: item.value,
              className: 'item-list__text item-list__text_clickable',
              onClick() { events.trigger('showDetails', item); },
            },
            button: {
              value: 'Like',
              className: 'item-list__like-button',
              onClick() { store.addItem(item); },
            },
          }));
      });
      return;
    }
    searchResult.innerHTML = '<div class="result__cover">Nothing found! :-(</div>';
  };

  events.on('getRandomItemStart', (() => {
    searchResult.innerHTML = '<div class="result__loading">Loading...</div>';
    events.trigger('resetSearch');
    items = [];
  }));

  events.on('getRandomItemEnd', ((item) => {
    searchResult.innerHTML = '<div class="result__label">Random joke:</div>';
    searchResult.appendChild(renderItem({
      container: {
        className: 'item-list',
      },
      text: {
        value: item.value,
        className: 'item-list__text item-list__text_clickable',
        onClick() { events.trigger('showDetails', item); },
      },
      button: {
        value: 'Like',
        className: 'item-list__like-button',
        onClick() { store.addItem(item); },
      },
    }));
  }));

  events.on('searchStart', (() => {
    searchResult.innerHTML = '<div class="result__loading">Loading...</div>';
  }));

  events.on('searchEnd', (({ result, key }) => {
    items = result;
    searchKey = key;
    renderItems();
  }));

  events.on('searchEscape', (() => {
    searchResult.innerHTML = '<div class="result__cover">Start searching or click "get random joke" button.</div>';
  }));

  events.on('ajaxError', (() => {
    searchResult.innerHTML = '<div class="result__cover">Oops Error!</div>';
  }));

  events.on('setDefaultLimit', ((num) => { limit = !isNaN(parseFloat(num)) && isFinite(num) ? +num : null; }));

  events.on('setLimit', ((num) => {
    limit = !isNaN(parseFloat(num)) && isFinite(num) ? +num : null;
    if (items.length) renderItems();
  }));
}
