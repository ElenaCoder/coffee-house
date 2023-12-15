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
        let translateValue;
        const isDesktopScreen = window.innerWidth >= 1440;
        const isTabletScreen = window.innerWidth <= 1430 &&  window.innerWidth >= 768;
        const isMobileScreen = window.innerWidth <= 767 &&  window.innerWidth >= 380;
        const isLessMobileScreen = window.innerWidth <= 379;
        if (isDesktopScreen) {
            translateValue = -currentIndex * 75 + '%';
            // console.log(window.innerWidth, translateValue);
        } else if(isTabletScreen) {
            translateValue = -currentIndex * 85 + '%';
        } else if(isMobileScreen || isLessMobileScreen) {
            translateValue = -currentIndex * 95 + '%';
        }
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
        let translateValue;
        const isDesktopScreen = window.innerWidth >= 1440;
        const isTabletScreen = window.innerWidth <= 1430 &&  window.innerWidth >= 768;
        const isMobileScreen = window.innerWidth <= 767 &&  window.innerWidth >= 380;
        const isLessMobileScreen = window.innerWidth <= 379;
        if (isDesktopScreen) {
            translateValue = -currentIndex * 75 + '%';
            // console.log(window.innerWidth, translateValue);
        } else if(isTabletScreen) {
            translateValue = -currentIndex * 85 + '%';
        } else if(isMobileScreen) {
            translateValue = -currentIndex * 100 + '%';
        } else {
            translateValue = -currentIndex * 135 + '%';
        }
        slider.style.transform = `translateX(${translateValue})`;
    }

    function updateControls() {
        // Remove darker class from all controls
        controls.forEach((control) => control.classList.remove('darker'));
        // Add darker class to the control corresponding to the current card
        controls[currentIndex].classList.add('darker');
    }
});

