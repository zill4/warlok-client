# Astro → Preact SPA Refactor

## Overview

We’re replacing Astro routing/rendering with a Vite-powered Preact SPA while preserving existing UI and logic. Work will happen in stages so we can validate both web and AVP flows after each milestone. This document tracks the plan and progress.

## High-Level Goals

1. Stand up a Vite entrypoint (`index.html`, `main.tsx`) alongside the current code.
2. Port Astro layouts/pages into TSX components without losing styles or behavior.
3. Preserve routing and base-path handling for web and AVP modes.
4. Keep WebSpatial compatibility (`pnpm run dev:avp`, `webspatial-builder`).
5. Remove Astro dependencies only after confirming the SPA covers all functionality.

## Milestones & Progress

### Milestone 0 – Planning _(✅ Complete)_

- Document refactor approach, constraints, and validation checkpoints.
- Identify incremental stopping points to catch issues early.

### Milestone 1 – New SPA Shell _(Status: ✅ Completed)_

Goal: Introduce a Vite SPA entrypoint without breaking the existing Astro build yet.

- [x] Add root `index.html` with `#root` container and script tag.
- [x] Create `src/main.tsx` to render `<App />` and import global styles.
- [x] Update `package.json` scripts (`dev`, `build`, `preview`, AVP variants) to use Vite.
- [x] Add `vite.config.ts` with Preact plugin, WebSpatial plugin, env defines, and alias config.
- [ ] Verify `pnpm run dev` shows the home screen in web mode.

### Milestone 2 – Route & Base Path Alignment _(Status: ✅ Completed)_

Goal: Ensure SPA routing works in both web and AVP modes.

- [x] Confirm React Router uses the shared `BASE_PATH` helper for `basename`.
- [x] Read `XR_ENV` from Vite defines to decide base path at runtime.
- [x] Validate primary routes (`/`, `/auth`, `/createAsset`, etc.) locally.
- [x] Validate AVP base path (`/webspatial/avp/**`) via `pnpm run dev:avp` and `webspatial-builder`.
- [x] Note any regressions or open issues.

### Milestone 3 – Port Astro Layouts/Pages _(Status: Pending)_

Goal: Replace Astro-rendered pages with TSX components while reusing styles.

- [ ] Create TSX versions of `Layout`, `index`, `auth`, `createAsset`, `profile`, etc.
- [ ] Migrate shared UI logic (headers, auth buttons) into reusable components.
- [ ] Update React Router routes to use the new components.
- [ ] Remove Astro hydration directives (`client:only`, `client:load`) in favor of standard Preact usage.
- [ ] Smoke-test converted pages for visual and functional parity.

### Milestone 4 – Cleanup & Dependency Removal _(Status: Pending)_

Goal: Retire Astro once the SPA is authoritative.

- [ ] Remove obsolete `.astro` files or archive them for reference.
- [ ] Drop Astro packages from `package.json`; install any missing SPA deps.
- [ ] Update linting/TS configs to match the SPA setup.
- [ ] Ensure `pnpm run build` and `pnpm run build:avp` output expected bundles.
- [ ] Document updated deployment steps.

### Milestone 5 – Final QA & Hand-off _(Status: Pending)_

Goal: Validate the entire app before considering the refactor complete.

- [ ] Regression test core flows (auth placeholder, profile, card creation stubs, etc.).
- [ ] Confirm fonts, assets, and env-specific behavior load correctly.
- [ ] Update this plan with outcomes and follow-up items.
- [ ] Optional: Archive notes about the old Astro approach for historical reference.

## Notes & Risks

- Astro files stay in place until the SPA is fully validated to avoid losing UI references.
- AVP integration depends on `webspatial-builder`; re-test after each milestone.
- Capture blockers in this doc before moving forward to keep stakeholders aligned.

## Changelog

- **2025-09-28:** Initial refactor plan documented (Milestone 0 complete).
- **2025-09-28:** Milestone 1 kicked off (Vite shell scaffolded and scripts updated).
