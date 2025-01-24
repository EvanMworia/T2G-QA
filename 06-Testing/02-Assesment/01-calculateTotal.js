// 1. Create a function calculateTotal() that:
// • Accepts an array of product objects
// • Calculates total price with conditions:
// • Apply 10% discount for total over $100
// • Add 8% sales tax
// • Handle potential edge cases

function calculateTotal(products) {
	try {
		let total = products.map((product) => product.price).reduce((sum, price) => sum + price, 0);

		if (total > 100) {
			total = total * 0.9;
		}
		const totalWithSalesTax = total * 1.08;

		return totalWithSalesTax;
	} catch (error) {
		console.error(error);
	}
}

let products = [
	{
		name: 'Mouse',
		prices: 200,
	},
	{
		name: 'Keyboard',
		prices: 200,
	},
];
let total = calculateTotal(products);
console.log(total);

module.exports = { calculateTotal };
