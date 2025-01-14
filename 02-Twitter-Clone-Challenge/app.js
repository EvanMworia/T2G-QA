const users = 'https://jsonplaceholder.typicode.com/users/';
const posts = 'https://jsonplaceholder.typicode.com/posts/';
const comments = 'https://jsonplaceholder.typicode.com/comments/';
const dropdown = document.getElementById('dropdown');
const profileInfo = document.getElementById('profile-info');
const contentArea = document.getElementById('content-area');

async function displayDefaultContent() {}

async function getUsers() {
	const response = await fetch(users);

	try {
		if (!response.ok) {
			throw new Error(`HTTP ${response.status} Error Occured`);
		}
		const data = await response.json();

		console.log('These are all the users gotten', data);
		return data;
	} catch (error) {
		console.error('Error Fetching data', error);
	}
}

//Fetches and Populates the dropdown with all the users found from the UsersAPI
async function populateDropdown() {
	const response = await fetch(users);

	try {
		if (!response.ok) {
			throw new Error(`HTTP ${response.status} Error Occured`);
		}
		const data = await response.json();
		for (let i = 0; i < data.length; i++) {
			const user = data[i];
			const option = document.createElement('option');
			option.value = user.id;
			option.textContent = user.name;
			dropdown.appendChild(option);
		}
	} catch (error) {
		console.error('Error Fetching users to populate in dropdown', error);
	}
}
//extracts the userId from the values of the dropdown----
function captureSelectedDropdownValue() {
	const selectedIndex = dropdown.value;
	return selectedIndex;
}

//Renders everything related to the selected user on the page
async function displayUsersContent() {
	const uid = captureSelectedDropdownValue();

	let html = '';
	await fetch(users + uid)
		.then((res) => res.json())
		.then((user) => {
			html += `<div class="profile-name" id="profile-name">${user.name}</div>
            <div class="profile-username" id="profile-username">@${user.username}</div>
            <br /><br />
            <div class="catch-phrase" id="catch-phrase">${user.company.catchPhrase}</div>
            <br />
            <div class="links-container">
                <div class="website" id="website">
                    <i class="fa-solid fa-globe"></i>
                    ${user.website}
                </div>
                <br />

                <div class="city" id="city">
                    <i class="fas fa-map-marker-alt"></i>
                    ${user.address.city}
                </div>
                <br />
            </div>`;
		});
	profileInfo.innerHTML = html;

	displayUserPosts();
}

//-----
async function displayUserPosts() {
	let htmlToBeRendered = '';
	const uid = captureSelectedDropdownValue();
	console.log('UID', uid);

	const usersFoundFromAPI = await getUsers();
	const tweepName = usersFoundFromAPI.find((user) => user.id == uid);

	const allPosts = await getPosts();
	const postsBySingleUser = allPosts.filter((post) => post.userId == Number(uid));

	console.log(postsBySingleUser);
	postsBySingleUser.forEach((post) => {
		htmlToBeRendered += `<div class="tweet">
                <div class="profile-picture-small"></div>
                <div class="tweet-content">
                    <div class="tweet-header">
                        <span class="tweet-name">${tweepName.name}</span>
                        <span class="tweet-username">@${tweepName.username}</span>
                        <span class="tweet-time">1h</span>
                    </div>
                    <div class="tweet-text">
                        ${post.body}
                    </div>
                </div>
            </div>`;
	});
	contentArea.innerHTML = htmlToBeRendered;
}

async function getPosts() {
	try {
		const response = await fetch(posts);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status} Error`);
		}
		const data = await response.json();
		console.log('These are all the posts gotten', data);
		return data;
	} catch (error) {
		console.error('Something went wrong', error);
	}
}

populateDropdown();
getUsers();
getPosts();
