import { generateUUID } from './utils.js';

export function setupLocalStorage() {
	if (!localStorage.getItem('exercises')) {
		const availableExercises = [
			{
				id: generateUUID(),
				name: 'Przysiady',
				category: 'Nogi',
				recommendedRepetitions: 5,
			},
			{
				id: generateUUID(),
				name: 'Wyciskanie sztangi',
				category: 'Klatka piersiowa',
				recommendedRepetitions: 10,
			},
			{
				id: generateUUID(),
				name: 'Martwy ciąg',
				category: 'Plecy',
				recommendedRepetitions: 5,
			},
			{
				id: generateUUID(),
				name: 'Uginanie przedramion z hantlami',
				category: 'Biceps',
				recommendedRepetitions: 10,
			},
			{
				id: generateUUID(),
				name: 'Prostowanie przedramion z linką wyciągu górnego',
				category: 'Triceps',
				recommendedRepetitions: 15,
			},
			{
				id: generateUUID(),
				name: 'Wykroki',
				category: 'Nogi',
				recommendedRepetitions: 15,
			},
			{
				id: generateUUID(),
				name: 'Suwnica',
				category: 'Nogi',
				recommendedRepetitions: 15,
			},
			{
				id: generateUUID(),
				name: 'Wznosy na palcach',
				category: 'Łydki',
				recommendedRepetitions: 15,
			},
			{
				id: generateUUID(),
				name: 'Wyciskanie sztangi nad głowę',
				category: 'Ramiona',
				recommendedRepetitions: 10,
			},
			{
				id: generateUUID(),
				name: 'Wznosy hantli bokiem',
				category: 'Ramiona',
				recommendedRepetitions: 15,
			},
		];

		localStorage.setItem('exercises', JSON.stringify(availableExercises));
	}

	if (!localStorage.getItem('workouts')) {
		const defaultWorkouts = [
			{
				id: generateUUID(),
				name: 'Góra',
				exercises: [
					getExercise(1).id,
					getExercise(3).id,
					getExercise(4).id,
					getExercise(8).id,
					getExercise(9).id,
				],
				lastTraining: '2020-01-01',
				createdDate: '2020-01-01',
			},
			{
				id: generateUUID(),
				name: 'Dół',
				exercises: [
					getExercise(0).id,
					getExercise(2).id,
					getExercise(5).id,
					getExercise(6).id,
					getExercise(7).id,
				],
				lastTraining: '2021-03-01',
				createdDate: '2020-01-01',
			},
			{
				id: generateUUID(),
				name: 'Całe ciało',
				exercises: [
					getExercise(1).id,
					getExercise(0).id,
					getExercise(8).id,
					getExercise(2).id,
					getExercise(4).id,
					getExercise(3).id,
				],
				lastTraining: '2021-03-01',
				createdDate: '2020-01-01',
			},
		];
		localStorage.setItem('workouts', JSON.stringify(defaultWorkouts));
	}
}

export function getExercises() {
	return JSON.parse(localStorage.getItem('exercises')) ?? [];
}

export function getExercise(index) {
	return JSON.parse(localStorage.getItem('exercises'))[index];
}

export function getExerciseById(id) {
	return JSON.parse(localStorage.getItem('exercises')).find((exercise) => exercise.id === id);
}

export function addExercise(exercise) {
	const exercises = JSON.parse(localStorage.getItem('exercises')) ?? [];
	exercises.push(exercise);
	localStorage.setItem('exercises', JSON.stringify(exercises));
}

export function updateExercise(exercise) {
	const exercises = JSON.parse(localStorage.getItem('exercises')) ?? [];
	const index = exercises.findIndex((e) => e.id === exercise.id);
	exercises[index] = exercise;
	localStorage.setItem('exercises', JSON.stringify(exercises));
}

export function getWorkouts() {
	return JSON.parse(localStorage.getItem('workouts')) ?? [];
}

export function getWorkout(index) {
	return JSON.parse(localStorage.getItem('workouts'))[index];
}

export function getWorkoutById(id) {
	return JSON.parse(localStorage.getItem('workouts')).find((workout) => workout.id === id);
}

export function addWorkout(workout) {
	const workouts = JSON.parse(localStorage.getItem('workouts')) ?? [];
	workouts.push(workout);
	localStorage.setItem('workouts', JSON.stringify(workouts));
}

export function updateWorkout(workout) {
	const workouts = JSON.parse(localStorage.getItem('workouts')) ?? [];
	const index = workouts.findIndex((w) => w.id === workout.id);
	workouts[index] = workout;
	localStorage.setItem('workouts', JSON.stringify(workouts));
}

export function addExerciseHisotryItem(exerciseHistoryItem) {
	const exerciseHistory = JSON.parse(localStorage.getItem('exerciseHistory')) ?? [];
	exerciseHistory.push(exerciseHistoryItem);
	localStorage.setItem('exerciseHistory', JSON.stringify(exerciseHistory));
}

export function getExerciseHistoryItems() {
	return JSON.parse(localStorage.getItem('exerciseHistory')) ?? [];
}

export function getExerciseHistoryItemsByExerciseId(exerciseId) {
	return (
		JSON.parse(localStorage.getItem('exerciseHistory'))?.filter(
			(item) => item.exerciseId === exerciseId
		) ?? []
	);
}
