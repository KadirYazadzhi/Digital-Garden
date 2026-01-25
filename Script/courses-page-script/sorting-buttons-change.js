class SortingManager {
    constructor(containerSelector) {
        this.sortingContainers = document.querySelectorAll(containerSelector);
        this.initialize();
    }

    // Initialize event listeners for each sorting group
    initialize() {
        this.sortingContainers.forEach(container => {
            const allBox = container.querySelector(".sorting-box:first-child");
            const otherBoxes = Array.from(container.querySelectorAll(".sorting-box")).slice(1);

            container.addEventListener("click", (event) => this.handleClick(event, allBox, otherBoxes));
        });

        // Initialize mobile dropdown listeners
        const mobileFilters = document.querySelectorAll('.mobile-filter');
        mobileFilters.forEach(select => {
            select.addEventListener('change', (e) => this.handleMobileChange(e));
        });
    }

    // Handle changes from mobile select dropdowns
    handleMobileChange(e) {
        const select = e.target;
        const targetClass = select.dataset.target; // e.g., "type-sorting"
        const selectedValue = select.value;
        
        // Find the corresponding desktop container
        const container = document.querySelector(`.sorting-box-container.${targetClass}`);
        if (!container) return;

        // Find all boxes
        const boxes = Array.from(container.querySelectorAll('.sorting-box'));
        const allBox = boxes[0];
        const otherBoxes = boxes.slice(1);

        // Reset logic: Clear current active state to mimic single-select behavior of dropdown
        allBox.classList.remove('active-box');
        otherBoxes.forEach(b => b.classList.remove('active-box'));

        if (selectedValue === "All" || selectedValue.includes("All")) {
            allBox.classList.add('active-box');
        } else {
            // Find the specific box matching the value
            // Note: innerText might have extra spaces, so trim
            const targetBox = otherBoxes.find(b => b.innerText.trim() === selectedValue);
            if (targetBox) {
                targetBox.classList.add('active-box');
            }
        }

        // Trigger logic to update filtered courses
        // SortingManager handles UI state (classes), but SlideLoader applies the filter.
        // SlideLoader listens for click on the container.
        // We dispatch a click event so SlideLoader knows to re-filter.
        // We ensure event.target is the container so SortingManager's handleClick ignores it (it needs .sorting-box target)
        container.dispatchEvent(new Event('click'));
    }

    // Handle the click event for sorting boxes
    handleClick(event, allBox, otherBoxes) {
        const clickedBox = event.target.closest(".sorting-box");
        if (!clickedBox) return;

        if (clickedBox === allBox) {
            // If "All" is clicked, deactivate all others and activate "All"
            this.activateAll(allBox, otherBoxes);
        } else {
            // Toggle the clicked box and handle group activation logic
            clickedBox.classList.toggle("active-box");
            this.handleGroupState(allBox, otherBoxes);
        }
    }

    // Activate "All" and deactivate all other boxes
    activateAll(allBox, otherBoxes) {
        allBox.classList.add("active-box");
        otherBoxes.forEach(box => box.classList.remove("active-box"));
    }

    // Handle the activation/deactivation logic for the group
    handleGroupState(allBox, otherBoxes) {
        const anyActive = otherBoxes.some(box => box.classList.contains("active-box"));

        if (!anyActive) {
            // If no boxes are active, activate "All"
            this.activateAll(allBox, otherBoxes);
        } else {
            // If any are active, ensure "All" is deactivated
            allBox.classList.remove("active-box");

            const allActive = otherBoxes.every(box => box.classList.contains("active-box"));
            if (allActive) {
                // If all are active, reset to "All"
                this.activateAll(allBox, otherBoxes);
            }
        }
    }
}

// Instantiate the SortingManager for the given selector
document.addEventListener("DOMContentLoaded", () => {
    new SortingManager(".sorting-box-container");
});
