// Select action buttons and inputs to create the element
let productName = document.getElementById('product-name');
let productDescription = document.getElementById('product-description');
let productPrice = document.getElementById('product-price');
let productImage = document.getElementById('product-image');
let productRating = document.getElementById('product-rating');
let submitBtn = document.getElementById('submit-product');

const productsURL = 'http://localhost:3000/products/';

//======EVENT LISTENERS ======
submitBtn.addEventListener('click', addNewProduct);

//ADMIN CRUD OPERATIONS
async function addNewProduct() {
	const data = {
		name: productName.value.trim(),
		description: productDescription.value.trim(),
		price: productPrice.value.trim(),
		imageUrl: productImage.value.trim(),
		rating: productRating.value.trim(),
	};
	if (
		!productName.value ||
		!productDescription.value ||
		!productPrice.value ||
		!productImage.value ||
		!productRating.value
	) {
		alert('Please fill in all fields before submitting.');
		return;
	}
	try {
		let response = await fetch(productsURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		let result = await response.json();
		console.log(`Product ${data.name} has been added`, result);

		productName.value = '';
		productDescription.value = '';
		productPrice.value = '';
		productImage.value = '';
		productRating.value = '';
	} catch (error) {
		console.error('Something Went wrong', error);
	}
}

async function getAllProducts() {
	try {
		let response = await fetch(productsURL);
		if (!response.ok) {
			throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching users:', error);
		return []; // Default fallback value.
	}
}
let tableContent = document.querySelector('tbody');
// async function populateAdminDashboard() {
// 	try {
// 		let products = await getAllProducts();
// 		for (const product of products) {
// 			tableContent.innerHTML += `<tr>
// 			<td>${product.id}</td>
// 							<td>${product.name}</td>
// 							<td>${product.description}</td>
// 							<td>$${product.price}</td>
// 							<td><img src="${product.imageUrl}" alt="Wine A Image" /></td>
// 							<td>${product.rating}/5</td>
// 							<td>
// 								<div class="button-container">
// 									<button id="update-btn-1" class="update-btn" data-id="${product.id}">Update</button>
// 									<button id="delete-btn-1" class="delete-btn" data-id="${product.id}">Delete</button>
// 								</div>
// 							</td>
// 							</tr>`;
// 		}
// 	} catch (error) {
// 		console.error('Something went wrong:', error);
// 	}
// }
async function populateAdminDashboard() {
	try {
		let products = await getAllProducts();
		tableContent.innerHTML = ''; // Clear existing rows

		for (const product of products) {
			tableContent.innerHTML += `<tr>
				<td>${product.id}</td>
				<td>${product.name}</td>
				<td>${product.description}</td>
				<td>$${product.price}</td>
				<td><img src="${product.imageUrl}" alt="Wine Image" /></td>
				<td>${product.rating}/5</td>
				<td>
					<div class="button-container">
						<button class="update-btn" data-id="${product.id}">Update</button>
						<button class="delete-btn" data-id="${product.id}">Delete</button>
					</div>
				</td>
			</tr>`;
		}

		// Add event listeners to all update buttons
		document.querySelectorAll('.update-btn').forEach((button) => {
			button.addEventListener('click', (event) => {
				let productId = event.target.getAttribute('data-id');
				handleUpdate(productId);
			});
		});
	} catch (error) {
		console.error('Something went wrong:', error);
	}
}

//=============SELECT THE ACTION BUTTONS=============
let updateButton = document.querySelector('.update-btn');
let deleteButton = document.querySelector('delete-btn');

//=============ADD EVENT LISTENERS====================
/*Step 1: Add Event Listeners to Handle Update and Delete
Add a single event listener to the parent element (tableContent) and use event delegation to handle clicks on dynamically generated buttons. */
tableContent.addEventListener('click', async (event) => {
	if (event.target.classList.contains('delete-btn')) {
		let productId = event.target.getAttribute('data-id');
		await deleteProduct(productId);
	} else if (event.target.classList.contains('update-btn')) {
		let productId = event.target.getAttribute('data-id');
		await updateProduct(productId);
	}
});

//Delete function for each product
/**Step 2: Implement the Delete Functionality
Create a function that sends a DELETE request to the API when a delete button is clicked. */

async function deleteProduct(productId) {
	try {
		let response = await fetch(`${productsURL}${productId}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			alert(`Product ID ${productId} has been deleted.`);
			// Optionally refresh the dashboard
			tableContent.innerHTML = '';
			await populateAdminDashboard();
		} else {
			throw new Error(`Failed to delete product. HTTP ${response.status}`);
		}
	} catch (error) {
		console.error('Error deleting product:', error);
	}
}

//=========UPDATE FUNCTION FOR EACH PRODUCT=========
/**Step 3: Implement the Update Functionality
Pre-fill the input fields with the current product details when the update button is clicked.
Allow the user to modify the fields and submit the updates.
Use a PUT request to send the updated data to the server.

======================DIDNT WORK BECAUSE IT DUPLICATED===================

Your preferred approach can be implemented effectively by introducing a "Save Changes" button. Here's how it can be done:

Steps to Implement
Add a "Save Changes" button to your HTML with display: none.
When the "Update" button is clicked:
Populate the input fields with the product data.
Make the "Save Changes" button visible.
The "Save Changes" button is used to trigger the updateProduct function.
After a successful update, clear the form fields, reset the "Save Changes" button to display: none, and refresh the product list.*/

// Select elements
let saveChangesBtn = document.getElementById('save-changes');
let selectedProductId = null; // Store the ID of the product being updated

// Update button functionality
async function handleUpdate(productId) {
	try {
		// Fetch the product data
		let response = await fetch(`${productsURL}${productId}`);
		if (!response.ok) {
			throw new Error(`HTTP Error ${response.status}`);
		}
		let product = await response.json();

		// Populate form fields with product data
		productName.value = product.name;
		productDescription.value = product.description;
		productPrice.value = product.price;
		productImage.value = product.imageUrl;
		productRating.value = product.rating;

		// Make the "Save Changes" button visible and store the product ID
		saveChangesBtn.style.display = 'inline-block';
		selectedProductId = productId;
	} catch (error) {
		console.error('Error fetching product details:', error);
	}
}

// Save Changes button functionality
saveChangesBtn.addEventListener('click', async (event) => {
	event.preventDefault();

	if (!selectedProductId) {
		alert('No product selected for update!');
		return;
	}

	const updatedData = {
		name: productName.value.trim(),
		description: productDescription.value.trim(),
		price: productPrice.value.trim(),
		imageUrl: productImage.value.trim(),
		rating: productRating.value.trim(),
	};

	try {
		// Make PUT request to update the product
		let response = await fetch(`${productsURL}${selectedProductId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		});

		if (response.ok) {
			alert(`Product ID ${selectedProductId} has been updated.`);

			// Clear form fields
			productName.value = '';
			productDescription.value = '';
			productPrice.value = '';
			productImage.value = '';
			productRating.value = '';

			// Hide the "Save Changes" button and reset selectedProductId
			saveChangesBtn.style.display = 'none';
			selectedProductId = null;

			// Refresh the product table
			tableContent.innerHTML = '';
			await populateAdminDashboard();
		} else {
			throw new Error(`Failed to update product. HTTP ${response.status}`);
		}
	} catch (error) {
		console.error('Error updating product:', error);
	}
});

populateAdminDashboard();
