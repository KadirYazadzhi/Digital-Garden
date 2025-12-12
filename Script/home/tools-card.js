// Fetch the data from the JSON file and generate the cards
fetch('Json/tools.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        generateToolCards(data);
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });

// Function to generate the tool cards
function generateToolCards(tools) {
    const container = document.getElementById('tools');

    const toolBox = document.createElement('ul');
    toolBox.classList.add('glide__slides');
    container.appendChild(toolBox);

    tools.forEach(tool => {
        const li = document.createElement('li');
        li.classList.add('glide__slide');

        const card = document.createElement('div');
        card.classList.add('card', 'tool-card');

        const iconBack = document.createElement('div');
        iconBack.classList.add('icon-back', 'tool');

        if (tool.imgType === "img") {
            const img = document.createElement('img');
            img.src = tool.image;
            img.alt = `${tool.name} logo`;
            iconBack.appendChild(img);
        }
        else {
            iconBack.innerHTML = tool.image;
        }

        const heading = document.createElement('h1');
        heading.classList.add('heading-xs');
        heading.textContent = tool.name;

        const paragraph = document.createElement('p');
        paragraph.classList.add('paragraph-small', 'tool-text');
        paragraph.textContent = tool.description;

        card.appendChild(iconBack);
        card.appendChild(heading);
        card.appendChild(paragraph);
        li.appendChild(card);
        toolBox.appendChild(li);
    });

    initializeGlide();
}

// Initialize Glide.js
function initializeGlide() {
    var toolsSlider = new Glide('.tools-slider', {
        type: 'carousel',
        perView: 3,
        focusAt: 0,
        breakpoints: {
            800: {
                perView: 2
            },
            480: {
                perView: 1
            }
        }
    });

    toolsSlider.mount();

}