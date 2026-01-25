// Main application class
class CourseApp {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
        this.activeCourse = localStorage.getItem("activeCourseCard");
        this.init();
    }

    // Initialize the application
    init() {
        this.loadCourses();
    }

    // Load course data from JSON
    loadCourses() {
        fetch(this.jsonPath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error loading JSON file");
                }
                return response.json();
            })
            .then((courses) => this.handleCourses(courses))
            .catch((error) => console.error("Error:", error.message));
    }

    // Process and render active course
    handleCourses(courses) {
        courses.forEach((course) => {
            if (course.title === this.activeCourse) {
                const courseRenderer = new CourseRenderer(course);
                courseRenderer.renderAllSections();
            }
        });
    }
}

// Class responsible for rendering course details
class CourseRenderer {
    constructor(course) {
        this.course = course;
    }

    // Render all sections for the course
    renderAllSections() {
        this.renderCertificateSection();
        this.renderBannerSection();
        this.renderSkillsSection();
        this.generateTopics();
        this.TopicCardManager();
        this.generateMiddleSection();
        this.renderPersonalExperienceSection();
        this.renderOrganizationSection();
        this.renderPriceSection()
    }

    // Render certificate section if applicable
    renderCertificateSection() {
        if (!this.course.haveCertificate || !this.course.certificateImage || this.course.certificateImage.length === 0) return;

        const certificateSection = document.querySelector(".certificate");
        if (!certificateSection) return;
        
        certificateSection.innerHTML = `
        <div class="certificate-card">
            <div class="image-box">
                <img src="${this.course.certificateImage[0]}" alt="${this.course.title}" class="active-image">
            </div>
        </div>
    `;

        // Append dynamically generated dots box
        const dotsBox = this.createDotsForCertificationSection();
        if (dotsBox) {
            certificateSection.querySelector(".certificate-card").appendChild(dotsBox);

            // Add event listeners for the dots
            this.addDotsEventListeners();
        }
    }

    createDotsForCertificationSection() {
        if (this.course.certificateImage.length <= 1) return;

        const dotsBox = document.createElement("div");
        dotsBox.className = "dot-box";

        for (let i = 0; i < this.course.certificateImage.length; i++) {
            const dotElement = document.createElement("div");
            dotElement.className = i === 0 ? "dot activeDot" : "dot";
            dotElement.dataset.index = i; // Save index for dot
            dotsBox.appendChild(dotElement);
        }

        return dotsBox;
    }

// Add event listeners for dots
    addDotsEventListeners() {
        const dots = document.querySelectorAll(".dot");
        const imageElement = document.querySelector(".image-box img");

        dots.forEach(dot => {
            dot.addEventListener("click", (event) => {
                // Get index of clicked dot
                const index = parseInt(event.target.dataset.index);

                // Update active dot
                document.querySelector(".activeDot").classList.remove("activeDot");
                dot.classList.add("activeDot");

                // Update active image
                imageElement.src = this.course.certificateImage[index];
            });
        });
    }

    // Render banner section
    renderBannerSection() {
        const bannerSection = document.querySelector(".top-banner-section");
        bannerSection.innerHTML = `
            <div class="top-banner">
                <div class="top-type-box"><p>Course</p></div>
                <h1 class="heading title">${this.course.title}</h1>
                <div class="icon-line-box">
                    <div class="icon-line"><i class="fa-solid fa-location-dot"></i><p>${this.course.location}</p></div>
                    <div class="icon-line"><i class="fa-regular fa-calendar"></i><p>${this.course.duration}</p></div>
                    <div class="icon-line"><i class="fa-solid ${this.course.iconType}"></i><p>${this.course.difficulty}</p></div>
                    <div class="icon-line"><i class="fa-solid fa-award"></i><p>${this.course.certificate}</p></div>
                </div>
                <div class="text-box"><p class="course-description">${this.course.moreDescription}</p></div>
            </div>
        `;
    }

