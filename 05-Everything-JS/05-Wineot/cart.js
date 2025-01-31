const { log } = require('console');

async function getUserCart(userId) {
	try {
		const response = await fetch(`http://localhost:3000/cartItems?id=${userId}`);
		if (!response.ok) throw new Error(`Error fetching cart: ${response.status}`);

		const userCart = await response.json();
		if (userCart.length === 0) {
			console.log('Cart is empty for this user.');
			return [];
		}

		console.log('User cart:', userCart[0].products); // Assumes 1 cart per user
		return userCart[0].products;
	} catch (error) {
		console.error('Error fetching user cart:', error);
	}
}

addProductToCart('aee6');

async function addProductToCart(userId, productId) {
	try {
		// Fetch user cart
		const cartResponse = await fetch(`http://localhost:3000/cartItems?id=${userId}`);
		let userCart = await cartResponse.json();

		// Fetch product details
		const productResponse = await fetch(`http://localhost:3000/products?id=${productId}`);
		const product = await productResponse.json();
		if (!product.length) throw new Error('Product not found.');

		const productDetails = product[0];

		if (userCart.length > 0) {
			// Update existing cart
			const cart = userCart[0];
			const productIndex = cart.products.findIndex((p) => p.id === productId);

			if (productIndex >= 0) {
				// Product exists, update quantity
				cart.products[productIndex].quantity += 1;
			} else {
				// Add new product
				cart.products.push({ id: productDetails.id, quantity: 1 });
			}

			// Update cart in DB
			await fetch(`http://localhost:3000/cartItems/${cart.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(cart),
			});
		} else {
			// Create a new cart for the user
			const newCart = {
				id: userId,
				products: [{ id: productDetails.id, quantity: 1 }],
			};

			await fetch(`http://localhost:3000/cartItems`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newCart),
			});
		}

		console.log(`${productDetails.name} added to cart.`);
	} catch (error) {
		console.error('Error adding product to cart:', error);
	}
}

async function removeProductFromCart(userId, productId) {
	try {
		// Fetch user cart
		const cartResponse = await fetch(`http://localhost:3000/cartItems?id=${userId}`);
		const userCart = await cartResponse.json();

		if (userCart.length === 0) {
			throw new Error('Cart is empty.');
		}

		const cart = userCart[0];
		const productIndex = cart.products.findIndex((p) => p.id === productId);

		if (productIndex === -1) {
			throw new Error('Product not found in cart.');
		}

		// Reduce quantity or remove product
		if (cart.products[productIndex].quantity > 1) {
			cart.products[productIndex].quantity -= 1;
		} else {
			cart.products.splice(productIndex, 1); // Remove product entirely
		}

		// Update cart in DB
		await fetch(`http://localhost:3000/cartItems/${cart.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(cart),
		});

		console.log('Product removed from cart.');
	} catch (error) {
		console.error('Error removing product from cart:', error);
	}
}

async function clearUserCart(userId) {
	try {
		const response = await fetch(`http://localhost:3000/cartItems?id=${userId}`);
		const userCart = await response.json();

		if (userCart.length > 0) {
			const cartId = userCart[0].id;
			await fetch(`http://localhost:3000/cartItems/${cartId}`, {
				method: 'DELETE',
			});
			console.log('Cart cleared.');
		} else {
			console.log('No cart to clear.');
		}
	} catch (error) {
		console.error('Error clearing cart:', error);
	}
}
clearUserCart();
console.log('cliccked');
