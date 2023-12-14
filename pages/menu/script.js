// Get all tab elements and content wrappers
const tabs = document.querySelectorAll('.choice-tab');
const contentWrappers = document.querySelectorAll('.content-tab');

document.addEventListener("DOMContentLoaded", function() {
    // Add click event listeners to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove 'active' class from all btn-tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add 'active' class to the clicked btn-tab
            tab.classList.add('active');

            // Hide all content wrappers
            contentWrappers.forEach(wrapper => {
                wrapper.classList.add('none');
            });

            // Show the corresponding content wrapper based on the clicked tab's data-tab attribute
            const tabId = tab.dataset.offer;
            const activeContent = document.querySelector(`[data-content="${tabId}"]`);
            if (activeContent) {
                activeContent.classList.remove('none');
            }
        });
    });
});

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
    let contentElementWidth = parseInt(window.getComputedStyle(contentElement).width);

    let viewportWidth = window.visualViewport.width;
    let burgerNavWidth = burgerNav.offsetWidth;
    let leftPosition = (viewportWidth - burgerNavWidth - contentElementWidth) / 2 ;

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