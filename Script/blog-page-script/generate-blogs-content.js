class BlogGenerator {
    // Constructor initializes paths and containers for the blog
    constructor(jsonPath, topContainerSelector, mainContainerSelector) {
        this.jsonPath = jsonPath; // Path to the JSON file
        this.topContainer = document.querySelector(topContainerSelector); // Container for the top section
        this.mainContainer = document.querySelector(mainContainerSelector); // Container for the main content
        this.blogData = null; // Placeholder for blog data
    }

    // Fetch blog data from the JSON file
    async fetchBlogData() {
        try {
            const response = await fetch(this.jsonPath); // Fetch the JSON file
            if (!response.ok) {
                throw new Error(`Failed to fetch blog data: ${response.status}`); // Handle HTTP errors
            }
            return await response.json(); // Parse and return the JSON data
        } catch (error) {
            console.error("Error fetching blog data:", error); // Log any errors
            return null; // Return null in case of an error
        }
    }

    // Load the blog by fetching data and generating the top section
    async load() {
        this.blogData = await this.fetchBlogData(); // Fetch the blog data
        if (!this.blogData || !this.blogData.blog) {
            console.error("Error: Invalid blog data structure."); // Check for valid structure
            return;
        }
        this.generateTopSection(); // Generate the top section
    }

    // Generate the top section of the blog
    generateTopSection() {
        const topSection = this.blogData.blog[`topSection-${this.getLocalStorageElement()}`]; // Access the correct section

        if (!topSection) {
            console.error(`Error: No data found for key ${topSectionKey}.`);
            return;
        }

        this.topContainer.innerHTML = `
        <div class="top-banner">
            <div class="top-type-box"><p>${topSection.type}</p></div>
            <h1 class="heading title">${topSection.title}</h1>
            <div class="icon-line-box">
                <div class="icon-line"><i class="fa-regular fa-calendar"></i><p>${topSection.date}</p></div>
                <div class="icon-line"><i class="fa-regular fa-clock"></i><p>${topSection.time}</p></div>
                <div class="icon-line"><i class="fa-regular fa-user"></i><p>${topSection.author}</p></div>
            </div>
            <div class="text-box">
                <p class="course-description">${topSection.description}</p>
            </div>
        </div>`;
    }

    getLocalStorageElement() {
        // 1. Check URL Params
        const urlParams = new URLSearchParams(window.location.search);
        const idFromUrl = urlParams.get('id');

        if (idFromUrl && !isNaN(idFromUrl)) {
            localStorage.setItem("activeBlog", idFromUrl);
            return idFromUrl;
        }

        // 2. Fallback to LocalStorage
        const activeBlog = localStorage.getItem("activeBlog");

        if (!activeBlog || isNaN(activeBlog)) {
            console.warn("Invalid or missing activeBlog. Redirecting...");
            window.location.href = 'index.html';
            return null;
        }

        return activeBlog;
    }

    // Load a single HTML fragment from the specified file path
    async loadFragment(filePath) {
        try {
            const response = await fetch(filePath); // Fetch the HTML fragment
            if (!response.ok) {
                throw new Error(`Failed to load fragment: ${response.status}`); // Handle HTTP errors
            }
            const html = await response.text(); // Read the HTML content

            const wrapper = document.createElement("div"); // Create a wrapper for the fragment
            wrapper.innerHTML = html; // Set the fragment's content
            this.mainContainer.appendChild(wrapper.firstElementChild); // Append to the main container
        } catch (error) {
            console.error(`Error loading fragment from ${filePath}:`, error); // Log errors
        }

        highlightCode(); // Highlight code after loading the fragment
        setWidthForCodeElementsForPhone();
    }

    // Load all HTML fragments that match the active blog from localStorage
    async loadAllFragments(fragmentPaths) {
        for (const path of fragmentPaths) {
            if (path.includes(`blog-${this.getLocalStorageElement()}`)) { // Match the active blog's file path
                await this.loadFragment(path); // Load the matching fragment
            }
        }
    }
}

// Instantiate and initialize the BlogGenerator on DOM content load
document.addEventListener("DOMContentLoaded", () => {
    const blogGenerator = new BlogGenerator(
        "Json/blogs-top-section.json", // Path to the JSON file
        ".top-banner-section", // Selector for the top section container
        ".main-section" // Selector for the main content container
    );

    blogGenerator.load(); // Load the blog data and generate the top section

    const fragments = [
        "Templates/Blogs/blog-1.html", // Path to blog 1's HTML fragment
        "Templates/Blogs/blog-2.html", // Path to blog 2's HTML fragment
        "Templates/Blogs/blog-3.html"  // Path to blog 3's HTML fragment
    ];

    blogGenerator.loadAllFragments(fragments); // Load all relevant fragments
});
