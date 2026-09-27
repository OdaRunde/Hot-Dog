<script lang="ts">
	import { enhance } from '$app/forms';
	import { setLoggedInUser } from '$lib/currentUser.svelte.js';
	import person from '$lib/assets/login/person.svg';
	import lock from '$lib/assets/login/lock.svg';
	import { goto } from '$app/navigation';
	import type { User } from '$lib/types';

	let { form } = $props();
	let passwordInput: HTMLInputElement;
	let type = $state<string>('password');

	const changePasswordVisibility = () => {
		if (type === 'password') {
			type = 'text';
		} else {
			type = 'password';
		}
	};

</script>

<div id="wrapper">
	<div id="image">
		<img alt="Dog running" src="images/dog_background.jpg" />
	</div>

	<div id="login-info">
		<img id="logo" alt="Hot Dog Logo" src="logo/hot-dog-logo.png" />

		<form
			method="POST"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success' && result.data) {
						setLoggedInUser(result.data as unknown as User);

						await goto('/');
					} else {
						await update();
					}
				};
			}}
		>
			<div id="inputs">
				<div class="input-row">
					<img alt="Person icon " src={person} />
					<input name="username" placeholder="Email / Username" required />
				</div>

				<div class="input-row input-row-password">
					<img alt="Lock icon" src={lock} />
					<input
						id="password-input"
						type={type}
						name="password"
						placeholder="Password"
						required
					/>
					<button
						tabindex="-1"
						type="button"
						id="eye-icons-wrapper"
						onclick={changePasswordVisibility}
					>
						{#if type === 'password'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="var(--color-text-secondary)"
								class="eye-icon"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="var(--color-text-secondary)"
								class="eye-icon"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						{/if}
					</button>
				</div>
				<a class="hyperlinks" id="forgotpassword" href="forgotpassword">Forgot password?</a>

				{#if form?.error}
					<p style="color: var(--color-danger); font-size: 0.8rem; margin: 0; text-align: center;">
						{form.error}
					</p>
				{/if}
			</div>
			<button id="login-button" type="submit">Login</button>
		</form>
		<p id="signup">
			Don't have an account? <a id="signup-link" class="hyperlinks" href="/signup">Sign up</a>
		</p>
	</div>
</div>

<style>
	#logo {
		margin-top: 10px;
		width: 250px;
		height: 250px;
	}

	#image {
		flex: 5;
		overflow: hidden;
		position: relative;
	}

	#image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	#inputs {
		display: flex;
		flex-direction: column;
		gap: 30px;
		width: 300px;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.input-row img {
		width: 30px;
		height: 30px;
	}

	.input-row input {
		color: var(--color-text-secondary);
		padding: 10px;
		width: 250px;
		border: var(--color-input-border-outline) 1px solid;
		border-radius: 4px;
		background: var(--color-surface);
	}

	.input-row input:focus {
		outline: var(--color-input-border-outline-focus) 2px solid;
		border: var(--color-input-border-outline-focus) 1px solid;
		border-radius: 4px;
	}

	#wrapper {
		display: flex;
		height: 100vh;
	}

	#image {
		flex: 5;
	}

	form {
		margin-top: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0px;
	}

	#password-input {
		padding-right: 35px;
	}

	.input-row-password {
		position: relative;
	}

	#eye-icons-wrapper {
		position: absolute;
		top: 6px;
		right: 6px;
		padding: 0;
		background-color: transparent;
		border: none;
		outline: none;
	}

	.eye-icon {
		height: 25px;
		width: 25px;
	}

	.hyperlinks {
		color: var(--color-primary-hover);
		text-decoration: none;
	}

	.hyperlinks:hover {
		text-decoration: underline;
	}

	#forgotpassword {
		font-size: 13px;
		margin-top: -15px;
		margin-left: auto;
	}

	#signup {
		margin-top: 20px;
		font-size: 14px;
	}

	#signup-link {
		font-weight: bold;
	}

	#login-info {
		flex: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		place-items: center;
		background-color: var(--color-background);
	}

	button {
		font-size: 15px;
		border-radius: 4px;
		border: 1px solid transparent;
		cursor: pointer;
	}

	#login-button {
		width: 200px;
		padding: 15px 10px;
		margin-top: 50px;
		background-color: var(--color-primary);
		color: white;
		border: solid var(--color-border) 0.5px;
	}

	#login-button:hover {
		background-color: var(--color-primary-hover);
	}

	#login-button:active {
		background-color: var(--color-primary-active);
	}
</style>
