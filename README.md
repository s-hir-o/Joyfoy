# Maison d’Ombre — Fragrance Website Prototype

A luxury fragrance design concept with a dark editorial palette, animated visuals and fragrance-family browsing. This copy is packaged to publish directly on **GitHub Pages**, including project URLs such as `https://USERNAME.github.io/REPOSITORY/`.

![Desktop preview of the fragrance prototype](docs/preview.png)

## What’s included

- An animated homepage with Three.js visuals and GSAP transitions.
- A collection of six illustrative fragrances with working family filters.
- Story, journal and contact pages.
- Desktop navigation and a mobile menu.
- React, TypeScript, TanStack Router and Tailwind CSS, built with Vite.
- A GitHub Actions workflow that builds, checks types and deploys the static site.

## Prototype status

This is an independent design study using the working identity **Maison d’Ombre**, not an official Jovoy storefront. Products, prices, stories, perfumer associations and boutique details are illustrative and need verification before commercial use.

The EN/FR button, Boutique button, product/article calls to action and contact/newsletter submission are visual placeholders. There is no checkout, account system, live booking, order tracking, database or personalised fragrance finder. The collection’s family filter works. Mobile typography and animation accessibility need further refinement.

The original concept was created with Lovable. This standalone edition preserves the visual design and adapts its runtime for static hosting with React and TanStack Router. The original TanStack Start server runtime, editor integration, private audit materials and local development environments are not part of this repository.

## Run locally

Use **Node.js 24** (also recorded in `.nvmrc`) and npm.

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. To inspect the production build:

```bash
npm run build
npm run typecheck
npm run preview
```

Build before the first type check: Vite generates `src/routeTree.gen.ts`. That file is intentionally ignored by Git and regenerated from the route files. The compiled static site is in `dist/`.

## Push this repository to GitHub

The prepared folder already contains a `.git` directory, a `main` branch and **nine commits**. Push from this folder to preserve that history. Uploading files through GitHub’s website will not transfer the local commits.

1. Create a **new, empty repository** on GitHub. For the simplest GitHub Free Pages setup, use a public repository. Leave GitHub’s “Add README”, `.gitignore` and license options unchecked because this folder already has its own history.
2. Open a terminal in the prepared folder and run the following, replacing `USERNAME` and `REPOSITORY`:

```powershell
cd D:\work\Websites\joyfoy-github
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Authenticate to your GitHub account when Git prompts you. No credentials belong in the repository.

## Publish on github.io

1. In your GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open **Actions → Deploy prototype to GitHub Pages → Run workflow** and select `main`. Future pushes to `main` trigger deployment automatically. If the first push ran before Pages was enabled, rerun the workflow after enabling it.
4. Wait for both `build` and `deploy` to succeed. The deployment job and **Settings → Pages** show the live URL.

For a repository called `joyfoy`, the usual URL is:

```text
https://USERNAME.github.io/joyfoy/
```

If you name the repository `USERNAME.github.io`, the site is at:

```text
https://USERNAME.github.io/
```

No custom domain, Vercel account or backend server is required. The workflow uses GitHub’s built-in token; no personal access token secret needs to be added. It validates pull requests without deploying them.

### Why the URLs include `#`

GitHub Pages cannot execute the prototype’s original server runtime or resolve arbitrary application routes. This edition uses hash routing:

```text
https://USERNAME.github.io/joyfoy/#/collection
https://USERNAME.github.io/joyfoy/#/story
https://USERNAME.github.io/joyfoy/#/journal
https://USERNAME.github.io/joyfoy/#/contact
```

The browser receives the same static entry point on refresh, and the router selects the requested page. Vite’s relative asset paths also work under a repository name without editing the configuration. Share the hash URLs rather than `/joyfoy/collection`.

This packaging is suitable for demonstrating the prototype. It does not retain server rendering or the original server sitemap endpoint. A production shop would need a separate plan for search indexing, commerce and backend integrations.

## Commit history

The nine commits are a structured import of an existing prototype and its GitHub Pages adaptation. They use the actual packaging date; they are not backdated development milestones.

1. Initialize the Vite and TypeScript package.
2. Import the visual theme and fragrance imagery.
3. Add the animation and reveal components.
4. Configure the browser app shell and hash routing.
5. Import the fragrance homepage.
6. Import the filterable perfume collection.
7. Import the story, journal and contact pages.
8. Automate GitHub Pages deployment.
9. Document setup, publishing and prototype limitations.

Commits use the Git identity configured when this package was created. Check it with:

```bash
git log -1 --format="%an <%ae>"
git log --oneline --reverse
```

For the commits to appear on your GitHub contribution graph, the author email must be associated with your account and the commits must be on the repository’s default branch. GitHub may take up to 24 hours to update the graph. Nine commits made on one day do not create nine days of activity. See [GitHub’s contribution guidance](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/troubleshooting-missing-contributions).

## Project structure

```text
.github/workflows/deploy-pages.yml   Build and Pages deployment
docs/preview.png                    Screenshot for this README
public/                             Favicon and .nojekyll marker
src/assets/                         Prototype images
src/components/                     Animation and reveal components
src/lib/gsap.ts                      Shared animation setup
src/routes/                         Five pages and shared root layout
src/main.tsx                        Browser entry point
src/router.tsx                      Hash history and query context
src/styles.css                      Theme and styles
index.html                          Static HTML entry
vite.config.ts                      Static build and route generation
```

## Troubleshooting

| Issue | What to check |
| --- | --- |
| Pages deployment says the site cannot be found | Enable GitHub Actions in Settings → Pages, then rerun the workflow. |
| Homepage is missing after deployment | Wait for the deploy job to finish and open the URL reported by Pages. |
| A page link gives a 404 | Use `/#/collection` rather than `/collection` after the repository path. |
| Type check cannot find routeTree.gen.ts | Run `npm run build` first. |
| A button or form does nothing | Check the documented prototype placeholders above. |
| Fonts look different offline | Typography uses Google Fonts; the CSS includes fallback fonts. |

## References

- [Vite: deploying a static site to GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [TanStack Router: history types](https://tanstack.com/router/latest/docs/framework/react/guide/history-types)
- [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
