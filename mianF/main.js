const latestRecipes = document.getElementById('latestRecipes');
const inputField = document.getElementById('inputField');

const modal = document.getElementById('mealModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalInstructions = document.getElementById('modalInstructions');
const modalClose = document.getElementById('modalClose');

let allMeals = [];

// Fetch data from the API
async function datafetch() {
    try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
        const data = await res.json();
        allMeals = data.meals || [];
        renderMeals(allMeals);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Render the meal cards
function renderMeals(meals) {
    latestRecipes.innerHTML = meals.map((item, index) => `
        <div class="w-[80%] mx-auto md:mx-0 md:w-[30%] p-4">
            <img src="${item.strMealThumb}" alt="${item.strMeal}" class="w-full h-auto rounded-xl mb-2">
            <div>
                <h3 class="text-xl font-semibold">${item.strMeal} (${item.strCategory})</h3>
                <p class="text-sm text-gray-600 line-clamp-3">${item.strInstructions}</p>
                <div class="flex justify-end mt-2">
                    <button data-index="${index}" class="view-details bg-orange-400 px-6 py-2 rounded-2xl text-white hover:bg-orange-500">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to all buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', e => {
            const index = e.currentTarget.dataset.index;
            showModal(meals[index]);
        });
    });
}

// Show modal with meal details
function showModal(meal) {
    modalImage.src = meal.strMealThumb;
    modalTitle.textContent = meal.strMeal;
    modalInstructions.textContent = meal.strInstructions;
    modal.classList.remove('hidden');
}

// Close modal when clicking 'Close' or outside the modal box
modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
});
modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Search filtering
inputField.addEventListener('input', () => {
    const keyword = inputField.value.toLowerCase().trim();
    const filtered = allMeals.filter(meal =>
        meal.strMeal.toLowerCase().includes(keyword)
    );
    renderMeals(filtered.length ? filtered : allMeals);
});

// Initialize
datafetch();
