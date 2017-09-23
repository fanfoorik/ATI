/**
 * Get rest amount of page scroll down available
 * @returns {number} The rest amount of page scroll down.
 */
export default function () {
  const viewportHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset;
  return scrollHeight - scrollTop - viewportHeight;
}
