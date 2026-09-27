<script lang="ts">
	import { page } from '$app/state';
	import LightSwitch from '$lib/components/ThemeSwitch.svelte';
</script>

<div class="navbar">
	<a class="nav-logo" href="/">
		<img src={'/logo/logo.png'} alt="Hot Dog Logo" />
	</a>
	<div class="links">
		<a href="/" class:active={page.url.pathname === '/'}>Home</a>
		<a href="/profile/1" class:active={page.url.pathname.startsWith('/profile/')}>My Profile</a>
			<a href="/login" class:active={page.url.pathname === '/login'}>Log in</a>
			<a href="/signup" class:active={page.url.pathname === '/signup'}>Sign up</a>
			<a href="/login" role="button">Sign Out</a>
	</div>
	<div class="menu">
		<div class="menu-button">
			<LightSwitch />
		</div>
	</div>
</div>

<style>
	.navbar {
		padding: 0 32px;
		display: grid;
		grid-template-columns: 200px 1fr 2fr;
		grid-template-rows: 60px;
		box-shadow: var(--shadow-main);
		background-color: var(--color-surface);
		position: relative;
		z-index: 50;
	}

	.nav-logo {
		max-height: 100%;
		display: flex;
		align-items: center;
	}

	.nav-logo img {
		height: 72%;
		object-fit: contain;
	}

	.links {
		display: flex;
	}

	.links a {
		padding: 0 8px;
		display: flex;
		align-items: center;
		text-decoration: none;
		box-sizing: border-box;
		border-bottom: 2px solid transparent;
		color: var(--color-text-primary);
		transition: border-color 0.2s ease;
	}

	.links a:hover {
		border-bottom: 2px solid var(--color-surface-alt);
	}

	.links a.active {
		color: var(--color-primary);
		border-bottom: 2px solid var(--color-primary);
	}

	.menu {
		display: flex;
		align-items: center;
		margin-left: auto;
		gap: 8px;
	}

	.menu-button {
		height: 48px;
		width: 48px;
	}
</style>
