# Connectly — "NNN Studio" Project Status Report

**Project root:** `E:\fullstact_l\connectly`
**App name (package):** `connectly`
**Product title in design:** *Creative Studio Canvas* / *FaceTime & Studio Connect*
**Brand:** NNN STUDIO ("NNN Core Active")
**Report date:** 2026-10-22
**Target stack (per owner):** Full-stack, **React (JavaScript — no TypeScript)**

---

## 1. Executive Summary

The project is **a design prototype plus an untouched framework scaffold**. Roughly **90% of the product UI has been designed inside one 25 KB standalone `index.html` file** (Apple-style glassmorphic dark theme, Tailwind CDN, Material Symbols), but **none of that design has been ported into the React app yet**. The React app still contains the stock Vite starter screen.

There is **no backend, no database, no routing, no authentication, no real-time layer, no tests, no CI, and no git repository**. The project is currently at the point where the UI blueprint is done and the engineering build-out has to start.

**Overall completion: ~8%**

| Layer | Completion | Notes |
|---|---|---|
| Product/UX design | 70% | One fully-styled hub screen exists as raw HTML |
| React front-end | 3% | Stock Vite template only |
| Design system | 25% | Tokens exist as inline CSS in one file, not extracted |
| Backend API | 0% | Does not exist |
| Database / models | 0% | Does not exist |
| Real-time (chat + calls) | 0% | Does not exist |
| Auth | 0% | Does not exist |
| Testing / CI / deploy | 0% | Does not exist |

---

## 2. Current State — File-by-File Audit

### 2.1 Files that exist

| File | Size | State | Action needed |
|---|---|---|---|
| `index.html` | 25,223 B | **The real product design.** Full "FaceTime & Studio Connect" hub with left brand island + right Dynamic Island nav + 3 module cards + quick actions + working theme toggle. Uses Tailwind CDN v3 (`?plugins=forms,container-queries`), Material Symbols Outlined, inline `<style>` design tokens, inline `<script>` theme logic. | **Dissect into React components.** Delete inline `<script>`/`<style>` after porting. |
| `src/App.tsx` | 3,646 B | **Stock Vite starter template** (`hero.png`, React logo, Vite logo, "Get started", counter button). Zero project code. | Replace entirely. |
| `src/main.tsx` | 230 B | Vite default entry: `createRoot(...).render(<StrictMode><App /></StrictMode>)`. | Keep, add router + providers. |
| `src/index.css` | 2,169 B | Vite starter CSS (`--accent: #aa3bff`, `#root { width: 1126px }`, Vite gradient hero). | Replace with Tailwind v4 + design tokens. |
| `src/App.css` | 2,891 B | Vite starter styles (`.hero`, `.ticks`, `#next-steps`). | Delete. |
| `src/assets/hero.png` | 13,057 B | Vite starter art. | Delete. |
| `src/assets/react.svg`, `vite.svg` | — | Vite starter logos. | Delete. |
| `public/favicon.svg` | 9,522 B | Vite default favicon. | Replace with NNN logo. |
| `public/icons.svg` | 5,031 B | Vite sprite sheet (used only by starter `App.tsx`). | Delete with starter. |
| `package.json` | 711 B | `react ^19.3.1`, `react-dom ^19.3.1`; dev: `vite ^8.3.4`, `@vitejs/plugin-react ^6.1.2`, `typescript ~6.0.3`, `typescript-eslint`, `eslint ^10.13.0`, `globals ^17`. | **Remove TypeScript**, add Tailwind, router, state, socket, axios/fetch layer. |
| `vite.config.ts` | 161 B | Bare `defineConfig({ plugins: [react()] })` — no path alias, no Tailwind plugin, no proxy. | Rename to `vite.config.js`; add `@` alias + `/api` proxy + Tailwind plugin. |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | — | Strict TS project configs, `noUnusedLocals`, `erasableSyntaxOnly`. | **Delete all three** (no-TS project). |
| `eslint.config.js` | 591 B | Targets `**/*.{ts,tsx}` only, uses `typescript-eslint`. | Retarget to `**/*.{js,jsx}`, drop `typescript-eslint`. |
| `README.md` | 2,345 B | Unmodified Vite template README. | Rewrite as project README. |
| `.gitignore` | 253 B | Vite default. | Add `.env`, uploads, logs. |
| `package-lock.json` | 96 KB | Locked deps. | Re-lock after dep changes. |
| `node_modules/` | — | Installed. | Fine. |

