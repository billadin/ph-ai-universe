const cardContainer = document.getElementById('card-container');
const seeMoreBtn = document.getElementById('see-more-btn');
const seeLessBtn = document.getElementById('see-less-btn');

let allTools;

const loadAI = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const tools = data.data.tools;
    allTools = tools;
    displayTools(tools);
    };

const displayTools = (tools) => {
    if (tools.length > 6) {
        seeMoreBtn.classList.remove('hidden');
    }else {
        seeMoreBtn.classList.add('hidden');
    }
    tools = tools.slice(0, 6);
    tools.forEach(tool => {
        createCard(tool);
    });
}

seeMoreBtn.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    allTools.forEach(tool => {
        createCard(tool);
    });
    seeMoreBtn.classList.add('hidden');
    seeLessBtn.classList.remove('hidden');
})

seeLessBtn.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    loadAI();
    seeLessBtn.classList.add('hidden');
})

const createCard = (tool) => {
    const {description, features, id, image, links, name, published_in} = tool;
        const element = document.createElement('div');
        element.classList.add("card", "bg-base-100", "shadow-xl", "rounded-xl", "border");
        element.innerHTML = `
            <figure class="px-5 pt-5">
            <img src="${image}" class="rounded-xl" />
            </figure>
            <div class="card-body">
            <h2 class="card-title mb-4">Features</h2>
            <div class="mb-6">
                <ol class="list-decimal list-inside text-start">
                    <li>${features[0]}</li>
                    <li>${features[1]}</li>
                    <li>${features[2]}</li>
                </ol>
            </div>
            <hr class="h-[1px] mb-6 bg-slate-600">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="card-title mb-4">${name}</h2>
                    <P>${published_in}</P>
                </div>
                <div>
                    <button class="btn btn-sm">Details</button>
                </div>
            </div>
            </div>`;
        cardContainer.appendChild(element);
}

loadAI();