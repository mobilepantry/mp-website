# Handoff

_As of 2026-04-23._

You are continuing work on `mp-website`, a Vite + React + TypeScript + Tailwind + shadcn site for MobilePantry (a Columbus, OH nonprofit selling subscription produce boxes via Shopify Storefront API). The codebase was originally generated in [Lovable](https://lovable.dev) and recently pasted into the user's local repo to enable real local development.

The user (James) is not a deeply experienced developer — explain trade-offs clearly, confirm before doing anything risky, and don't assume background knowledge of Vercel, Shopify, or Next.js internals.

## What's already done

- **Image optimization**: `vite-imagetools@^7` + `sharp` installed; `vite.config.ts` wired up; `src/components/Picture.tsx` wraps `<picture>` with AVIF/WebP/JPG sources; all 8 image imports across `index.tsx`, `About.tsx`, `Partner.tsx`, `Shop.tsx`, `Header.tsx`, `Footer.tsx` rewritten with responsive directives. Above-the-fold heroes have `fetchPriority="high"`. The Partner hero's incorrect `loading="lazy"` was removed.
- **Duplicate asset deleted**: `src/assets/logo-white.png` (was byte-identical to `logo-patch.png`, unused).
- **Local git repo initialized** by the user. **No GitHub remote yet.**
- `npm run build` and `npm run dev` (port 8081 — 8080 was taken) both work.

## What's queued next, in order

### 1. Fix the `Index.tsx` casing bug (do this BEFORE pushing to Vercel)

`src/App.tsx:10` does `import Index from "./pages/Index"` but the file is `src/pages/index.tsx` (lowercase). macOS is case-insensitive so it works locally, but **Vercel builds on Linux and will fail**. Either rename the file to `Index.tsx` (`git mv`, careful with case-only renames) or fix the import to `./pages/index`. Renaming the file matches React convention better.

### 2. Fix the shadcn toggle TS errors

`src/components/ui/toggle.tsx` and `src/components/ui/toggle-group.tsx` have broken types from Lovable — `toggleVariants` is imported from itself (circular), and the `<ToggleGroup>` props are missing required `type`/`value`. `vite build` passes (it doesn't typecheck), but `npx tsc --noEmit` fails. Easiest fix: re-add via shadcn CLI (`npx shadcn@latest add toggle toggle-group`) — that's what the components are. Verify they're not actually used in the app first; if not, deleting them is also fine.

### 3. Move the Shopify Storefront token to an env var

`src/lib/shopify.ts:6` has `SHOPIFY_STOREFRONT_TOKEN = '80149f811c1e2e04d13a7a5420908de9'` hardcoded. It's a public storefront token (safe to ship to client), but moving to `import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN` lets you swap dev/prod tokens later. Steps:
- Create `.env.local` (already gitignored via `*.local`) with `VITE_SHOPIFY_STOREFRONT_TOKEN=80149f811c1e2e04d13a7a5420908de9`.
- Reference it in `shopify.ts`.
- Set the same env var on Vercel (Project Settings → Environment Variables) before deploying.

### 4. Push to GitHub

User needs to create the repo on GitHub first (suggest `gh repo create mp-website --private --source=. --remote=origin --push` if they have `gh` CLI; otherwise walk through the web UI). Confirm before pushing.

### 5. Set up Vercel

1. vercel.com → Add New → Project → import from GitHub. It auto-detects Vite (build = `npm run build`, output = `dist`).
2. Add `VITE_SHOPIFY_STOREFRONT_TOKEN` env var.
3. Create `vercel.json` at repo root for SPA routing:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
   Without this, refreshing on `/shop` or `/about` will 404.
4. Deploy. Verify Shopify cart + checkout flow works on the deployed URL.

## Co-existence with Lovable

The user wants to keep Lovable available as a secondary editing surface. To enable round-trips:
- Lovable's GitHub integration syncs to a connected repo. Connect Lovable to the same GitHub repo from step 4 above.
- Keep `lovable-tagger` in `vite.config.ts` (adds `data-lov-id` attrs in dev so Lovable's visual editor can map clicks to code).
- Lovable's AI edits aren't merge-aware — treat Lovable like a second developer and resolve conflicts manually.

## Key project facts

- **Routing**: `react-router-dom` (SPA). 5 routes: `/`, `/about`, `/partner`, `/shop`, `/product/:handle`.
- **State**: `zustand` cart store at `src/stores/cartStore.ts`, synced to Shopify cart via `src/hooks/useCartSync.ts`.
- **Shopify**: Storefront API v2025-07, store `mobilepantryorg.myshopify.com`. All cart mutations live in `src/lib/shopify.ts`. The user has **not yet completed a test transaction** and is wary of doing so without understanding refunds — don't suggest "just try it" carelessly.
- **Tests**: Vitest configured but only an example test exists. Playwright is configured but not wired up.
- **Vite version**: 5.4 — `vite-imagetools` is pinned to v7 (latest v10 requires Vite 7+). If you upgrade Vite, upgrade `vite-imagetools` together.

## Out of scope (don't suggest unless asked)

- **Next.js migration** was discussed and explicitly deferred. Skip unless James brings it up — the SEO lift isn't justified for this site's traffic profile.
- **`npm audit fix --force`** — not needed; the 5 vulns are dev-dep transitive issues.

## Dev quickstart

```sh
npm install
npm run dev          # port 8081 if 8080 is taken
npm run build        # transpile + build
npx tsc --noEmit -p tsconfig.app.json   # typecheck (vite build doesn't)
```
