# Connectly — "NNN Studio" Project Status Report

**Project root:** `E:\fullstact_l\connectly`
**App name (package):** `connectly`
**Product title in design:** *Creative Studio Canvas* / *FaceTime & Studio Connect*
**Brand:** NNN STUDIO ("NNN Core Active")
**Report date:** 2026-10-22
**Target stack (per owner):** Full-stack, **React + TypeScript (TypeScript is kept - no conversion to JavaScript)**

> **Update 2026-10-22 - Stitch design integrated into React.**
> The Stitch design is no longer a standalone HTML page: `index.html` is now a Vite
> shell and the interface is rendered by React components in `src/components/`.
> The untouched original design is preserved at `docs/stitch-original.html`.
> Section 2 (current state) has been updated to match, and the "convert to
> JavaScript" items in the roadmap were removed.

---

## 1. Executive Summary

The Stitch design has been **integrated into the React application**. `index.html` is now a
Vite shell and the interface renders through reusable TypeScript components in
`src/components/`. The untouched original design is preserved at
`docs/stitch-original.html` and is served at `/docs/stitch-original.html` as the visual
reference.

What still does not exist: **backend, database, routing, authentication, real-time
messaging, calling, tests and CI**. The island buttons and feature cards are wired to
honest acknowledgement panels that state what each module still needs, so nothing
pretends to work that does not.

**Overall completion: ~15%** (up from ~8%)

| Layer | Completion | Notes |
|---|---|---|
| Product/UX design | 75% | The hub is fully ported; the other 19 screens are still designed only as a route list |
| React front-end | 20% | Hub, island navigation, brand island, theme system and reusable card/button components |
| Design system | 55% | Tokens live in `src/index.css`; Tailwind is still CDN-loaded |
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
| `index.html` | 2.1 kB | **Vite shell now.** Keeps the original `<head>` (Tailwind CDN + `darkMode: 'class'`, Material Symbols, apple-grid body classes). The body markup was replaced by `<div id="root">` + `<script type="module" src="/src/main.tsx">`. Two bugs were fixed: the `tailwind.config` assignment was moved **after** the CDN script (it previously threw `ReferenceError: tailwind is not defined` and silently lost `darkMode:'class'`), and a pre-paint script restores the saved theme before React mounts. | Keep. Do not paste the design back into it. |
| `docs/stitch-original.html` | 25 kB | **Byte-identical backup of the original Stitch document.** Serves at `/docs/stitch-original.html` and is used as the visual parity reference. | Keep as reference. |
| `src/App.tsx` | 1.2 kB | Composes the design: `AmbientOrbs`, `BrandIsland`, `IslandNav`, `StudioHub`, `ActionToast`, `useTheme`. | Extends into the router shell. |
| `src/main.tsx` | 230 B | Vite entry, unchanged from the scaffold (imports `./App.tsx`). | Keep. |
| `src/index.css` | 2.2 kB | The Stitch `<style>` block moved here verbatim (`apple-grid`, `glass-card`, `subcard-glass`, `heading-tight`, body font). The old starter rule that capped `#root` at 1126px and centred all text was removed because it broke the design. | Keep. |
| `src/App.css` | 0.7 kB | Starter rules deleted. Now only the Material Symbols axis and the toast animation. | Keep. |
| `src/components/` | 9 files | `AmbientOrbs`, `BrandIsland`, `IslandNav`, `IslandButton`, `ModuleCard`, `QuickAction`, `StudioHub`, `ActionToast`. | Grow with each new screen. |
| `src/hooks/useTheme.ts` | 1.0 kB | React state for the theme, persists to `localStorage`, toggles the `dark` class on `<html>`. | Keep. |
| `src/types/studio.ts` | 2.4 kB | Typed module ids + the copy shown for every action that still needs a backend. | Keep. |
| `src/assets/hero.png` | 13,057 B | Vite starter art, no longer imported. | Delete. |
| `src/assets/react.svg`, `vite.svg` | — | Vite starter logos, no longer imported. | Delete. |
| `public/favicon.svg` | 9,522 B | Vite default favicon. | Replace with NNN logo. |
| `public/icons.svg` | 5,031 B | Vite sprite sheet (used only by the starter `App.tsx`). | Delete with starter. |
| `package.json` | 711 B | `react ^19.3.1`, `react-dom ^19.3.1`; dev: `vite ^8.3.4`, `@vitejs/plugin-react ^6.1.2`, `typescript ~6.0.3`, `typescript-eslint`, `eslint ^10.13.0`, `globals ^17`. | **Keep TypeScript.** Add router, state, socket, fetch layer. |
| `vite.config.ts` | 161 B | Bare `defineConfig({ plugins: [react()] })` — no path alias, no `/api` proxy. | Add `@` alias + `/api` proxy. |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | — | TS project configs, `noUnusedLocals`, `erasableSyntaxOnly`. | **Keep all three** (TypeScript stays). |
| `eslint.config.js` | 591 B | Targets `**/*.{ts,tsx}` with `typescript-eslint`. | Keep as is. |
| `README.md` | 2,345 B | Unmodified Vite template README. | Rewrite as project README. |
| `.gitignore` | 253 B | Vite default. | Add `.env`, uploads, logs. |
| `package-lock.json` | 96 KB | Locked deps. | Re-lock after dep changes. |
| `node_modules/` | — | Installed. | Fine. |

