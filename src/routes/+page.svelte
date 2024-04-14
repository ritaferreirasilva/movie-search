<script>
	import { browser } from '$app/environment';

	import Favorite from './Favorite.svelte';

	const API_KEY = '3bb9b546';

	let query = '';
	let movies = [];
	let favorite = [];
	let isLoading = false;
	let error = null;

	if (browser) {
		favorite = JSON.parse(localStorage.getItem('favorite') || '[]');
		loadFavorite();
	}

	$: browser && localStorage.setItem('favorite', JSON.stringify(favorite));

	async function loadFavorite() {
		movies = await Promise.all(
			favorite.map(async (imdbID) => {
				const res = await fetch(`https://www.omdbapi.com/?apikey=3bb9b546&i=${imdbID}`);
				return res.json();
			})
		);
	}

	async function search() {
		isLoading = true;
		error = null;

		try {
			const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
			const results = await response.json();
			movies = results.Search || [];
			error = results.Error;
		} catch (error) {
			error = 'Something went wrong';
		}

		isLoading = false;
	}

	function toggleFavorite(movie) {
		const hasMovie = !!favorite.find((imdbID) => imdbID === movie.imdbID);

		if (hasMovie) {
			favorite = favorite.filter((imdbID) => imdbID !== movie.imdbID);
		} else {
			favorite = [movie.imdbID, ...favorite];
		}
	}
</script>

<div class="container">
	<form>
		<label>
			<div class="searchLabel">Search for a movie</div>
			<div class="searchBar">
				<input
					placeholder="Titanic"
					class="searchInput"
					type="string"
					bind:value={query}
					min="0"
					max="10"
				/>
				<button class="searchButton" on:click={search}>Search </button>
			</div>
		</label>
	</form>
	<div class="movies">
		{#if isLoading}
			<p>Loading...</p>
		{:else if error}
			<p>{error}</p>
		{:else}
			{#each movies as movie}
				<div>
					<a class="movie" href="/{movie.imdbID}">
						{#if movie.Poster === 'N/A'}
							<div></div>
						{:else}
							<img src={movie.Poster} />
						{/if}
						<div class="details">
							<div>{movie.Title}</div>
							<div class="year">{movie.Year}</div>
						</div>
						<button
							class="favorite"
							class:is-favorite={favorite.includes(movie.imdbID)}
							on:click={(e) => {
								e.preventDefault();
								toggleFavorite(movie);
							}}><Favorite></Favorite></button
						>
					</a>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.favorite {
		width: 40px;
		position: absolute;
		top: 10px;
		left: 10px;
		cursor: pointer;
		background: transparent;
		border: 0;
		opacity: 0.5;
		transition: all 0.2s ease-in-out;
	}

	.favorite:hover {
		opacity: 1;
		transform: scale(1.05);
	}

	.favorite.is-favorite {
		opacity: 1;
	}

	form {
		padding-top: 30px;
		padding-bottom: 50px;
	}

	img {
		object-fit: cover;
		height: 300px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 30px 40px;
	}

	.movies {
		max-width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 30px 30px;
	}

	.movie {
		display: flex;
		width: 220px;
		flex-direction: column;
		background-color: rgb(43, 42, 42);
		box-shadow: -5px 9px 23px 0px rgba(28, 28, 28, 0.46);
		color: white;
		text-decoration: none;
		transition: all 0.2s ease-in-out;
		position: relative;
	}

	.movie:hover {
		transform: translateY(-3px);
	}

	.year {
		font-size: 15px;
		opacity: 0.8;
	}

	.details {
		padding: 10px 10px;
	}

	.searchLabel {
		font-weight: bold;
		text-transform: uppercase;
		font-size: 15px;
		opacity: 0.8;
	}

	.searchInput {
		border-radius: 5px;
		width: 500px;
		background-color: transparent;
		border: 1px solid #b3a9a9;
		color: white;
		padding: 0 12px;
		height: 100%;
	}

	.searchButton {
		height: 100%;
		border-radius: 5px;
		padding: 0 12px;
		text-transform: uppercase;
		font-weight: bold;
		background-color: transparent;
		color: white;
		border: 0;
		cursor: pointer;
	}

	.searchBar {
		margin-top: 10px;
		height: 50px;
	}
</style>
