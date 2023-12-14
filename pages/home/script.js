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

// -------FAVORITE_COFFEE SECTION 3------------
const slider = document.querySelector('.slider');
const cards = document.querySelectorAll('.card');
const nextArrow = document.querySelector('.arrow.next');
const prevArrow = document.querySelector('.arrow.prev');

const controls = document.querySelectorAll('.control');

document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;

    nextArrow.addEventListener('click', function () {
        if (currentIndex < 2) {
            currentIndex++;
        }
        updateSlider();
    });

    nextArrow.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateSlider();
    });

    function updateSlider() {
        const translateValue = -currentIndex * 75 + '%';
        slider.style.transform = `translateX(${translateValue})`;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0; // Initialize the currentIndex variable

    nextArrow.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
        updateControls();
    });

    prevArrow.addEventListener('click', function () {
        currentIndex = currentIndex < 1 ? 0 : (currentIndex - 1) % cards.length;
        updateSlider();
        updateControls();
    });

    function updateSlider() {
        const translateValue = -currentIndex * 75 + '%';
        slider.style.transform = `translateX(${translateValue})`;
    }

    function updateControls() {
        // Remove darker class from all controls
        controls.forEach((control) => control.classList.remove('darker'));
        // Add darker class to the control corresponding to the current card
        controls[currentIndex].classList.add('darker');
    }
});
// -------//FAVORITE_COFFEE SECTION 3------------

// -------//SELF ASSESSMENT------------

console.groupCollapsed(
    '%c Checking validation of pages: +16 ',
    'color:MediumSeaGreen; font-weight: 900;',
);
console.log('Checking validation of pages ... +12');
console.log('Favicon is added to each page ... +4');
console.groupEnd();

console.groupCollapsed(
    '%c The layout matches the design +42',
    'color:MediumSeaGreen; font-weight: 900;',
);
console.log('<header> block on each page ... +6');
console.log('Enjoy block on home page ... +6');
console.log('Favorites Coffee block on home page ... +6');
console.log('About block on home page ... +6');
console.log('Mobile App block on home page ... +6');
console.log('Menu block on menu page ... +6');
console.log('<footer> block on each page ... +6');
console.groupEnd();

console.groupCollapsed(
    '%c CSS Requirements +10 ',
    'color:MediumSeaGreen; font-weight: 900;',
);
console.log(
    'For positioning images in About block on home page and products in Menu block on menu page used Flexbox or Grid Layout... +4',
);
console.log(
    'When scaling the browser page (<100%) or increasing the page width (>1440px), the layout of both pages is centered rather than shifted to the side and not stretched across the entire width ... +4',
);
console.log(
    'The background color Body stretches across the entire width of the page ... +2',
);

console.groupEnd();

console.groupCollapsed(
    '%c Interactivity +32 ',
    'color:MediumSeaGreen; font-weight: 900;;',
);
console.log(
    'Navigation elements (except Contacts) lead to corresponding blocks on home page (anchor links) ... +4',
);
console.log(
    'Contacts in navigation panel links to the <footer> block on its own page (anchor link) ... +2',
);
console.log('Smooth scrolling with anchor links ... +2');
console.log(
    'When clicking on the Menu buttons in header and Enjoy block on home page, it navigates to the menu page ... +2',
);
console.log('The Menu button in header on menu page is non-interactive ... +2');
console.log(
    'When clicking on the Logo in header, it navigates to the home page ... +2',
);
console.log(
    'The active Coffee button in Menu block of Menu page is non-interactive ... +2',
);
console.log(
    'Each Coffee-card in the Menu section of the Menu page is interactive when hovering over any area of the card ... +4',
);
console.log(
    'In the <footer> block, clicking on the link with phone number (all area including icon) should initiate a phone call ... +2',
);
console.log(
    'In the <footer> block, clicking on the link with the address (all area including icon) should open a new browser tab with Google Maps displaying any location of your choice ... +2',
);
console.log(
    "Interactivity of links and buttons is implemented according to Figma layout. Interactivity includes not only changing cursor's appearance, for example, using the cursor: pointer property, but also the use of other visual effects, such as changing the background color or font color, following the Styleguide in Figma layout ... +4",
);
console.log(
    'Mandatory requirement for interactivity: smooth change in the appearance of an element on hover and click, without affecting adjacent elements ... +4',
);
console.groupEnd();

// Add more groups for other criteria...

// Calculate total points
const totalPoints =
    12 +
    4 +
    (6 + 6 + 6 + 6 + 6 + 6 + 6) +
    (4 + 4 + 2) +
    (4 + 2 + 2 + 2 + 2 + 2 + 2 + 4 + 2 + 2 + 4 + 4);
console.log(`Total Points: ${totalPoints}`);
