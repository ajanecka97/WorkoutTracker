import { compareDates } from "../utils.js";
import { defaultWorkouts } from "../constants.js";

function loadWorkoutsFromLocalStorage() {
	let workoutsFromLocalStorage = localStorage.getItem("workouts");

	if (workoutsFromLocalStorage) {
		return JSON.parse(workoutsFromLocalStorage, workoutsReviver);
	} else {
		saveWorkoutsToLocalStorage(defaultWorkouts);
		return defaultWorkouts;
	}
}

function saveWorkoutsToLocalStorage(workouts) {
	localStorage.setItem(
		"workouts",
		JSON.stringify(workouts, workoutsReplacer)
	);
}

function workoutsReviver(key, value) {
	switch (key) {
		case "name":
			return value;
		case "numberOfExercises":
			return parseInt(value);
		case "lastTraining":
			return new Date(value);
		default:
			return value;
	}
}

function renderWorkoutTableRow(workout) {
	return `
    <tr>
        <td>${workout.name}</td>
        <td>${workout.numberOfExercises}</td>
        <td>${workout.lastTraining.toLocaleDateString()}</td>
    </tr>
    `;
}

function renderWorkoutTable(workouts) {
	let table = document.getElementById("workouts-table-body");
	table.innerHTML = workouts.map(renderWorkoutTableRow).join("");
}

// main script

var workouts;

window.onload = function setupWorkoutsTable() {
	workouts = loadWorkoutsFromLocalStorage();
	workouts.sort((a, b) => compareDates(a.lastTraining, b.lastTraining, true));

	renderWorkoutTable(workouts);
};
