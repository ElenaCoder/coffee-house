// Add smooth scrolling behavior to anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});

/* Hamburger menu handling in HEADER section**/
let divHamburgerMenu = document.querySelector('.burger-menu');
let burgerIconElement = document.querySelector('.burger-icon');
let divOverlay = document.querySelector('.overlay');
let burgerNav = document.querySelector('.burger-nav');
let burgerIcon = '&#9776;';
let closeIcon = '&times;';

divHamburgerMenu.addEventListener('click', hamburgerMenuHandler);
divOverlay.addEventListener('click', hamburgerMenuHandler);

function hamburgerMenuHandler(e) {
    let contentElement = document.querySelector('.content');
    let contentElementWidth = parseInt(
        window.getComputedStyle(contentElement).width,
    );

    let viewportWidth = window.visualViewport.width;
    let burgerNavWidth = burgerNav.offsetWidth;
    let leftPosition =
        (viewportWidth - burgerNavWidth - contentElementWidth) / 2;

    if (burgerNav.style.display === 'block') {
        burgerNav.style.display = 'none';
        divOverlay.classList.remove('active');

        burgerIconElement.innerHTML = burgerIcon;
        burgerIconElement.style.padding = '5px 9px';
    } else {
        burgerNav.style.display = 'block';
        divOverlay.classList.add('active');
        burgerIconElement.innerHTML = closeIcon;
        burgerIconElement.style.padding = '4px 11px';

        burgerNav.style.left = `${leftPosition}px`;
        burgerNav.style.width = `${contentElementWidth}px`;
    }
}
/*// Hamburger menu handling in HEADER section*/

/*Menu handling in MENU section*/
const tabs = document.querySelectorAll('.choice-tab');
const contentWrappers = document.querySelectorAll('.content-tab');

const offerContentWrapper = document.querySelector('.offer-content-wrapper');
let coffeeContentWrapper = document.querySelector('.coffee-content-wrapper');
let teaContentWrapper = document.querySelector('.tea-content-wrapper');
let dessertContentWrapper = document.querySelector('.dessert-content-wrapper');

let loadMoreBtn = document.querySelector('.load-more-btn');
const isLargeScreen = window.innerWidth >= 1400;
const isSmallScreen = window.innerWidth < 1400;
const initialCardCount = 4;
const cardAmounts = { coffee: 0, tea: 0, dessert: 0 };

function isLoadBtnNeed(cardAmount) {
    return cardAmount > 5;
}

