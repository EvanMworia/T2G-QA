const { getPosts } = require('./04-postsAPI');
test('Should handle valid input correctly', async () => {
	const id = 1;
	const post = await getPosts(id);

	expect(post).reloves.toEqual(post);
});
test('Should handle invalid input correctly', async () => {
	const post = await getPosts('invalid');

	expect(post).toBeUndefined();
});
