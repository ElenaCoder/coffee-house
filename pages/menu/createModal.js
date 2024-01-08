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
                <div class="s active" data-offer="s-size">
                    <img
                        src="../../assets/icons/s-size-icon-dark.svg"
                        width="116"
                        height="46"
                        alt="s-size icon"
                    />
                </div>
                <div class="m active" data-offer="m-size">
                    <img
                        src="../../assets/icons/m-size-icon-light.svg"
                        width="117"
                        height="46"
                        alt="s-size icon"
                    />
                </div>
                <div class="l active" data-offer="l-size">
                    <img
                        src="../../assets/icons/l-size-icon-light.svg"
                        width="117
                        "
                        height="46"
                        alt="s-size icon"
                    />
                </div>
            </div>
            <div class="subtitle-modal">Additives</div>
            <div class="additives-btn-block">
                <div class="additive-one active" data-offer="one-sugar">
                    <img
                        src="../../assets/icons/1-additives-sugar-light.svg"
                        width="108"
                        height="46"
                        alt="sugar-additives icon"
                    />
                </div>
                <div class="additive-two active" data-offer="two-cinnamon">
                    <img
                        src="../../assets/icons/2-additives-cinnamon-light.svg"
                        width="141"
                        height="46"
                        alt="cinnamon-additives icon"
                    />
                </div>
                <div class="additive-three active" data-offer="three-syrup">
                    <img
                        src="../../assets/icons/3-additives-syrup-light.svg"
                        width="108"
                        height="46"
                        alt="syrup-additives icon"
                    />
                </div>
            </div>
            <div class="total-block">
                <p>Total:</p>
                <p class="total-result">$${item.price}</p>
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
