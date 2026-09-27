import { fail } from '@sveltejs/kit';
import { UserRepo } from '$lib/server/queries/users';
import type { User } from '$lib/types'

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    if (!username || !password) {
      return fail(400, { error: 'Please enter both fields.' });
    }

    let user: User | null
    try {
      user = await UserRepo.validateUser(username, password);

      if (!user) {
        return fail(401, { error: 'Invalid username or password.' });
      }

    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Internal server error.' });
    }
    return user;
  }
};
