# Replit setup

## Run the app

This is a React + Vite static site.

```bash
bun install
bun run dev
```

The development server listens on port `5000`, which is the port used by the
Replit web preview.

## Production build

```bash
bun run build
```

The generated static files are written to `dist/`.

## Environment variables

The current source does not make Gemini API calls, so no secret is required to
run the site. `GEMINI_API_KEY` is documented in `.env.example` for the
imported AI Studio dependency, but it must not be exposed in a browser bundle.
If Gemini features are added later, move those calls to a server-side endpoint
before configuring the key for a deployment.