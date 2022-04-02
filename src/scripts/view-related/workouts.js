import { compareDates, impale } from "../utils.js";
import { getWorkouts, setupLocalStorage } from "../store.js";

function renderWorkoutTableRow(workout) {
	console.log(workout);
	return `
    <tr>
        <td>${workout.name}</td>
        <td>${workout.exercises.length}</td>
        <td>${workout.lastTraining ?? ""}</td>
		<td>
			<a id="${impale(workout.name) + `-button`}"
			 class="btn"
			 href="./pages/workout.html?id=${workout.id}">
			 	<img src = "./assets/chevron-right.svg"/>
			</a>
		</td>
    </tr>
    `;
}

function renderWorkoutTable(workouts) {
	let table = document.getElementById("workouts-table-body");
	table.innerHTML = workouts.map(renderWorkoutTableRow).join("");
}

// main script

window.onload = function setupWorkoutsTable() {
	setupLocalStorage();
	const workouts = getWorkouts();
	workouts.sort((a, b) => compareDates(a.lastTraining, b.lastTraining, true));

	renderWorkoutTable(workouts);

	const workoutsTableBody = document.getElementById("workouts-table-body");
	for (const button of workoutsTableBody.querySelectorAll("button")) {
		button.addEventListener("click", setupWorkoutModal);
	}
};
