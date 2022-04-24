import { compareDatesFromStrings, impale, toLocaleDateString } from '../utils.js';
import { getWorkouts, setupLocalStorage } from '../store.js';
import { setupTopBar } from '../components/top-bar.js';
import { setupTableRenderListener } from '../components/table.js';

function setupActionButtons(workouts) {
	const actionButtons = workouts.map((workout) => {
		const goToWorkoutButton = document.createElement('a');
		goToWorkoutButton.classList.add('btn');
		goToWorkoutButton.innerHTML = `<img src = "./assets/chevron-right.svg"/>`;
		goToWorkoutButton.href = `./pages/workout.html?workoutId=${workout.id}`;
		return [goToWorkoutButton];
	});
	return actionButtons;
}

function setupTableRows(workouts) {
	return workouts.map((workout) => [
		workout.name,
		workout.exercises.length,
		toLocaleDateString(workout.lastTraining) ?? '',
	]);
}

function renderWorkoutTable(workouts) {
	let table = document.getElementById('workouts-table');
	const headers = ['Nazwa', 'Liczba ćwiczeń', 'Ostatni trening'];
	const rows = setupTableRows(workouts);
	const actionButtons = setupActionButtons(workouts);
	setupTableRenderListener(table, headers, rows, actionButtons);
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
};
