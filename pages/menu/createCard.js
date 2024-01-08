export function createCard(item) {
    const cardMarkup = `
        <div class="card" id=${item.productId}>
            <div class="img-wrapper" style="
                background-image: url(${item.image});
                background-color: var(--border-light-color);
                background-position: 50%;
                background-size: cover;
                background-repeat: no-repeat;
                transition: background-size 0.5s ease;
                background-size: 100%"
            ></div>
            <div class="card-content">
                <h3 class="card-name">${item.name}</h3>
                <p class="card-description">${item.description}</p>
                <p class="card-price">${item.price}</p>
            </div>
        </div>
    `;

    return cardMarkup;
}