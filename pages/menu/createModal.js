export function createModal(item) {
    const modalMarkup = `
    <div class="modal ${item.productId}" style="display:none">
    <div class="modal-content">
      <div class="modalContent">
        <div class="img-wrapper-modal" style="
            background-image: url(${item.image});
            background-color: var(--border-light-color);
            background-size: cover;
            background-repeat: no-repeat;
            background-size: 100%;"
        ></div>
        <div class="modal-main-description">
            <div class="title-modal">${item.name}</div>
            <div class="description-modal">${item.description} Fragrant black coffee with Jameson Irish </div>
            <div class="subtitle-modal">Size</div>
            <div class="size-btn-block">
                <div class="s active size-option" data-offer="s-size" data-price="0.00"></div>
                <div class="m size-option" data-offer="m-size" data-price="0.50"></div>
                <div class="l size-option" data-offer="l-size" data-price="1.00"></div>
            </div>
            <div class="subtitle-modal">Additives</div>
            <div class="additives-btn-block">
                <div class="additive-one additive-option" data-offer="one-sugar" data-price="0.50"></div>
                <div class="additive-two additive-option" data-offer="two-cinnamon" data-price="0.50"></div>
                <div class="additive-three additive-option" data-offer="three-syrup" data-price="0.50"></div>
            </div>
            <div class="total-block">
                <p>Total:</p>
                <p class="total-result" data-priceInitial="${item.price}">$${item.price}</p>
            </div>
            <div class="warning">
                <div class="exclamation-icon">
                    <img
                    src="../../assets/icons/exclamation-mark.svg"
                    width="16"
                    height="16"
                    alt="exclamation-mark icon"
                    />
                </div>
                <p>The cost is not final. Download our mobile app to see the final price
                    and place your order. Earn loyalty points and enjoy your favorite coffee
                    with up to 20% discount.
                </p>
            </div>
            <button class="close">Close</button>
        </div>
      </div>

    </div>
    </div>
    `;

    return modalMarkup;
}
