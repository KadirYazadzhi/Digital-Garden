class SlideLoader {
    constructor(jsonPath, containerId, pageNumberContainer, sortingContainerSelector) {
        this.jsonPath = jsonPath;
        this.containerId = containerId;
        this.pagesChangerContainer = document.querySelector(pageNumberContainer);
        this.sortingContainers = document.querySelectorAll(sortingContainerSelector);
        
        this.desktopMaxPerPage = 16; // Configuration for desktop
        this.maxCoursePerPage = this.desktopMaxPerPage; // Default initialization
        
        this.currentPage = 1;
        this.courses = [];
        this.filteredCourses = []; // Store filtered courses

        // Listen for resize to adjust cards per page dynamically
        window.addEventListener('resize', () => {
            this.updateMaxPerPage();
        });
    }

    // Update cards per page based on screen width
    updateMaxPerPage() {
        const isMobile = window.innerWidth <= 768;
        const newMax = isMobile ? Math.floor(this.desktopMaxPerPage / 2) : this.desktopMaxPerPage;
        
        // Only re-render if the value actually changed
        if (this.maxCoursePerPage !== newMax) {
            this.maxCoursePerPage = newMax;
            this.currentPage = 1; // Reset to page 1 to avoid out-of-bounds issues
            this.renderCourses();
        }
    }

    // Fetch course data from the JSON file
    async fetchCourses() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`Failed to fetch courses: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching courses:", error);
            return [];
        }
    }

    // Helper method to scroll to top on mobile
    scrollToTopOnMobile() {
        if (window.innerWidth <= 768) {
            const container = document.getElementById(this.containerId);
            if (container) {
                // Scroll to the container with a bit of offset (e.g., for navbar)
                const yOffset = -100; 
                const y = container.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    }

    // Generate page number changers and arrow listeners
    generatePagesNumberChanger() {
        const totalPages = Math.ceil(this.filteredCourses.length / this.maxCoursePerPage);
        const numbersContainer = this.pagesChangerContainer;
        const numbersElement = numbersContainer.querySelector(".numbers");
        numbersElement.innerHTML = ""; // Clear existing page numbers

        // Generate page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageNumberBox = document.createElement("div");
            pageNumberBox.classList.add("page-number-box");
            if (i === this.currentPage) pageNumberBox.classList.add("active-page");

            const text = document.createElement("p");
            text.innerText = i.toString();
            pageNumberBox.appendChild(text);
            numbersElement.appendChild(pageNumberBox);

            // Add click listener to change page
            pageNumberBox.addEventListener("click", () => {
                this.currentPage = i;
                this.renderCourses();
                this.scrollToTopOnMobile();
            });
        }

        // Add event listeners for arrows
        const leftDoubleArrow = numbersContainer.querySelector(".fa-angles-left");
        const leftSingleArrow = numbersContainer.querySelector(".fa-chevron-left");
        const rightSingleArrow = numbersContainer.querySelector(".fa-chevron-right");
        const rightDoubleArrow = numbersContainer.querySelector(".fa-angles-right");

        // Use helper to avoid duplication
        const changePage = (newPage) => {
            this.currentPage = newPage;
            this.renderCourses();
            this.scrollToTopOnMobile();
        };

        // Remove old listeners to prevent stacking (cloning the element is a quick way to clear listeners)
        // However, since generatePagesNumberChanger is called on render, we need to be careful not to attach multiple listeners to static arrows if they are outside numbersElement.
        // Wait, the arrows seem to be static in HTML. Let's look at the structure.
        // The arrows are siblings of .numbers.
        
        // Better approach: Assign onclick directly to avoid stacking listeners or check if listener exists.
        // Or simply clone the parent of the arrow to clear listeners.
        
        // Since we are re-running this function every render, we MUST handle the event listeners on the arrows carefully.
        // The current implementation adds new listeners every time renderCourses is called! This is a bug in the original code.
        // I will fix this by cloning the arrows to remove old listeners before adding new ones.

        this.replaceAndAddListener(leftDoubleArrow.parentElement, () => changePage(1));
        this.replaceAndAddListener(leftSingleArrow.parentElement, () => {
             if (this.currentPage > 1) changePage(this.currentPage - 1);
        });
        this.replaceAndAddListener(rightSingleArrow.parentElement, () => {
             if (this.currentPage < totalPages) changePage(this.currentPage + 1);
        });
        this.replaceAndAddListener(rightDoubleArrow.parentElement, () => changePage(totalPages));
    }

    // Helper to replace element to clear listeners and add new one
    replaceAndAddListener(element, callback) {
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        newElement.addEventListener("click", callback);
    }

    // Render courses for the current page
    renderCourses() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with ID "${this.containerId}" not found.`);
            return;
        }

        container.innerHTML = ""; // Clear previous content

        const startIndex = (this.currentPage - 1) * this.maxCoursePerPage;
        const endIndex = Math.min(startIndex + this.maxCoursePerPage, this.filteredCourses.length);

        for (let i = startIndex; i < endIndex; i++) {
            const course = this.filteredCourses[i];
            const slide = document.createElement("li");
            slide.className = "card-box";
            slide.innerHTML = `
            <div class="card course-card" data-index="${i}">
                <div class="course-card-top">
                    <div class="topic-card">
                        <p class="topic-small-text">${course.category}</p>
                    </div>
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-card-medium">
                    <h1 class="heading-xs">${course.title}</h1>
                    <p class="paragraph-small course-text">${course.description}</p>
                </div>
                <div class="course-card-bottom">
                    <ul class="course-card-list">
                        <li><i class="fa-solid fa-location-dot"></i> ${course.location}</li>
                        <li><i class="fa-regular fa-calendar"></i> ${course.duration}</li>
                    </ul>
                    <ul class="course-card-list">
                        <li><i class="fa-solid ${course.iconType}"></i> ${course.difficulty}</li>
                        <li><i class="fa-solid fa-award"></i> ${course.certificate}</li>
                    </ul>
                </div>
            </div>
            `;
            container.appendChild(slide);
        }

        this.generatePagesNumberChanger();
        this.setupCardClickListeners();
    }


    setupCardClickListeners() {
        const cards = document.querySelectorAll('.course-card');
        cards.forEach(card => {
            const index = card.dataset.index; // Retrieve the correct index from data attributes
            card.addEventListener('click', () => {
                const activeCourse = this.filteredCourses[index].title;
                localStorage.setItem('activeCourseCard', activeCourse);
                window.location.href = 'course.html';
            });
        });
    }

    // Apply filters based on active sorting options
    applyFilters() {
        this.filteredCourses = this.courses;

        this.sortingContainers.forEach(container => {
            const activeBoxes = container.querySelectorAll(".active-box");
            if (activeBoxes.length > 0 && !activeBoxes[0].innerText.includes("All")) {
                const filterCriteria = Array.from(activeBoxes).map(box => box.innerText.trim());

                this.filteredCourses = this.filteredCourses.filter(course => {
                    // Check category, difficulty, certificate first
                    const matchesCategory = filterCriteria.includes(course.category);
                    const matchesDifficulty = filterCriteria.includes(course.difficulty);
                    const matchesCertificate = filterCriteria.includes(course.certificate);

                    // Convert duration to months and check if it matches any filter
                    const courseDurationInMonths = this.parseDuration(course.duration);

                    let matchesDuration = null;

                    // Check if we have a duration filter (e.g. "< 1 month" or "> 2 months")
                    if (filterCriteria.some(f => f.startsWith(">"))) {
                        const filter = filterCriteria.find(f => f.startsWith(">"));
                        const duration = parseFloat(filter.split(" ")[1]); // Extract number after ">"
                        matchesDuration = !isNaN(courseDurationInMonths) && courseDurationInMonths > duration;
                    } else if (filterCriteria.some(f => f.startsWith("<"))) {
                        const filter = filterCriteria.find(f => f.startsWith("<"));
                        const duration = parseFloat(filter.split(" ")[1]); // Extract number after "<"
                        matchesDuration = !isNaN(courseDurationInMonths) && courseDurationInMonths <= duration;
                    }

                    return (matchesCategory || matchesDifficulty || matchesCertificate || matchesDuration);
                });
            }
        });

        this.currentPage = 1; // Reset to the first page after filtering
        this.renderCourses();
    }

    // Parse duration (e.g., "1 month", "3 weeks", "1-3 months")
    parseDuration(duration) {
        if (!duration) return NaN;

        // Check if the duration is in months
        if (duration.includes("month") && !duration.includes("months")) {
            const months = parseFloat(duration);
            return isNaN(months) ? NaN : months;
        }
        // Check if the duration is in weeks
        if (duration.includes("week")) {
            const weeks = parseFloat(duration);
            const months = weeks / 4; // Convert weeks to months
            return isNaN(months) ? NaN : months;
        }
        // Handle ranges like "1-3 months"
        const rangeMatch = duration.match(/^(\d+)-(\d+) months$/);
        if (rangeMatch) {
            const min = parseFloat(rangeMatch[1]);
            const max = parseFloat(rangeMatch[2]);

            const result = min + max / 2 + 1;
            return isNaN(result) ? NaN : result;
        }

        return NaN;
    }

    // Setup click listeners for the sorting buttons
    setupSortingListeners() {
        this.sortingContainers.forEach(container => {
            container.addEventListener("click", () => this.applyFilters());
        });
    }

    setupSearchListener() {
        const searchField = document.querySelector('.search-field input');
        if (!searchField) {
            console.error('Search field with class "search-field" not found.');
            return;
        }

        searchField.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();

            if (searchTerm.length >= 2) {
                this.filteredCourses = this.courses.filter(course => {
                    return (
                        course.title.toLowerCase().includes(searchTerm) ||
                        course.description.toLowerCase().includes(searchTerm) ||
                        course.category.toLowerCase().includes(searchTerm) ||
                        course.difficulty.toLowerCase().includes(searchTerm) ||
                        course.certificate.toLowerCase().includes(searchTerm) ||
                        course.location.toLowerCase().includes(searchTerm)
                    );
                });
            } else {
                this.filteredCourses = this.courses;
            }

            this.currentPage = 1;
            this.renderCourses();
        });
    }

    // Main method to load and display courses
    async load() {
        this.courses = await this.fetchCourses();
        if (this.courses.length === 0) return;

        this.filteredCourses = this.courses; // Initially, all courses are shown
        this.setupSortingListeners(); // Initialize sorting listeners
        this.setupSearchListener(); // Initialize search listener
        
        this.updateMaxPerPage(); // Set initial items per page based on screen size (will also trigger renderCourses)
    }
}

// Instantiate and run the SlideLoader
document.addEventListener("DOMContentLoaded", () => {
    const slideLoader = new SlideLoader(
        "Json/courses.json",
        "courses-cards-section",
        ".numbers-container",
        ".sorting-box-container"
    );
    slideLoader.load();
});

