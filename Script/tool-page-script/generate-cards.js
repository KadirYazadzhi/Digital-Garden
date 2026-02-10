const cardsData = [
    { icon: "fa-solid fa-terminal", title: "Usage", size: "small-card" },
    { icon: "fa-solid fa-list-ul", title: "Cheatsheets", size: "medium-card" },
    { icon: "fa-solid fa-graduation-cap", title: "Tutorials", size: "small-card" },
    { icon: "fa-solid fa-download", title: "Installation", size: "medium-card" },
    { icon: "fa-solid fa-book-open-reader", title: "Blogs", size: "big-card" },
    { icon: "fa-brands fa-youtube", title: "Youtube", size: "small-card" },
    { icon: "fa-solid fa-file-code", title: "Payloads", size: "medium-card" },
    { icon: "fa-regular fa-note-sticky", title: "My Notes", size: "small-card" }
];

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.section.tools-resources .container');
    let glide = null;

    // 1. Fetch Data
    let toolData = null;
    const activeToolName = localStorage.getItem("activeTool");
    
    try {
        const response = await fetch('Json/tools.json');
        const tools = await response.json();
        toolData = tools.find(t => t.name === activeToolName);
    } catch (e) {
        console.error("Failed to load tool data", e);
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
                <div id="modal-body" class="modal-grid">
                    <!-- Dynamic Content -->
                </div>
            </div>
        `;
        document.body.appendChild(modalOverlay);

        // CSS for Modal (Reuse the same styles as language page)
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); z-index: 1000;
                display: flex; justify-content: center; align-items: center;
                backdrop-filter: blur(8px);
            }
            .modal-content {
                background: var(--bg-surface); 
                color: var(--text-body);
                padding: 30px; 
                border-radius: var(--radius-md);
                width: 85%; 
                max-width: 1400px; 
                height: 85vh;
                display: flex;
                flex-direction: column;
                position: relative;
                box-shadow: var(--shadow-md);
                border: 1px solid var(--border-medium);
            }
            .close-modal {
                position: absolute; 
                top: 20px; 
                right: 30px; 
                font-size: 32px; 
                cursor: pointer; 
                color: var(--text-heading);
                transition: var(--animation);
                z-index: 10;
            }
            .close-modal:hover { 
                color: var(--primary-color); 
            }
            #modal-title {
                margin-bottom: 1.5rem;
                color: var(--text-heading);
                border-bottom: 2px solid var(--primary-color);
                padding-bottom: 0.5rem;
                display: inline-block;
                flex-shrink: 0;
            }
            .modal-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 350px));
                justify-content: center;
                gap: 25px;
                overflow-y: auto;
                padding-right: 10px; /* Space for scrollbar */
                flex: 1;
            }
            /* Scrollbar styling */
            .modal-grid::-webkit-scrollbar {
                width: 8px;
            }
            .modal-grid::-webkit-scrollbar-track {
                background: var(--bg-sidebar); 
                border-radius: 4px;
            }
            .modal-grid::-webkit-scrollbar-thumb {
                background: var(--border-strong); 
                border-radius: 4px;
            }

            /* Resource Card Styles */
            .resource-card {
                background: var(--bg-sidebar);
                border: 1px solid var(--border-subtle);
                border-radius: var(--radius-md);
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .resource-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-md);
                border-color: var(--primary-color);
            }
            .resource-card-visual {
                height: 160px;
                background: var(--bg-body); 
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid var(--border-subtle);
                position: relative;
            }
            .resource-card-visual i {
                font-size: 4rem;
                color: var(--primary-color);
                opacity: 0.8;
            }
            .resource-card-visual img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .resource-card-content {
                padding: 20px;
                display: flex;
                flex-direction: column;
                flex: 1;
            }
            .resource-card-title {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-heading);
                margin-bottom: 10px;
                line-height: 1.4;
            }
            .resource-card-desc {
                font-size: 0.9rem;
                color: var(--text-body);
                margin-bottom: 15px;
                flex: 1; 
                opacity: 0.9;
            }
            .resource-card-btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: transparent;
                border: 2px solid var(--primary-color);
                color: var(--text-heading);
                text-align: center;
                border-radius: var(--radius-sm);
                font-weight: 500;
                transition: var(--animation);
                text-decoration: none;
                margin-top: auto;
            }
            .resource-card-btn:hover {
                background-color: var(--primary-color);
                color: var(--text-inverse);
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
                 cardBox.style.cursor = 'pointer'; 
                 cardBox.innerHTML = `
                    <i class="${card.icon}"></i>
                    <p>${card.title}</p>
                 `;
                 
                 // Add Click Listener
                 cardBox.addEventListener('click', () => {
                         // Open Modal
                         const title = document.getElementById('modal-title');
                         const body = document.getElementById('modal-body');
                         title.textContent = `${activeToolName || ''} - ${card.title}`;
                         
                         body.innerHTML = '';
                         if (toolData && toolData.resources && toolData.resources[card.title]) {
                             const items = toolData.resources[card.title];
                             if (items.length > 0) {
                                 items.forEach(item => {
                                     const cardEl = document.createElement('div');
                                     cardEl.className = 'resource-card';

                                     const visual = document.createElement('div');
                                     visual.className = 'resource-card-visual';
                                     
                                     if (item.image) {
                                         const img = document.createElement('img');
                                         img.src = item.image;
                                         img.alt = item.title;
                                         visual.appendChild(img);
                                     } else {
                                         const icon = document.createElement('i');
                                         icon.className = card.icon; 
                                         visual.appendChild(icon);
                                     }
                                     cardEl.appendChild(visual);

                                     const content = document.createElement('div');
                                     content.className = 'resource-card-content';

                                     if (item.title) {
                                         const titleEl = document.createElement('h3');
                                         titleEl.className = 'resource-card-title';
                                         titleEl.textContent = item.title;
                                         content.appendChild(titleEl);
                                     }

                                     if (item.description || item.content) {
                                         const descEl = document.createElement('p');
                                         descEl.className = 'resource-card-desc';
                                         descEl.textContent = item.description || item.content; 
                                         content.appendChild(descEl);
                                     }

                                     if (item.link && item.link !== '#') {
                                         const btn = document.createElement('a');
                                         btn.className = 'resource-card-btn';
                                         btn.href = item.link;
                                         btn.target = '_blank';
                                         btn.textContent = 'View Resource';
                                         content.appendChild(btn);
                                     }

                                     cardEl.appendChild(content);
                                     body.appendChild(cardEl);
                                 });
                             } else {
                                 body.innerHTML = '<p style="color:var(--text-body); opacity: 0.7; grid-column: 1/-1; text-align: center;">No resources found for this category yet.</p>';
                             }
                         } else {
                             body.innerHTML = '<p style="color:var(--text-body); opacity: 0.7; grid-column: 1/-1; text-align: center;">Data not available or tool not selected.</p>';
                         }

                         modalOverlay.style.display = 'flex';
                 });

                 return cardBox;
            };

            if (isMobile) {
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

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderCards();
        }, 200);
    });
});
