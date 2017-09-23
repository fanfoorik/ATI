import search from 'components/search';
import searchLimiter from 'components/searchLimiter';
import randomItem from 'components/randomItem';
import result from 'components/result';
import likes from 'components/likes';
import details from 'components/details';
import feed from 'components/feed';
import throttle from 'utils/throttle';
import styles from 'styles/style';

(() => {
  randomItem((document.getElementById('jsRandomItem')));
  search((document.getElementById('jsSearchInput')));
  result((document.getElementById('jsResultPanel')));
  likes((document.getElementById('jsLikesList')));
  details((document.getElementById('jsDetails')));
  searchLimiter((document.getElementById('jsSearchLimiter')));

  const getFeed = feed((document.getElementById('jsFeed')));
  getFeed();
  window.onscroll = throttle(getFeed, 100);
})();
