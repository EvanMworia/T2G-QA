let trackedHabits = [];

let habitTitle = document.getElementById('habit-title');
let habitForm = document.getElementById('habit-form');
let habitImage = document.getElementById('habit-image');
let habitStartDate = document.getElementById('start-date');
let saveBtn = document.getElementById('save-btn');

let habitContainer = document.querySelector('.habit-container');
let deleteHabit = document.getElementById('delete-habit');
let addNewHabit = document.getElementById('add-new-btn');

let formContainer = document.querySelector('.form-container');

// EVENT LISTENERS
// Add event listeners for the SAVE button
saveBtn.addEventListener('click', createNewHabit);
saveBtn.addEventListener('onmouseenter ', console.log('yes'));

//Add Event Listener to toggle the visibility of the form
// Add event listener for the Add habitButton
addNewHabit.addEventListener('click', () => {
	// Toggle the 'hidden' class on the form container

	formContainer.classList.toggle('hidden');
});

//Create a new Habit and store it in an Array
function createNewHabit() {
	// habitForm.event.preventDefault();
	const id = trackedHabits.length + 1;
	const image = habitImage.value;
	const title = habitTitle.value;
	const streak = habitStartDate.value;

	const newHabit = { id, image, title, streak };
	if (newHabit.image.trim() == 0 && newHabit.title.trim() == 0) {
		alert('Values Cant Be Empty');
	} else {
		trackedHabits.push(newHabit);
		setTimeout(alert('Habit added succesfully to streak App'), 5000);
		displayHabits();
	}
	console.log(newHabit);
	habitTitle.value = '';
	habitImage.value = '';
	habitStartDate.value = '';
}

function displayHabits() {
	habitContainer.innerHTML = '';
	trackedHabits.forEach((habit) => {
		const streakDays = parseInt((Date.now() - new Date(habit.streak).getTime()) / (1000 * 60 * 60 * 24));
		habitContainer.innerHTML += ` <div class="habit-card">
				<img src="${habit.image}" alt="Habit Image" />
				<div>
					<p class="habit-title">${habit.title}</p>
					<p class="streak-info">Streak since:${habit.streak}(${streakDays} days)</p>
					<button class="delete-habit" id="delete-habit" onclick="removeHabit(${habit.id})">Delete Habit</button>
				</div>
			</div>
`;
	});
}

// Delete a habit by its ID
function removeHabit(habitId) {
	let index = trackedHabits
		.map((habit) => {
			return habit.id;
		})
		.indexOf(habitId);

	trackedHabits.splice(index, 1);
	displayHabits(); // Re-render the tracked habit list
	habitLoader();
}
function habitLoader() {
	if (trackedHabits.length == 0) {
		habitContainer.innerHTML = `<h2>Add Habits Below to keep track of your streak</h2>

        `;
	} else {
		displayHabits();
	}
}
habitLoader();
