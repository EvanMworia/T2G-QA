let trackedHabits = [];

let habitTitle = document.getElementById('habit-title');
let habitImage = document.getElementById('habit-image');
let habitStartDate = document.getElementById('start-date');
let saveBtn = document.getElementById('save-btn');

let habitContainer = document.querySelector('.habit-container');
let deleteHabit = document.getElementById('delete-habit');
let addNewHabit = document.getElementById('add-new-btn');

// EVENT LISTENERS
// Add event listeners for the SAVE button
saveBtn.addEventListener('click', createNewHabit);
saveBtn.addEventListener('onmouseenter ', console.log('yes'));

// Add event listeners for the delete buttons

// deleteHabit.forEach((button) => {
// 	button.addEventListener('click', (event) => {
// 		const habitId = event.target.getAttribute('data-id');
// 		removeHabit(parseInt(habitId)); // Call deleteMovie with the id of the clicked habit
// 	});
// });

// deleteHabit.addEventListener('click', (event) => {
// 	const habitId = event.target.getAttribute('data-id');
// 	removeHabit(parseInt(habitId)); // Call deleteMovie with the id of the clicked habit
// });

//Create a new Habit and store it in an Array
function createNewHabit() {
	const id = trackedHabits.length + 1;
	const image = habitImage.value;
	const title = habitTitle.value;
	const streak = habitStartDate.value;

	const newHabit = { id, image, title, streak };

	console.log('new habit', newHabit);
	trackedHabits.push(newHabit);
	console.log(newHabit);
	displayHabits();
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
