import { generateUUID } from './utils.js';

export function setupLocalStorage() {
	if (!localStorage.getItem('exercises')) {
		const availableExercises = [
			{
				id: generateUUID(),
				name: 'Squats',
				category: 'Legs',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Bench press',
				category: 'Chest',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Deadlift',
				category: 'Back',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Biceps curl',
				category: 'Biceps',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Triceps extension',
				category: 'Triceps',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Leg press',
				category: 'Legs',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Leg curl',
				category: 'Legs',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Calf raise',
				category: 'Calves',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Shoulder press',
				category: 'Shoulders',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
			{
				id: generateUUID(),
				name: 'Shoulder shrug',
				category: 'Shoulders',
				description: '',
				difficulty: 'easy',
				recommendedRepetitions: 5,
				recommendedSets: 3,
			},
		];

		localStorage.setItem('exercises', JSON.stringify(availableExercises));
	}

	if (!localStorage.getItem('workouts')) {
		const defaultWorkouts = [
			{
				id: generateUUID(),
				name: 'Upper body',
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
				name: 'Lower body',
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
	return JSON.parse(localStorage.getItem('exerciseHistory')).filter(
		(item) => item.exerciseId === exerciseId
	);
}
