# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Corporate marketing site for 2IBM (Industrial Ibérica de Baños Modulares S.L.), a Spanish manufacturer of prefabricated modular bathrooms. Angular 21 app with SSR, deployed to Vercel, plus two Vercel serverless functions (Node, not part of the Angular app) that power an AI sales chatbot and the contact form. All user-facing content is in Spanish.

## Commands

- `npm install` — install dependencies
- `npm run dev` — Angular dev server only (port 3000). The `/api/*` serverless functions are **not** available this way — any page that calls `/api/chat` or `/api/contact` will fail.
- `vercel dev` — runs the Angular dev server **and** the `/api/*` serverless functions together, reading env vars from `.env.local`. Use this to test the chatbot or contact form end-to-end locally.
- `npm run build` — runs `create-env.mjs` (generates `src/environments/environment*.ts` from `OTRA_VARIABLE`/`URL_API` env vars) then `ng build` (SSR build, outputs to `dist/app/`).
- `npm run watch` — `ng build --watch --configuration development`.
- `npm test` — `ng test` (Vitest via `@angular/build:unit-test`). There is currently only one spec file (`src/app/app.spec.ts`); to run a single spec, use the Angular CLI's file filtering (e.g. `ng test --include='**/app.spec.ts'`).
- `npm run lint` — `ng lint` (ESLint + angular-eslint over `src/**/*.ts` and `src/**/*.html`).
- `npm run serve:ssr:app` — runs the built SSR server directly (`node dist/app/server/server.mjs`), same entry point Vercel's `api/index.js` imports.

Required env vars (see `.env.example`, set in `.env.local` for local dev and in Vercel Project Settings → Environment Variables for deploys — **each Vercel environment, Production/Preview/Development, has its own separate value and they do not sync with each other or with `.env.local`**):
- `GROQ_API_KEY` — Groq API key for the chatbot's LLM calls.
- `RESEND_API_KEY` — Resend API key for sending emails (contact form + chatbot leads).
- `RESEND_FROM` — sender address; must be on a domain verified in Resend (currently `2ibm.es`, verified via DNS records in Hostinger). Falls back to `onboarding@resend.dev` (Resend's sandbox address, which can only deliver to the Resend account owner's own email) if unset.
- `LEAD_EMAIL_TO` — destination address for contact-form and chatbot-lead notifications (`info@2ibm.es`).

Changing an env var in Vercel requires a **Redeploy** (Deployments → the Production deployment → `⋯` → Redeploy) to take effect — saving it alone does not update the already-running function. Also note "Redeploy" rebuilds whatever commit that specific deployment entry already points to; it does **not** pull latest `main` — a new deployment only happens via a fresh `git push` (through Vercel's GitHub integration) or by redeploying the entry that corresponds to the newest commit.

## Architecture

### Two independent runtimes deployed as one Vercel project

`vercel.json` rewrites every request to `/api/index`, i.e. **all Angular page routes are served through the SSR function** (`api/index.js` lazy-imports `dist/app/server/server.mjs`'s `reqHandler`, built by Angular's SSR build). Separately, `api/chat.js` and `api/contact.js` are standalone Vercel serverless functions (plain Node ESM, no Angular involved) — Vercel auto-routes `/api/chat` and `/api/contact` to them without needing entries in `vercel.json`.

Shared server-side email logic lives in `api/_lib/mailer.js` (the `_` prefix tells Vercel not to treat it as its own route). It sends via Resend's HTTP API. **Do not switch this to direct SMTP** — that was tried (Hostinger mailbox credentials via `nodemailer`) and while it worked when tested from a local machine, it silently failed in production: Vercel's function IPs get filtered by receiving mail servers even though the SMTP handshake completes with a "250 OK". Resend's HTTP API is the fix; it requires the sending domain to be DNS-verified in Resend (already done for `2ibm.es`).

### `api/chat.js` — AI sales chatbot

Single-endpoint chat completion proxy to Groq (`openai/gpt-oss-20b`). The entire sales script — company info, product catalog (S3 / S5 Premium models), pricing rules, lead-qualification questions, escalation rules, tone — is one large Spanish system prompt (`SYSTEM_INSTRUCTION`) at the top of the file; edit that string to change what the bot says or knows, not code elsewhere in the file.

The model has one tool, `registrar_lead` (only `nombre` is required). When called, `sanitizeLead()` strips any placeholder-looking values (e.g. `[Nombre]`, `[Email]` — the underlying model occasionally hallucinates template text instead of omitting fields it doesn't have data for) before the lead is emailed to `LEAD_EMAIL_TO` and a confirmation is emailed to the customer.

### `api/contact.js` — static contact form backend

Backs the plain form on `/contacto` (name/company/email/message). Validates the body, then sends via the same `mailer.js` to `LEAD_EMAIL_TO`.

### Angular app (`src/app/`)

- Standalone components throughout (no NgModules). Angular 21 with SSR (`outputMode: "server"` in `angular.json`; hydration handled by `@angular/ssr`).
- Routes (`app.routes.ts`) are all lazy-loaded (`loadComponent`) marketing pages under `src/app/pages/` — `home`, `quienes`, `que`, `como`, `donde`, `cuando`, `contacto`, `aviso-legal`, `privacidad` — plus a wildcard redirect to home. There is no "404 page"; unknown paths just redirect to `/`.
- Every page component follows the same shape: inject `SeoService` and call `updateMetadata()` (+ often `setStructuredData()` for JSON-LD) in `ngOnInit`, use `RevealDirective` (`reveal`, `revealDirection="..."`) on elements for scroll-triggered fade/slide-in animations (built on the `motion` library, skips animation under `prefers-reduced-motion`), and use `signal()` for local state including counters driven by `CounterAnimationService`.
- `contacto.component.ts` hosts both the plain form (posts to `/api/contact`) and `AiBotComponent` (posts to `/api/chat`, keeping the chat history client-side and replaying it each request) side by side.
- Styling is Tailwind CSS v4 (`@tailwindcss/postcss`, no `tailwind.config.js` — theme is defined inline via `@theme` in `src/styles.css`) using a Material Design 3–style token palette (`--color-primary`, `--color-on-surface-variant`, `--color-surface-container-lowest`, etc.), consumed as utility classes like `bg-surface`, `text-on-tertiary-container`, `border-outline-variant/30`. New UI should reuse these tokens rather than introducing arbitrary Tailwind colors. Angular Material is used only for `MatIconModule` (Material Symbols icon font, imported in `styles.css`).

### Deployment

Hosted on Vercel, connected to GitHub (`oscarsmbaquero/ba-os-modulares`, branch `main`); pushes to `main` auto-deploy. Domain `2ibm.es` / `www.2ibm.es` DNS is managed in Hostinger (nameservers `aurora.dns-parking.com` / `nebula.dns-parking.com`), with `CNAME www → cname.vercel-dns.com` for the site itself, Hostinger's own MX/DKIM/SPF records for the `@2ibm.es` mailboxes, and Resend's verification records (`TXT resend._domainkey`, `CNAME send`/`rsend`) added alongside them for outbound mail.
