import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') || 'system';

	console.log('Hook: Theme from cookie:', theme);

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			const replacedHtml = html.replace('%theme.attribute%', `data-theme="${theme}"`);

			if (!replacedHtml.includes(`data-theme="${theme}"`)) {
				console.warn('Hook warning: %theme.attribute% was not found in app.html');
			}

			return replacedHtml;
		}
	});

	return response;
};
