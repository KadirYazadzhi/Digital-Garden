class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav>
                <div class="nav-bar">
                    <i class='bx bx-menu sidebarOpen'></i>
                    <span class="logo navLogo"><a href="#">KadirYazadzhi</a></span>

                    <div class="menu">
                        <div class="logo-toggle">
                            <span class="logo"><a href="#">KadirYazadzhi</a></span>
                            <i class='bx bx-x siderbarClose'></i>
                        </div>

                        <ul class="nav-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Me</a></li>
                            <li><a href="#">Tools</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Contact</a></li>
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
    }
}

customElements.define('my-header', Header);