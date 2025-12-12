class ProgressBar {
    constructor(element) {
        // Store the main element and its child elements
        this.element = element;
        this.procentTextElement = this.element.querySelector(".procent-text");
        this.filledBar = this.element.querySelector(".filled-bar");
        
        // Initialize the progress bar on creation
        this.init();
    }

    // Method to initialize the progress bar
    init() {
        const procentValue = this.getProcentValue();
        this.setFilledBarWidth(procentValue);
        this.setBackgroundColor();
    }

    // Method to retrieve the percentage value from the text element
    getProcentValue() {
        // Parse the percentage value from the text content
        return parseInt(this.procentTextElement.innerText);
    }

    // Method to set the width of the filled bar based on the percentage value
    setFilledBarWidth(value) {
        this.filledBar.style.width = `${value}%`;
    }

    // Method to set the background color of the diagram body
    setBackgroundColor() {
        // Set a light background color for the progress bar container
        this.filledBar.parentElement.style.backgroundColor = "rgba(35, 174, 98, 0.2)";
    }
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the 'diagram' class
    const diagrams = document.querySelectorAll(".diagram");
    
    // Create a ProgressBar instance for each diagram
    diagrams.forEach(diagram => {
        new ProgressBar(diagram);
    });
});
