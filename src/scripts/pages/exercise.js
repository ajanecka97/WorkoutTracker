import { setupTableRenderListener } from '../components/table.js';
import { setupTopBar } from '../components/top-bar.js';
import {
	addExerciseHisotryItem,
	getExerciseHistoryItems,
	getWorkoutById,
	getExerciseById,
	updateWorkout,
	updateExercise,
} from '../store.js';
import {
	getQueryParameterFromUrl,
	toLocaleDateString,
	impale,
	groupByPropertySorted,
	compareDatesFromStrings,
} from '../utils.js';

function saveExerciseHisotryItem() {
	const exerciseRepsInput = document.getElementById('exercise-reps');
	const exerciseWeightInput = document.getElementById('exercise-weight');

	const exerciseHistoryItem = {
		exerciseId: getQueryParameterFromUrl('exerciseId'),
		workoutId: getQueryParameterFromUrl('workoutId'),
		reps: exerciseRepsInput.value,
		weight: exerciseWeightInput.value,
		date: Date.now(),
	};

	const exerciseId = getQueryParameterFromUrl('exerciseId');
	const exercise = getExerciseById(exerciseId);
	const currentPr = exercise.pr ?? 0;

	if (exerciseRepsInput.value * exerciseWeightInput.value > currentPr) {
		updateExercise({ ...exercise, pr: exerciseRepsInput.value * exerciseWeightInput.value });
	}

	addExerciseHisotryItem(exerciseHistoryItem);
	renderExerciseHistory();
}

function groupExerciseHistoryItemsByDate() {
	const exerciseHistoryItems = getExerciseHistoryItems();
	const filteredExerciseHistoryItems = exerciseHistoryItems.filter(
		(exerciseHistoryItem) =>
			exerciseHistoryItem.exerciseId === getQueryParameterFromUrl('exerciseId')
	);

	const groupedExerciseHistoryItems = groupByPropertySorted(
		filteredExerciseHistoryItems,
		'date',
		toLocaleDateString,
		compareDatesFromStrings,
		true
	);

	return groupedExerciseHistoryItems;
}

function renderExerciseHeader() {
	const exercise = getExerciseById(getQueryParameterFromUrl('exerciseId'));

	const exerciseHeader = document.getElementById('exercise-header');
	exerciseHeader.innerHTML = `
        <h1 class="display-4">${exercise.name}</h1>
    `;

	const exerciseMobileHeader = document.getElementById('exercise-mobile-header');
	exerciseMobileHeader.innerText = `${exercise.name}`;
}

function renderExerciseHistoryHeader(date) {
	const header = document.createElement('div');
	header.classList.add('accordion-item');
	header.innerHTML = `
        <h2 class="accordion-header" id="date-${impale(date, '.')}-heading">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#date-${impale(
					date,
					'.'
				)}" aria-expanded="true" aria-controls="#date-${impale(date, '.')}">
                ${date}
            </button>
        </h2>
    `;
	return header;
}

function setupTableRows(exerciseHistoryItems) {
	return exerciseHistoryItems.map((item) => [
		new Date(item.date).toLocaleTimeString(),
		item.reps,
		item.weight,
	]);
}

function renderExerciseHistoryItemsTable(exerciseHistoryItems) {
	const exerciseHistoryItemsTable = document.createElement('table');
	exerciseHistoryItemsTable.classList.add('accordion-body', 'c-table', 'my-2');
	const headers = ['Data', 'Liczba powtórzeń', 'Waga'];
	const rows = setupTableRows(exerciseHistoryItems);
	setupTableRenderListener(exerciseHistoryItemsTable, headers, rows);
	return exerciseHistoryItemsTable;
}

