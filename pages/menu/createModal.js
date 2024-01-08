export function createModal(item) {
    const modalMarkup = `
      <div class="modal ${item.productId}">
        <div class="modal-content">
          <div class="modalContent">${item.name}</div>
          <button class="close">Close</button>
        </div>
      </div>
    `;

    return modalMarkup;
}