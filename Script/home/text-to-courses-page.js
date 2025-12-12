class CourseRedirect {
    // Constructor to initialize the element and bind the event listener
    constructor(elementSelector) {
        this.element = document.querySelector(elementSelector); // Store the element for interaction
        this.init(); // Initialize the class functionality
    }

    // Method to bind the click event to the element
    init() {
        if (this.element) { // Ensure the element exists
            this.element.addEventListener("click", this.handleClick); // Bind the click event
        } else {
            console.error(`Element with selector ${elementSelector} not found.`); // Log error if the element is not found
        }
    }

    // Method to handle the click event and perform the redirection
    handleClick() {
        window.location.href = 'courses.html'; // Redirect to the courses page
    }
}

// Instantiate the CourseRedirect class when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const courseRedirect = new CourseRedirect(".small-course-text"); // Create a new instance with the selector for the text element
});
