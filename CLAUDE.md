# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

My personal website (`my-website-v5`), built on the Payload CMS blank template. Payload 3.77 runs inside a Next 16 App Router app, with React 19, Tailwind 4 and shadcn/Radix UI components, and Postgres as the database. It is deployed to Vercel at `my-website-v5.vercel.app`.

The working feature is a personal finance tracker: expenses with categories and reusable tags, income entries, and a monthly budget. These live in the Payload admin panel as custom views. The public site is still the template's placeholder page. The expense data was migrated from an earlier MongoDB version of the app (see `migration/`).

## Behavior Guidelines

- Always present your plan and wait for confirmation before making any changes.
- Before starting any task that touches more than one file, summarize your plan in bullet points and wait for confirmation.
- Use TypeScript's strict mode conventions throughout. No `any` types without a comment explaining why.
- When adding new functions, include a JSDoc comment with param types and return type.
- Keep responses short. No preamble. Get to the output.
- If a task is ambiguous, ask one clarifying question — not five.

## Hard Rules

- Never modify anything in /src/auth/ without explicit confirmation. Auth changes require a separate review step.
- Don't install new npm packages without asking first. List what you'd install and why, then wait.
<!-- - Never write inline styles. All styling goes through the design system tokens in /src/styles/tokens.ts. -->
- Don't delete files. Mark them as deprecated with a comment instead, and flag them for manual removal.

## Commands

Package manager is **pnpm** (see `packageManager` in package.json; CI uses `pnpm install --frozen-lockfile`).

```bash
pnpm dev                 # Next dev server with Turbopack, http://localhost:3000
pnpm build               # next build --turbopack
pnpm start               # serve the production build
pnpm generate:types      # regenerate src/payload-types.ts after any collection/global/field change
pnpm generate:importmap  # regenerate src/app/(payload)/admin/importMap.js after adding/changing custom admin components
pnpm payload <cmd>       # Payload CLI passthrough
pnpm lint                # defined as `next lint`
pnpm exec tsc --noEmit   # typecheck (required by AGENTS.md after code changes)
```

Tests:

```bash
pnpm test:unit                        # vitest, filename filter "unit.spec.ts"
pnpm test:int                        # vitest, tests/int/**/*.int.spec.ts
pnpm test:e2e                        # playwright (starts `pnpm dev` if not already running)
pnpm test                            # test:int then test:e2e

# Single test file
pnpm exec vitest run src/utilities/arrays/chunkArray.unit.spec.ts --config ./vitest.config.mts
pnpm exec playwright test tests/e2e/admin.e2e.spec.ts
```

Vitest only picks up `tests/int/**/*.int.spec.ts` and `src/**/*.spec.ts` (jsdom environment). Playwright only looks in `tests/e2e`.

Migration scripts in `migration/` import `src/payload.config.ts` directly and are run one-off with `tsx` (a dev dependency); they are not wired into package.json.

## Environment

Required variables (names only; `.env` is gitignored and holds real values; never read or print it):

- `DATABASE_URL`: **Postgres** connection string (`postgresAdapter` in `src/payload.config.ts`).
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_API_URL`, `PAYLOAD_API_KEY`: used by the server fetchers in `src/lib/serverFetchers/` to call the REST API with `Authorization: users API-Key ...` (Users has `auth.useAPIKey`).

**Stale docs:** `README.md`, `.env.example`, `docker-compose.yml`, and the `AGENTS.md` / `.cursor/rules` text all describe MongoDB. The live code uses Postgres. Trust `src/payload.config.ts`.

## Architecture

**What this is:** a Payload 3 + Next 16 (App Router) app built from the Payload blank template. The real functionality is a personal expense/income/budget tracker that lives inside the Payload admin panel. The `(frontend)` route is still the template's placeholder page.

**Config and routing**
- `src/payload.config.ts` is the single entry point. It registers collections `users`, `media`, `expenses`, `expenseTags`, `income`, plus the `budget` global.
- Admin UI is in `src/app/(payload)/admin/`. Public and API routes are in `src/app/(payload)/api/` and `src/app/(frontend)/`.
- Custom admin views are set by file path strings in collection `admin.components` (for example, `/collections/personal/Expenses/_views/ListView`). Payload resolves these through the import map, so the import map must be regenerated when they change.

**Personal domain** (everything under `src/collections/personal/` and `src/globals/personal/`)
- `Expenses` uses a custom list view and a custom edit view (`_views/`). Its `category` is a fixed taxonomy from `_types/expenseCategories.ts`. Its `tag` relationship's `filterOptions` limits tags to the selected category.
- An `afterChange` hook on `expenses` recalculates the usage `count` on the related `expenseTags` document. Changes to this hook affect tag sorting.
- `Income` is a plain collection. `Budget` is a single global with one number field and a custom edit view.

**Data flow: two access paths**
1. **Reads from the UI** go through React Query. `src/lib/queries/*` wraps `src/lib/serverFetchers/*`. Those fetchers make HTTP calls to the app's own REST API (`NEXT_PUBLIC_API_URL`) with the API key, not the Local API.
2. **Writes from the UI** go through `src/lib/mutations/*` (React Query mutations) and then `src/lib/serverActions/*` (`"use server"` functions). Those call the Local API `payload.create/update` directly. After a mutation, `onSettled` invalidates the `["expenses"]` query key.

Keep these two paths in mind when changing schemas: the REST fetchers and server actions both depend on collection slugs and field names.

**Access control**
- Collections use the `authenticated` helper from `src/access/authenticated.ts`. Only the `users` collection has API-key auth.
- The server actions in `src/lib/serverActions/expenseActions.ts` call the Local API **without** `user` or `overrideAccess: false`. That bypasses collection access and performs no session check, so any caller of these actions can read or write expenses. Treat this as a known gap. Fix it by passing `user` and `overrideAccess: false`, or by checking `payload.auth` first.

## Rules to follow (from AGENTS.md)

`AGENTS.md` is the authoritative Payload rulebook. The `.cursor/rules/*` files are reference material for it. The points that most often matter here:

- When you pass `user` to the Local API, always set `overrideAccess: false`. Without it, access control is skipped.
- In hooks, pass `req` to every nested Local API call so the operation stays in the same transaction.
- Use a `context` flag to stop hook recursion when a hook updates its own collection.
- Generated files (`src/payload-types.ts`, `src/app/(payload)/admin/importMap.js`) are regenerated by the scripts above. Don't edit them by hand.

## CI

`.github/workflows/ci.yml` runs on pushes to `dev` and PRs to `main`. It runs unit and integration tests, then Playwright e2e against a Postgres service. **If e2e passes, the workflow runs `git push origin HEAD:refs/heads/main`**, so a push to `dev` lands on `main` automatically. Treat a push to `dev` as a release.
