import { fail, redirect } from '@sveltejs/kit';
import { UserRepo } from '$lib/server/queries/users';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const firstname = data.get('firstname') as string;
    const lastname = data.get('lastname') as string;
    const email = data.get('email') as string;
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    if (!username || !email || !password) {
      return fail(400, { error: 'Missing required fields', username, email });
    }

    try {
      // Matches: firstname, lastname, email, username, hash
      await UserRepo.create(firstname, lastname, email, username, password);
    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Database error. Maybe the email is taken?' });
    }

    throw redirect(303, '/');
  }
};
