function reverseString(text) {
	let splitText = text.split('');
	let reversedText = splitText.reverse();
	let joinedText = reversedText.join('');
	return joinedText;
}
let text = '12345';
console.log(reverseString(text));
