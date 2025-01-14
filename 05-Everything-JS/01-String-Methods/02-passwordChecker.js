function consecutiveNumbers(password) {
	for (let i = 0; i < password.length - 1; i++) {
		if (!isNaN(password[i]) && password[i] === password[i + 1]) {
			return true;
		}
	}
	return false;
}

let pwd = 'ev111';
let result = consecutiveNumbers(pwd);
console.log(result);
