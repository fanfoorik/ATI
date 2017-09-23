import events from 'utils/events';
import store from 'utils/store';
import renderItem from 'components/renderItem';

/**
 * Likes component
 * @param { HTMLElement } node - element to place liked list
 */
export default function (node) {
  const likesList = node;

  const renderLikedList = () => {
    const items = store.getAllItems();
    likesList.innerHTML = '';

    items.forEach((item) => {
      likesList.appendChild(renderItem({
        container: {
          className: 'like-item',
        },
        text: {
          value: item.value,
          className: 'like-item__text',
          onClick() { events.trigger('showDetails', item); },
        },
        button: {
          value: 'Dislike',
          className: 'like-item__dislike-button',
          onClick() { store.removeItem(item); },
        },
      }));
    });
  };

  events.on('addItem', (() => {
    renderLikedList();
  }));

  events.on('removeItem', (() => {
    renderLikedList();
  }));
}
