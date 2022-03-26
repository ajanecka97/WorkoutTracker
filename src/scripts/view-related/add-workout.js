import { availableExercises } from "../constants.js";
import { capitalizeFirstLetter, groupByProperty, impale } from "../utils.js";

function renderCategory(category) {
	var categoryElement = document.createElement("div");
	categoryElement.classList.add("accordion-item");
	categoryElement.innerHTML = `
	<h2 class="accordion-header" id="#${impale(category)}-heading">
		<button class="accordion-button" type="button" data-bs-toggle="collapse"
			data-bs-target="#${impale(
				category
			)}" aria-expanded="true" aria-controls="${impale(category)}">
			${capitalizeFirstLetter(category)}
		</button>
  	</h2>
		`;
	return categoryElement;
}

function rendeExerciseCard(exercise) {
	var card = document.createElement("div");
	card.innerHTML = `
		<h3>${capitalizeFirstLetter(exercise.name)}</h3>
		<p>${exercise.description}</p>
		<p>Rekomendowana liczba powtórzeń: ${exercise.recommendedRepetitions}</p>
		`;
	card.exercise = exercise;
	card.addEventListener("click", selectCard);
	card.id = cardIndex++;
	return card;
}

function renderExerciseList(exercises) {
	var exerciseList = document.getElementById("exercise-list");
	const exercisesGroupedByCategory = groupByProperty(exercises, "category");
	for (let category in exercisesGroupedByCategory) {
		let categoryElement = renderCategory(category);
		exerciseList.appendChild(categoryElement);
		let exercises = exercisesGroupedByCategory[category];
		let exerciseListForCategoryContainer = document.createElement("div");
		exerciseListForCategoryContainer.id = `#${impale(category)}`;
		exerciseListForCategoryContainer.setAttribute(
			"aria-labelledby",
			`#${impale(category)}-heading`
		);
		exerciseListForCategoryContainer.setAttribute(
			"data-bs-parent",
			"exercise-list"
		);
		exerciseListForCategoryContainer.classList.add("accordion-collapse");
		exerciseListForCategoryContainer.classList.add("collapse");
		exerciseListForCategoryContainer.classList.add("show");
		let exerciseListForCategory = document.createElement("div");
		exerciseListForCategory.classList.add("accordion-body");
		exercises.forEach((exercise) => {
			let exerciseCard = rendeExerciseCard(exercise);
			exerciseListForCategory.appendChild(exerciseCard);
		});
		exerciseListForCategoryContainer.appendChild(exerciseListForCategory);
		categoryElement.appendChild(exerciseListForCategoryContainer);
	}
}

function selectCard() {
	var exerciseIndex = selectedExercises.indexOf(this.exercise);
	if (exerciseIndex === -1) {
		selectedExercises.push(this.exercise);
		this.classList.add("selected");
	} else {
		selectedExercises.splice(exerciseIndex, 1);
		this.classList.remove("selected");
	}
}

// main script
var selectedExercises = [];
var cardIndex = 0;

window.onload = function setupExerciseTable() {
	let exercises = availableExercises;

	renderExerciseList(exercises);
};
