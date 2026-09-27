<script lang="ts">
	import type { Competition } from '$lib/types';
	import util from '$lib/utils';
	let { competition }: { competition: Competition } = $props();
</script>

<div id="card">
	<img
		id="image"
		src={competition.image_url !== '' ? competition.image_url : '_assets/placeholder_image.png'}
		alt={competition.name}
	/>

	<div id="info-container">
		<h3>{competition.name}</h3>
		<div class="date-container">
			{#if util.isSameDay(competition.event_start, competition.event_end)}
				<p class="main-text">{util.formatDate(competition.event_start)}</p>
				<p class="sub-text">
					/ {util.formatTime(competition.event_start)} — {util.formatTime(competition.event_end)}
				</p>
			{:else}
				<p class="main-text">
					{util.formatDate(competition.event_start)} —
				</p>
				<p class="sub-text">
					{util.formatDate(competition.event_end)}
				</p>
			{/if}
		</div>
	</div>
</div>

<style>
	:root {
		--card-content-padding: 2%;
	}

	#card {
		display: flex;
		width: 100%;
		min-height: 120px;
		background: var(--color-surface);
		border-radius: 10px;
		overflow: hidden;
		cursor: pointer;
		user-select: none;
	}

	#card:hover {
		background-color: var(--color-primary);
	}
	#card:active {
		background: var(--color-primary-active);
	}

	img {
		align-self: center;
		flex-shrink: 0;
		width: 110px;
		height: 110px;
		margin-left: var(--card-content-padding);
		object-fit: cover;
		border-radius: 10px;
	}

	#info-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between; /* This pushes them to the extremes */
		flex-grow: 1;
		min-width: 0;

		/* We use the variable ONLY for the side and vertical limits now */
		padding: var(--card-content-padding) var(--card-content-padding) var(--card-content-padding)
			10px;
	}

	h3 {
		/* margin: 0 is the key to touching the top limit */
		margin: 0;
		font-size: 21px;
		line-height: 1; /* Ensures no extra lead space above letters */
	}

	.date-container {
		/* margin: 0 ensures the text sits on the bottom padding limit */
		margin: 0;
	}

	p {
		margin: 0;
		line-height: 1;
	}

	.main-text {
		display: inline;
		font-weight: bold;
	}

	.sub-text {
		display: inline;
		color: var(--color-text-secondary);
	}
</style>