### 2.2 What does **not** exist (verified by recursive scan)

- No `server/` / `api/` / `backend/` folder — **no backend at all**
- No database schema, no models, no migrations, no seed
- No router (`react-router` not installed), no pages directory, no components directory, no context/store
- No auth (no JWT, no sessions, no OAuth)
- No Socket.IO / WebRTC / any real-time transport
- No test runner (no Vitest, Jest, Playwright, Cypress), no test files
- No CI workflow (`.github/` absent), no Dockerfile, no `.env` / `.env.example`
- **No git repository** (`E:\fullstact_l\connectly\.git` does not exist) — nothing is version-controlled
- No Tailwind installed as a dependency (only the CDN script inside `index.html`)
- No `LICENSE`, no `CONTRIBUTING.md`

### 2.3 Design inventory extracted from `index.html`

This is the authoritative source of truth for the UI and must be preserved during the port.

**Global chrome**
- Left vertical brand island: external Google-hosted logo image, pulsing "NNN Core Active" dot, vertical "NNN STUDIO" wordmark.
- Right vertical "Dynamic Island" nav (fixed, vertically centred, `right-6`): online indicator (green ping, "You are online"), My Profile avatar, light/dark theme toggle, Friends & Creative Connections, Camera (active state, blue), Inspector, Code, Command Palette (⌘K), Filters & Settings.
- Ambient background: two blurred gradient orbs + 28 px radial dot grid (`apple-grid`).
- Centred glass card workspace, `max-w-3xl`, radius `rounded-3xl`.

**Design tokens (must be lifted into a shared theme file)**

| Token | Light | Dark |
|---|---|---|
| Page background | `#F5F5F7` | `#090A0F` |
| Primary text | `#1D1D1F` | `#F5F5F7` / `#FFFFFF` |
| Secondary text | `#6E6E73` | `#A1A1A6` |
| Tertiary text | `#86868B` | `#8E8E93` |
| Brand blue | `#0071E3` | `#0071E3` / `#2997FF` (hover `#0077ED` / `#0A84FF`) |
| Brand light blue | `#5AC8FA` | — |
| Success green | `#34C759` | `#34C759` |
| Accent purple | `#AF52DE` | `#BF5AF2` |
| Selection | `#0071E3` on white text | same |
| Card glass | `rgba(255,255,255,.82)` + `blur(32px) saturate(180%)` | `rgba(22,24,31,.72)` + `blur(40px) saturate(190%)` |
| Sub-card glass | `rgba(248,250,252,.70)` + `blur(12px)` | `rgba(255,255,255,.035)` + `blur(16px)` |
| Grid dot | `rgba(100,116,139,.16)` | `rgba(255,255,255,.08)` |
| Border | `rgba(0,0,0,.05)` | `rgba(255,255,255,.08)` |

Typography: system SF stack (`-apple-system, BlinkMacSystemFont, "SF Pro Display", …`), body `letter-spacing: -0.012em`, headings `-0.024em`. Icons: **Material Symbols Outlined** (filled/outlined variants).

**Components already designed (need React ports)**
`IslandNav`, `BrandIsland`, `ThemeToggle`, `OnlineIndicator`, `AvatarButton`, `GlassCard`, `SubCardGlass`, `ModuleCard` (video/audio/messages variants), `SpecPill`, `QuickActionButton`, `AmbientOrbs`, `DotGrid`, `Tooltip` (hover-reveal on every island button).

**Interactive behaviour already implemented**
Theme toggle script only (dark is default, toggles the `dark` class on `<html>`, swaps icon + tooltip + `aria-label`). Everything else is static markup with `cursor-pointer` and no handlers.

---

## 3. Required Pages to Be Created

Derived from every navigable affordance in `index.html`, plus what a full-stack app needs to support them. **20 screens** are required.

### 3.1 Public / Unauthenticated

