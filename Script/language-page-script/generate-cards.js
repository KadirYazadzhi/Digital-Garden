const cardsData = [
    { icon: "fa-solid fa-code", title: "Codes", size: "small-card" },
    { icon: "fa-solid fa-list-ul", title: "Cheatsheets", size: "medium-card" },
    { icon: "fa-solid fa-graduation-cap", title: "Courses", size: "small-card" },
    { icon: "fa-solid fa-book", title: "Books", size: "medium-card" },
    { icon: "fa-solid fa-book-open-reader", title: "Blogs", size: "big-card" },
    { icon: "fa-brands fa-youtube", title: "Youtube", size: "small-card" },
    { icon: "fas fa-user-secret", title: "In Cybersecurity", size: "medium-card" },
    { icon: "fa-regular fa-note-sticky", title: "My Notes", size: "small-card" }
];

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.section.languages .container');
    let glide = null;

    // 1. Fetch Data
    let languageData = null;
    const activeLanguageName = localStorage.getItem("activeLanguage");
    
    try {
        const response = await fetch('Json/languages.json');
        const languages = await response.json();
        languageData = languages.find(l => l.name === activeLanguageName);
    } catch (e) {
        console.error("Failed to load language data", e);
    }

    // 2. Create Modal (if not exists)
    let modalOverlay = document.getElementById('resource-modal');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'resource-modal';
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.display = 'none'; // Initially hidden
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2 id="modal-title" class="heading-sm">Resource Title</h2>
                <div id="modal-body" class="paragraph-small">
                    <!-- Dynamic Content -->
                </div>
            </div>
        `;
        document.body.appendChild(modalOverlay);

        // CSS for Modal
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); z-index: 1000;
                display: flex; justify-content: center; align-items: center;
                backdrop-filter: blur(5px);
            }
            .modal-content {
                background: var(--bg-surface); 
                color: var(--text-body);
                padding: 20px; 
                border-radius: var(--radius-md);
                width: 90%; 
                max-width: 500px; 
                position: relative;
                max-height: 80vh; 
                overflow-y: auto;
                text-align: left;
                box-shadow: var(--shadow-md);
                border: 1px solid var(--border-medium);
            }
            .close-modal {
                position: absolute; 
                top: 10px; 
                right: 15px; 
                font-size: 24px; 
                cursor: pointer; 
                color: var(--text-heading);
                transition: var(--animation);
            }
            .close-modal:hover { 
                color: var(--primary-color); 
            }
            .resource-item { 
                margin-bottom: 15px; 
                padding: 15px; 
                background: var(--bg-sidebar); 
                border-radius: var(--radius-sm); 
                border: 1px solid var(--border-subtle);
            }
            .resource-item a { 
                color: var(--primary-color); 
                text-decoration: none; 
                word-break: break-all; 
                font-weight: 500;
                transition: var(--animation);
            }
            .resource-item a:hover { 
                text-decoration: underline; 
                color: var(--text-heading);
            }
            .resource-item p { 
                margin: 5px 0 0; 
                font-size: 0.9em; 
                color: var(--text-body); 
            }
            .resource-item strong { 
                display: block; 
                margin-bottom: 5px; 
                color: var(--text-heading); 
                font-size: 1.1em;
            }
            #modal-title {
                margin-bottom: 1rem;
                color: var(--text-heading);
                border-bottom: 2px solid var(--primary-color);
                padding-bottom: 0.5rem;
                display: inline-block;
            }
        `;
        document.head.appendChild(style);

        // Close logic
        const closeBtn = modalOverlay.querySelector('.close-modal');
        closeBtn.onclick = () => {
            modalOverlay.style.display = 'none';
        };
        window.onclick = (event) => {
            if (event.target == modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        };
    }

    function renderCards() {
        const isMobile = window.innerWidth <= 768;
        
        if (glide) {
            glide.destroy();
            glide = null;
        }

        if (container) {
            container.innerHTML = '';

            const createCardContent = (card) => {
                 const cardBox = document.createElement('div');
                 cardBox.className = `card-box ${card.size}`;
                 cardBox.style.cursor = 'pointer'; // Make it look clickable
                 cardBox.innerHTML = `
                    <i class="${card.icon}"></i>
                    <p>${card.title}</p>
                 `;
                 
                 // Add Click Listener
                 cardBox.addEventListener('click', () => {
                     if (card.title === "Courses") {
                         // Filter redirection
                         if (activeLanguageName) {
                             window.location.href = `courses.html?filter=${encodeURIComponent(activeLanguageName)}`;
                         } else {
                             window.location.href = 'courses.html';
                         }
                     } else {
                         // Open Modal
                         const title = document.getElementById('modal-title');
                         const body = document.getElementById('modal-body');
                         title.textContent = `${activeLanguageName || ''} - ${card.title}`;
                         
                         body.innerHTML = '';
                         if (languageData && languageData.resources && languageData.resources[card.title]) {
                             const items = languageData.resources[card.title];
                             if (items.length > 0) {
                                 items.forEach(item => {
                                     const div = document.createElement('div');
                                     div.className = 'resource-item';
                                     let content = '';
                                     if (item.title) content += `<strong>${item.title}</strong>`;
                                     if (item.link && item.link !== '#') content += `<a href="${item.link}" target="_blank">${item.link}</a><br>`;
                                     if (item.description) content += `<p>${item.description}</p>`;
                                     if (item.content) content += `<p>${item.content}</p>`; // For notes
                                     div.innerHTML = content;
                                     body.appendChild(div);
                                 });
                             } else {
                                 body.innerHTML = '<p style="color:var(--text-body); opacity: 0.7;">No resources found for this category yet.</p>';
                             }
                         } else {
                             body.innerHTML = '<p style="color:var(--text-body); opacity: 0.7;">Data not available or language not selected.</p>';
                         }

                         modalOverlay.style.display = 'flex';
                     }
                 });

                 return cardBox;
            };

            if (isMobile) {
                // Generate Mobile Structure (Glide)
                const glideDiv = document.createElement('div');
                glideDiv.className = 'glide';
    
                const track = document.createElement('div');
                track.className = 'glide__track';
                track.setAttribute('data-glide-el', 'track');
    
                const ul = document.createElement('ul');
                ul.className = 'glide__slides cards-box';
    
                cardsData.forEach(card => {
                    const li = document.createElement('li');
                    li.className = 'glide__slide';
                    li.appendChild(createCardContent(card));
                    ul.appendChild(li);
                });
    
                track.appendChild(ul);
                glideDiv.appendChild(track);
    
                // Arrows
                const arrows = document.createElement('div');
                arrows.className = 'glide__arrows';
                arrows.setAttribute('data-glide-el', 'controls');
                
                arrows.innerHTML = `
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#10094;</button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#10095;</button>
                `;
                
                glideDiv.appendChild(arrows);
                container.appendChild(glideDiv);
    
                try {
                    glide = new Glide('.glide', {
                        type: 'slider',
                        perView: 1,
                        gap: 0,
                        rewind: false,
                        animationDuration: 400
                    }).mount();
                } catch (e) {
                    console.error("Glide initialization failed", e);
                }
    
            } else {
                // Generate Desktop Structure
                const cardsBox = document.createElement('div');
                cardsBox.className = 'cards-box';
    
                cardsData.forEach(card => {
                    cardsBox.appendChild(createCardContent(card));
                });
                
                container.appendChild(cardsBox);
            }
        }
    }

    renderCards();

    // Debounce resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderCards();
        }, 200);
    });
});
