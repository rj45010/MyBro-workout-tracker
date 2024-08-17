const daysOfWeek = ["Monday - ", "Tuesday - ", "Wednesday - ", "Thursday - ", "Friday - ", "Saturday - ", "Sunday - "];

// Initialize page with days of the week
daysOfWeek.forEach(day => {
    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-container';

    const dayHeader = document.createElement('h2');
    dayHeader.className = 'day-header';
    
    const dayText = document.createElement('span');
    dayText.textContent = day;

    const restDayText = document.createElement('span');
    restDayText.textContent = "Rest Day";

    dayHeader.appendChild(dayText);
    dayHeader.appendChild(restDayText);

    const table = document.createElement('table');

    // Create the 'Add Exercise' button
    const addExerciseButton = document.createElement('button');
    addExerciseButton.textContent = 'Add Exercise';
    addExerciseButton.className = 'add-exercise';

    // Add the button to the container
    dayContainer.appendChild(addExerciseButton);


    dayContainer.appendChild(dayHeader);
    dayContainer.appendChild(table);
    dayContainer.appendChild(addExerciseButton);

    document.getElementById('exercise-container').appendChild(dayContainer);

    let restDayEditable = false;

    addExerciseButton.addEventListener('click', function() {
        if (!restDayEditable) {
            restDayText.contentEditable = true;
            restDayText.focus();
            restDayEditable = true;
        }

        const row = document.createElement('tr');

        const exerciseCell = document.createElement('td');
        const setsCell = document.createElement('td');
        const repsCell = document.createElement('td');
        const deleteCell = document.createElement('td');

        const exerciseInput = document.createElement('input');
        exerciseInput.type = 'text';
        exerciseInput.placeholder = 'Exercise Name';

        const setsInput = document.createElement('input');
        setsInput.type = 'number';
        setsInput.placeholder = 'Sets';
        setsInput.min = '1';

        const repsContainer = document.createElement('div'); // Container for reps inputs

        setsInput.addEventListener('input', function() {
            const numSets = parseInt(setsInput.value, 10) || 0;
            repsContainer.innerHTML = ''; // Clear existing reps inputs

            for (let i = 0; i < numSets; i++) {
                const repsInput = document.createElement('input');
                repsInput.type = 'number';
                repsInput.placeholder = `Reps ${i + 1}`;
                repsInput.min = '1';
                repsContainer.appendChild(repsInput);
                repsContainer.appendChild(document.createElement('br')); // Add line break for clarity
            }
        });

        exerciseCell.appendChild(exerciseInput);
        setsCell.appendChild(setsInput);
        repsCell.appendChild(repsContainer);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';

        deleteCell.appendChild(deleteButton);

        row.appendChild(exerciseCell);
        row.appendChild(setsCell);
        row.appendChild(repsCell);
        row.appendChild(deleteCell);

        table.appendChild(row);

        deleteButton.addEventListener('click', function() {
            table.removeChild(row);

            if (table.rows.length === 0) {
                restDayText.contentEditable = false;
                restDayText.textContent = "Rest Day";
                restDayEditable = false;
            }
        });
    });
});

// Function to collect data for saving
function collectWorkoutData() {
    const workoutData = [];
    document.querySelectorAll('.day-container').forEach(container => {
        const dayName = container.querySelector('.day-header span').textContent.trim();
        const exercises = [];
        container.querySelectorAll('table tr').forEach(row => {
            const exerciseName = row.querySelector('td input[placeholder="Exercise Name"]').value;
            const sets = row.querySelector('td input[placeholder="Sets"]').value;
            const repsInputs = row.querySelectorAll('td div input[type="number"]');
            const reps = Array.from(repsInputs).map(input => input.value);

            if (exerciseName || sets || reps.length > 0) {
                exercises.push({ exerciseName, sets, reps });
            }
        });
        workoutData.push({ dayName, exercises });
    });
    return workoutData;
}

// Save button functionality
document.getElementById('save-btn').addEventListener('click', function() {
    const data = collectWorkoutData();
    console.log('Workout Data:', data);
    
    // Here you would send the data to the server
    // For example, using fetch:
    /*
    fetch('/save-workout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log('Save result:', result))
    .catch(error => console.error('Save error:', error));
    */
});
