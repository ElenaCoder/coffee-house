let selectedSizeItem = 's-size';

export function resetSelectedSizeItem (){
    selectedSizeItem = 's-size';
}

export function updateTotalPrice(modalElement, item) {
    item = modalElement.querySelector('.total-result').dataset.priceinitial;

    // Check if a 'Size' option is selected
    if (selectedSizeItem) {
        // Calculate the total price based on the selected 'Size' option
        let totalPrice = parseFloat(item);

        // Update the total price based on the selected 'Size' option
        if (selectedSizeItem === 'm-size') {
            totalPrice += 0.5;
        } else if (selectedSizeItem === 'l-size') {
            totalPrice += 1.0;
        }

        // Add $0.50 for each selected 'Additives' option
        const selectedAdditives = modalElement.querySelectorAll(
            '.additive-option.active',
        );

        selectedAdditives.forEach((additive) => {
            totalPrice += 0.5;
        });

        // Update the total price in the modal
        const totalResult = modalElement.querySelector('.total-result');
        totalResult.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

export function attachSizeEventListeners(tabsContainer, initialTotal) {
    tabsContainer.addEventListener('click', function (event) {
        const tabsContainer = event.currentTarget;
        const clickedTargetElement = event.target;
        const sizeButton = clickedTargetElement.closest('.size-option');
        const sizeButtons = sizeButton
            ?.closest('.size-btn-block')
            .querySelectorAll('.size-option');

        const currentItemTotal = sizeButton
            ?.closest('.size-btn-block')
            .parentElement.querySelector('.total-result')
            .innerHTML.split('$')[1];

        const modalWindow =
            sizeButton?.parentElement.parentElement.parentElement.parentElement
                .parentElement;

        if (sizeButton) {
            // Remove the 'active' class from all size buttons
            sizeButtons.forEach((button) => {
                button.classList.remove('active');
            });

            // Update the selected 'Size' option
            selectedSizeItem = sizeButton.dataset.offer;

            // Add the 'active' class to the clicked size button
            sizeButton.classList.add('active');

            // Update the total price
            updateTotalPrice(modalWindow, initialTotal);
        }
    });
}

export function attachAdditivesEventListeners(tabsContainer, initialTotal) {
    tabsContainer.addEventListener('click', function (event) {
        const additiveButton = event.target.closest('.additive-option');
        const modalWindow =
            additiveButton?.parentElement.parentElement.parentElement
                .parentElement.parentElement;

        const currentItemTotal = additiveButton
            ?.closest('.additives-btn-block')
            .parentElement.querySelector('.total-result')
            .innerHTML.split('$')[1];

        if (additiveButton) {
            // Toggle the 'active' class for the selected 'Additives' option
            additiveButton.classList.toggle('active');

            // Update the total price
            updateTotalPrice(modalWindow, initialTotal);
        }
    });
}
