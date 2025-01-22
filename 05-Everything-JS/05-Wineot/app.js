const productsURL = 'http://localhost:3000/products/';

async function getProducts() {
	try {
		let response = await fetch(productsURL, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }, // Ensure proper content type
		});
		// Check for HTTP errors
		if (!response.ok) {
			throw new Error(`HTTP Error status, ${response.status}`);
		}
		// Parse the JSON data
		let data = await response.json();
		console.log('This is what we found', data);

		return data;
	} catch (error) {
		console.error('Something unexpected happened', error);
	}
}
//SELECTING NECESSARY ITEMS WE NEED FOR DISPLAYING DATA TO THE UI
let contentContainer = document.querySelector('.wine-grid');
async function displayProducts() {
	contentContainer.innerHTML = '';
	let products = await getProducts();
	for (const product of products) {
		contentContainer.innerHTML += `
        <div class="wine-card">
						<div class="wine-logo">🍇</div>
						<img
							src="${product.imageUrl}"
							alt="Wine Bottle"
							class="wine-image"
						/>
						<div class="wine-details">
							<h3 class="wine-title">${product.name}</h3>
							<p class="wine-subtitle">${product.description}</p>
							<p class="wine-price">$${product.price}</p>
							<div class="wine-rating">⭐${product.rating}</div>
						</div>
						<div class="wine-actions">
							<a href="#" class="wine-more">More</a>
							<button class="wine-add-to-cart">ADD TO CART</button>
						</div>
					</div>
        `;
	}
}
displayProducts();
