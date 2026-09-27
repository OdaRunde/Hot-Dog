<script lang="ts">
	import type { Competition } from '$lib/types';
	import util from '$lib/utils';
	let { competition }: { competition: Competition } = $props();
</script>

<div id="card">
	<img
		id="image"
		src={competition.image_url !== '' ? competition.image_url : 'images/placeholder_image.png'}
		alt={competition.name}
	/>

	<h3>{competition.name}</h3>

	<div id="info-container">
		<div class="location-group">
			{#if util.isSameDay(competition.event_start, competition.event_end)}
				<p class="main-text">{util.formatDate(competition.event_start)}</p>
				<p class="sub-text">
					{util.formatTime(competition.event_start)} — {util.formatTime(competition.event_end)}
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

		<div class="location-group right-align">
			<p class="main-text">{competition.city},</p>
			<p class="sub-text">{competition.country}</p>
		</div>
	</div>
</div>

<style>
	:root {
		--card-content-padding: 2%;
	}

	#card {
		width: 100%;

		background: var(--color-surface);
		border-radius: 10px;
		overflow: hidden;

		cursor: pointer;
		user-select: none;
	}

	#card:hover {
		background: var(--color-primary);
	}

	#card:active {
		background: var(--color-primary-active);
	}

	img {
		display: block;
		justify-self: center;

		width: calc(100% - var(--card-content-padding) * 2);
		height: 120px;
		margin-top: var(--card-content-padding);

		border-radius: 10px;
		object-fit: cover;
	}

	h3 {
		margin: var(--card-content-padding);
		margin-bottom: 40px;
	}

	#info-container {
		display: flex;
		justify-content: space-between;
		padding: 0 var(--card-content-padding) var(--card-content-padding);
	}

	.right-align {
		text-align: right;
	}

	p {
		margin: 0;
		line-height: 1.2;
	}

	.main-text {
		font-weight: bold;
	}

	.sub-text {
		color: var(--color-text-secondary);
	}
</style>
