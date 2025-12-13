class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav>
                <div class="nav-bar">
                    <i class='bx bx-menu sidebarOpen'></i>
                    <span class="logo navLogo"><a href="index.html#">KadirYazadzhi</a></span>

                    <div class="menu">
                        <div class="logo-toggle">
                            <span class="logo"><a href="index.html#">KadirYazadzhi</a></span>
                            <i class='bx bx-x siderbarClose'></i>
                        </div>

                        <ul class="nav-links">
                            <li><a href="index.html#">Home</a></li>
                            <li><a href="index.html#about-me">About Me</a></li>
                            <li><a href="index.html#tools">Tools</a></li>
                            <li><a href="index.html#blog">Blog</a></li>
                            <li><a href="index.html#faq">FAQ</a></li>
                            <li><a href="index.html#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div class="darkLight-searchBox">
                        <div class="dark-light">
                            <i class='bx bx-moon moon'></i>
                            <i class='bx bx-sun sun'></i>
                        </div>

                        <div class="searchBox">
                            <div class="searchToggle">
                                <i class='bx bx-x cancel'></i>
                                <i class='bx bx-search search'></i>
                            </div>

                            <div class="search-field">
                                <input type="text" placeholder="Search...">
                                <i class='bx bx-search'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        this.initializeLogic();
    }

    initializeLogic() {
        const body = document.querySelector("body"),
            nav = this.querySelector("nav"),
            modeToggle = this.querySelector(".dark-light"),
            searchToggle = this.querySelector(".searchToggle"),
            sidebarOpen = this.querySelector(".sidebarOpen"),
            sidebarClose = this.querySelector(".siderbarClose");

        let getMode = localStorage.getItem("mode");
        if (getMode && getMode === "dark-mode") {
            body.classList.add("dark");
        }

        // Toggle dark/light mode
        if (modeToggle) {
            modeToggle.addEventListener("click", () => {
                modeToggle.classList.toggle("active");
                body.classList.toggle("dark");

                if (!body.classList.contains("dark")) {
                    localStorage.setItem("mode", "light-mode");
                } else {
                    localStorage.setItem("mode", "dark-mode");
                }
            });
        }

        // Toggle search box
        if (searchToggle) {
            searchToggle.addEventListener("click", () => {
                searchToggle.classList.toggle("active");
            });
        }

        // Toggle sidebar
        if (sidebarOpen) {
            sidebarOpen.addEventListener("click", () => {
                nav.classList.add("active");
            });
        }

        // Close sidebar on body click
        body.addEventListener("click", e => {
            let clickedElm = e.target;
            if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
                nav.classList.remove("active");
            }
        });

        this.initializeSearch();
    }

    initializeSearch() {
        const searchInput = this.querySelector(".search-field input");
        const searchField = this.querySelector(".search-field");
        
        if (!searchInput || !searchField) return;

        // Create results container
        const resultsContainer = document.createElement("ul");
        resultsContainer.classList.add("search-results");
        searchField.appendChild(resultsContainer);

        let searchData = [];
        let dataLoaded = false;

        const loadData = async () => {
            if (dataLoaded) return;
            try {
                const [courses, blogs, tools, languages] = await Promise.all([
                    fetch("Json/courses.json").then(r => r.json()).catch(() => []),
                    fetch("Json/blogs-top-section.json").then(r => r.json()).catch(() => ({ blog: {} })),
                    fetch("Json/tools.json").then(r => r.json()).catch(() => []),
                    fetch("Json/languages.json").then(r => r.json()).catch(() => [])
                ]);

                // Process Courses
                if (Array.isArray(courses)) {
                    courses.forEach(c => {
                        searchData.push({
                            category: "Course",
                            title: c.title,
                            description: c.description || "",
                            url: "course.html",
                            id: c.title, // For localStorage
                            type: "course"
                        });
                    });
                }

                // Process Blogs
                if (blogs.blog) {
                    Object.keys(blogs.blog).forEach(key => {
                        const b = blogs.blog[key];
                        // Extract ID from key "topSection-1" -> "1"
                        const id = key.replace("topSection-", "");
                        searchData.push({
                            category: "Blog",
                            title: b.title,
                            description: b.description || "",
                            url: "blog.html",
                            id: id,
                            type: "blog"
                        });
                    });
                }

                // Process Tools
                if (Array.isArray(tools)) {
                    tools.forEach(t => {
                        searchData.push({
                            category: "Tool",
                            title: t.name,
                            description: t.description || "",
                            url: "tool.html",
                            id: null,
                            type: "tool"
                        });
                    });
                }

                // Process Languages
                if (Array.isArray(languages)) {
                    languages.forEach(l => {
                        searchData.push({
                            category: "Language",
                            title: l.name,
                            description: l.description || "",
                            url: "language.html",
                            id: l.name,
                            type: "language"
                        });
                    });
                }

                dataLoaded = true;
            } catch (err) {
                console.error("Error loading search data", err);
            }
        };

        // Load data on first focus
        searchInput.addEventListener("focus", loadData);

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            resultsContainer.innerHTML = "";
            
            if (query.length < 2) {
                resultsContainer.classList.remove("active");
                return;
            }

            if (!dataLoaded) loadData();

            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            ).slice(0, 8); // Limit to 8 results

            if (results.length > 0) {
                resultsContainer.classList.add("active");
                results.forEach(item => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <span class="category">${item.category}</span>
                        <span class="title">${item.title}</span>
                    `;
                    li.addEventListener("click", () => {
                        if (item.type === "course") {
                            localStorage.setItem('activeCourseCard', item.id);
                        } else if (item.type === "blog") {
                            localStorage.setItem("activeBlog", item.id);
                        } else if (item.type === "language") {
                            localStorage.setItem("activeLanguage", item.id);
                        }
                        // Tools just go to the page
                        window.location.href = item.url;
                    });
                    resultsContainer.appendChild(li);
                });
            } else {
                resultsContainer.classList.remove("active");
            }
        });

        // Hide results when clicking outside
        document.addEventListener("click", (e) => {
            if (!searchField.contains(e.target)) {
                resultsContainer.classList.remove("active");
            }
        });
    }
}

customElements.define('my-header', Header);