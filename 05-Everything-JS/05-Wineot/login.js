const usersURL = 'http://localhost:3000/users/';

let loginButton = document.querySelector('#login-button');
//=========LOGIN EVENT LISTENER=====
loginButton.addEventListener('click', (event) => {
	event.preventDefault();
	loginUser();
});

//====LOGIN USER=========
async function loginUser() {
	try {
		let email = document.querySelector('#login-email').value.trim();
		let password = document.querySelector('#login-password').value.trim();
		console.log('email entered is', email);
		console.log('password entered is', password);

		if (!email || !password) {
			alert('Please fill out all fields.');
			return;
		}
		let usersData = await getUsers();
		let foundUser = usersData.find((user) => user.email === email);
		if (!foundUser) {
			alert('Invalid Credentials');
			return;
		}
		if (foundUser.password != password) {
			alert('Invalid Credentials');
			return;
		}
		if (foundUser.email == 'admin@admin.com') {
			window.location.href = './admin.html';
			return;
		}

		window.location.href = './index.html';
	} catch (error) {
		console.error('Something unexpected happened', error);
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
