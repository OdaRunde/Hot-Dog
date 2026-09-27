// src/routes/competition/[id]/+page.server.ts
import { competitions } from '$lib/testData';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const competition = competitions.find((c) => c.id === Number(params.id));

  if (!competition) throw error(404, 'Competition not found');

  return { competition };
}
