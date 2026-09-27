<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import Nav from './Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

{@render children()}