### 2.2 What does **not** exist (verified by recursive scan)

- No `server/` / `api/` / `backend/` folder — **no backend at all**
- No database schema, no models, no migrations, no seed
- No router (`react-router` not installed) and no per-screen page components yet
- No auth (no JWT, no sessions, no OAuth)
- No Socket.IO / WebRTC / any real-time transport
- No test runner (no Vitest, Jest, Playwright, Cypress), no test files
- No CI workflow (`.github/` absent), no Dockerfile, no `.env` / `.env.example`
- Tailwind is still loaded from the CDN (no local Tailwind dependency)
- No `LICENSE`, no `CONTRIBUTING.md`

> Note: the git repository now exists at `E:\fullstact_l` (remote
> `github.com/Neshan69/connectively.git`, branch `main`). It was created after
> the first version of this report.

### 2.3 Design inventory (source: `docs/stitch-original.html`, now rendered by React)

This is the authoritative source of truth for the UI and must be preserved during any future work.

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
| 8 | `/` | **Studio Hub** (the designed screen) | `main` glass card + Quick CTAs | P0 — ✅ **done** |
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

## 4. Target Architecture (Full Stack, React + TypeScript)

### 4.1 Front-end

- **React 19 + Vite 8 with TypeScript — TypeScript stays, no conversion to JavaScript.**
- **Tailwind via the Play CDN (current state).** Keeping the CDN preserves the design exactly; migrating to Tailwind v4 would rename `bg-gradient-to-*` → `bg-linear-*` and needs a full class audit. Recommended later, with `@custom-variant dark (&:where(.dark, .dark *))` to keep `darkMode: 'class'`.
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
├── docs/stitch-original.html  # untouched reference copy of the Stitch design
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
    ├── main.tsx               # entry: providers (Router, Query, Theme, Auth, Socket)
    ├── App.tsx                # layout shell + island nav + route outlet
    ├── api/                   # http client + per-domain api modules
    ├── assets/
    ├── components/
    │   ├── AmbientOrbs.tsx    # ✅ done
    │   ├── BrandIsland.tsx    # ✅ done
    │   ├── IslandNav.tsx      # ✅ done
    │   ├── IslandButton.tsx   # ✅ done (reusable island button + tooltip)
    │   ├── ModuleCard.tsx     # ✅ done (video / audio / messages variants)
    │   ├── QuickAction.tsx    # ✅ done
    │   ├── StudioHub.tsx      # ✅ done (the hub screen)
    │   ├── ActionToast.tsx    # ✅ done
    │   ├── call/              # TODO VideoStage, AudioStage, CallControls, ParticipantTile
    │   ├── chat/              # TODO ThreadList, MessageBubble, Composer
    │   └── overlays/          # TODO CommandPalette, NotificationCentre
    ├── features/              # TODO auth, profile, friends, messages, calls, studio, settings
    │   └── <feature>/pages/ + components/ + hooks/ + store/
    ├── hooks/useTheme.ts      # ✅ done
    ├── types/studio.ts        # ✅ done (module ids + action copy)
    ├── store/                 # TODO zustand stores (auth, call, notifications)
    ├── styles/                # TODO index.css is still at src/index.css
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
| 1 | ~~Design lives only in one 25 KB `index.html`~~ **RESOLVED** | — | The design now lives in `src/components/*` and renders through React. `docs/stitch-original.html` keeps the reference copy. |
| 2 | ~~TypeScript is installed but the target is plain JavaScript~~ **RESOLVED** | — | Decision changed: TypeScript is kept. `tsconfig*` files, `.tsx` components and `typescript-eslint` all stay. |
| 3 | **Tailwind only via CDN** | Medium — CDN is slow, no purge, the `tailwind.config` script must stay after the CDN script or the config is silently dropped | Migrate to Tailwind v4 + `@tailwindcss/vite` later; audit `bg-gradient-to-*` → `bg-linear-*` and add `@custom-variant dark` |
| 4 | **External hotlinked brand logo** (`googleusercontent.com`) | Medium — breaks offline, leaks a request to Google | Download to `src/assets/brand-logo.png` |
| 5 | ~~No git repository~~ **RESOLVED** | — | Repo exists at `E:\fullstact_l`, remote `github.com/Neshan69/connectively.git`, branch `main`. |
| 6 | **No backend at all** | High — every page beyond the hub is blocked | Stand up `server/` with auth + models first (vertical slice) |
| 7 | **WebRTC signalling, TURN, and encryption claims are unbacked** | Medium — "PQ3 / end-to-end encrypted" is marketing copy in the prototype | Either implement real E2EE (Web Crypto) or reword to honest "encrypted in transit" |
| 8 | **"4K HDR", "sub-5 ms latency", "60 fps"** are design copy only | Medium | Keep as UI copy, but do not present as implemented capabilities |
| 9 | **No tests, no CI** | Medium | Vitest + React Testing Library, Playwright smoke, GitHub Actions |
| 10 | ~~Dark mode is not persisted~~ **RESOLVED** | — | `useTheme` + `localStorage` + pre-paint inline script in `index.html` |
| 11 | **Mobile responsiveness of the island nav** | Low | Verified: the layout matches the original at 390 / 768 / 1440 px with no horizontal overflow. The right island still floats over content on narrow screens — add a bottom-bar variant under `md` |
| 12 | **Tailwind CDN re-generates after React mounts** | Low | Measured 30 ms unstyled window — not perceptible. A local Tailwind build would remove it entirely |

