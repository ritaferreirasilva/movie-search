<script>
	import './global.css';
</script>

<main>
	<slot></slot>
</main>

<style>
	:global(body) {
		background-color: rgb(15, 15, 15);
		font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
		font-size: 18px;
		color: white;
	}
</style>
