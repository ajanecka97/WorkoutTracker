import { setupTopBar } from '../components/top-bar.js';
import { getExerciseById, getWorkoutById } from '../store.js';
import { getQueryParameterFromUrl, impale } from '../utils.js';
import { setupTableRenderListener } from '../components/table.js';

function setupWorkoutTableRow(exercises) {
	return exercises.map((exercise) => [
		exercise.name,
		exercise.pr ?? '-',
		calculateTotalWeightOfLastTraining(exercise),
	]);
}

function setupActionButtons(exercises) {
	const actionButtons = exercises.map((exercise) => {
		const goToExerciseButton = document.createElement('a');
		goToExerciseButton.classList.add('btn');
		goToExerciseButton.innerHTML = `<img src = "../assets/chevron-right.svg"/>`;
		goToExerciseButton.href = `./exercise.html?exerciseId=${
			exercise.id
		}&workoutId=${getQueryParameterFromUrl('workoutId')}`;
		return [goToExerciseButton];
	});
	return actionButtons;
}

function renderWorkoutTable(exercises) {
	let table = document.getElementById('workout-table');
	const headers = ['Nazwa ćwiczenia', 'PR', 'Ostatni trening'];
	const rows = setupWorkoutTableRow(exercises);
	const actionButtons = setupActionButtons(exercises);
	setupTableRenderListener(table, headers, rows, actionButtons);
}

function calculateTotalWeightOfLastTraining(exercise) {
	if (exercise.sessions) {
		return exercise.sessions.reduce((acc, session) => acc + session.weight, 0);
	}
	return '-';
}

window.onload = function setupWorkoutTable() {
	setupTopBar();

	const workoutId = getQueryParameterFromUrl('workoutId');
	const workout = getWorkoutById(workoutId);
	const exercises = workout.exercises.map(getExerciseById);
	renderWorkoutTable(exercises);
};
