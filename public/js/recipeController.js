// master controller leveraging createRecipe for functions and variables
import Recipes from './createRecipe.js';
const myRecipeList = new Recipes('Recipe');
window.addEventListener('load', () => {
	myRecipeList.showRecipeList(); // calls function from CreateRecipe.js
	myRecipeList.addCategoryListeners(); // calls function from createRecipe.js
});
const inputField = document.getElementById('new_ingredient'); // recipe content
const addNew = document.getElementById('addnew'); // submit button
addNew.addEventListener('click', () => {
	myRecipeList.addRecipe(); // calls function from recipes.js
});


// add the recipe ingredient if user hits enter
// multiply methods to ensure browser support
inputField.addEventListener('keyup', function (e) {
	if (e.key === 13) {
		e.preventDefault();
		addNew.click();
	} else if (e.keyIdentifier === 13) {
		e.preventDefault();
		addNew.click();
	} else if (e.keyCode === 13) {
		e.preventDefault();
		addNew.click();
	}
});