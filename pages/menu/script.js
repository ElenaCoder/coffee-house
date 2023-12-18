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
            <div class="card">
                <div class="img-wrapper ${item.imageContainerClass}" style="background: url(${item.image}) var(--border-light-color) 50% / cover no-repeat;"></div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-description">${item.description}</p>
                    <p class="card-price">${item.price}</p>
                </div>
            </div>
        `;

        return cardMarkup;
    }

    function updateContent(contentWrapper, data, tabId) {
        // Load all cards initially on large screens
        const initialSubset = isLargeScreen
            ? data
            : data.slice(0, initialCardCount);
        contentWrapper.innerHTML = initialSubset.map(createCard).join('');

        // Update the card amount
        cardAmounts[tabId] = data.length;
    }

    fetch('../../../assets/menu-data/menu-data.json')
        .then((response) => response.json())
        .then((data) => {
            // Update each content wrapper with the corresponding data
            updateContent(coffeeContentWrapper, data.coffee, 'coffee');
            updateContent(teaContentWrapper, data.tea, 'tea');
            updateContent(dessertContentWrapper, data.dessert, 'dessert');
        })
        .catch((error) => console.error('Error fetching data:', error));
});
/* //Menu handling in MENU section*/
