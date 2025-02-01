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
							<h3 class="wine-title" data-cy="wine-name">${product.name}</h3>
							<p class="wine-subtitle">${product.description}</p>
							<p class="wine-price">$${product.price}</p>
							<div class="wine-rating">⭐${product.rating}</div>
						</div>
						<div class="wine-actions">
							<a href="#" class="wine-more">More</a>
							<button class="wine-add-to-cart" data-id="${product.id}" data-cy="cart-btn" onclick="addToCart(${product.id})">ADD TO CART</button>
						</div>
					</div>
        `;
	}
	// Add event listeners to dynamically created buttons
	document.querySelectorAll('.wine-add-to-cart').forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.getAttribute('data-id');
			addToCart(productId); // Call your addToCart function
		});
	});
}
displayProducts();

//==================================================================
const cartURL = 'http://localhost:3000/cartItems';
// const productsURL = 'http://localhost:3000/products';

//
// document.getElementById('cart-container').addEventListener('click', (event) => {
// 	const cartItemId = event.target.getAttribute('data-id');

// 	if (event.target.classList.contains('increment-btn')) {
// 		incrementCartItem(cartItemId);
// 	} else if (event.target.classList.contains('decrement-btn')) {
// 		decrementCartItem(cartItemId);
// 	} else if (event.target.classList.contains('remove-btn')) {
// 		removeCartItem(cartItemId);
// 	}
// });
async function getCartItems() {
	try {
		let response = await fetch(cartURL);
		if (!response.ok) {
			throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
		}
		let results = await response.json();
		console.log(results);
		return results;
	} catch (error) {
		console.error('Error fetching users:', error);
		return []; // Default fallback value.
	}
}
getCartItems();
// Add product to cart
async function addToCart(productId) {
	// let cartId = localStorage.getItem("cartId") : 1
	try {
		// Fetch product details by ID
		const product = await fetch(`${productsURL}${productId}`).then((res) => res.json());

		// Create the cart item
		const cartItem = {
			productId: product.id,
			name: product.name,
			price: product.price,
			imageUrl: product.imageUrl,
			quantity: 1,
		};

		// Check if item already exists in the cart
		const existingCartItems = await fetch(cartURL).then((res) => res.json());
		const existingItem = existingCartItems.find((item) => item.productId === productId);

		if (existingItem) {
			// If exists, update quantity
			existingItem.quantity += 1;
			await fetch(`${cartURL}/${existingItem.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(existingItem),
			});
		} else {
			// If not, add as a new item
			await fetch(cartURL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(cartItem),
			});
			// cartId++
			// localStorage.setItem("cartId", cartId)
		}
		alert(`${product.name} has been added to the cart!`);
	} catch (error) {
		console.error('Error adding to cart:', error);
	}
}

// Fetch and display cart items
async function displayCartItems() {
	try {
		const cartItems = await fetch(cartURL).then((res) => res.json());
		console.log('cart items', cartItems);

		const cartContainer = document.getElementById('cart-container');
		// cartContainer.innerHTML = ''; // Clear previous content

		if (cartItems.length === 0) {
			cartContainer.innerHTML = '<p>Your cart is empty.</p>';
			return;
		}

		for (const item of cartItems) {
			const productsInCart = document.getElementById('cart-items');
			productsInCart.innerHTML += `
                <div class="cart-item">
                    <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="increment-btn" data-id="${item.id}" onclick="incrementCartItem(${item.id})">+</button>
                        <button class="decrement-btn" data-id="${item.id}">-</button>
                        <button class="remove-btn" data-id="${item.id}" onclick="removeCartItem(${item.id})">Remove</button>
                    </div>
                </div>
            `;
			// 	if (event.target.classList.contains('increment-btn')) {
			// 		incrementCartItem(cartItemId);
			// 	} else if (event.target.classList.contains('decrement-btn')) {
			// 		decrementCartItem(cartItemId);
			// 	} else if (event.target.classList.contains('remove-btn')) {
			// 		removeCartItem(cartItemId);
			// 	}
			// });
			// console.log(html);
		}
	} catch (error) {
		console.error('Error displaying cart items:', error);
	}
}

async function incrementCartItem(cartItemId) {
	try {
		// Fetch the current item
		const cartItem = await fetch(`${cartURL}/${cartItemId}`).then((res) => res.json());

		// Increment the quantity
		cartItem.quantity += 1;

		// Update in the API
		await fetch(`${cartURL}/${cartItemId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(cartItem),
		});

		// Refresh the cart display
		displayCartItems();
	} catch (error) {
		console.error('Error incrementing cart item:', error);
	}
}
async function decrementCartItem(cartItemId) {
	try {
		const cartItem = await fetch(`${cartURL}/${cartItemId}`).then((res) => res.json());

		if (cartItem.quantity > 1) {
			// Decrease quantity
			cartItem.quantity -= 1;

			await fetch(`${cartURL}/${cartItemId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(cartItem),
			});
		} else {
			// Remove the item if quantity is 1
			await removeCartItem(cartItemId);
		}

		displayCartItems();
	} catch (error) {
		console.error('Error decrementing cart item:', error);
	}
}
async function removeCartItem(cartItemId) {
	try {
		let response = await fetch(`${cartURL}?userId=${cartItemId}`, { method: 'DELETE' });
		if (!response.ok) {
			throw new Error(`Failed to remove item: ${response.status}`);
		}

		displayCartItems();
	} catch (error) {
		console.error('Error removing cart item:', error);
	}
}
displayCartItems();

// document.getElementById('checkout-btn').addEventListener('click', async function () {
// 	console.log('cliccked');

// 	try {
// 		// Fetch all cart items
// 		const response = await fetch('http://localhost:3000/cartItems');
// 		if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

// 		const items = await response.json();

// 		// Delete each item individually
// 		for (const item of items) {
// 			await fetch(`http://localhost:3000/cartItems/${item.id}`, { method: 'DELETE' });
// 		}
// 		alert('THANKYOU FOR SHOPPING WITH WINEOT?');
// 		console.log('All cart items deleted successfully!');
// 	} catch (error) {
// 		console.error('Error deleting items:', error);
// 	}
// });

async function checkout() {
	console.log('cliccked');

	try {
		// Fetch all cart items
		const response = await fetch('http://localhost:3000/cartItems');
		if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

		const items = await response.json();

		// Delete each item individually
		for (const item of items) {
			await fetch(`http://localhost:3000/cartItems/${item.id}`, { method: 'DELETE' });
		}
		alert('THANKYOU FOR SHOPPING WITH WINEOT?');
		console.log('All cart items deleted successfully!');
	} catch (error) {
		console.error('Error deleting items:', error);
	}
}
