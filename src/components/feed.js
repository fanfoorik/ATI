import loadFeed from 'utils/loadFeed';
import getPageScrollDownRest from 'utils/getPageScrollDownRest';
import renderItem from 'components/renderItem';
import store from 'utils/store';

/**
 * Loads and renders the feed
 * @param { HTMLElement } node - an element to render the feed
 * @returns { function() } - return feed function with [[Scope]] -> node reference
 */
export default function (node) {
  const container = node;

  const fn = () => {
    if (getPageScrollDownRest() < 1) {
      loadFeed()
        .then((result) => {
          result.forEach((item) => {
            container.appendChild(
              renderItem({
                container: {
                  className: 'item-list',
                },
                text: {
                  value: item.value,
                  className: 'item-list__text',
                },
                button: {
                  value: 'Like',
                  className: 'item-list__like-button',
                  onClick() { store.addItem(item); },
                },
              }));
          });
          fn();
        });
    }
  };
  return fn;
}
