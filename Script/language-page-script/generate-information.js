class LanguagePage {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
        this.activeCourse = localStorage.getItem("activeLanguage");
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
            if (course.name === this.activeCourse) {
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
        this.renderLanguageContainer();
    }

    // Render the language container with details
    renderLanguageContainer() {
        const container = document.createElement("div");
        container.classList.add("language-container");

        const topContainer = document.createElement("div");
        topContainer.classList.add("top-container");

        const title = document.createElement("h1");
        title.classList.add("top-section-title");
        title.textContent = this.course.name;

        const link = document.createElement("a");
        link.classList.add("link");
        link.href = this.course.officialDocumentationLink;

        const documentationBtn = document.createElement("div");
        documentationBtn.classList.add("documentation-btn");

        const docText = document.createElement("p");
        docText.textContent = "Official Documentation";

        const docIcon = document.createElement("i");
        docIcon.classList.add("fa-solid", "fa-book");

        documentationBtn.appendChild(docText);
        documentationBtn.appendChild(docIcon);

        link.appendChild(documentationBtn);
        topContainer.appendChild(title);
        topContainer.appendChild(link);

        container.appendChild(topContainer);

        this.renderSmallSpecifications(container);

        const description = document.createElement("p");
        description.classList.add("language-text");
        description.textContent = this.course.description;

        container.appendChild(description);

        // Find the section with class 'top-language-bar' and append the container
        const section = document.querySelector(".section.top-language-bar .container");
        if (section) {
            section.appendChild(container);
        } else {
            console.error("Section with class 'top-language-bar' or its container not found.");
        }
    }

    // Render the small specification boxes
    renderSmallSpecifications(container) {
        const specBox = document.createElement("div");
        specBox.classList.add("languages-small-specification-box");

        this.addSmallSpecification(specBox, "fa-regular fa-calendar", this.course.year);
        this.addSmallSpecification(specBox, "fa-regular fa-clock", this.course.timeToLearn);
        this.addSmallSpecification(specBox, `fa ${this.course.iconType}`, this.course.difficulty);
        this.addSmallSpecification(specBox, "fas fa-layer-group", this.course.languageType);
        this.addSmallSpecification(specBox, "fas fa-laptop-code", this.course.uses);
        this.addSmallSpecification(specBox, "fas fa-money-bill-wave", this.course.devSalary);

        container.appendChild(specBox);
    }

    // Add a small specification to the specification box
    addSmallSpecification(specBox, iconClass, text) {
        const spec = document.createElement("div");
        spec.classList.add("languages-small-specification");

        const icon = document.createElement("i");
        icon.classList.add(...iconClass.split(" "));

        const textNode = document.createElement("p");
        textNode.textContent = text;

        spec.appendChild(icon);
        spec.appendChild(textNode);

        specBox.appendChild(spec);
    }
}

// Instantiate the LanguagePage class and provide the path to your JSON file
const languagePage = new LanguagePage("Json/languages.json");
