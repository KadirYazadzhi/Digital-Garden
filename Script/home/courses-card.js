class SlideLoader {
    constructor(jsonPath, containerId, glideSelector, topicsSelector) {
        this.jsonPath = jsonPath;
        this.containerId = containerId;
        this.glideSelector = glideSelector;
        this.topicsSelector = topicsSelector;
        this.maxCard = 18;
    }

    // Method to fetch course data from the JSON file
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

    cardCountAndDisplayAfterTopics(topics) {
        topics[3].innerHTML = this.maxCard;
    }

    // Method to render courses into the specified container
    renderCourses(courses) {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with ID "${this.containerId}" not found.`);
            return;
        }

        // Clear previous content
        container.innerHTML = "";

        // Render new cards
        courses.forEach((course, index) => {
            if (index > this.maxCard) return;

            const slide = document.createElement("li");
            slide.className = "glide__slide";
            slide.innerHTML = `
            <div class="card course-card" data-index="${index}">
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
        });
    }

    // Initialize Glide.js
    initializeGlide() {
        const glide = new Glide(this.glideSelector, {
            type: "carousel",
            perView: 3.5,
            focusAt: 0,
            autoplay: 4000,
            breakpoints: {
                800: { perView: 2 },
                480: { perView: 1 },
            },
        });

        glide.mount();

        // Pause autoplay on hover
        const cards = document.querySelectorAll(".course-card");
        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => glide.pause());
            card.addEventListener("mouseleave", () => glide.play());
        });
    }

    setupCardClickListeners(courses) {
        const cards = document.querySelectorAll('.course-card');
        cards.forEach(card => {
            const index = card.dataset.index; // Retrieve the correct index from data attributes
            card.addEventListener('click', () => {
                const activeCourse = courses[index].title;
                localStorage.setItem('activeCourseCard', activeCourse);
                window.location.href = 'course.html';
            });
        });
    }

    // Set up listeners for topic filtering
    setupTopicFilters(courses) {
        const topics = document.querySelectorAll(this.topicsSelector);
        topics.forEach((topic) => {
            topic.addEventListener("click", () => {
                if (!isNaN(topic.innerText.trim())) {
                    return;
                }

                document
                    .querySelector(".activeTopic")
                    .classList.remove("activeTopic");
                topic.classList.add("activeTopic");
                this.filterCourses(courses, topic.innerText);
            });
        });
    }

    // Filter courses based on selected topic
    filterCourses(courses, selectedTopic) {
        const filteredCourses =
            selectedTopic === "All"
                ? courses
                : courses.filter(
                    (course) =>
                        course.category &&
                        course.category.toLowerCase() ===
                        selectedTopic.toLowerCase()
                );

        // Re-render filtered courses
        this.renderCourses(filteredCourses);
        this.initializeGlide();
    }

    // Main method to load and display courses
    async load() {
        const courses = await this.fetchCourses();
        if (courses.length === 0) return;

        // Initial render
        this.renderCourses(courses);
        this.initializeGlide();
        this.setupCardClickListeners(courses);

        // Setup topic filters
        this.setupTopicFilters(courses);

        this.cardCountAndDisplayAfterTopics(document.querySelectorAll(this.topicsSelector), courses);
    }
}

// Instantiate and run the SlideLoader
document.addEventListener("DOMContentLoaded", () => {
    const slideLoader = new SlideLoader(
        "Json/courses.json",
        "courses",
        ".glide",
        ".topic"
    );
    slideLoader.load();
});
