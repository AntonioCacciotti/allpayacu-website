# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run setup    # bootstrap: installs nvm/Node (per .nvmrc) and npm deps if missing/stale — idempotent
npm run dev      # start dev server (localhost:3000)
npm run build    # production build (also runs type checking)
npm run start    # serve the production build
npm run lint     # next lint (ESLint, extends next/core-web-vitals + next/typescript)

# background-capable server (see scripts/server.sh --help for all options)
npm run server -- start                # dev server, foreground
npm run server -- start -d             # dev server, detached (PID/logs under .run/)
npm run server -- start -d --prod      # next build && next start, detached
npm run server -- stop                 # stop the detached server
npm run server -- status
```

`npm run setup` (`scripts/setup.sh`) is the entry point for a fresh machine — it only exists because Node/npm are not assumed to be preinstalled. It skips reinstalling `node_modules` when `package-lock.json` is unchanged (tracked via a hash in `node_modules/.install-hash`); pass `--force` to force a clean reinstall.

`scripts/server.sh` runs `next` directly from `node_modules/.bin` (not through `npm run dev`) so the PID it tracks in `.run/server.pid` is the real server process — `stop` sends SIGTERM (then SIGKILL after 5s) straight to it rather than hoping a signal propagates through an npm wrapper.

There is no test suite configured in this repo.

## Architecture

Next.js 14 App Router site (TypeScript, Tailwind) for Allpayacu, an indigenous-owned Amazon jungle retreat and ayahuasca ceremony operator in Iquitos, Peru. It is a marketing/booking site with **no backend, database, or payment processing** — all "booking" is a WhatsApp/Telegram handoff.

### Data model

`src/data/packages.ts` is the single source of truth for all product/pricing data:
- `packages: Package[]` — every tour/retreat offering, grouped by `Category` (`tours`, `jungle-survival`, `ayahuasca-bora`, `ayahuasca-yagua`, `addons`), each with a unique `slug` used for routing.
- `addOns: AddOn[]` — standalone bookable extras (fishing, kambo, etc.), separate from `packages` but combined with them in the booking calculator.
- Helper lookups: `getPackageBySlug`, `getPackagesByCategory`, `getFeaturedPackages`.
- Shared constants live here too: `WHATSAPP_NUMBER`, `TELEGRAM_USERNAME`, `GROUP_DISCOUNT_THRESHOLD`/`NOTE`, `CUSTOMIZE_NOTE`.

Adding or changing a package/add-on/price only requires editing this one file — pages and components derive everything from it (including `generateStaticParams` for the dynamic `[slug]` route, so new packages are statically generated automatically).

### Routing (`src/app`)

- `/` — home (Hero, ValueProp, FeaturedPackages, TrustSignals, final CTA)
- `/packages` — client-side filterable grid over all categories, built from `packages.ts`
- `/packages/[slug]` — package detail page; statically generated per package via `generateStaticParams`; 404s via `notFound()` for unknown slugs
- `/booking` — booking calculator page; accepts `?pkg=<slug>` to preselect a package/add-on
- `/about`, `/contact` — static content pages

`layout.tsx` wraps every page with `Header`, `Footer`, and a floating `ChatIcons` widget, and sets global `Metadata` (title template, OG defaults).

### Booking flow (no payment processing)

There is no checkout. `BookingCalculator` (`src/components/booking/BookingCalculator.tsx`) is a client component that:
1. Lets the user pick any `Package` or `AddOn` and a guest count.
2. Computes `total = price * guests` and a 30% deposit (`DEPOSIT_RATE`).
3. Builds a pre-filled WhatsApp (`wa.me`) and Telegram (`t.me`) message summarizing the order, via `buildWhatsAppMessage`.
4. The user completes the reservation by sending that message — deposit/payment is arranged manually off-platform.

The same 30%/70% deposit math and WhatsApp/Telegram link pattern is repeated in `PackageDetailPage` and other CTAs — when changing the deposit rate or contact numbers, update `WHATSAPP_NUMBER`/`TELEGRAM_USERNAME`/`DEPOSIT_RATE` and check all call sites, since it isn't centralized into a single shared function.

### Styling

- Tailwind with a custom theme (`tailwind.config.ts`): `jungle-*` (deep green, primary brand) and `earth-*` (red/orange, accent) color scales, `font-sans` (Inter) / `font-display` (Playfair Display) via CSS variables set in `layout.tsx`.
- Reusable component classes defined in `src/app/globals.css` under `@layer components`: `.btn-primary`, `.btn-outline`, `.btn-earth`, `.section-label`, `.section-title`, `.card`. Prefer these over ad-hoc utility chains for buttons/section headers.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
