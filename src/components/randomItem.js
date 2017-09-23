import ajax from 'utils/ajax';
import events from 'utils/events';

/**
 * Gets random item
 * @param { HTMLElement } node - button element to listen onclick event
 */
export default function (node) {
  const getRandomItem = node;

  // Get random item on click listiner
  getRandomItem.onclick = () => {
    events.trigger('getRandomItemStart');
    ajax('GET', 'https://api.chucknorris.io/jokes/random', ((data) => {
      events.trigger('getRandomItemEnd', JSON.parse(data));
    }), ((err) => {
      events.trigger('ajaxError', err);
    }));
  };
}
