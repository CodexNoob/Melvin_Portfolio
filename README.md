# Melvin Ken Justol Portfolio

A responsive React portfolio built with Vite.

## Run locally

```sh
npm install
npm run dev
```

The contact form posts to the Node server, which sends submissions through Resend. Keep `RESEND_API_KEY` in `.env.local`; it is server-only and `.env.local` is ignored by Git. Set `RESEND_FROM_EMAIL` to an address on a domain verified in Resend before using the form in production. `CONTACT_TO_EMAIL` is the destination inbox.

## Production build

```sh
npm run build
npm run start
```

Add the supplied portrait at `public/melvin-justol.png` to use it in the hero section. The page includes a designed fallback if the portrait is not present.
