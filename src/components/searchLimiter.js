import events from 'utils/events';

/**
 * Search result limiter
 * @param { HTMLElement } node - select element to limit search result
 */
export default function (node) {
  const searchLimiter = node;

  // Set default limit on load
  events.trigger('setDefaultLimit', searchLimiter.value);

  // Set limit on change
  searchLimiter.onchange = (event) => {
    events.trigger('setLimit', event.target.value);
  };
}
