import { getCurrentFileName, getQueryParameterFromUrl } from '../utils.js';
import { getWorkoutById, getExerciseById } from '../store.js';

function generateBreadcrumbs() {
	const breadcrumbs = document.createElement('nav');
	breadcrumbs.setAttribute('aria-label', 'breadcrumb');
	const breadcrumbList = document.createElement('ol');
	breadcrumbList.classList.add('breadcrumb');

	switch (getCurrentFileName()) {
		case '':
			breadcrumbList.appendChild(setupHomeElement(true));
			break;
		case 'workout.html':
			breadcrumbList.appendChild(setupHomeElement(false));
			breadcrumbList.appendChild(setupWorkoutElement(true));
			break;
		case 'exercise.html':
			breadcrumbList.appendChild(setupHomeElement(false));
			breadcrumbList.appendChild(setupWorkoutElement(false));
			breadcrumbList.appendChild(setupExerciseElement(true));
			break;
		case 'add-workout.html':
			breadcrumbList.appendChild(setupHomeElement(false));
			breadcrumbList.appendChild(setupAddWorkoutElement(true));
			break;
		case 'add-exercise.html':
			breadcrumbList.appendChild(setupHomeElement(false));
			breadcrumbList.appendChild(setupAddWorkoutElement(false));
			breadcrumbList.appendChild(setupAddExerciseElement(true));
		default:
			break;
	}

	breadcrumbs.appendChild(breadcrumbList);
	return breadcrumbs;
}

function setupHomeElement(active) {
	const home = document.createElement('li');
	home.classList.add('breadcrumb-item');
	if (active) {
		home.classList.add('active');
		home.innerText = 'Treningi';
	} else {
		const homeLink = document.createElement('a');
		homeLink.href = `/`;
		homeLink.innerText = 'Treningi';
		home.appendChild(homeLink);
	}
	return home;
}

function setupWorkoutElement(active) {
	const workoutId = getQueryParameterFromUrl('workoutId');
	const workout = getWorkoutById(workoutId);
	const workoutName = workout.name;
	const workoutElement = document.createElement('li');
	workoutElement.classList.add('breadcrumb-item');
	if (active) {
		workoutElement.classList.add('active');
		workoutElement.innerText = workoutName;
	} else {
		const workoutLink = document.createElement('a');
		workoutLink.href = `/pages/workout.html?workoutId=${workoutId}`;
		workoutLink.innerText = workoutName;
		workoutElement.appendChild(workoutLink);
	}
	return workoutElement;
}

function setupExerciseElement(active) {
	const exerciseId = getQueryParameterFromUrl('exerciseId');
	const workoutId = getQueryParameterFromUrl('workoutId');
	const exercise = getExerciseById(exerciseId);
	const exerciseName = exercise.name;
	const exerciseElement = document.createElement('li');
	exerciseElement.classList.add('breadcrumb-item');
	if (active) {
		exerciseElement.classList.add('active');
		exerciseElement.innerText = exerciseName;
	} else {
		const exerciseLink = document.createElement('a');
		exerciseLink.href = `/pages/exercise.html?exerciseId=${exerciseId}&workoutId=${workoutId}`;
		exerciseLink.innerText = exerciseName;
		exerciseElement.appendChild(exerciseLink);
	}
	return exerciseElement;
}

function setupAddWorkoutElement(active) {
	const addWorkoutElement = document.createElement('li');
	addWorkoutElement.classList.add('breadcrumb-item');
	if (active) {
		addWorkoutElement.classList.add('active');
		addWorkoutElement.innerText = 'Dodaj trening';
	} else {
		const addWorkoutLink = document.createElement('a');
		addWorkoutLink.href = `/pages/add-workout.html`;
		addWorkoutLink.innerText = 'Dodaj trening';
		addWorkoutElement.appendChild(addWorkoutLink);
	}
	return addWorkoutElement;
}

function setupAddExerciseElement(active) {
	const addExerciseElement = document.createElement('li');
	addExerciseElement.classList.add('breadcrumb-item');
	if (active) {
		addExerciseElement.classList.add('active');
		addExerciseElement.innerText = 'Dodaj ćwiczenie';
	} else {
		const addExerciseLink = document.createElement('a');
		addExerciseLink.href = `/pages/add-exercise.html`;
		addExerciseLink.innerText = 'Dodaj ćwiczenie';
		addExerciseElement.appendChild(addExerciseLink);
	}
	return addExerciseElement;
}

export function setupTopBar() {
	const topBar = document.getElementById('top-bar');
	topBar.appendChild(generateBreadcrumbs());
}
