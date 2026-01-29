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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.section.languages .container');
    let glide = null;

    function renderCards() {
        const isMobile = window.innerWidth <= 768;
        
        // Clean up existing glide if it exists
        if (glide) {
            glide.destroy();
            glide = null;
        }

        // Clear container
        if (container) {
            container.innerHTML = '';

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
                    
                    const cardBox = document.createElement('div');
                    cardBox.className = `card-box ${card.size}`;
                    
                    cardBox.innerHTML = `
                        <i class="${card.icon}"></i>
                        <p>${card.title}</p>
                    `;
                    
                    li.appendChild(cardBox);
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
    
                // Init Glide
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
                // Generate Desktop Structure (No Glide classes)
                // Using div.cards-box to ensure proper flex sizing of children
                const cardsBox = document.createElement('div');
                cardsBox.className = 'cards-box';
    
                cardsData.forEach(card => {
                    const cardBox = document.createElement('div');
                    cardBox.className = `card-box ${card.size}`;
                    
                    cardBox.innerHTML = `
                        <i class="${card.icon}"></i>
                        <p>${card.title}</p>
                    `;
                    
                    cardsBox.appendChild(cardBox);
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
