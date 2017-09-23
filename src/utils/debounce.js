/**
 * Debounce function
 * @param {function} func - Function to debounce.
 * @param {numer} delay - Debounce delay.
 * @returns {function()} Runs provided function.
 */
export default function (func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
