class FAQManager {
    constructor() {
        // Select all FAQ cards on the page
        this.faqCards = document.querySelectorAll(".faq-card");
        // Initialize the FAQ functionality
        this.init();
    }

    init() {
        // Add event listeners to each FAQ card
        this.faqCards.forEach(card => {
            const toggleButton = card.querySelector(".faq-top-card i");
            const hiddenCard = card.querySelector(".faq-hidden-card");

            toggleButton.addEventListener("click", () => this.toggleCard(card));
        });
    }

    toggleCard(selectedCard) {
        // Close all FAQ cards except the selected one
        this.faqCards.forEach(card => {
            const hiddenCard = card.querySelector(".faq-hidden-card");
            const toggleButton = card.querySelector(".faq-top-card i");

            if (card !== selectedCard) {
                this.closeCard(hiddenCard, toggleButton);
            }
        });

        // Toggle the selected card's state
        const hiddenCard = selectedCard.querySelector(".faq-hidden-card");
        const toggleButton = selectedCard.querySelector(".faq-top-card i");

        if (hiddenCard.style.display === "block") {
            this.closeCard(hiddenCard, toggleButton);
        } else {
            this.openCard(hiddenCard, toggleButton);
        }
    }

    openCard(hiddenCard, toggleButton) {
        // Open the given FAQ card
        hiddenCard.style.display = "block";
        toggleButton.classList.remove("fa-plus");
        toggleButton.classList.add("fa-minus");
    }

    closeCard(hiddenCard, toggleButton) {
        // Close the given FAQ card
        hiddenCard.style.display = "none";
        toggleButton.classList.remove("fa-minus");
        toggleButton.classList.add("fa-plus");
    }
}

// Initialize the FAQManager after the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    new FAQManager();
});