document.addEventListener('DOMContentLoaded', function () {
    // Add click event listeners to each tab
    tabs.forEach((tab) => {
        tab.addEventListener('click', function () {
            // Remove 'active' class from all btn-tabs
            tabs.forEach((t) => t.classList.remove('active'));

            // Add 'active' class to the clicked btn-tab
            tab.classList.add('active');

            // Hide all content wrappers
            contentWrappers.forEach((wrapper) => {
                wrapper.classList.add('none');
            });

            // Show the corresponding content wrapper based on the clicked tab's data-tab attribute
            const tabId = tab.dataset.offer;
            const activeContent = document.querySelector(
                `[data-content="${tabId}"]`,
            );
            if (activeContent) {
                activeContent.classList.remove('none');
            }

            const cardAmount = cardAmounts[tabId];
            if (
                isLargeScreen ||
                (isSmallScreen && !isLoadBtnNeed(cardAmount))
            ) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'flex';
            }
        });
    });

    function createCard(item) {
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

    function createModal(item) {
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

    function updateContent(contentWrapper, data, tabId) {
        // Load all cards initially on large screens
        const initialSubset = isLargeScreen
            ? data
            : data.slice(0, initialCardCount);
        contentWrapper.innerHTML = initialSubset.map(createCard).join('');

        // Update the card amount
        cardAmounts[tabId] = data.length;

        // Load all modal windows
        contentWrapper.innerHTML += data
            .map((item) => createModal(item))
            .join('');

        attachEventListeners();
    }

    function openModal(productId) {
        const modalElement = document.querySelector(`.${productId}`);
        const overlay = document.querySelector('.overlayModalWindow');

        if (modalElement && overlay) {
            modalElement.style.display = 'block';
            overlay.style.display = 'block';

            // Attach event listener to the close button of the newly added modal
            const closeModalBtn = modalElement.querySelector('.close');
            closeModalBtn.addEventListener('click', function () {
                closeModal(productId);
            });

            // Close modal if clicking on the overlay
            overlay.addEventListener('click', function () {
                closeModal(productId);
            });
        }
    }

    function closeModal(productId) {
        const modalElement = document.querySelector(`.modal.${productId}`);
        const overlay = document.querySelector('.overlayModalWindow');

        if (modalElement && overlay) {
            modalElement.style.display = 'none';
            overlay.style.display = 'none';
        }
    }

    function attachEventListeners() {
        let cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            card.addEventListener('mouseenter', function (event) {
                this.querySelector('.img-wrapper').style.backgroundSize =
                    '110%';
            });

            card.addEventListener('mouseleave', function (event) {
                this.querySelector('.img-wrapper').style.backgroundSize =
                    '100%';
            });

            card.addEventListener('click', function () {
                const productId = this.getAttribute('id');
                const match = productId.match(/^([^-]+)/);
                const activeTab = match ? match[1] : null;
                const visibleContentWrapper = Array.from(contentWrappers).find(
                    (element) =>
                        element.classList.contains(
                            `${activeTab}-content-wrapper`,
                        ),
                );
                console.log(productId);

                // Toggle the modal
                if (visibleContentWrapper) {
                    const modalElement = document.querySelector(
                        `.${productId}`,
                    );
                    if (modalElement) {
                        openModal(productId);
                    } else {
                        closeModal(productId);
                    }
                }
            });
        });
    }

    fetch('../../assets/menu-data/products.json')
        .then((response) => response.json())
        .then((data) => {
            let dataCoffee = data.filter((item) => item.category === 'coffee');
            let dataTea = data.filter((item) => item.category === 'tea');
            let dataDessert = data.filter(
                (item) => item.category === 'dessert',
            );

            // Update each content wrapper with the corresponding data
            updateContent(coffeeContentWrapper, dataCoffee, 'coffee');
            updateContent(teaContentWrapper, dataTea, 'tea');
            updateContent(dessertContentWrapper, dataDessert, 'dessert');

            // Attach event listener to the "Load More" button
            loadMoreBtn.addEventListener('click', function () {
                // Find the visible content wrapper
                const visibleContentWrapper = Array.from(contentWrappers).find(
                    (wrapper) => !wrapper.classList.contains('none'),
                );

                if (visibleContentWrapper) {
                    const tabId = visibleContentWrapper.dataset.content;
                    const visibleData = data.filter(
                        (item) => item.category === `${tabId}`,
                    );

                    // Fetch and append more cards based on screen size
                    fetchAndAppendMoreCards(
                        visibleContentWrapper,
                        visibleData,
                        initialCardCount,
                    );

                    // Attach event listeners after loading more cards
                    attachEventListeners();
                }
            });

            function fetchAndAppendMoreCards(contentWrapper, data, cardCount) {
                // Fetch the next set of cards
                const nextSet = data.slice(cardCount);

                // Append the new cards to the content wrapper
                contentWrapper.innerHTML += nextSet.map(createCard).join('');

                let totalCardAmount = data.length;

                // Check if the quantity is more than total card amount (8 in our case) and hide/remove the "Load More" button
                const totalCards =
                    contentWrapper.querySelectorAll('.card').length;
                if (totalCards >= totalCardAmount) {
                    hideLoadMoreBtn();
                }
            }

            function hideLoadMoreBtn() {
                // Set the "Load More" button to display: none
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        })
        .catch((error) => console.error('Error fetching data:', error));

    function handleResize() {
        location.reload();
    }

    window.addEventListener('resize', handleResize);
});
/* //Menu handling in MENU section*/
