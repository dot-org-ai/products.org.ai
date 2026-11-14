# products.org.ai site

The Next.js site served at https://products.org.ai.

It serves a home page, one page for each of the 40 GS1 GPC segments, the `/api`, `/api-reference` and `/package` pages, `robots.txt`, `sitemap.xml`, and two plain-text routes for agents: `/llms-full.txt` and `/llms.mdx/{segment code}`.

It does not yet render the MDX entries at the repository root.

## Run it

Needs Node 20.9 or newer (built and deployed on Node 22) and pnpm.

```bash
cd site
pnpm install
pnpm dev        # http://localhost:3006
pnpm typecheck
pnpm build
```

No environment variables are required. `NEXT_PUBLIC_SITE_URL` is optional: it overrides the base URL written into `robots.txt` and `sitemap.xml`, which defaults to `https://products.org.ai`.

## Layout

| Path | What it holds |
| --- | --- |
| `app/`, `components/`, `lib/` | The site. |
| `packages/do.org.ai/` | The layout and page templates shared by .org.ai sites. Only the modules this site imports. |
| `packages/products.org.ai/` | The table of 40 segments, in `src/metadata.ts`. This is not the ontology package at the repository root, which has the same name. |

Neither package is published to npm. `package.json` links both with pnpm's `link:` protocol, so an import such as `do.org.ai/app/create-root-layout` resolves to the source in `packages/`. The packages declare no dependencies of their own; theirs resolve from this directory's `node_modules`.

## Deploy

Vercel, with the project's Root Directory set to `site`. Framework preset Next.js, default install, build and output settings.

## Where it came from

Moved from the legacy monorepo `dot-do/platform-v1` at commit `5a1852812eb5fce633e208c9c25cba4f2a912d34`:

- `ai/apps/products.org.ai` became `site/`.
- 10 of the 28 files in `ai/packages/do.org.ai` became `site/packages/do.org.ai`.
- `ai/packages/products.org.ai/src/metadata.ts` became `site/packages/products.org.ai/src/metadata.ts`.

The generated product data in `ai/packages/products.org.ai` was left behind, so the sitemap and the two agent routes cover the 40 segments only.

## Known gaps, carried over unchanged

- **Styles.** `globals.css` uses Tailwind directives, but the site has no Tailwind or PostCSS setup, so the directives reach the browser unprocessed and the utility classes do nothing. `next build` prints five CSS warnings because of this.
- **Counts.** The home page's total is an estimate (families × 120), not a count of entries the site can show.
- **Links.** The sidebar on segment pages and the `/package` page link to `github.com/dot-do/platform`, the legacy repository. `/package` also links to an npm package that is not published, and the sidebar links to `/llms.txt`, which no route serves.
- **Unused modules.** Nothing imports `app/layout.config.tsx` or `app/api/page-config.ts`.
