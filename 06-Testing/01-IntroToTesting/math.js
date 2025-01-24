function sum(numbers) {
	//Array of number/strings
	let sum = 0;

	for (let num of numbers) {
		sum += +num;
	}

	return sum;
}

console.log(sum([2, 4]));

module.exports = { sum };
