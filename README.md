# Joyfoy — Maison d’Ombre Fragrance Prototype

An independent prototype exploring a website proposal for Jovoy Paris.

The website is available at https://s-hir-o.github.io/Joyfoy/

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
