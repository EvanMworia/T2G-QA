async function getPosts(id) {
	try {
		let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
		if (!response.ok) {
			throw new Error(`HTTP ERROR ${response.status}: ${response.statusText}`);
		}
		let postsGotten = await response.json();
		return postsGotten;
	} catch (error) {
		console.error(error);
	}
}

(async () => {
	try {
		const posts = await getPosts(1);
		console.log('Post data:', posts);
	} catch (error) {
		console.error('Failed to get post:', error.message);
	}
})();

module.exports = { getPosts };
