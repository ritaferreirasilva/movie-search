<script>
	export let data;
	const { movie } = data;
	console.log(movie);
</script>

<div class="container">
	<a class="back" href="/">Back</a>
	<div class="content">
		<div>
			{#if movie.Poster === 'N/A'}
				<div></div>
			{:else}
				<img src={movie.Poster} />
			{/if}
		</div>
		<div class="details">
			<div class="box_details">
				<div class="movie">
					<div class="title">{movie.Title}</div>
				</div>
				<div class="type">{movie.Genre} | {movie.Type} | {movie.Language}</div>
			</div>
			<div class="box">
				<div>
					<div class="details_title">IMBD rating</div>
					<div class="name">{movie.imdbRating}</div>
				</div>
				<div>
					<div class="details_title">Director</div>
					{movie.Director}
				</div>
				<div>
					<div class="details_title">Actors</div>
					<div class="name">{movie.Actors}</div>
				</div>
				<div>
					<div class="details_title">Plot</div>
					<div class="plot">
						{movie.Plot}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 60px 40px 30px;
	}

	.back {
		color: white;
		text-transform: uppercase;
		font-weight: bold;
		font-size: 16px;
	}

	img {
		max-width: fit-content;
	}

	.movie {
		display: flex;
		align-items: baseline;
	}

	.content {
		display: flex;
		column-gap: 10px;
		padding-top: 20px;
	}

	.details {
		padding: 20px 20px;
		background-color: rgb(43, 42, 42);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}

	.box_details {
		padding-bottom: 40px;
	}

	.title {
		font-weight: bold;
		font-size: 40px;
		padding-right: 10px;
	}

	.details_title {
		font-weight: bold;
		width: max-content;
	}

	.type {
		font-size: 12px;
	}

	.box {
		display: flex;
		column-gap: 20px;
		font-size: 15px;
	}
</style>
