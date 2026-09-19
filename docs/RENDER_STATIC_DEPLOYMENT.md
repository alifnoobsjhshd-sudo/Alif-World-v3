# Deploying Alif World to Render as a Static Site

This project is a React 19 + Vite single-page application. Render should
build it once and serve the generated `dist/` directory.

## 1. Push the project to GitHub

Commit and push the project, including:

- `package.json`
- `bun.lock`
- `src/`
- `public/`
- `index.html`

Do not commit `.env`, `.env.local`, or any API keys.

## 2. Create the Render service

1. Sign in to [Render](https://render.com/).
2. Select **New +** → **Static Site**.
3. Connect the GitHub repository and choose the branch to deploy.
4. Use these settings:

| Setting | Value |
| --- | --- |
| **Root Directory** | Leave blank |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Auto-Deploy** | `Yes` |

The publish directory is `dist`. Using npm here keeps the Render build
independent of Replit's local Bun package mirror.

## 3. Configure the SPA rewrite

The app uses `react-router-dom` routes such as `/journey`, `/projects`, and
`/explore-works`. Add this rewrite in the Render service under **Redirects /
Rewrites**:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | `Rewrite` |

Without this rule, the home page may work while directly opening a nested
route returns a 404.

## 4. Environment variables

No environment variable is required for the current static site. The source
does not currently call Gemini, and its visual/audio content is bundled with
the app.

The repository contains `.env.example` because it was imported from AI Studio.
Do not paste a real `GEMINI_API_KEY` into a static-site environment: Vite
variables are embedded into browser JavaScript during the build and would be
public. If Gemini features are added later, put the Gemini request behind a
server-side API and keep the key there, or deploy a separate backend service.

## 5. Deploy and verify

Click **Create Static Site**. After the first deploy finishes, verify:

1. The root URL opens and the loading transition completes.
2. The `/journey` route loads when opened directly.
3. The `/projects` and `/explore-works` routes load when opened directly.
4. Browser refreshes on those routes do not return a 404.
5. Images, fonts, and audio controls load over HTTPS.

## 6. Optional custom domain

In the Render service, open **Settings** → **Custom Domains**, add your domain,
then follow Render's DNS instructions. Keep HTTPS enabled.

## Ongoing updates

With auto-deploy enabled, pushing to the selected branch triggers:

```text
npm install && npm run build
```

Render then serves the fresh `dist/` output. If a deploy fails, inspect the
build log first; the most common causes are a missing Bun runtime, a failed
dependency install, or an incorrect publish directory.