function renderExerciseHistory() {
	const groupedExerciseHistoryItems = groupExerciseHistoryItemsByDate();
	const exerciseHistory = document.getElementById('exercise-history');
	exerciseHistory.innerHTML = '';
	for (const exercise of groupedExerciseHistoryItems) {
		const header = renderExerciseHistoryHeader(exercise.key);
		exerciseHistory.appendChild(header);
		const exerciseHistoryItemsTableContainer = document.createElement('div');
		exerciseHistoryItemsTableContainer.id = `date-${impale(exercise.key, '.')}`;
		exerciseHistoryItemsTableContainer.setAttribute(
			'aria-labelledby',
			`date-${impale(exercise.key, '.')}-heading`
		);
		exerciseHistoryItemsTableContainer.classList.add('accordion-collapse', 'collapse', 'show');
		const exerciseHistoryItemsTable = renderExerciseHistoryItemsTable(exercise.value);

		exerciseHistoryItemsTableContainer.appendChild(exerciseHistoryItemsTable);
		exerciseHistory.appendChild(exerciseHistoryItemsTableContainer);
	}
}

function goToPreviousExercise() {
	const workoutId = getQueryParameterFromUrl('workoutId');
	const currentExerciseId = getQueryParameterFromUrl('exerciseId');
	const workout = getWorkoutById(workoutId);
	const currentExercisePosition = workout.exercises.findIndex(
		(item) => item === currentExerciseId
	);
	if (currentExercisePosition > 0) {
		const previousExerciseId = workout.exercises[currentExercisePosition - 1];
		window.location.href = `./exercise.html?exerciseId=${previousExerciseId}&workoutId=${workoutId}`;
	} else {
		window.location.href = `./workout.html?workoutId=${workoutId}`;
	}
}

function goToNextExercise() {
	console.log('next');
	const workoutId = getQueryParameterFromUrl('workoutId');
	const currentExerciseId = getQueryParameterFromUrl('exerciseId');
	const workout = getWorkoutById(workoutId);
	const currentExercisePosition = workout.exercises.findIndex(
		(item) => item === currentExerciseId
	);
	if (currentExercisePosition < workout.exercises.length - 1) {
		const nextExerciseId = workout.exercises[currentExercisePosition + 1];
		window.location.href = `./exercise.html?exerciseId=${nextExerciseId}&workoutId=${workoutId}`;
	} else {
		workout.lastTraining = Date.now();
		updateWorkout(workout);
		window.location.href = `./workout.html?workoutId=${workoutId}`;
	}
}

function exercisePosition() {
	const workoutId = getQueryParameterFromUrl('workoutId');
	const currentExerciseId = getQueryParameterFromUrl('exerciseId');
	const workout = getWorkoutById(workoutId);
	return workout.exercises.findIndex((item) => item === currentExerciseId);
}

window.onload = function setupExercisePage() {
	setupTopBar();

	const workoutId = getQueryParameterFromUrl('workoutId');
	const currentExerciseId = getQueryParameterFromUrl('exerciseId');
	if (!workoutId || !currentExerciseId) {
		alert('Nie znalezione treningu lub ćwiczenia');
		window.location.href = '../index.html';
	}
	const addExerciseHistoryItemButton = document.getElementById(
		'add-exercise-history-item-button'
	);

	const previousExerciseButton = document.getElementById('previous-exercise-button');
	const nextExerciseButton = document.getElementById('next-exercise-button');
	const previousExerciseButtonMobile = document.getElementById('previous-exercise-button-mobile');
	const nextExerciseButtonMobile = document.getElementById('next-exercise-button-mobile');
	const goBackArrow = document.getElementById('go-back-arrow');

	const currentExercisePosition = exercisePosition();
	const workout = getWorkoutById(getQueryParameterFromUrl('workoutId'));
	console.log(currentExercisePosition);
	if (currentExercisePosition === 0) {
		previousExerciseButton.innerText = 'Powrót do treningu';
		previousExerciseButtonMobile.innerText = 'Powrót';
	} else if (currentExercisePosition === workout.exercises.length - 1) {
		nextExerciseButton.innerText = 'Zakończ trening';
		nextExerciseButtonMobile.innerText = 'Zakończ trening';
	}

	goBackArrow.href = `./workout.html?workoutId=${workoutId}`;

	previousExerciseButton.addEventListener('click', goToPreviousExercise);
	nextExerciseButton.addEventListener('click', goToNextExercise);
	previousExerciseButtonMobile.addEventListener('click', goToPreviousExercise);
	nextExerciseButtonMobile.addEventListener('click', goToNextExercise);
	addExerciseHistoryItemButton.addEventListener('click', saveExerciseHisotryItem);

	renderExerciseHeader();
	renderExerciseHistory();
};