| # | Route | Page | Source in `index.html` | Priority |
|---|---|---|---|---|
| 1 | `/login` | Sign In | implied by "My Profile" / online status | P0 |
| 2 | `/signup` | Create Account | implied | P0 |
| 3 | `/forgot-password` | Password Reset Request | implied | P1 |
| 4 | `/reset-password/:token` | Set New Password | implied | P1 |
| 5 | `/join/:roomId` | Guest Call Invite Landing | implied by "Quick Connect" | P1 |
| 6 | `/share/:shareId` | Public Shared Canvas Drop | "interactive canvas drops" copy | P2 |
| 7 | `*` | 404 / Not Found | — | P1 |

### 3.2 Authenticated — Core

| # | Route | Page | Source in `index.html` | Priority |
|---|---|---|---|---|
| 8 | `/` | **Studio Hub** (the designed screen) | `main` glass card + Quick CTAs | P0 |
| 9 | `/onboarding` | Studio Profile Setup wizard | post-signup flow | P1 |
| 10 | `/profile` | **My Profile** | "My Profile" island button | P0 |
| 11 | `/friends` | **Friends & Creative Connections** | "group" island button | P0 |
| 12 | `/friends/requests` | Pending / Sent Request Queues | sub-view of friends | P1 |
| 13 | `/messages` | **Messages Inbox** | "Open Messages" CTA | P0 |
| 14 | `/messages/:threadId` | **Encrypted Conversation** (PQ3) | "Compose Message" module card | P0 |
| 15 | `/call/:roomId` | **HD Video Meeting Room** (4K HDR, 60 fps, Center Stage) | "Start Video Call" / "Video call" CTA | P0 |
| 16 | `/audio/:roomId` | **Spatial Audio Room** (sub-5 ms, voice isolation) | "Join Audio Room" module card | P1 |

### 3.3 Authenticated — Studio Tools & Settings

| # | Route | Page | Source in `index.html` | Priority |
|---|---|---|---|---|
| 17 | `/studio/camera` | **Camera / Capture Studio** | "Camera" island button (active state) | P1 |
| 18 | `/studio/inspector` | **Inspector** (filters, properties) | "tune" island button | P2 |
| 19 | `/studio/code` | **Code Panel** (project/script view) | "code" island button | P2 |
| 20 | `/settings` | **Filters & Settings / Preferences** | "pageview" island button | P1 |

### 3.4 Non-route overlays & shared surfaces (components, not pages)

| Surface | Trigger | Notes |
|---|---|---|
| **Command Palette** | ⌘K button + keyboard shortcut | Global overlay: fuzzy-search across pages, friends, conversations, actions. Needs command registry + keyboard handling + portal. |
| Theme provider + persistence | Toggle button | Currently only in-memory; must persist to `localStorage` and apply pre-paint to avoid flash. |
| Notifications / toasts | system | Real-time, driven by socket events. |
| Global search | ⌘K / header | Users, conversations, shared canvases. |
| Call dock / minimised call bar | in-call navigation | Keeps a call alive while navigating. |
| Connection / offline banner | socket status | Reflects "You are online" indicator for real. |
| Error boundary + 404 + loading skeletons | system | Required for production feel. |
| Reusable `GlassCard`, `ModuleCard`, `IslandNav`, `SpecPill`, `Tooltip`, `Avatar`, `Button`, `Modal`, `Drawer`, `Toast` | — | The shared UI kit extracted from the prototype. |

---

## 4. Target Architecture (Full Stack, React + JavaScript)

### 4.1 Front-end

- **React 19 + Vite 8, JavaScript only (`.jsx`) — no TypeScript.**
- **Tailwind CSS v4** installed as a dependency (replacing the CDN script), configured CSS-first via `@theme` in `index.css`; keep `darkMode: 'class'` semantics with `@custom-variant dark (&:where(.dark, .dark *));`.
- **React Router v7** (declarative, file-based routes).
- **State:** Zustand for global client state (auth session, theme, call state, notifications) + TanStack Query for server state/caching.
- **Realtime:** `socket.io-client`; **media:** native WebRTC (`getUserMedia`, `RTCPeerConnection`) with Socket.IO as the signalling channel.
- **Forms/validation:** React Hook Form + Zod (same schema shape reused on the server).
- **Data layer:** a thin `src/api/` client (fetch wrapper + auth header + refresh-token interceptors).

### 4.2 Back-end (new `server/` workspace)

