import ajax from 'utils/ajax';
import debounce from 'utils/debounce';
import events from 'utils/events';

/**
 * Get api data on input event by input key
 * @param { HTMLElement } node - input element to listen oninput event
 */
export default (node) => {
  const field = node;
  const debounceDelay = 400;

  field.oninput = debounce((event) => {
    const value = event.target.value;
    if (value.length) {
      events.trigger('searchStart');
      ajax('GET', `https://api.chucknorris.io/jokes/search?query=${value}`, ((data) => {
        const { result } = JSON.parse(data);
        events.trigger('searchEnd', { result: result || [], key: value });
      }), ((err) => {
        events.trigger('ajaxError', err);
      }));
      return;
    }
    events.trigger('searchEscape');
  }, debounceDelay);

  events.on('resetSearch', (() => {
    field.value = '';
  }));
};
