function pangramChecker(text) {
	let formattedText = text.toLowerCase();

	let mySet = new Set();
	for (let char of formattedText) {
		if (char >= 'a' && char <= 'z') {
			mySet.add(char);
			console.log(mySet);
		}
	}
	if (mySet.size === 26) {
		return true;
	} else {
		return false;
	}
}

let text = 'The quick brown fox jumps over the lazy dog';
console.log(pangramChecker(text));
