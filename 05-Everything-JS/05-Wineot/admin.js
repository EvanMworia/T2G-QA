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
async function populateAdminDashboard() {
	try {
		let products = await getAllProducts();
		for (const product of products) {
			tableContent.innerHTML += `<tr>
			<td>${product.id}</td>
							<td>${product.name}</td>
							<td>${product.description}</td>
							<td>$${product.price}</td>
							<td><img src="${product.imageUrl}" alt="Wine A Image" /></td>
							<td>${product.rating}/5</td>
							<td>
								<div class="button-container">
									<button id="update-btn-1" class="update-btn">Update</button>
									<button id="delete-btn-1" class="delete-btn">Delete</button>
								</div>
							</td>
							</tr>`;
		}
	} catch (error) {
		console.error('Something went wrong:', error);
	}
}
populateAdminDashboard();
