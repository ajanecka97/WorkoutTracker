import { generateUUID } from "../utils.js";

export function renderWorkoutModal(workout) {
	//if modal already exists - remove it
	const previousWorkoutModal = document.getElementById("workout-modal");
	if (previousWorkoutModal) previousWorkoutModal.remove();

	const workoutModal = document.createElement("div");
	workoutModal.id = "workout-modal";
	workoutModal.classList.add("modal", "fade");
	const workoutModalDialog = document.createElement("div");
	workoutModalDialog.classList.add("modal-dialog");
	const workoutModalContent = document.createElement("div");
	workoutModalContent.classList.add("modal-content");
	const workoutModalHeader = renderWorkoutModalHeader();
	const workoutModalBody = renderWorkoutModalBody(workout);
	const workoutModalFooter = renderWorkoutModalFooter();

	document.body.appendChild(workoutModal);
	workoutModal.appendChild(workoutModalDialog);
	workoutModalDialog.appendChild(workoutModalContent);
	workoutModalContent.appendChild(workoutModalHeader);
	workoutModalContent.appendChild(workoutModalBody);
	workoutModalContent.appendChild(workoutModalFooter);

	return workoutModal;
}

function renderWorkoutModalHeader() {
	const workoutModalHeader = document.createElement("div");
	workoutModalHeader.classList.add("modal-header");
	workoutModalHeader.innerHTML = `
        <h5 class="modal-title">Stwórz trening</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
	return workoutModalHeader;
}

function renderWorkoutModalBody(workout) {
	const workoutModalBody = document.createElement("div");
	workoutModalBody.classList.add("modal-body");
	const nameInput = document.createElement("input");
	nameInput.id = "workout-name";
	nameInput.type = "text";
	nameInput.classList.add("form-control");
	nameInput.placeholder = "Nazwa treningu";
	nameInput.value = workout.name ?? "";
	const exerciseList = renderExercisesTable(workout.exercises);
	workoutModalBody.appendChild(nameInput);
	workoutModalBody.appendChild(exerciseList);
	return workoutModalBody;
}

function renderWorkoutModalFooter() {
	const workoutModalFooter = document.createElement("div");
	workoutModalFooter.classList.add("modal-footer");

	const dismissButton = document.createElement("button");
	dismissButton.classList.add("btn", "btn-secondary", "btn-sm");
	dismissButton.type = "button";
	dismissButton.innerHTML = "Anuluj";
	dismissButton.setAttribute("data-bs-dismiss", "modal");

	const saveButton = document.createElement("button");
	saveButton.classList.add("btn", "btn-primary", "btn-sm");
	saveButton.type = "button";
	saveButton.innerHTML = "Zapisz";
	saveButton.addEventListener("click", saveWorkoutToLocalStorage);

	workoutModalFooter.appendChild(dismissButton);
	workoutModalFooter.appendChild(saveButton);

	return workoutModalFooter;
}

function renderExercisesTable(exercises) {
	const exercisesTable = document.createElement("table");
	exercisesTable.id = "exercises-table";
	exercisesTable.classList.add("table");
	exercisesTable.exercises = exercises;
	const exercisesTableHead = document.createElement("thead");
	exercisesTableHead.innerHTML = `
        <tr>
            <th>Pozycja</th>
            <th>Nazwa ćwiczenia</th>
        </tr>
        `;
	const exercisesTableBody = document.createElement("tbody");
	exercisesTableBody.innerHTML = exercises
		.map(renderExercisesTableRow)
		.join("");

	exercisesTable.appendChild(exercisesTableHead);
	exercisesTable.appendChild(exercisesTableBody);
	return exercisesTable;
}

function renderExercisesTableRow(exercise, index) {
	return `
    <tr>
        <td>${index + 1}</td>
        <td>${exercise.name}</td>
    </tr>
    `;
}

function saveWorkoutToLocalStorage() {
	const workoutName = document.getElementById("workout-name").value;
	const workoutExercises = document
		.getElementById("exercises-table")
		.exercises.map((exercise) => exercise.id);
	const workout = {
		id: generateUUID(),
		name: workoutName,
		exercises: workoutExercises,
		lastTrainingDate: null,
		createdDate: Date.now(),
	};

	const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
	workouts.push(workout);
	localStorage.setItem("workouts", JSON.stringify(workouts));

	const workoutModal = document.getElementById("workout-modal");
	workoutModal.remove();

	window.location.href = "../index.html";
}
