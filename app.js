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


//Display default card
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

 
//Display all cards
seeMoreBtn.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    allTools.forEach(tool => {
        createCard(tool);
    });
    seeMoreBtn.classList.add('hidden');
    seeLessBtn.classList.remove('hidden');
})


// Display less cards
seeLessBtn.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    loadAI();
    seeLessBtn.classList.add('hidden');
})


//Create dunamic card
const createCard = (tool) => {
    const {features, id, image, name, published_in} = tool;
        const cardElement = document.createElement('div');
        cardElement.classList.add("card", "bg-base-100", "shadow-xl", "rounded-xl", "border");
        cardElement.innerHTML = `
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
                    <button class="btn btn-sm details-btn">Details</button>
                </div>
            </div>
            </div>`;
        cardContainer.appendChild(cardElement);
        loadAIDetails(id);
        addModal(id);
        showModal();
}

//Load AI detials
const loadAIDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/01`);
    const data = await res.json();
    const toolsDetails = data.data;
    addModal(toolsDetails);
}

// Add details in modal
const addModal = (toolsDetails) => {
    const {description, features, pricing, integrations, image_link, accuracy, input_output_examples} = toolsDetails;
    console.log(description, features, pricing, integrations, image_link, accuracy, input_output_examples);
    const modalELement = document.getElementById("modal");
    modalELement.innerHTML = `<form method="dialog" class="modal-box">
                                    <h3 class="font-bold text-lg">Hello!</h3>
                                    <p class="py-4">Press ESC key or click the button below to close</p>
                                    <div class="modal-action">
                                        <button class="btn">Close</button>
                                    </div>
                                </form>`;
};



// Display modal
const showModal = () => {
    const detailsBtn = cardContainer.querySelectorAll(".details-btn");
    detailsBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.showModal();
      });
    });
  };

loadAI();
loadAIDetails();