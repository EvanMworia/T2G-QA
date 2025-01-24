class Person {
	constructor(name) {
		this.name = name;
	}
	updateName(updatedName) {
		this.name = updatedName;
	}
	deleteName() {
		this.name = '';
	}
}

module.exports = { Person };
