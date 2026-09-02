# REDNEXT — Premium DJ Website

**REDNEXT — Sound of the Atlantic.** A cinematic, immersive, single-page website for REDNEXT, a professional DJ based in **Agadir / Taghazout, Morocco**.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP-ready · Lucide React**. Production-ready and Vercel-deployable.

---

## ✨ Features

- Cinematic dark loading screen (`LoadingScreen`) → intro gate → homepage experience
- **Audio entry experience** with `ENTER · SOUND ON` and persistent **Sound On / Off** toggle
- **Custom cursor** (desktop only) with magnetic buttons and `VIEW` / `PLAY` hover states
- Sticky **transparent → glass navbar** with fullscreen mobile menu
- `100vh` **Hero** with multi-layer parallax, gradient overlays, CTAs
- **Music section** — custom player with artwork, play/pause, progress, volume, Web Audio visualizer, waveform and a 4-track configurable playlist
- **Events** — editorial hover-expanding list with floating image preview
- **About** — editorial bio, AGADIR / TAGHAZOUT / MOROCCO, animated stat counters
- **Cinematic parallax** full-screen section ("The Sound of the Atlantic")
- **Gallery** — asymmetric editorial grid with hover zoom + fullscreen lightbox (prev/next/close, keyboard)
- **Location map** — dark OpenStreetMap embed with Agadir + Taghazout, Open Map / Get Directions
- **WhatsApp booking** — floating button + pre-filled message, fully configurable via env var
- **Booking section** — "Let's Make Some Noise", WhatsApp / Email / Book CTAs + validated booking form (ready to connect to a backend)
- **Social** — Instagram / SoundCloud / YouTube / WhatsApp (configurable)
- Film grain, glassmorphism, glow, editorial typography, SEO, sitemap, robots, OG + favicon

---

## 🚀 Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy the example env file and fill in values
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🏗 Production test

```bash
npm run build
npm run start
```

`npm run build` must complete with **zero errors**. The build also runs type checking and linting.

---

## ☁️ Deploy to Vercel

1. **Push the project to GitHub:**
   ```bash
   git init
   git add -A
   git commit -m "feat: REDNEXT DJ website"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. **Import the repository into Vercel** → [vercel.com/new](https://vercel.com/new). Choose **Next.js** (Vercel auto-detects the framework and build settings).
3. **Add environment variables** in Project → Settings → Environment Variables:

   | Variable | Example | Required |
   | --- | --- | --- |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `212600000000` | Recommended |
   | `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | `AIza...` | Optional |
   | `NEXT_PUBLIC_SITE_URL` | `https://rednext.vercel.app` | Recommended |

   > Only `NEXT_PUBLIC_` variables are exposed to the browser. Never put private API keys in client-side code.

4. **Deploy.** Vercel runs `next build` and deploys the production build.
5. **Verify** the production URL loads, the build logs show no errors, and images/audio/metadata resolve correctly.

> No filesystem-dependent features are used — the site is fully compatible with Vercel's serverless environment.

---

## 🎛 How to update content

All content lives in one place: **`config/dj.ts`** (type-safe, reloads instantly).

### WhatsApp number
Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (international format, no `+`/spaces) in the environment. The same number powers the floating button, navbar CTA, booking buttons and footer.

### Instagram / SoundCloud / YouTube
Edit `djConfig.social` in `config/dj.ts`. WhatsApp is auto-derived from the env var.

### Email
Edit `djConfig.email` in `config/dj.ts`.

### Images
Replace files in `public/images/` (keep the same filenames) — e.g. `dj-hero.jpg`, `dj-about.jpg`, `parallax.jpg`, `music-01.jpg`…, `gallery-01.jpg`…, `og.jpg`. Then rebuild.

### Music / Audio
Replace files in `public/audio/` (keep the same filenames, e.g. `dj-intro.wav`, `atlantic-nights.wav`, …). Update the `src` paths and `duration` values in `config/dj.ts`.

### Events
Edit the `events` array in `config/dj.ts` (date, title, location, image, status).

### Map
Edit `djConfig.map` (`embed`, `link`, `directions`, `agadir`, `taghazout`) in `config/dj.ts`. For Google Maps, set `NEXT_PUBLIC_GOOGLE_MAPS_KEY` and use a Google-style embed URL.

### Statistics (About counters)
Edit the `stats` array in `config/dj.ts`. These are **configurable placeholders** — update them to real figures before production.

### Bio / name / tagline
Edit `djConfig.name`, `djConfig.bio`, `djConfig.tagline`, `djConfig.location`.

---

## ❗ Booking form backend

The booking form currently validates input and shows success/error states **client-side** (no fake backend). To connect it to a real service:

1. Add a Vercel Function route (e.g. `src/app/api/booking/route.ts`) that sends the payload to your email/CRM (Resend, SendGrid, a form service, etc.).
2. In `src/components/sections/Booking.tsx`, replace the `setTimeout` stub in `submit()` with a `fetch("/api/booking", …)` call.

The form payload is already shaped for easy wiring.

---

## 📁 Project structure

```
config/dj.ts                 # ALL site content (single source of truth)
src/app/layout.tsx           # Root layout, fonts, SEO metadata
src/app/page.tsx             # Home page (renders <Home /> client shell)
src/app/globals.css          # Global styles, theme, film grain, utilities
src/app/sitemap.ts           # SEO sitemap
src/app/robots.ts            # SEO robots
src/components/
  Home.tsx                   # Experience orchestration (load → gate → content)
  LoadingScreen.tsx          # Cinematic loader
  IntroGate.tsx              # "ENTER · SOUND ON" gate
  CustomCursor.tsx           # Custom cursor (desktop only)
  Navbar.tsx                 # Transparent → glass nav + mobile menu
  FloatingWhatsApp.tsx       # Floating WhatsApp button
  providers/                 # ExperienceProvider + AudioProvider (context)
  sections/                  # Hero, MusicPlayer, Events, About, ParallaxSection,
                             # Gallery, LocationMap, Booking, Footer
  ui/                        # MagneticButton, Reveal, Counter, SectionLabel, BrandIcons
src/lib/site.ts              # Reads env + builds WhatsApp/social links
public/                      # images/ + audio/ assets
```

---

## 🧾 License & note

This is a template/portfolio website. Replace placeholder images, audio, stats and social links with real assets before going live with a real artist.
