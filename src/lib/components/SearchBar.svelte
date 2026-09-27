<script lang="ts">
</script>

<form action="/search">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 -960 960 960"
		width="24px"
		fill="#000"
		><path
			d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
		/></svg
	>
	<input type="search" placeholder="Search" aria-label="Search" spellcheck="false" />
</form>

<style>
	form {
		height: 100%;
		display: flex;
		align-items: center;
		border-radius: 32px;
		padding: 0 8px 0 8px;
		background-color: rgb(from var(--color-text-primary) r g b / 8%);
	}

	input {
		height: 100%;
		width: 100%;
		flex-grow: 100%;
		border: none;
		background-color: transparent;
		color: var(--color-text-primary);
	}

	input:focus {
		border: none;
		outline: none;
	}

	svg {
		fill: var(--color-text-primary);
	}
</style>
