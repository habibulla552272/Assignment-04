let latestRecipes = document.getElementById('latestRecipes');
let inputField = document.getElementById('inputField');

async function datafetch() {
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
        let data = await res.json();
      

        data.meals.forEach((item) => {
            latestRecipes.innerHTML += `
                <div class="w-[80%] mx-auto md:mx-0 md:w-[30%] p-4">
                    <img src="${item.strMealThumb}" alt="${item.strMeal}" class="w-full h-auto rounded-xl mb-2">
                    <div>
                        <h3 class="text-xl font-semibold">${item.strMeal} (${item.strCategory})</h3>
                        <p class="text-sm text-gray-600 line-clamp-3">${item.strInstructions}</p>
                        <div class="flex justify-end mt-2">
                            <button class="bg-orange-400 px-6 py-2 rounded-2xl text-white hover:bg-orange-500">View Details</button>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

datafetch();

console.log(inputField);
