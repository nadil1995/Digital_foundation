# LaunchDesk — React Migration Plan

## Todo

- [x] Write tasks/todo.md plan
- [x] Scaffold Vite + React project (package.json, vite.config.js, index.html)
- [x] Create Dockerfile and docker-compose.yml
- [x] Create src/index.css with all global styles and CSS variables
- [x] Create src/main.jsx and src/App.jsx
- [x] Create useScrollReveal hook
- [x] Create Nav component
- [x] Create Hero component
- [x] Create Marquee component
- [x] Create HowItWorks component
- [x] Create Pricing component with toggle
- [x] Create Addons component
- [x] Create Calculator component with live sliders
- [x] Create WhyLaunchDesk component with floating cards
- [x] Create Contact component with Formspree POST
- [x] Create Footer component

---

## Review

All todos completed. Changes made:

- **package.json** — Vite + React 18 dependencies
- **vite.config.js** — dev server on 0.0.0.0:5173 for Docker
- **index.html** — Vite entry point (replaced old single-file HTML)
- **Dockerfile** — Node 20 Alpine, installs deps, runs `npm run dev`
- **docker-compose.yml** — `frontend` service on port 5173, volume mounts for hot-reload, reads `VITE_FORMSPREE_ID` env var
- **.env.example** — documents the only required env variable
- **src/index.css** — all CSS variables, component styles, responsive breakpoints
- **src/main.jsx** — React root mount
- **src/App.jsx** — top-level component; manages `selectedPackage` state, passes `onSelect` and `selectPackage` down to Pricing/Addons/Contact
- **src/hooks/useScrollReveal.js** — IntersectionObserver hook, attaches `.visible` class when element enters viewport
- **src/components/Nav.jsx** — sticky nav, frosted glass on scroll, hamburger mobile menu
- **src/components/Hero.jsx** — animated grid bg, badge, headline, stat bar
- **src/components/Marquee.jsx** — infinite CSS scroll ticker
- **src/components/HowItWorks.jsx** — 4-step cards with scroll reveal
- **src/components/Pricing.jsx** — one-off / retainer toggle, 3 cards each, CTA → contact form
- **src/components/Addons.jsx** — 8 clickable add-on cards → contact form
- **src/components/Calculator.jsx** — 4 controlled range sliders, live revenue/profit output
- **src/components/WhyLaunchDesk.jsx** — animated floating UI cards + 4 numbered points
- **src/components/Contact.jsx** — validated form, Formspree JSON POST, success state, Jira placeholder comment
- **src/components/Footer.jsx** — logo, nav links, copyright
