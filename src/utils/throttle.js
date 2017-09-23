/**
 * Throttle function
 * @param {function} func - Function to throttle.
 * @param {number} threshhold - Throttle threshhold.
 * @returns {function()} Runs provided function.
 */
export default function throttle(func, threshhold) {
  let timeout;
  let last = 0;
  return (...rest) => {
    const now = +(new Date);
    const exe = () => { last = now; func.apply(this, rest); };
    clearTimeout(timeout);
    if (now >= last + threshhold) {
      exe();
    } else {
      timeout = setTimeout(exe, threshhold);
    }
  };
}
