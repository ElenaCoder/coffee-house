import { createModal } from './createModal.js';
import { createCard } from './createCard.js';
import {
    resetSelectedSizeItem,
    updateTotalPrice,
    attachSizeEventListeners,
    attachAdditivesEventListeners,
} from './sizeAdditives.js';

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
const isLargeScreen = window.innerWidth >= 1440;
const isSmallScreen = window.innerWidth < 1440;
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

        attachCardEventListeners(data);
    }

    function openModal(data, productId) {
        const modalElement = document.querySelector(`.${productId}`);
        const overlay = document.querySelector('.overlayModalWindow');
        const initialTotal = modalElement
            .querySelector('.total-result')
            .innerHTML.split('$')[1];

        // Disable vertical scroll when the modal is open
        disableScroll();

        if (modalElement && overlay) {
            modalElement.style.display = 'block';
            overlay.style.display = 'block';

            // Attach event listener to the close button of the newly added modal
            const closeModalBtn = modalElement.querySelector('.close');
            closeModalBtn.addEventListener('click', function () {
                closeModal(modalElement, initialTotal);
            });

            // Close modal if clicking on the overlay
            overlay.addEventListener('click', function () {
                closeModal(modalElement, initialTotal);
            });

            const isTargetData = data
                .map((item) => item.productId)
                .some((element) =>
                    element.includes(
                        `${productId}`.split('').slice(0, -2).join(''),
                    ),
                );
            const targetItem = isTargetData
                ? data.filter((element) =>
                      element.productId.includes(`${productId}`),
                  )[0]
                : null;

            // Check if event listeners are already attached
            const sizeListenersAttached =
                offerContentWrapper.dataset.sizeListenersAttached;
            const additiveListenersAttached =
                offerContentWrapper.dataset.additiveListenersAttached;

            if (!sizeListenersAttached && isTargetData) {
                // Attach event listeners to size buttons
                attachSizeEventListeners(offerContentWrapper, initialTotal);
                offerContentWrapper.dataset.sizeListenersAttached = true;
            }

            if (!additiveListenersAttached && isTargetData) {
                // Attach event listeners to additive buttons
                attachAdditivesEventListeners(offerContentWrapper, initialTotal);
                offerContentWrapper.dataset.additiveListenersAttached = true;
            }
        }
    }

    function clearModalSettings(modalElement, initialTotal) {
        const totalResultElement = modalElement.querySelector('.total-result');
        let selectedSizeAdditive = [
            ...modalElement.querySelectorAll('.m'),
            ...modalElement.querySelectorAll('.l'),
            ...modalElement.querySelectorAll('.additive-option'),
        ];

        selectedSizeAdditive.forEach((elem) => elem.classList.remove('active'));
        modalElement.querySelector('.s').classList.add('active');
        resetSelectedSizeItem();

        totalResultElement.textContent = `$${initialTotal}`;
    }

    function closeModal(modalElement, initialTotal) {
        // const modalElement = document.querySelector(`.modal.${productId}`);
        const overlay = document.querySelector('.overlayModalWindow');

        clearModalSettings(modalElement, initialTotal);
        // Enable vertical scroll when the modal is closed
        enableScroll();

        if (modalElement && overlay) {
            modalElement.style.display = 'none';
            overlay.style.display = 'none';
        }
    }

    // Function to disable vertical scroll
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    // Function to enable vertical scroll
    function enableScroll() {
        document.body.style.overflow = '';
    }

    function attachCardEventListeners(data) {
        data.forEach((item) => {
            let card = document.querySelector(`#${item.productId}`);
            if (!card) {
                return;
            }
            card.addEventListener('mouseenter', function (event) {
                this.querySelector('.img-wrapper').style.backgroundSize =
                    '110%';
            });

            card.addEventListener('mouseleave', function (event) {
                this.querySelector('.img-wrapper').style.backgroundSize =
                    '100%';
            });
        });

        // common parent of all cards
        const tabsContainer = document.querySelector('.offer-content-wrapper');

        // Attach event listeners only if they are not already attached
        if (!tabsContainer.dataset.listenersAttached) {
            tabsContainer.addEventListener(
                'click',
                tabsContainerListenerHandler,
            );
            tabsContainer.dataset.listenersAttached = true;
        }

        // Attach event listener to a common parent of all cards
        function tabsContainerListenerHandler(event) {
            const card = event.target.closest('.card');
            const productId = card?.getAttribute('id');

            // Toggle the modal
            if (productId) {
                const modalElement = document.querySelector(`.${productId}`);
                if (modalElement) {
                    openModal(data, productId);
                } else {
                    closeModal(productId);
                }
            }
        }
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
                    // const restCardsData = (tabId === 'coffee'  || tabId === 'dessert') ? visibleData.slice(initialCardCount) : visibleData;
                    // // attachCardEventListeners(restCardsData);
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
