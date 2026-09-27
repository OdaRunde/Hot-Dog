import type { PageServerLoad } from "./$types";
import { auth, setAvatarUrl } from '$lib/currentUser.svelte'
import { redirect } from '@sveltejs/kit';

export interface Dog {
  id: number;
  owner_id: number;
  name: string;
  breed: string;
  born: string;
  avatar_url: string;
}

const dogs: Dog[] = [
  { id: 1, owner_id: 1, name: "Tyrone", breed: "Wolf", born: "2026-02-18", avatar_url: "/uploads/dogs/tyrone.png" },
  { id: 2, owner_id: 1, name: "Jake", breed: "Wolf", born: "2026-02-18", avatar_url: "/uploads/dogs/striped_wolf.png" },
  { id: 2, owner_id: 1, name: "Anuc", breed: "Wolf", born: "2026-02-18", avatar_url: "/uploads/dogs/anuc_atittawan.png" },
  { id: 2, owner_id: 1, name: "Spitz", breed: "Wolf", born: "2026-02-18", avatar_url: "/uploads/dogs/spotted_wolf.png" },
  { id: 2, owner_id: 1, name: "Not a good boy", breed: "Wolf", born: "2026-02-18", avatar_url: "/uploads/dogs/angry_wolf.png" },
];

export const load: PageServerLoad = async ({ params }) => {
  return {
    user: auth.user,
    dogs: dogs,
  };
};

