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