- **Node.js + Express 5**, ESM, layered as `routes → controllers → services → models`.
- **MongoDB + Mongoose** (documents fit the social/graph data well; fast to start).
- **Auth:** JWT access token (short-lived) + refresh token (httpOnly cookie), `bcrypt` password hashing, per-device sessions.
- **Real-time:** **Socket.IO** namespaces for `presence`, `messaging`, `call:signalling`.
- **Validation:** Zod schemas shared conceptually with the client.
- **Media/asset storage:** Cloudinary or S3 for avatars, studio uploads, canvas drops; signed uploads from the client.
- **Security:** helmet, CORS allow-list, rate limiting on auth/messaging, input sanitisation, no secrets in the client bundle.

### 4.3 Target folder layout

```
connectly/
├── index.html                 # → becomes the Vite shell only (meta, fonts, #root)
├── package.json               # root workspace: "client" + "server" scripts
├── server/
│   ├── src/
│   │   ├── index.js           # bootstrap, http + socket.io
│   │   ├── config/            # env loading, constants
│   │   ├── models/            # mongoose schemas
│   │   ├── routes/            # /api/auth, /api/users, /api/friends, /api/messages,
│   │   │                      # /api/rooms, /api/assets, /api/settings
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/        # authGuard, errorHandler, rateLimit, upload
│   │   ├── sockets/           # presence, messaging, signalling
│   │   └── validation/        # zod schemas
│   └── .env.example
└── src/
    ├── main.jsx               # entry: providers (Router, Query, Theme, Auth, Socket)
    ├── App.jsx                # layout shell + island nav + route outlet
    ├── api/                   # http client + per-domain api modules
    ├── assets/
    ├── components/
    │   ├── layout/            # BrandIsland, IslandNav, AppShell, ThemeToggle
    │   ├── ui/                # GlassCard, SubCard, ModuleCard, SpecPill, Button, Modal…
    │   ├── call/              # VideoStage, AudioStage, CallControls, ParticipantTile
    │   ├── chat/              # ThreadList, MessageBubble, Composer
    │   └── overlays/          # CommandPalette, Toasts, NotificationCentre
    ├── features/              # auth, profile, friends, messages, calls, studio, settings
    │   └── <feature>/pages/ + components/ + hooks/ + store/
    ├── hooks/
    ├── store/
    ├── styles/                # index.css (tokens), tailwind theme
    └── utils/
```

---

## 5. Backend Surface Required (supports the pages above)

| Endpoint group | Endpoints | Supports |
|---|---|---|
| Auth | `POST /api/auth/register`, `/login`, `/refresh`, `/logout`, `POST /api/auth/forgot-password`, `/reset-password`, `GET /api/auth/me` | Pages 1–4 |
| Users / Profile | `GET/PATCH /api/users/me`, `GET /api/users/:id`, `GET /api/users?search=`, `POST /api/users/me/avatar`, `GET /api/users/me/settings` | Page 10 |
| Friends | `GET /api/friends`, `POST /api/friends/:id/request`, `PATCH /api/friends/:id/accept`, `DELETE /api/friends/:id`, `GET /api/friends/requests` | Pages 11–12 |
| Messaging | `GET /api/threads`, `GET /api/threads/:id/messages`, `POST /api/threads/:id/messages`, `POST /api/messages/:id/read`, `POST /api/threads/:id/canvas-drops` | Pages 13–14, 6 |
| Calls / Rooms | `POST /api/rooms` (type: video/audio), `GET /api/rooms/:id`, `POST /api/rooms/:id/join`, `POST /api/rooms/:id/leave`, `POST /api/rooms/:id/end`, `GET /api/rooms/:id/participants` | Pages 15–16, 5 |
| Studio | `GET/POST /api/assets`, `GET /api/assets/:id`, `DELETE /api/assets/:id`, `GET/PATCH /api/filters`, `GET/POST /api/snippets` (code panel) | Pages 17–19 |
| Settings | `GET/PATCH /api/settings`, `GET/PATCH /api/settings/privacy`, `GET/PATCH /api/settings/notifications` | Page 20 |
| Presence (socket) | `user:online`, `user:offline`, `presence:subscribe` | Page 8 status indicator |
| Messaging (socket) | `message:send`, `message:receive`, `message:typing`, `message:read` | Pages 13–14 |
| Signalling (socket) | `call:join`, `call:offer`, `call:answer`, `call:ice`, `call:leave`, `call:media-state` | Pages 15–16 |
| Uploads | `POST /api/uploads/presign` (Cloudinary/S3 signed upload) | Avatars, canvas drops |

