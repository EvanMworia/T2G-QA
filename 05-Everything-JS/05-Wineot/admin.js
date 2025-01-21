// Select action buttons and inputs to create the element
let productName = document.getElementById('product-name');
let productDescription = document.getElementById('product-description');
let productPrice = document.getElementById('product-price');
let productImage = document.getElementById('product-image');
let productRating = document.getElementById('product-rating');
let submitBtn = document.getElementById('submit-product');

const productsURL = 'http://localhost:3000/products/';

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

submitBtn.addEventListener('click', addNewProduct);
