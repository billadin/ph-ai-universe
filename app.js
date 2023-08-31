const cardContainer = document.getElementById('card-container');
const seeMoreBtn = document.getElementById('see-more-btn');
const seeLessBtn = document.getElementById('see-less-btn');
const modalELement = document.getElementById("modal");
const sortDate = document.getElementById('sort-date');


let defaultTools;
let allTools;
let sorted = false;
let reset = false;

// Load AI Data
const loadAI = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const tools = data.data.tools;
    allTools = tools;
    defaultTools = tools.slice(0, 6);
    showCard(defaultTools);
    };


// Set Loader
const setLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
        seeMoreBtn.classList.add('hidden');
        seeLessBtn.classList.add('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}


//Display default card
const showCard = (toolNumbers) => {
    if (toolNumbers.length <= 6) {
        seeMoreBtn.classList.remove('hidden');
        seeLessBtn.classList.add('hidden');
    } else {
        seeMoreBtn.classList.add('hidden');
        seeLessBtn.classList.remove('hidden');
    }
    toolNumbers.forEach(tool => {
        createCard(tool);
    });
    defaultImage();
    setLoading(false);
}

 
//Display all cards
seeMoreBtn.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    showCard(allTools);
})


// Display less cards
seeLessBtn.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    showCard(defaultTools);
})


//Create dynamic card
const createCard = (tool) => {
    const {features, id, image, name, published_in} = tool;
        const cardElement = document.createElement('div');
        cardElement.classList.add("card", "bg-base-100", "shadow-xl", "rounded-xl", "border");
        cardElement.innerHTML = `
            <figure class="px-5 pt-5">
            <img src="${image}" class="rounded-xl ai-image" />
            </figure>
            <div class="card-body">
            <h2 class="card-title mb-4">Features</h2>
            <div class="mb-6">
                <ol class="list-decimal list-inside text-start">
                    <li>${features[0] ? features[0] : ' No data found'}</li>
                    <li>${features[1] ? features[1] : ' No data found'}</li>
                    <li>${features[2] ? features[2] : ' No data found'}</li>
                </ol>
            </div>
            <hr class="h-[1px] mb-6 bg-slate-600">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="card-title mb-4">${name}</h2>
                    <P class="publish-date">${published_in}</P>
                </div>
                <div>
                    <button class="btn btn-sm details-btn" id="${id}">Details</button>
                </div>
            </div>
            </div>`;
        cardContainer.appendChild(cardElement);
        showModal(id);
}



// Display modal
const showModal = (id) => {
  const detailsBtn = document.getElementById(id);
  detailsBtn.addEventListener("click", () => {
    loadAIDetails(id);
    modal.showModal();
  });   
};


//Load AI detials for modal
const loadAIDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const toolsDetails = data.data;
    addModalDetails(toolsDetails);
    defaultModalImage();
}


// Add details in modal
const addModalDetails = (toolsDetails) => {
    const {description, features, pricing, integrations, image_link, accuracy, input_output_examples} = toolsDetails;
    modalELement.innerHTML = `<form method="dialog" class="modal-box max-w-[70%] w-[70&] p-32 mx-40">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <div class="details-container grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="bg-[#eb57570d] rounded-2xl p-7 border border-[#EB5757]">
            <h2 class="text-3xl font-semibold leading-8">${description}</h2>
            <div class="pricing grid grid-cols-3 gap-5 my-6">
                    <div class="text-base font-bold px-6 py-6 rounded-2xl bg-white text-[#03A30A] text-center">${pricing ? pricing[0]?.price : 'No data found'}<br>Basic</div>
                    <div class="text-base font-bold px-6 py-6 rounded-2xl bg-white text-[#F28927] text-center">${pricing ? pricing[1]?.price : 'No data found'}<br>Pro</div>
                    <div class="text-base font-bold px-6 py-6 rounded-2xl bg-white text-[#EB5757] text-center">${pricing ? pricing[2]?.price : 'No data found'}<br>Enterprise</div>
            </div>
            <div class="feature grid grid-cols-2 gap-6 mb-14">
                <div class="features">
                    <h3 class="text-2xl font-semibold mb-4">Features</h3>
                    <ul class="list-disc list-inside text-[#585858]">
                        <li>${features[1]?.feature_name}</li>
                        <li>${features[2]?.feature_name}</li>
                        <li>${features[3]?.feature_name}</li>
                    </ul>
                </div>
                <div class="integrations">
                    <h3 class="text-2xl font-semibold mb-4">Integrations</h3>
                    <ul class="list-disc list-inside text-[#585858]">
                        <li>${integrations ? (integrations[0] ? integrations[0] : 'No data found') : 'No data found'}</li>
                        <li>${integrations ? (integrations[1] ? integrations[1] : 'No data found') : 'No data found'}</li>
                        <li>${integrations ? (integrations[2] ? integrations[2] : 'No data found') : 'No data found'}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="image-container rounded-2xl p-6 border border-[#E7E7E7]">
            <div class="h-3/4">
                <img src="${image_link[0]}" class="rounded-2xl w-full h-full object-cover modal-ai-image">
            </div>
            <div class="h-1/4">
                <h3 class="text-2xl font-semibold text-center mt-6">${input_output_examples ? input_output_examples[0]?.input : 'No data found'}</h3>
                <p class="text-base font-normal text-center text-[#585858] mt-4 w-[75%] mx-auto">${input_output_examples ? input_output_examples[0]?.output: 'No data found'}</p>
            </div> 
        </div>
    </div>
</form>`;
};

// Set default image if no image found
const defaultImage = () => {
    const images = document.querySelectorAll('.ai-image');
    images.forEach((image) => {
        image.addEventListener('error', ()=> {
            image.src = "./images/brokenImage.jpg"
        })
    })
}

const defaultModalImage = () => {
    const images = document.querySelectorAll('.modal-ai-image');
    images.forEach((image) => {
        image.addEventListener('error', ()=> {
            image.src = "./images/brokenImage.jpg"
        })
    })
}


// Reset sorting
const resetSort = (cardNumber) => {
    cardContainer.innerHTML = '';
    cardNumber.length <= 6 ? showCard(defaultTools) : showCard(allTools);
    reset = false;
    
}

const sortTools = (currentTools) => {
    let toolsArr = [...currentTools];
    toolsArr.forEach((tool) => {
      const toolDate = tool.published_in;
      const date = new Date(toolDate);
      tool.date = date;
    });

    if (sorted === false) {
      sorted = true;
      toolsArr.sort((a, b) => {
        return a.date - b.date;
      });
    } 
    else if (sorted === true) {
      sorted = false;
      reset = true;
      toolsArr.sort((a, b) => {
        return b.date - a.date;
      });
    } 
    cardContainer.innerHTML = "";
    toolsArr.forEach((tool) => {
      createCard(tool);
    });
    defaultImage();
  };

  
sortDate.addEventListener("click", () => {
    const currentToolCards = document.querySelectorAll('.card')
    if (reset === true) {
        resetSort(currentToolCards);
        return;
    }
    currentToolCards.length <= 6 ? sortTools(defaultTools) : sortTools(allTools);
});


loadAI();