### Data model (Mongoose collections)

`User` (auth, role, status), `Profile` (displayName, avatar, bio, studio tags, presence), `Connection` (requester, recipient, status: pending/accepted/blocked), `Conversation` (participants, lastMessage, unreadCount), `Message` (thread, sender, body, attachments, canvasDrops, readBy, encryptionMeta), `Room` (type, host, participants, startedAt, endedAt, recording), `Asset` (owner, type, url, meta), `UserSettings` (theme, filters, privacy, notifications), `Notification`, `RefreshToken`.

---

## 6. Gap Analysis / Risks

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 1 | **Design lives only in one 25 KB `index.html`** | High — porting loss, no component reuse | Treat as the spec; port module-by-module into a component library, then delete the prototype file |
| 2 | **TypeScript is installed but the target is plain JavaScript** | High — build/lint will fail after conversion | Delete `tsconfig*.json`, rename `.tsx → .jsx`, drop `typescript`/`typescript-eslint`, change build script to `vite build` |
| 3 | **Tailwind only via CDN** | Medium — CDN is slow, no purge, no design tokens, `tailwind.config` is JS in `<head>` | Install Tailwind v4 + `@tailwindcss/vite`; move tokens to `@theme`; add `@custom-variant dark` |
| 4 | **External hotlinked brand logo** (`googleusercontent.com`) | Medium — breaks offline, leaks a request to Google | Download to `src/assets/brand-logo.png` |
| 5 | **No git repository** | High — no history, no rollback, no collaboration | `git init`, commit the scaffold baseline before refactoring |
| 6 | **No backend at all** | High — every page beyond the hub is blocked | Stand up `server/` with auth + models first (vertical slice) |
| 7 | **WebRTC signalling, TURN, and encryption claims are unbacked** | Medium — "PQ3 / end-to-end encrypted" is marketing copy in the prototype | Either implement real E2EE (Web Crypto) or reword to honest "encrypted in transit" |
| 8 | **"4K HDR", "sub-5 ms latency", "60 fps"** are design copy only | Medium | Keep as UI copy, but do not present as implemented capabilities |
| 9 | **No tests, no lint on JS, no CI** | Medium | Vitest + React Testing Library, Playwright smoke, GitHub Actions |
| 10 | **Dark mode is not persisted** | Low | Theme provider + `localStorage` + pre-paint inline script |
| 11 | **Mobile responsiveness untested** for the island nav | Low | The fixed right island overlaps content on small screens — add a bottom bar variant under `md` |

---

## 7. Roadmap

### Phase 0 — Foundation cleanup (½–1 day)
- [ ] `git init` + first commit of the current scaffold
- [ ] Convert TypeScript → JavaScript: `App.tsx → App.jsx`, `main.tsx → main.jsx`, delete `tsconfig*.json`, `vite.config.ts → vite.config.js`, strip TS from `eslint.config.js` and `package.json` (`build` → `vite build`)
- [ ] Install `tailwindcss@4` + `@tailwindcss/vite`; delete the CDN `<script>` from `index.html`; add `@custom-variant dark`
- [ ] Extract the design tokens from the prototype's inline `<style>` into `src/styles/index.css` (`@theme`) and a `theme.js` constants file
- [ ] Add Vite alias `@ → src` and dev proxy `/api → http://localhost:5000`
- [ ] Replace Vite favicon with the NNN logo; download the external logo into `src/assets`
- [ ] Set up `server/` (Express, Mongoose, `.env.example`) and a `/api/health` endpoint

### Phase 1 — Shell + auth (2–3 days)
- [ ] Build `AppShell` (BrandIsland + IslandNav + Outlet + CommandPalette portal + toast host)
- [ ] Theme provider with persistence
- [ ] Pages 1–4: sign in, sign up, forgot/reset password
- [ ] `User` + `UserSettings` models, JWT access/refresh, `GET /api/auth/me`
- [ ] Protected-route wrapper, auth store (Zustand)
- [ ] Page 10: profile (view + edit + avatar upload)

