/// <reference types="cypress"/>

// describe('Sign Up page Tests', () => {
// 	beforeEach(() => {
// 		cy.visit('http://127.0.0.1:5500/signup.html');
// 	});
// 	it('Should reject null inputs', () => {
// 		cy.get('[data-cy="register-button"]').click();
// 		cy.on('window:alert', (text) => {
// 			expect(text).contain('Please fill out all fields');
// 		});
// 	});
// 	it('Should alert the user if email is already in use', () => {
// 		cy.get('[data-cy="username"]').type('Cypress User');
// 		cy.get('[data-cy="email"]').type('test@example.com');
// 		cy.get('[data-cy="password"]').type('123');
// 		cy.get('[data-cy="confirm-password"]').type('123');
// 		cy.get('[data-cy="register-button"]').click();
// 		cy.on('window:alert', (text) => {
// 			expect(text).contain('Please fill out all fields');
// 		});
// 	});
// 	it('Should alert the user if passwords dont match', () => {
// 		cy.get('[data-cy="username"]').type('testUser');
// 		cy.get('[data-cy="email"]').type('test@example.com');
// 		cy.get('[data-cy="password"]').type('123');
// 		cy.get('[data-cy="confirm-password"]').type('1234');
// 		cy.get('[data-cy="register-button"]').click();
// 		cy.on('window:alert', (text) => {
// 			expect(text).contain('Please fill out all fields');
// 		});
// 	});

// 	it('Should Navigate to Login Page when link is clicked', () => {
// 		cy.get('[data-cy="go-to-login"]').click();
// 	});
// });

// describe('Login Page Tests', () => {
// 	beforeEach(() => {
// 		cy.visit('http://127.0.0.1:5500/login.html');
// 	});
// 	it('Should Prompt the user to fill all fields', () => {
// 		cy.get('[data-cy="login-button"]').click();
// 		cy.on('window:alert', (text) => {
// 			expect(text).contain('Please');
// 		});
// 	});
// 	it('Should Handle invalid Credentials', () => {
// 		cy.get('[data-cy="login-email"]').type('test@example.com');
// 		cy.get('[data-cy="login-password"]').type('12326373');
// 		cy.get('[data-cy="login-button"]').click();
// 		cy.get('[data-cy="message-box"]').contains('Invalid');
// 	});
// 	it('Should Handle invalid Credentials', () => {
// 		cy.get('[data-cy="login-email"]').type('test@example.com');
// 		cy.get('[data-cy="login-password"]').type('123');
// 		cy.get('[data-cy="login-button"]').click();
// 	});
// });

describe('Adding product to cart', () => {
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5500/index.html');
	});
	it('Should add a product to cart', () => {
		//cy.get('[data-cy="cart-btn"]').last().click();
		cy.get('[data-cy="cart-btn"]').first().click();
	});
});

describe('CHECKOUT', () => {
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5500/cart.html');
	});
	it('Should clear cart', () => {
		cy.get('.checkout-btn').click();
		cy.on('window:alert', (text) => {
			expect(text).contain('THANKYOU');
		});
	});
});
