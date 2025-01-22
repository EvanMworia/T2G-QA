const usersURL = 'http://localhost:3000/users/';
//SELECTING NECESARY ELEMENTS

// let userName = document.querySelector('#username');
// let email = document.querySelector('#email');
// let password = document.querySelector('#password');
// let confirmPassword = document.querySelector('#confirm-password');
let registerButton = document.querySelector('#register-button');

//ADDING EVENT LISTENERS
// =========SIGN UP EVENT LISTENER=====
registerButton.addEventListener('click', (event) => {
	event.preventDefault();
	captureUserDetails();
});

//POST user details to API
async function captureUserDetails() {
	try {
		let userName = document.querySelector('#username').value.trim();
		let email = document.querySelector('#email').value.trim();
		let password = document.querySelector('#password').value.trim();
		let confirmPassword = document.querySelector('#confirm-password').value.trim();
		//VALIDATE FORM INPUTS
		if (!userName || !email || !password || !confirmPassword) {
			alert('Please fill out all fields.');
			return;
		}
		//CHECK IF USER ALREADY EXISTS
		let users = await getUsers();
		let matchFound = users.find((user) => user.email === email);
		if (matchFound) {
			alert('Email already exists');
			return;
		}
		if (password != confirmPassword) {
			alert('Passwords must match!');
			return;
		}
		let data = { username: userName, email: email, password: password };
		//make the POST request
		let response = await fetch(usersURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			alert('Registration Successful');
			userName.value = '';
			email.value = '';
			password.value = '';
			confirmPassword.value = '';
		} else {
			throw new Error(`HTTP ERROR ${response.status}:${response.statusText}`);
		}
	} catch (error) {
		console.error('Something went wrong', error);
	}
}

//get users
async function getUsers() {
	try {
		let response = await fetch(usersURL);
		if (!response.ok) {
			throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching users:', error);
		return []; // Default fallback value.
	}
}