---

## 7. Roadmap

### Phase 0 — Foundation cleanup ✅ DONE
- [x] `git init` + first commit of the scaffold
- [x] Keep TypeScript (decision reversed from the original plan)
- [x] Move the Stitch `<style>` block into `src/index.css`
- [x] Turn `index.html` into the Vite shell (`#root` + module script), keep a backup of the original at `docs/stitch-original.html`
- [x] Port the design into reusable TSX components (`src/components/*`)
- [x] React-state theme toggle with `localStorage` persistence + pre-paint restore
- [x] Fix the `tailwind.config` script order so `darkMode: 'class'` actually applies
- [ ] Install `tailwindcss@4` + `@tailwindcss/vite` (optional, needs a class audit)
- [ ] Add Vite alias `@ → src` and dev proxy `/api → http://localhost:5000`
- [ ] Replace Vite favicon with the NNN logo; download the external logo into `src/assets`
- [ ] Set up `server/` (Express, Mongoose, `.env.example`) and a `/api/health` endpoint

### Phase 1 — Shell + auth (2–3 days)
- [ ] Add `react-router` and turn `StudioHub` into a route outlet
- [x] Theme provider with persistence
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

1. **Slice A** — ✅ DONE: hub screen ported to React + TypeScript, theme toggle works → *demo: the Stitch design reproduced in React*
2. **Slice B** — Register/login/profile with a real API + DB → *demo: sign up and persist a profile*
3. **Slice C** — Friends + presence → *demo: two browsers see each other online*
4. **Slice D** — Real-time messaging → *demo: chat between two accounts*
5. **Slice E** — 1:1 video call → *demo: working WebRTC call*
6. **Slice F** — Group call, spatial audio, screen share
7. **Slice G** — Studio tools, command palette, settings
8. **Slice H** — Polish, tests, CI, deploy

---

## 9. Immediate Next Actions (recommended next 3 commits)

1. `feat: render the stitch design through react` — ported components, shell `index.html`, theme toggle (already staged in the working tree)
2. `feat: add react router and stub the 20 studio routes` — `react-router` dependency, `AppShell` with an `<Outlet />`, protected-route wrapper
3. `feat: stand up the express + mongodb api` — `server/` workspace with `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` and a `User` model

---

## 10. Definition of Done (v1.0)

- [ ] All 20 pages implemented and reachable through the island navigation
- [x] TypeScript kept throughout: no `.ts`/`.tsx` converted to JavaScript, `tsconfig*` intact
- [x] Dark mode persisted and driven by the theme toggle button (`darkMode: 'class'` verified working)
- [ ] Tailwind installed as a dependency (no CDN) — optional, needs a class audit
- [ ] Auth (register/login/refresh/logout) + protected routes working
- [ ] Friends, presence, real-time messaging, and 1:1 + group video calls working
- [ ] Studio tools (camera, inspector, code) and settings implemented
- [ ] Command palette (⌘K) functional with keyboard navigation
- [ ] Unit + E2E tests, CI pipeline, and a documented deployment path
- [ ] `README.md` and this `STATUS.md` updated to reflect the shipped state

---

*End of report — `STATUS.md` at `E:\fullstact_l\connectly\STATUS.md`.*
