import {
	addExerciseHisotryItem,
	getExerciseHistoryItems,
	getWorkoutById,
	getExerciseById,
} from "../store.js";
import {
	getQueryParameterFromUrl,
	groupByProperty,
	toLocaleDateString,
	impale,
} from "../utils.js";

function saveExerciseHisotryItem(event) {
	event.preventDefault();
	const exerciseRepsInput = document.getElementById("exercise-reps");
	const exerciseWeightInput = document.getElementById("exercise-weight");

	const exerciseHistoryItem = {
		exerciseId: getQueryParameterFromUrl("id"),
		workoutId: getQueryParameterFromUrl("workoutId"),
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
		(exerciseHistoryItem) =>
			exerciseHistoryItem.exerciseId === getQueryParameterFromUrl("id")
	);

	const groupedExerciseHistoryItems = groupByProperty(
		filteredExerciseHistoryItems,
		"date",
		toLocaleDateString
	);

	return groupedExerciseHistoryItems;
}

function renderExerciseHeader() {
	const exercise = getExerciseById(getQueryParameterFromUrl("id"));

	const exerciseHeader = document.getElementById("exercise-header");
	exerciseHeader.innerHTML = `
        <h1 class="display-4">${exercise.name}</h1>
        <p class="lead">${exercise.description}</p>
    `;
}

function renderExerciseHistoryHeader(date) {
	const header = document.createElement("div");
	header.classList.add("accordion-item");
	header.innerHTML = `
        <h2 class="accordion-header" id="date-${impale(date, ".")}-heading">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#date-${impale(
					date,
					"."
				)}" aria-expanded="true" aria-controls="#date-${impale(
		date,
		"."
	)}">
                ${date}
            </button>
        </h2>
    `;
	return header;
}

function renderExerciseHistoryItemsTableHeader() {
	const tableHeader = document.createElement("tr");
	tableHeader.innerHTML = `
        <th>Data</th>
        <th>Liczba powtórzeń</th>
        <th>Waga</th>
    `;
	return tableHeader;
}

function renderExerciseHistoryItemsTableBody(exerciseHistoryItems) {
	const tableBody = document.createElement("tbody");
	exerciseHistoryItems.forEach((exerciseHistoryItem) => {
		const tableRow = document.createElement("tr");
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
	const exerciseHistoryItemsTable = document.createElement("table");
	exerciseHistoryItemsTable.classList.add(
		"accordion-body",
		"table",
		"table-striped",
		"my-2"
	);
	exerciseHistoryItemsTable.appendChild(
		renderExerciseHistoryItemsTableHeader()
	);
	exerciseHistoryItemsTable.appendChild(
		renderExerciseHistoryItemsTableBody(exerciseHistoryItems)
	);
	return exerciseHistoryItemsTable;
}

function renderExerciseHistory() {
	const groupedExerciseHistoryItems = groupExerciseHistoryItemsByDate();
	const exerciseHistory = document.getElementById("exercise-history");
	exerciseHistory.innerHTML = "";
	for (const date in groupedExerciseHistoryItems) {
		const header = renderExerciseHistoryHeader(date);
		exerciseHistory.appendChild(header);
		const exerciseHistoryItemsTableContainer =
			document.createElement("div");
		exerciseHistoryItemsTableContainer.id = `date-${impale(date, ".")}`;
		exerciseHistoryItemsTableContainer.setAttribute(
			"aria-labelledby",
			`date-${impale(date, ".")}-heading`
		);
		exerciseHistoryItemsTableContainer.setAttribute(
			"data-bs-parent",
			"#exercise-history"
		);
		exerciseHistoryItemsTableContainer.classList.add(
			"accordion-collapse",
			"collapse",
			"show"
		);
		const exerciseHistoryItems = groupedExerciseHistoryItems[date];
		const exerciseHistoryItemsTable =
			renderExerciseHistoryItemsTable(exerciseHistoryItems);

		exerciseHistoryItemsTableContainer.appendChild(
			exerciseHistoryItemsTable
		);
		exerciseHistory.appendChild(exerciseHistoryItemsTableContainer);
	}
}

function goToPreviousExercise() {
	const workoutId = getQueryParameterFromUrl("workoutId");
	const currentExerciseId = getQueryParameterFromUrl("id");
	const workout = getWorkoutById(workoutId);
	const currentExercisePosition = workout.exercises.findIndex(
		(item) => item === currentExerciseId
	);
	if (currentExercisePosition > 0) {
		const previousExerciseId =
			workout.exercises[currentExercisePosition - 1];
		window.location.href = `./exercise.html?id=${previousExerciseId}&workoutId=${workoutId}`;
	} else {
		window.location.href = `./workout.html?id=${workoutId}`;
	}
}

function goToNextExercise() {
	const workoutId = getQueryParameterFromUrl("workoutId");
	const currentExerciseId = getQueryParameterFromUrl("id");
	const workout = getWorkoutById(workoutId);
	const currentExercisePosition = workout.exercises.findIndex(
		(item) => item === currentExerciseId
	);
	if (currentExercisePosition < workout.exercises.length - 1) {
		const nextExerciseId = workout.exercises[currentExercisePosition + 1];
		window.location.href = `./exercise.html?id=${nextExerciseId}&workoutId=${workoutId}`;
	} else {
		window.location.href = `./workout.html?id=${workoutId}`;
	}
}

window.onload = function setupExercisePage() {
	const addExerciseHistoryItemButton = document.getElementById(
		"add-exercise-history-item-button"
	);
	const previousExerciseButton = document.getElementById(
		"previous-exercise-button"
	);
	const nextExerciseButton = document.getElementById("next-exercise-button");

	addExerciseHistoryItemButton.addEventListener(
		"click",
		saveExerciseHisotryItem
	);
	previousExerciseButton.addEventListener("click", goToPreviousExercise);
	nextExerciseButton.addEventListener("click", goToNextExercise);

	renderExerciseHeader();
	renderExerciseHistory();
};
