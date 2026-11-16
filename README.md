# Melvin Ken Justol Portfolio

A responsive React portfolio built with Vite.

## Run locally

```sh
npm install
npm run dev
```

The contact form posts to a server endpoint, which sends submissions through Resend. Local development uses the Node server; production on Vercel uses `api/contact.js`. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in Vercel's Production environment variables, then redeploy. Use a sender address on a domain verified in Resend. For local development, put the same variables in `.env.local`; it is server-only and ignored by Git.

## Production build

```sh
npm run build
npm run start
```

Add the supplied portrait at `public/melvin-justol.png` to use it in the hero section. The page includes a designed fallback if the portrait is not present.
