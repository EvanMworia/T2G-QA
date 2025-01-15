//find the total price of objects in an array
let products = [
	{
		name: 'Mouse',
		price: 300,
	},
	{
		name: 'Keyboard',
		price: 1500,
	},
	{
		name: 'HDMI',
		price: 500,
	},
	{
		name: 'Laptop Stand',
		price: 1200,
	},
];

let total = products.map((product) => product.price).reduce((sum, price) => sum + price, 0);

console.log('Total sum is', total);
