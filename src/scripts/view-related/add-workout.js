import { renderWorkoutModal } from "../components/workout-modal.js";
import { getExercises } from "../store.js";
import { capitalizeFirstLetter, groupByProperty, impale } from "../utils.js";

function renderCategory(category) {
	var categoryElement = document.createElement("div");
	categoryElement.classList.add("accordion-item");
	categoryElement.innerHTML = `
	<h2 class="accordion-header" id="${impale(category)}-heading">
		<button class="accordion-button" type="button" data-bs-toggle="collapse"
			data-bs-target="#${impale(
				category
			)}" aria-expanded="true" aria-controls="#${impale(category)}">
			${capitalizeFirstLetter(category)}
		</button>
  	</h2>
		`;
	return categoryElement;
}

function rendeExerciseCard(exercise) {
	var card = document.createElement("div");
	card.classList.add("p-2", "m-2");
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
	exerciseList.innerHTML = "";
	const exercisesGroupedByCategory = groupByProperty(exercises, "category");
	for (let category in exercisesGroupedByCategory) {
		let categoryElement = renderCategory(category);
		exerciseList.appendChild(categoryElement);
		let exercises = exercisesGroupedByCategory[category];
		let exerciseListForCategoryContainer = document.createElement("div");
		exerciseListForCategoryContainer.id = `${impale(category)}`;
		exerciseListForCategoryContainer.setAttribute(
			"aria-labelledby",
			`#${impale(category)}-heading`
		);
		exerciseListForCategoryContainer.setAttribute(
			"data-bs-parent",
			"exercise-list"
		);
		exerciseListForCategoryContainer.classList.add(
			"accordion-collapse",
			"collapse",
			"show"
		);
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
	const workout = {
		exercises: selectedExercises,
	};
	const modal = renderWorkoutModal(workout);
}

function filterExercises(event) {
	let filter = event.target.value.toLowerCase();
	let exercises = getExercises();
	let filteredExercises = exercises.filter((exercise) =>
		exercise.name.toLowerCase().includes(filter)
	);
	renderExerciseList(filteredExercises);
}

// main script
var selectedExercises = [];
var cardIndex = 0;

window.onload = function setupExerciseTable() {
	const exercises = getExercises();

	const searchExerciseInput = document.getElementById("search-exercise");
	searchExerciseInput.addEventListener("input", filterExercises);

	renderExerciseList(exercises);
};
