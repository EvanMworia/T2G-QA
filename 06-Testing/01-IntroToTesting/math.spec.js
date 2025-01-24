const { default: expect } = require('expect');
const { sum } = require('./math');

it('Should give correct output when given valid inputs ', () => {
	inputs = [2, 4];

	// let result = inputs[0] + inputs[1];
	let result = sum(inputs);
	expect(sum(inputs)).toBe(result);
});

test('Should return Zero when fed an empty array', () => {
	inputs = [];
	expect(sum(inputs)).toBe(0);
});
