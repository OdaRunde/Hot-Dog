<!-- <script lang="ts">
	import Card from '$lib/components/ContestCard.svelte';
	import CompactCard from '$lib/components/ContestCardCompact.svelte';

	import { goto } from '$app/navigation';

	import search from '$lib/assets/competitions/search.svg';
	import filter from '$lib/assets/competitions/filter.svg';
	import sort from '$lib/assets/competitions/sort.svg';
</script>

<div id="body">
	<div id="left">
		<h2>You're signed up to</h2>
		<div id="compactCards" class="events">
			{#each competitions as compactCard (compactCard.id)}
				<a href="/competition/{compactCard.id}">
					<CompactCard competition={compactCard} />
				</a>
			{/each}
		</div>
	</div>

	<div id="right">
		<div id="right-header">
			<h2>Upcoming Events</h2>
			<img id="search" alt="search competitions" src={search} />
			<img id="filter" alt="filter competitions" src={filter} />
			<img id="sort" alt="sort competitions" src={sort} />
		</div>

		<div id="cards" class="events">
			{#each competitions as card (card.id)}
				<a href="/competition/{card.id}">
					<Card competition={card} />
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	#body {
		display: flex;
		width: 100%;
		height: 100vh;
	}

	#left {
		display: flex;
		flex-direction: column;
		width: min(40%, 500px);

		background: var(--color-background);
	}

	#right {
		display: flex;
		flex-direction: column;
		width: max(60%, calc(100% - 500px));

		background: var(--color-surface);
	}

	#right-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 50px;

		margin-right: 50px;
	}

	#right-header img:first-of-type {
		margin-left: auto;
	}

	#right-header > img {
		width: 32px;
	}

	a {
		display: block;
		text-decoration: none;
		color: inherit;
		cursor: inherit;
	}

	h2 {
		font-weight: 500;
		font-size: 28px;
		margin-left: 10px;
	}

	.events {
		display: grid;
		grid-auto-rows: min-content;
		align-items: start;
		flex-grow: 1;

		padding: 10px 10px 0 10px;
		gap: 1rem;

		background: var(--color-background);
		overflow-y: auto;
	}

	#cards {
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		margin: 0 50px 0 50px;
	}
</style> -->
