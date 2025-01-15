//Sort an array of objects
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
	{
		name: 'A good test object',
		price: 0,
	},
];

products = products.sort((a, b) => a.name.localeCompare(b.name));
console.log(products);
