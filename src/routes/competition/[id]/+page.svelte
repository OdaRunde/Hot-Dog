<script lang="ts">
	let { data } = $props();
	import { formatDate, formatTime, isSameDay } from '$lib/utils.js';

	const { name, image_url, event_start, event_end } = data.competition;

	const displayDate = $derived.by(() => {
		const start = `${formatDate(event_start)} ${formatTime(event_start)}`;
		if (isSameDay(event_start, event_end)) {
			return `${start} — ${formatTime(event_end)}`;
		}
		return `${start} — ${formatDate(event_end)} ${formatTime(event_end)}`;
	});

	let isRegistered = $state(false);
	function toggleRegistration() {
		isRegistered = !isRegistered;
	}
</script>

<div id="wrapper">
	<div id="image">
		<img src={image_url} alt="competition thumbnail" />
	</div>
	<div id="competition">
		<h1>{name}</h1>
		<h3>{displayDate}</h3>
		<div id="description">
			[Competition description as embed] <!--{data.competition.description}-->
		</div>
	</div>

	<div id="side">
		<button onclick={toggleRegistration}>
			{isRegistered ? 'Sign off' : 'Sign up now'}
		</button>
		<div id="participants">
			<div id="participants-header">Participants</div>

			<div id="users">
				<div class="dots">
					<!-- temporary placeholder -->
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					{#if isRegistered}
						<div class="dot"></div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#wrapper {
		display: grid;
		max-width: 1100px;
		margin: 40px auto;
		padding: 24px;

		grid-template-columns: 2fr 1fr;
		grid-template-areas:
			'image image'
			'competition side';

		gap: 20px;
	}

	#image {
		grid-area: image;
		border-radius: 10px;
		height: 325px;
		width: 100%;
		overflow: hidden;
		background-color: var(--color-surface);
	}

	#image img {
		width: 100%;
		height: 100%;
		object-fit: cover; /* This is the "magic" property */
		object-position: center; /* Keeps the focal point in the middle */
	}

	#competition {
		grid-area: competition;
		border-radius: 10px;

		width: 600px;
		min-height: 300px;
		padding: 20px;
		background-color: var(--color-surface);
	}

	#description {
		margin-top: 16px;
		min-height: 200px;
		border-radius: 10px;
		display: grid;
		place-items: center;
		background-color: var(color-surface);
	}

	#side {
		display: grid;
		gap: 12px;
		grid-area: side;
	}

	#side button {
		justify-self: center;
	}

	button {
		width: 256px;
		border: 0;
		border-radius: 4px;
		background-color: var(--color-primary);
		color: var(--color-surface);
		border: solid var(--color-border) 0.5px;
		width: 200px;
		padding: 15px 10px;
		font-size: 15px;

		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--color-primary-hover);
	}

	button:active {
		background-color: var(--color-primary-active);
	}

	#participants {
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background-color: var(--color-surface);
	}

	#participants-header {
		padding: 15px;
		text-align: center;
		border-bottom: 1px solid var(--color-boarder);
		font-size: larger;
	}

	#users {
		min-height: 220px;
		padding: 18px;
	}

	.dots {
		display: grid;
		grid-template-columns: repeat(5, 45px);
		gap: 20px;
		justify-content: center;
		align-content: start;
	}

	.dot {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: var(--color-primary-active);
	}

	.dot:hover {
		transform: scale(1.2);
	}
</style>
