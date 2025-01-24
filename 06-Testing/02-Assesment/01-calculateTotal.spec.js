const { calculateTotal } = require('./01-calculateTotal');

it('Should Output the correct value when given valid inputs', () => {
	let products = [
		{
			name: 'Mouse',
			price: 200,
		},
		{
			name: 'Keyboard',
			price: 200,
		},
	];
	expect(calculateTotal(products)).toBe(388.8);
});

it('Should Output NaN when given object with no price property', () => {
	let products = [
		{
			name: 'Mouse',
			amount: 200,
		},
		{
			name: 'Keyboard',
			amount: 200,
		},
	];
	expect(calculateTotal(products)).toBe(NaN);
});

it('Should Total to Zero when given an empty object', () => {
	let products = [];

	expect(calculateTotal(products)).toBe(0);
});

it('Should Output NaN when given object with negative price properties', () => {
	let products = [
		{
			name: 'Mouse',
			amount: -200,
		},
		{
			name: 'Keyboard',
			amount: -200,
		},
	];
	expect(calculateTotal(products)).toBe(NaN);
});
