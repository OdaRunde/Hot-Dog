# About

Hot Dog is a digital dog show platform that lets anyone participate, no matter where they are. Traditional dog shows require physical attendance, which excludes many potential participants. This platform removes that barrier — users can enter their own dog into a competition, or simply browse, vote, and comment on others. Both roles are equally valued parts of the experience.

The goal is to create a fun and engaging space where users feel part of a shared community event. The platform is built incrementally, validating the core idea early and adjusting along the way.

**Features**
- User authentication (login)
- Admin: create competitions with a configurable duration
- User profiles with photos of your dog
- Like and comment on dogs to support your favorite in a competition
- Browse and explore other user profiles
- Admin: content moderation tools
- User: change your own password
- Admin dashboard with user statistics
- View upcoming competitions

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --add prettier eslint vitest="usages:unit,component" --install npm .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