    // Render skills section
    renderSkillsSection() {
        const skillsSection = document.querySelector(".skills");
        skillsSection.innerHTML = `
            <div class="skills-you-learn">
                <h3 class="course-sections-title skill-title">Skills you will acquire</h3>
                <div class="skills-card"></div>
            </div>
        `;

        this.renderSkills();
    }

    // Render individual skills
    renderSkills() {
        const skillsCardsBox = document.querySelector(".skills-card");

        this.course.skills.forEach((skill) => {
            const skillsBox = document.createElement('div');
            skillsBox.className = "skill-box";

            const skillIcon = document.createElement('i');
            skillIcon.className = "fa-solid fa-check";
            const skillText = document.createElement('p');
            skillText.textContent = skill;

            skillsBox.append(skillIcon, skillText);
            skillsCardsBox.append(skillsBox);
        });
    }

    // Generate topics section
    generateTopics() {
        const topicsContainer = document.querySelector(".course-topics-box");
        if (!topicsContainer) return console.error("Topics container not found");

        topicsContainer.innerHTML = `<h3 class="course-sections-title topics-title">Topics</h3>`;
        const cardsContainer = document.createElement("div");
        cardsContainer.className = "topics-cards";

        this.course.topics.forEach((topic, index) => {
            const card = this.createTopicCard(topic, index);
            
            // Hide topics after the 10th one on mobile
            if (index >= 10) {
                card.classList.add('mobile-hidden-topic');
            }
            
            cardsContainer.appendChild(card);
        });

        topicsContainer.appendChild(cardsContainer);

        // Add "Show More" button if topics exceed 10
        if (this.course.topics.length > 10) {
            const showMoreBtn = document.createElement("div");
            showMoreBtn.className = "show-more-topics-btn";
            showMoreBtn.innerHTML = `<p>Show More <i class="fa-solid fa-angle-down"></i></p>`;
            
            showMoreBtn.addEventListener("click", () => {
                const hiddenTopics = cardsContainer.querySelectorAll('.mobile-hidden-topic');
                hiddenTopics.forEach(topic => {
                    topic.classList.remove('mobile-hidden-topic');
                });
                showMoreBtn.style.display = 'none'; // Hide button after expanding
            });

            topicsContainer.appendChild(showMoreBtn);
        }
    }

    // Create individual topic cards
    createTopicCard(topic, index) {
        const card = document.createElement("div");
        card.className = "topic-card";

        const visiblePart = document.createElement("div");
        visiblePart.className = "visible-part";
        visiblePart.innerHTML = `<p>${topic}</p><i class="fa-solid fa-plus toggle-icon"></i>`;

        const hiddenPart = this.createHiddenPart(index);

        card.append(visiblePart, hiddenPart);
        return card;
    }

    TopicCardManager() {
        new TopicCardManager('.topic-card');
    }

    // Create hidden part for topics
    createHiddenPart(index) {
        const hiddenPart = document.createElement("div");
        hiddenPart.className = "hidden-part";

        const resources = ["Presentation", "Lab", "Exercise Repository"];
        const icons = ["fa-solid fa-file-powerpoint", "fa-solid fa-file-word", "fa-brands fa-github"];

        const topicLinks = this.course.topicsLinks[index] || [];
        if (!Array.isArray(topicLinks)) {
            hiddenPart.innerHTML = "<p>No links are available.</p>";
            return hiddenPart;
        }

        if (topicLinks.every((link) => !link)) {
            hiddenPart.innerHTML = "<p>There are no materials for this lecture.</p>";
            return hiddenPart;
        }

        topicLinks.forEach((link, i) => {
            if (!link) return;

            const anchor = document.createElement("a");
            anchor.href = link;
            anchor.target = "_blank";
            anchor.innerHTML = `
                <div class="hidden-card">
                    <i class="${icons[i]}"></i>
                    <p>${resources[i]}</p>
                </div>
            `;

            hiddenPart.appendChild(anchor);
        });

        return hiddenPart;
    }

    // Generate middle section
    generateMiddleSection() {
        const middleSection = document.querySelector(".middle-section");
        middleSection.innerHTML = `
            <div class="middle-box">
                <h3 class="course-sections-title middle-box-title">Who is the course suitable for?</h3>
                <p>${this.course.courseSuitableFor}</p>
            </div>
        `;
    }

