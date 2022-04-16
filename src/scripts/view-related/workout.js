import { setupTopBar } from '../components/top-bar.js';
import { getExerciseById, getWorkoutById } from '../store.js';
import { getQueryParameterFromUrl, impale } from '../utils.js';

function renderWorkoutTableRow(exercise) {
	return `
        <tr>
            <td>${exercise.name}</td>
            <td>${exercise.pr ?? '-'}</td>
            <td>${calculateTotalWeightOfLastTraining(exercise)}</td>
            <td>
                <a id="${impale(exercise.name) + `-button`}"
                class="btn"
                href="./exercise.html?id=${exercise.id}&workoutId=${getQueryParameterFromUrl(
		'id'
	)}">
                    <img src = "../assets/chevron-right.svg"/>
                </a>
            </td>
        </tr>
    `;
}

function renderWorkoutTable(exercises) {
	let table = document.getElementById('workout-table-body');
	table.innerHTML = exercises.map(renderWorkoutTableRow).join('');
}

function calculateTotalWeightOfLastTraining(exercise) {
	if (exercise.sessions) {
		return exercise.sessions.reduce((acc, session) => acc + session.weight, 0);
	}
	return '-';
}

window.onload = function setupWorkoutTable() {
	setupTopBar();

	const workoutId = getQueryParameterFromUrl('id');
	const workout = getWorkoutById(workoutId);
	const exercises = workout.exercises.map(getExerciseById);
	renderWorkoutTable(exercises);
};
