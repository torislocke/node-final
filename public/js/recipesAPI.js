const searchRecipe = document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const recipeContainer = document.querySelector('.containerR');

let searchQuery = '';
const APP_ID = '37291b5c';
const APP_key = '96f1f0aed7469f7ad09eca5551080ad4	';
const baseURL = 'https://api.edamam.com/search?q=';
console.log(recipeContainer);
searchRecipe.addEventListener('submit', (e) => {
	e.preventDefault();
	searchQuery = e.target.querySelector('input').value;
	fetchRecipes();
});

const fetchRecipes = async () => {
	try {
		const res = await fetch(
			`${baseURL}${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=${page2From}&to=${page2To}`
		);
		if (!res.ok) {
			throw new Error(res.status);
		}
		const data = await res.json();
		recipeCard(data.hits);
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

function recipeCard(results) {
	recipeContainer.classList.remove('initial');
	// establish empty recipe
	let viewRecipe = '';
	// loop through results and create recipe cards
	results.map((result) => {
		viewRecipe += `
      <div class="card">
        <img src="${result.recipe.image}" alt="recipe image">
        <div class="titleBlock">
          <h2 class="title">${result.recipe.label}</h2>
		 
          <span><a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe<ion-icon name="open"></ion-icon></a></span>
        </div>
		 <h3>Recipe Source: ${result.recipe.source}</h3>
        <p class="card-data">Cuisine Type: ${result.recipe.cuisineType}</p>
         <p class="card-data">Ingredients: ${result.recipe.ingredientLines}</p>
      </div>
    `;
	});
	searchResult.innerHTML = viewRecipe;
}

let page2From = 3;
let page2To = 21;
