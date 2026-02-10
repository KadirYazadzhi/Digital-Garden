class ToolPage {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
        this.activeTool = localStorage.getItem("activeTool");
        this.init();
    }

    // Initialize the application
    init() {
        if (!this.activeTool) {
            console.warn("No active tool selected.");
            return;
        }
        this.loadTools();
    }

    // Load tool data from JSON
    loadTools() {
        fetch(this.jsonPath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error loading JSON file");
                }
                return response.json();
            })
            .then((tools) => this.handleTools(tools))
            .catch((error) => console.error("Error:", error.message));
    }

    // Process and render active tool
    handleTools(tools) {
        const tool = tools.find(t => t.name === this.activeTool);
        if (tool) {
            const toolRenderer = new ToolRenderer(tool);
            toolRenderer.renderAllSections();
        } else {
            console.error("Tool not found in JSON:", this.activeTool);
        }
    }
}

// Class responsible for rendering tool details
class ToolRenderer {
    constructor(tool) {
        this.tool = tool;
    }

    // Render all sections for the tool
    renderAllSections() {
        this.renderToolContainer();
    }

    // Render the tool container with details
    renderToolContainer() {
        const container = document.createElement("div");
        container.classList.add("tool-container");

        const topContainer = document.createElement("div");
        topContainer.classList.add("top-container");

        const title = document.createElement("h1");
        title.classList.add("top-section-title");
        title.textContent = this.tool.name;

        const link = document.createElement("a");
        link.classList.add("link");
        link.href = this.tool.toolLink || "#";
        link.target = "_blank";

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
        description.classList.add("tool-text");
        description.textContent = this.tool.description;

        container.appendChild(description);

        // Find the section with class 'top-tool-bar' and append the container
        const section = document.querySelector(".section.top-tool-bar .container");
        if (section) {
            section.appendChild(container);
        } else {
            console.error("Section with class 'top-tool-bar' or its container not found.");
        }
    }

    // Render the small specification boxes
    renderSmallSpecifications(container) {
        const specBox = document.createElement("div");
        specBox.classList.add("tools-small-specification-box");

        // Tool specific specs - using what's in JSON or defaults
        this.addSmallSpecification(specBox, "fa-solid fa-layer-group", this.tool.category || "Security Tool");
        this.addSmallSpecification(specBox, "fa-solid fa-user", this.tool.author || "Open Source");
        this.addSmallSpecification(specBox, "fa-solid fa-laptop", this.tool.platform || "Multi-platform");
        this.addSmallSpecification(specBox, "fa-solid fa-certificate", this.tool.license || "GPL/MIT");

        container.appendChild(specBox);
    }

    // Add a small specification to the specification box
    addSmallSpecification(specBox, iconClass, text) {
        const spec = document.createElement("div");
        spec.classList.add("tools-small-specification");

        const icon = document.createElement("i");
        icon.classList.add(...iconClass.split(" "));

        const textNode = document.createElement("p");
        textNode.textContent = text;

        spec.appendChild(icon);
        spec.appendChild(textNode);

        specBox.appendChild(spec);
    }
}

// Instantiate the ToolPage class and provide the path to your JSON file
const toolPage = new ToolPage("Json/tools.json");
