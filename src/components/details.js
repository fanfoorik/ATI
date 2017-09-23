import events from 'utils/events';

/**
 * Show item details
 * @param { HTMLElement } node - element to place item details in
 */
export default function (node) {
  const detailsContainer = node;
  const close = document.createElement('span');
  close.setAttribute('class', 'details__close');
  close.innerHTML = 'Close';
  close.onclick = () => events.trigger('closeDetails');

  events.on('showDetails', ((data) => {
    detailsContainer.innerHTML = `
      <div class="detail-item">
        <div class="detail-item">
          <span class="detail-item__key">ID</span>:
          <span class="detail-item__value detail-item__value_id">${data.id}</span>
        </div>
        <span class="detail-item__key">Text</span>:
        <span class="detail-item__value">${data.value}</span>
      </div>
      <div class="detail-item">
        <span class="detail-item__key">Link</span>:
        <span class="detail-item__value"><a href="${data.url}" target="_blank" class="detail-item__value">${data.url}</a></span>
      </div>
     `;
    detailsContainer.appendChild(close);
  }));

  events.on('closeDetails', (() => {
    detailsContainer.innerHTML = '<div class="details__cover">Select joke to view details</div>';
  }));
}
