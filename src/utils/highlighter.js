/**
 * Text highlighter function.
 * @param {string} value - A string to be highlighted;
 * @param {string} key - The key highlight with.
 * @returns {void|*|string|XML}
 */
export default function (value, key) {
  const prepareKey = key.trim().replace(/\W/g, '\\$&');
  const regex = new RegExp(`(${prepareKey})`, 'gi');
  const matchedValue = value.replace(regex, '<span class="highlight">$1</span>');
  return matchedValue;
}
