import { setupTopBar } from '../components/top-bar.js';
import {
	addExerciseHisotryItem,
	getExerciseHistoryItems,
	getWorkoutById,
	getExerciseById,
	editWorkout,
} from '../store.js';
import {
	getQueryParameterFromUrl,
	toLocaleDateString,
	impale,
	groupByPropertySorted,
	compareDatesFromStrings,
} from '../utils.js';

function saveExerciseHisotryItem(event) {
	event.preventDefault();
	const exerciseRepsInput = document.getElementById('exercise-reps');
	const exerciseWeightInput = document.getElementById('exercise-weight');

	const exerciseHistoryItem = {
		exerciseId: getQueryParameterFromUrl('id'),
		workoutId: getQueryParameterFromUrl('workoutId'),
		reps: exerciseRepsInput.value,
		weight: exerciseWeightInput.value,
		date: Date.now(),
	};

	addExerciseHisotryItem(exerciseHistoryItem);
	renderExerciseHistory();
}

function groupExerciseHistoryItemsByDate() {
	const exerciseHistoryItems = getExerciseHistoryItems();
	const filteredExerciseHistoryItems = exerciseHistoryItems.filter(
		(exerciseHistoryItem) => exerciseHistoryItem.exerciseId === getQueryParameterFromUrl('id')
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
	const exercise = getExerciseById(getQueryParameterFromUrl('id'));

	const exerciseHeader = document.getElementById('exercise-header');
	exerciseHeader.innerHTML = `
        <h1 class="display-4">${exercise.name}</h1>
        <p class="lead">${exercise.description}</p>
    `;
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

function renderExerciseHistoryItemsTableHeader() {
	const tableHeader = document.createElement('tr');
	tableHeader.innerHTML = `
        <th>Data</th>
        <th>Liczba powtórzeń</th>
        <th>Waga</th>
    `;
	return tableHeader;
}

function renderExerciseHistoryItemsTableBody(exerciseHistoryItems) {
	const tableBody = document.createElement('tbody');
	exerciseHistoryItems.forEach((exerciseHistoryItem) => {
		const tableRow = document.createElement('tr');
		tableRow.innerHTML = `
            <td>${new Date(exerciseHistoryItem.date).toLocaleTimeString()}</td>
            <td>${exerciseHistoryItem.reps}</td>
            <td>${exerciseHistoryItem.weight}</td>
        `;
		tableBody.appendChild(tableRow);
	});
	return tableBody;
}

function renderExerciseHistoryItemsTable(exerciseHistoryItems) {
	const exerciseHistoryItemsTable = document.createElement('table');
	exerciseHistoryItemsTable.classList.add('accordion-body', 'table', 'table-striped', 'my-2');
	exerciseHistoryItemsTable.appendChild(renderExerciseHistoryItemsTableHeader());
	exerciseHistoryItemsTable.appendChild(
		renderExerciseHistoryItemsTableBody(exerciseHistoryItems)
	);
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
		editWorkout(workout);
		window.location.href = `./workout.html?workoutId=${workoutId}`;
	}
}

function exercisePosition() {
	const workoutId = getQueryParameterFromUrl('workoutId');
	const currentExerciseId = getQueryParameterFromUrl('id');
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

	const currentExercisePosition = exercisePosition();
	const workout = getWorkoutById(getQueryParameterFromUrl('workoutId'));
	if (currentExercisePosition === 0) {
		previousExerciseButton.innerText = 'Powrót do treningu';
	} else if (currentExercisePosition === workout.exercises.length - 1) {
		nextExerciseButton.innerText = 'Zakończ trening';
	}

	previousExerciseButton.addEventListener('click', goToPreviousExercise);
	nextExerciseButton.addEventListener('click', goToNextExercise);

	renderExerciseHeader();
	renderExerciseHistory();
};
