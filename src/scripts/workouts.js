function getWorkouts(){
    return [
        {
            name: 'Upper Body',
            numberOfExercises: 4,
            lastTraining: new Date('2019-01-01')
        },
        {
            name: 'Lower Body',
            numberOfExercises: 6,
            lastTraining: new Date('2020-05-03')
        },
        {
            name: 'Core',
            numberOfExercises: 5,
            lastTraining: new Date('2021-03-04')
        },
        {
            name: 'Cardio',
            numberOfExercises: 1,
            lastTraining: new Date('2022-02-01')
        },
        {
            name: 'Pilates',
            numberOfExercises: 1,
            lastTraining: new Date('2019-10-12')
        },
        {
            name: 'Yoga',
            numberOfExercises: 5,
            lastTraining: new Date('2021-01-01')
        }
    ];
}

class Workouts {
    constructor(){
        this.workouts = getWorkouts();
    }

    getWorkouts(){
        return this.workouts;
    }

    addWorkout(workout){
        this.workouts.push(workout);
    }

    removeWorkout(workout){
        this.workouts = this.workouts.filter(w => w.name !== workout.name);
    }

    updateWorkout(workout){
        this.workouts = this.workouts.map(w => {
            if(w.name === workout.name){
                return workout;
            }
            return w;
        });
    }

    generateWorkoutTableRow(workout){
        return `<tr>
                    <td>${workout.name}</td>
                    <td>${workout.numberOfExercises}</td>
                    <td>${workout.lastTraining.toLocaleDateString()}</td>
                </tr>`;
    }

    generateWorkoutsTable(){
        const workoutsTableBody = document.getElementById('workouts-table-body');
        this.workouts.sort((a, b) => compareDates(a.lastTraining, b.lastTraining, true));
        workoutsTableBody.innerHTML = this.workouts.map(this.generateWorkoutTableRow).join('');
    }

    syncWithLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.workouts));
    }

    loadFromLocalStorage(){
        if(localStorage.getItem('workouts')){
            this.workouts = JSON.parse(localStorage.getItem('workouts'));
        }
    }
}

// main script

var workouts = new Workouts();

function setupWorkoutsTable(){
    workouts.loadFromLocalStorage();

    workouts.generateWorkoutsTable();
}