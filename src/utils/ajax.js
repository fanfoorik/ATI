/**
 * Simple ajax function.
 * @param {string} type ajax type.
 * @param {string} url ajax url.
 * @param {function} onLoad ajax onLoad function.
 * @param {function} onError ajax onError function.
 */
export default function (type, url, onLoad, onError) {
  const xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200) {
      if (onLoad) onLoad(xhr.responseText);
      return;
    }
    if (onError) onError(xhr.statusText);
  };
}