    // Render personal experience section
    renderPersonalExperienceSection() {
        const section = document.querySelector(".personal-experience-section");
        section.innerHTML = `
            <div class="personal-experience-box">
                <h3 class="course-sections-title personal-experience-title">Personal Experience</h3>
                ${this.course.MyExperience.map((exp) => `<p>${exp}</p>`).join("")}
            </div>
        `;
    }

    // Render organization section
    renderOrganizationSection() {
        const section = document.querySelector(".organization-section");
        section.innerHTML = `
            <div class="organization-box">
                <h3 class="course-sections-title personal-experience-title">Educational Organization</h3>
                <div class="organization-card">
                    <div class="organization-logo-box"><img src="${this.course.educationalOrganization[0]}"></div>
                    <div class="organization-text"><p>${this.course.educationalOrganization[1]}</p></div>
                </div>
            </div>
        `;
    }

    renderPriceSection() {
        let price = parseInt(this.course.price);
        if (isNaN(price)) {
            price = 0;
        }

        const priceLv = price.toFixed(2);
        const priceEur = (price * 0.51).toFixed(2);
        const priceUsd = (price * 0.54).toFixed(2);

        const priceSection = document.querySelector(".price-section");
        priceSection.innerHTML = `
        <div class="price-boxes">
            <h3 class="price-section-title skill-title">Prices and Type</h3>
                
            <!-- Desktop View -->
            <div class="boxes desktop-view">
                <div class="price-box">
                    <i class="fa-solid fa-money-bill"></i>
                    <p>${priceLv} lv.</p>
                </div>
                <div class="price-box">
                    <i class="fa-solid fa-money-bill"></i>
                    <p>${priceEur} €</p>
                </div>
                <div class="price-box">
                    <i class="fa-solid fa-money-bill"></i>
                    <p>${priceUsd} $</p>
                </div>
        
                <div class="type-box">
                    <i class="fa-solid fa-globe"></i>
                    <p>Online</p>
                </div>
            </div>

            <!-- Mobile View -->
            <div class="boxes mobile-view">
                <div class="type-box mobile-card">
                    <i class="fa-solid fa-globe"></i>
                    <p>Online</p>
                </div>

                <div class="price-box mobile-card custom-dropdown-container">
                    <i class="fa-solid fa-money-bill"></i>
                    
                    <div class="custom-select-wrapper">
                        <div class="custom-select-trigger">
                            <span>${priceEur} €</span>
                            <i class="fa-solid fa-chevron-down arrow"></i>
                        </div>
                    </div>
                    
                    <div class="custom-options">
                        <span class="custom-option selected" data-value="${priceEur} €">${priceEur} €</span>
                        <span class="custom-option" data-value="${priceLv} lv.">${priceLv} lv.</span>
                        <span class="custom-option" data-value="${priceUsd} $">${priceUsd} $</span>
                    </div>
                </div>
            </div>
        </div>        
        `
        
        // Initialize custom dropdown logic immediately after rendering
        this.initCustomDropdown();
    }

    initCustomDropdown() {
        const container = document.querySelector('.custom-dropdown-container');
        if (!container) return;
        
        const trigger = container.querySelector('.custom-select-wrapper'); // The clickable area inside the card
        const optionsContainer = container.querySelector('.custom-options');
        const options = container.querySelectorAll('.custom-option');
        const triggerText = container.querySelector('.custom-select-trigger span');
        const arrow = container.querySelector('.arrow');

        // Toggle dropdown on click
        container.addEventListener('click', (e) => {
            // Check if clicking inside options to avoid double toggle
            if (e.target.closest('.custom-options')) return;
            
            container.classList.toggle('open');
            e.stopPropagation();
        });

        // Handle selection
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Update text
                triggerText.textContent = this.textContent;
                
                // Update active styling
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Close dropdown
                container.classList.remove('open');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                container.classList.remove('open');
            }
        });
    }
}

// Start the application
document.addEventListener("DOMContentLoaded", () => new CourseApp("Json/courses.json"));