### Phase 2 — Social graph (2 days)
- [ ] `Connection` model + friends endpoints
- [ ] Pages 11–12: friends list, request queues
- [ ] Socket.IO presence namespace → live "You are online" indicator (replaces the fake ping)
- [ ] Notification records + toast/centre

### Phase 3 — Messaging (2–3 days)
- [ ] `Conversation` + `Message` models, threads endpoints
- [ ] Pages 13–14: inbox, thread, composer, read receipts, typing indicator, reactions
- [ ] Socket.IO messaging namespace; optimistic UI; attachment + canvas-drop upload
- [ ] Page 6: public shared canvas drop view

### Phase 4 — Calls (3–4 days, highest complexity)
- [ ] `Room` model + room endpoints
- [ ] Socket.IO signalling namespace (offer/answer/ICE)
- [ ] Pages 15–16: video room (grid, device picker, mute/camera, screen share, 4K/60 fps negotiation), spatial audio room (voice isolation, level meter)
- [ ] TURN server config (e.g. coturn) for non-LAN calls
- [ ] Minimised call dock so navigation does not drop a call
- [ ] Page 5: guest join link flow

### Phase 5 — Studio tools + settings (2 days)
- [ ] Pages 17–19: camera capture, inspector (filters/properties), code panel
- [ ] Page 20: settings, filters, preferences, privacy, notifications
- [ ] Command palette (⌘K) with live fuzzy search across routes, friends, threads

### Phase 6 — Hardening (2 days)
- [ ] Vitest + RTL unit tests, Playwright smoke tests
- [ ] GitHub Actions: lint + build + test
- [ ] Dockerfile + docker-compose (Mongo), `.env` handling, deployment guide
- [ ] Accessibility pass (keyboard nav, ARIA on island buttons), mobile layout for the island nav
- [ ] Rewrite `README.md` as the real project README; keep this file updated as the single source of truth

---

## 8. Suggested Build Order (vertical slices)

Build in this order so that every milestone is demoable end-to-end:

1. **Slice A** — Hub screen ported to React + JS + Tailwind v4 + theme toggle works → *demo: the current `index.html` reproduced in React*
2. **Slice B** — Register/login/profile with a real API + DB → *demo: sign up and persist a profile*
3. **Slice C** — Friends + presence → *demo: two browsers see each other online*
4. **Slice D** — Real-time messaging → *demo: chat between two accounts*
5. **Slice E** — 1:1 video call → *demo: working WebRTC call*
6. **Slice F** — Group call, spatial audio, screen share
7. **Slice G** — Studio tools, command palette, settings
8. **Slice H** — Polish, tests, CI, deploy

---

## 9. Immediate Next Actions (recommended first 3 commits)

1. `git init` + commit the scaffold as `chore: baseline vite react scaffold`
2. `refactor: convert project from typescript to javascript` — rename files, delete tsconfigs, fix eslint + build script
3. `feat: add tailwind v4 with NNN studio design tokens` — install Tailwind, move the prototype's tokens into `@theme`, port the `index.html` hub into React components (`BrandIsland`, `IslandNav`, `GlassCard`, `ModuleCard`, `QuickActions`)

After those three commits the project will have a real foundation, and this status file should be updated with the new completion percentages.

---

## 10. Definition of Done (v1.0)

- [ ] All 20 pages implemented and reachable through the island navigation
- [ ] No TypeScript anywhere: no `.ts`/`.tsx` files, no `tsconfig`, no `typescript` dependency
- [ ] Tailwind installed as a dependency (no CDN), dark mode persisted
- [ ] Auth (register/login/refresh/logout) + protected routes working
- [ ] Friends, presence, real-time messaging, and 1:1 + group video calls working
- [ ] Studio tools (camera, inspector, code) and settings implemented
- [ ] Command palette (⌘K) functional with keyboard navigation
- [ ] Unit + E2E tests, CI pipeline, and a documented deployment path
- [ ] `README.md` and this `STATUS.md` updated to reflect the shipped state

---

*End of report — `STATUS.md` at `E:\fullstact_l\connectly\STATUS.md`.*
