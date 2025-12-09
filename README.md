# 🌿 Kadir's Digital Garden & Tech Archive

> *"Knowledge grows when shared and cultivated."*

Welcome to **Kadir's Digital Garden** — a comprehensive, living archive of my journey through the landscape of Information Technology. This repository is not just a portfolio; it is a personal encyclopedia where I document, organize, and refine my understanding of **Programming**, **Cybersecurity**, **DevOps**, and **Networking**.

---

## 🚧 Status: Work in Progress

**This archive is currently in active development.** 
As a "Digital Garden," it is never truly finished. I am continuously:
-   Migrating notes from my private obsidian/notion notebooks.
-   Adding new tools and language references.
-   Refining existing documentation.

*Please note that some sections may be placeholders or contain partial information as I build out this platform.*

---

## 🌟 The Philosophy

This project follows the **"Learning in Public"** philosophy. Instead of keeping my notes hidden in private files, I organize them here to:
1.  **Solidify Knowledge**: Teaching and documenting is the best way to learn.
2.  **Create a Reference**: A centralized place where I (and others) can quickly look up syntax, tools, or concepts.
3.  **Connect the Dots**: By housing Development, Security, and Operations notes together, I aim to visualize how these domains intersect (e.g., Secure Coding, DevSecOps).

---

## 🔭 Domains of Knowledge

This archive differs from a standard blog by categorizing knowledge into interconnected domains:

### 1. 💻 Programming & Development
This is the core of the garden. Here I document the languages and paradigms I use to build software. **(Partial list below)**
-   **Languages** (including but not limited to):
    -   **Python**: Scripting, Automation, and Security Tools.
    -   **JavaScript/TypeScript**: Modern Web Development (Frontend & Backend).
    -   **C/C++**: Low-level programming, Memory Management, and Exploit Development.
    -   **C#**: Enterprise application development.
    -   **SQL**: Database management and design.
    -   *...and many others as I explore them.*
-   **Concepts**:
    -   **Clean Code & Architecture**: SOLID principles, Design Patterns.
    -   **Algorithms & Data Structures**: Efficiency and optimization notes.

### 2. 🛡️ Cybersecurity
A massive section dedicated to both Offensive (Red Team) and Defensive (Blue Team) security. **Topics include:**
-   **Ethical Hacking**: Methodologies for Penetration Testing.
-   **Defense**: Hardening systems, Firewall configuration, and SIEM.
-   **Tools Analyzer**: Detailed breakdowns of tools like **Nmap**, **Burp Suite**, **Metasploit**, and **Wireshark** — explaining not just *how* to calculate a command, but *why* it works.
-   **Cryptography**: Understanding encryption standards, PKI, and secure communication.
-   *...plus Incident Response, Malware Analysis, and more.*

### 3. ☁️ DevOps & Infrastructure
Bridging the gap between code and deployment.
-   **Containerization**: Docker & Kubernetes.
-   **CI/CD**: Automating pipelines (GitHub Actions).
-   **Linux Administration**: Shell scripting, permission management, and system internals.

### 4. 🌐 Networking
The backbone of the internet.
-   **Protocols**: TCP/IP, DNS, HTTP/HTTPS, SSH.
-   **Architecture**: Subnetting, Routing, and Switch configuration.

---

## 🗺️ Project Roadmap

This is a living document. Here is the plan for future expansions:

-   [ ] **Complete "Languages" Section**: Finish migration of C++ and Python notes.
-   [ ] **Expand "Tools" Encyclopedia**: Add deep-dive articles for Wireshark and Hydra.
-   [ ] **Interactive Cheatsheets**: Add search functionality for command syntax.
-   [ ] **Cybersecurity Labs**: Upload write-ups for CTF (Capture The Flag) challenges.
-   [ ] **Dark Mode Toggle**: (Completed ✅)

---

## ⚙️ Technical Architecture

For developers interested in how this site is built:

This is a **Serverless Static Site** that behaves like a Dynamic Web App.

-   **Core**: Built with raw **HTML5**, **CSS3**, and **JavaScript (ES6+)**. No heavy frameworks (React/Vue) were used to keep it lightweight and fast.
-   **Data Storage**: Content is stored in **JSON** files (`Json/courses.json`, `Json/tools.json`).
-   **Rendering Engine**: Custom JavaScript classes (`SlideLoader`) fetch this JSON data and dynamically generate the HTML DOM elements (Cards, Sliders) at runtime.
    -   *Benefit*: Adding a new "Course" or "Tool" only requires editing a text file, not HTML.
-   **UI Library**: Uses **Glide.js** for touch-responsive sliders.

### Directory Structure
```text
Cybersecurity-Website/
├── index.html          # Main entry point
├── Json/               # Data Layer (Content)
│   ├── tools.json      # Definitions of security tools
│   └── courses.json    # List of completed certifications
├── Script/             # Logic Layer
│   ├── tools-card.js   # Fetches and renders tool cards
│   └── ...
├── Style/              # Presentation Layer
│   ├── style.css       # Global variables & reset
│   └── ...
└── Image/              # Assets
```

---

## 🚀 How to Run Locally

Because this site uses `fetch()` to load JSON data, browser security policies (CORS) prevent it from running directly via `file://`. You must serve it via HTTP.

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/KadirYazadzhi/Cybersecurity-Website.git
    ```
2.  **Start a Local Server**:
    If you have Python installed:
    ```bash
    cd Cybersecurity-Website
    python3 -m http.server 8080
    ```
3.  **View**:
    Open `http://localhost:8080` in your browser.

---

## 📬 Author & Licensing

**Kadir Yazadzhi**
*Full Stack Developer & Cybersecurity Enthusiast*

-   📧 **Email**: kadiryazadzhi@gmail.com
-   🌐 **Portfolio**: [Kadir Yazadzhi](https://kadiryazadzhi.github.io/portfolio/)

---

*This project is for educational purposes. All security tools and techniques discussed are intended for ethical use in authorized environments only.*
