import ajax from 'utils/ajax';

/**
 * Get pack of items fo feed
 * @promise {Array} return an array of items
 */
export default () => new Promise((resolve) => {
  const feedUrl = 'https://api.chucknorris.io/jokes/random';
  const feed = [];
  let counter = 0;
  const loadBy = 10;

  const cb = () => counter === loadBy && resolve(feed);
  for (let i = 0; i < loadBy; i += 1) {
    ajax('GET', feedUrl, ((data) => {
      counter += 1; feed.push(JSON.parse(data)); cb();
    }), (() => {
      counter += 1;
      cb();
    }));
  }
});
