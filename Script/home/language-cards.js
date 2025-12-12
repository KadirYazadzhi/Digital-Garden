class LanguageCardManager {
    constructor(cardSelector, storageKey, redirectUrl) {
        this.cards = document.querySelectorAll(cardSelector); // Select all language cards
        this.storageKey = storageKey; // Key for storing the active language in localStorage
        this.redirectUrl = redirectUrl; // URL to redirect to upon selection
    }

    // Initialize the event listeners
    init() {
        this.cards.forEach(card => {
            card.addEventListener("click", () => this.handleCardClick(card));
        });
    }

    // Handle card click events
    handleCardClick(card) {
        const languageName = this.getLanguageName(card); // Get language name from the card
        if (languageName) {
            this.saveActiveLanguage(languageName); // Save to localStorage
            this.redirect(); // Redirect to another page
        } else {
            console.error("Language name not found."); // Log error if element is missing
        }
    }

    // Get the language name from a card
    getLanguageName(card) {
        const element = card.querySelector(".heading-xs");
        return element ? element.textContent : null; // Return text content or null if not found
    }

    // Save the active language to localStorage
    saveActiveLanguage(language) {
        localStorage.setItem(this.storageKey, language);
    }

    // Redirect to the specified URL
    redirect() {
        window.location.href = this.redirectUrl;
    }
}

// Usage
const manager = new LanguageCardManager(
    ".language-card", // Selector for the language cards
    "activeLanguage", // Key for localStorage
    "language.html" // Redirect URL
);
manager.init(); // Initialize the card manager
