import { compareDates, compareDatesFromStrings, impale, toLocaleDateString } from '../utils.js';
import { getWorkouts, setupLocalStorage } from '../store.js';
import { setupTopBar } from '../components/top-bar.js';

function renderWorkoutTableRow(workout) {
	return `
    <tr>
        <td>${workout.name}</td>
        <td>${workout.exercises.length}</td>
        <td>${toLocaleDateString(workout.lastTraining) ?? ''}</td>
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
	let table = document.getElementById('workouts-table-body');
	table.innerHTML = workouts.map(renderWorkoutTableRow).join('');
}

// main script

window.onload = function setupWorkoutsTable() {
	setupLocalStorage();
	setupTopBar();
	const workouts = getWorkouts();
	workouts.sort((a, b) =>
		compareDatesFromStrings(
			a.lastTraining ?? a.createdDate,
			b.lastTraining ?? b.createdDate,
			true
		)
	);

	renderWorkoutTable(workouts);

	const workoutsTableBody = document.getElementById('workouts-table-body');
	for (const button of workoutsTableBody.querySelectorAll('button')) {
		button.addEventListener('click', setupWorkoutModal);
	}
};
