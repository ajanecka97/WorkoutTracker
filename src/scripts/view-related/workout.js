import { getExerciseById, getWorkoutById } from "../store.js";
import { getQueryParameterFromUrl } from "../utils.js";

function renderWorkoutTableRow(exercise) {
	return `
        <tr>
            <td>${exercise.name}</td>
            <td>${exercise.pr ?? "-"}</td>
            <td>${calculateTotalWeightOfLastTraining(exercise)}</td>
        </tr>
    `;
}

function renderWorkoutTable(exercises) {
	let table = document.getElementById("workout-table-body");
	table.innerHTML = exercises.map(renderWorkoutTableRow).join("");
}

function calculateTotalWeightOfLastTraining(exercise) {
	if (exercise.sessions) {
		return exercise.sessions.reduce(
			(acc, session) => acc + session.weight,
			0
		);
	}
	return "-";
}

window.onload = function setupWorkoutTable() {
	const workoutId = getQueryParameterFromUrl("id");
	const workout = getWorkoutById(workoutId);
	const exercises = workout.exercises.map(getExerciseById);
	renderWorkoutTable(exercises);
};
