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