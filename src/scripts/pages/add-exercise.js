import { setupTopBar } from '../components/top-bar.js';
import { addExercise } from '../store.js';

function saveExercise() {
	const exerciseNameInput = document.getElementById('exercise-name');
	const exerciseCategoryInput = document.getElementById('exercise-category');
	const exerciseRecommendedRepsInput = document.getElementById('exercise-recommended-reps');

	if (exerciseNameInput.value === '' || exerciseCategoryInput.value === '') {
		alert('Nazwa i kategoria ćwiczenia nie mogą być puste');
		return;
	}

	const exercise = {
		name: exerciseNameInput.value,
		category: exerciseCategoryInput.value,
		recommendedRepetitions: exerciseRecommendedRepsInput.value,
	};

	addExercise(exercise);
	window.location.href = './add-workout.html';
}

window.onload = function setupAddExerciseForm() {
	setupTopBar();

	const addExerciseButton = document.getElementById('add-exercise-button');
	const addExerciseButtonMobile = document.getElementById('add-exercise-button-mobile');

	addExerciseButton.addEventListener('click', saveExercise);
	addExerciseButtonMobile.addEventListener('click', saveExercise);
};
