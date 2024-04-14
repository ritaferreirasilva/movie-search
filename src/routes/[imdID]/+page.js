export async function load({ fetch, params }) {
	const res = await fetch(`https://www.omdbapi.com/?apikey=3bb9b546&i=${params.imdID}`);
	const movie = await res.json();
	return { movie };
}
