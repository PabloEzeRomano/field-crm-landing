# Field CRM Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Field CRM single-file HTML landing page into a Next.js 14 project with one component per section, pixel-identical output.

**Architecture:** Next.js 14 App Router, TypeScript, Yarn. All CSS lives in `app/globals.css` (copied verbatim from original HTML). Each HTML section becomes a React component. A `RevealObserver` client component handles IntersectionObserver scroll reveals. Google Calendar scheduling button is hidden; a custom styled button triggers it programmatically.

**Tech Stack:** Next.js 14, React 18, TypeScript, Yarn, plain CSS

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Create | Yarn workspace, Next.js deps |
| `tsconfig.json` | Create | TypeScript config |
| `next.config.ts` | Create | Next.js config |
| `app/layout.tsx` | Create | HTML shell, font links, metadata |
| `app/globals.css` | Create | All CSS from original HTML |
| `app/page.tsx` | Create | Assembles all section components |
| `components/Nav.tsx` | Create | Sticky nav with scroll detection |
| `components/Hero.tsx` | Create | Hero with entrance animations + SVG |
| `components/Problem.tsx` | Create | Dark problem section |
| `components/Solution.tsx` | Create | 4-step how-it-works grid |
| `components/ForWhom.tsx` | Create | Industry cards layout |
| `components/SocialProof.tsx` | Create | Testimonials + pilot badge |
| `components/Pricing.tsx` | Create | Starter/Team pricing cards |
| `components/Agendar.tsx` | Create | Custom button + hidden GCal button |
| `components/Footer.tsx` | Create | Footer links + wordmark |
| `components/RevealObserver.tsx` | Create | Global IntersectionObserver setup |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Next.js with yarn**

```bash
cd /Users/barbusclo/Projects/field-CRM-landing
yarn create next-app . --typescript --app --no-tailwind --no-eslint --src-dir=false --import-alias="@/*" --yes
```

Expected: Next.js project scaffolded. Directories `app/`, `public/` created.

- [ ] **Step 2: Remove boilerplate files**

```bash
rm -rf app/fonts public/next.svg public/vercel.svg
rm app/page.module.css
```

- [ ] **Step 3: Verify dev server starts**

```bash
yarn dev
```

Expected: Server running at `http://localhost:3000`. Open in browser — default Next.js page shows (will be replaced).

Stop server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 14 project"
```

---

## Task 2: Global CSS

**Files:**
- Create/Replace: `app/globals.css`

- [ ] **Step 1: Replace globals.css with all CSS from original HTML**

Replace the entire content of `app/globals.css` with:

```css
/* ─── tokens ──────────────────────────────────────────────────── */
:root {
  --bg: #f3efe6;
  --bg-dark: #1c3328;
  --ink: #1a2518;
  --ink-light: #5a6b5c;
  --accent: #cc5225;
  --accent-2: #e8b94a;
  --surface: #eae5db;
  --surface-2: #ddd8ce;
  --muted: #8b9e91;
  --white: #fdfaf4;

  --f-display: 'Syne', sans-serif;
  --f-body: 'IBM Plex Sans', sans-serif;

  --r: 6px;
  --r-lg: 12px;

  --max: 1100px;
  --pad-x: clamp(1.25rem, 5vw, 3rem);
  --section-gap: clamp(5rem, 10vw, 9rem);
}

/* ─── reset ───────────────────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--f-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
img,
svg {
  display: block;
}
a {
  color: inherit;
  text-decoration: none;
}
ul {
  list-style: none;
}

/* ─── utilities ───────────────────────────────────────────────── */
.container {
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--pad-x);
}
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.65s ease,
    transform 0.65s ease;
}
.reveal.visible {
  opacity: 1;
  transform: none;
}
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* ─── dot-grid texture ────────────────────────────────────────── */
.dot-grid {
  background-image: radial-gradient(circle, #1c332818 1px, transparent 1px);
  background-size: 24px 24px;
}
.dot-grid-light {
  background-image: radial-gradient(circle, #f3efe622 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ─── buttons ─────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: var(--r);
  font-family: var(--f-body);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: none;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}
.btn:active { transform: scale(0.97); }
.btn-primary {
  background: var(--accent);
  color: var(--white);
  box-shadow: 0 2px 12px #cc522530;
}
.btn-primary:hover {
  background: #b84820;
  box-shadow: 0 4px 20px #cc522545;
  transform: translateY(-1px);
}
.btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 1.5px solid var(--surface-2);
}
.btn-ghost:hover { background: var(--surface); }
.btn-outline-white {
  background: transparent;
  color: var(--white);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
}
.btn-outline-white:hover { background: rgba(255, 255, 255, 0.1); }
.btn-lg {
  padding: 1.05rem 2.25rem;
  font-size: 1rem;
}
.btn-arrow::after { content: '→'; }

/* ─── tag/badge ───────────────────────────────────────────────── */
.tag {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.tag-accent { background: #cc52251a; color: var(--accent); }
.tag-light { background: rgba(255, 255, 255, 0.15); color: rgba(255, 255, 255, 0.8); }
.tag-dark { background: rgba(255, 255, 255, 0.12); color: rgba(255, 255, 255, 0.7); }

/* ─── section headings ────────────────────────────────────────── */
.section-label {
  font-family: var(--f-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1rem;
}
h1, h2, h3 {
  font-family: var(--f-display);
  line-height: 1.1;
}
h2 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
}
h3 { font-size: 1.25rem; font-weight: 700; }
p { color: var(--ink-light); }

/* ══ NAV ══════════════════════════════════════════════════════════ */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem var(--pad-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
nav.scrolled {
  background: rgba(243, 239, 230, 0.94);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--surface-2);
}

.wordmark {
  display: flex;
  align-items: baseline;
  gap: 0.2em;
  font-family: var(--f-display);
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  color: var(--bg-dark);
  line-height: 1;
  user-select: none;
}
.wordmark-field { color: var(--bg-dark); }
.wordmark-crm {
  font-size: 0.65em;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--accent);
  padding: 0.15em 0.35em;
  background: #cc52251a;
  border-radius: 3px;
  line-height: 1.4;
  align-self: center;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.nav-links a {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-light);
  transition: color 0.15s;
}
.nav-links a:hover { color: var(--ink); }
.nav-cta { display: flex; align-items: center; gap: 0.75rem; }

@media (max-width: 680px) {
  .nav-links { display: none; }
}

/* ══ HERO ══════════════════════════════════════════════════════════ */
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 5rem;
  padding-bottom: 4rem;
  position: relative;
  overflow: hidden;
}

.hero-deco {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 55%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s ease 0.4s;
}
.hero-deco.visible { opacity: 1; }
.hero-deco svg { width: 100%; height: 100%; }

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 680px;
}
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.hero-eyebrow.visible { opacity: 1; transform: none; }
.hero-eyebrow-line {
  width: 32px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
}
.hero-eyebrow span {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.hero h1 {
  font-size: clamp(2.75rem, 6.5vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.02;
  color: var(--ink);
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
}
.hero h1.visible { opacity: 1; transform: none; }
.hero h1 em { font-style: normal; color: var(--accent); }

.hero-sub {
  font-size: clamp(1rem, 2vw, 1.1875rem);
  line-height: 1.65;
  color: var(--ink-light);
  max-width: 520px;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s;
}
.hero-sub.visible { opacity: 1; transform: none; }

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
}
.hero-actions.visible { opacity: 1; transform: none; }

.hero-trust {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--surface-2);
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  opacity: 0;
  transition: opacity 0.6s ease 0.7s;
}
.hero-trust.visible { opacity: 1; }
.hero-trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--ink-light);
  font-weight: 500;
}
.hero-trust-item .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

/* ══ PROBLEM ══════════════════════════════════════════════════════ */
.section-problem {
  padding: var(--section-gap) 0;
  background: var(--bg-dark);
  position: relative;
  overflow: hidden;
}

.problem-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem 4rem;
  align-items: start;
  margin-top: 3rem;
}
@media (max-width: 700px) {
  .problem-grid { grid-template-columns: 1fr; gap: 2rem; }
}

.problem-intro h2 { color: var(--white); }
.problem-intro p { color: rgba(255, 255, 255, 0.55); margin-top: 1rem; font-size: 1.0625rem; }
.problem-intro .section-label { color: rgba(255, 255, 255, 0.35); }

.problem-cards { display: flex; flex-direction: column; gap: 1px; }
.problem-card {
  padding: 1.5rem 1.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-left: 3px solid transparent;
  transition: border-color 0.2s, background 0.2s;
}
.problem-card:first-child { border-radius: var(--r-lg) var(--r-lg) 0 0; }
.problem-card:last-child { border-radius: 0 0 var(--r-lg) var(--r-lg); }
.problem-card:hover { background: rgba(255, 255, 255, 0.08); border-left-color: var(--accent); }
.problem-card-icon {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.07);
  border-radius: var(--r);
}
.problem-card h3 { color: var(--white); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.problem-card p { color: rgba(255, 255, 255, 0.5); font-size: 0.9375rem; }

.problem-quote {
  grid-column: 1 / -1;
  padding: 2rem 2.25rem;
  background: rgba(204, 82, 37, 0.12);
  border-left: 3px solid var(--accent);
  border-radius: var(--r-lg);
  font-size: clamp(1.0625rem, 2.5vw, 1.25rem);
  font-style: italic;
  color: rgba(255, 255, 255, 0.75);
  font-family: var(--f-body);
  font-weight: 300;
  line-height: 1.55;
}
.problem-quote strong { color: var(--white); font-style: normal; font-weight: 600; }

/* ══ SOLUTION ══════════════════════════════════════════════════════ */
.section-solution { padding: var(--section-gap) 0; }

.solution-header {
  text-align: center;
  max-width: 580px;
  margin: 0 auto 4rem;
}
.solution-header .section-label { text-align: center; }
.solution-header h2 { margin-bottom: 0.75rem; }
.solution-header p { font-size: 1.0625rem; }

.steps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
@media (max-width: 640px) { .steps { grid-template-columns: 1fr; } }

.step {
  padding: 2rem;
  background: var(--white);
  border-radius: var(--r-lg);
  border: 1px solid var(--surface-2);
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
}
.step:hover { box-shadow: 0 8px 32px rgba(26, 37, 24, 0.08); transform: translateY(-2px); }
.step-num {
  font-family: var(--f-display);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 1rem;
}
.step-icon {
  width: 48px;
  height: 48px;
  background: var(--surface);
  border-radius: var(--r);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}
.step h3 { color: var(--ink); margin-bottom: 0.5rem; }
.step p { font-size: 0.9375rem; line-height: 1.6; }

/* ══ FOR WHOM ══════════════════════════════════════════════════════ */
.section-whom { padding: var(--section-gap) 0; background: var(--surface); }

.whom-layout { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
@media (max-width: 760px) { .whom-layout { grid-template-columns: 1fr; gap: 2.5rem; } }

.whom-intro h2 { margin-bottom: 1rem; }
.whom-intro p { font-size: 1.0625rem; line-height: 1.7; }
.whom-intro .section-label { margin-bottom: 0.75rem; }
.whom-intro blockquote {
  margin-top: 2rem;
  padding: 1.25rem 1.5rem;
  background: var(--white);
  border-radius: var(--r-lg);
  border-left: 3px solid var(--accent);
  font-size: 0.9375rem;
  font-style: italic;
  color: var(--ink-light);
}
.whom-intro blockquote strong { color: var(--ink); font-style: normal; }

.whom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
@media (max-width: 400px) { .whom-grid { grid-template-columns: 1fr; } }

.whom-card {
  padding: 1.25rem;
  background: var(--white);
  border-radius: var(--r-lg);
  border: 1px solid var(--surface-2);
  transition: border-color 0.2s;
}
.whom-card:hover { border-color: var(--accent); }
.whom-card-sector {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.4rem;
}
.whom-card h4 {
  font-family: var(--f-display);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.3rem;
}
.whom-card p { font-size: 0.8125rem; color: var(--ink-light); }

/* ══ SOCIAL PROOF ══════════════════════════════════════════════════ */
.section-proof { padding: var(--section-gap) 0; }

.proof-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
@media (max-width: 640px) { .proof-layout { grid-template-columns: 1fr; } }

.proof-card {
  padding: 2rem;
  background: var(--white);
  border-radius: var(--r-lg);
  border: 1px solid var(--surface-2);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.proof-card-quote { font-size: 1rem; line-height: 1.65; color: var(--ink); font-style: italic; }
.proof-card-author { display: flex; align-items: center; gap: 0.875rem; }
.proof-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--f-display);
  font-weight: 800;
  font-size: 0.875rem;
  color: var(--muted);
  flex-shrink: 0;
}
.proof-author-name { font-weight: 600; font-size: 0.875rem; color: var(--ink); }
.proof-author-role { font-size: 0.8125rem; color: var(--ink-light); }

.proof-pilot-badge {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.75rem;
  background: var(--bg-dark);
  border-radius: var(--r-lg);
}
.pilot-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4ade80;
  flex-shrink: 0;
  box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.2);
  animation: pulse-green 2s infinite;
}
@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.2); }
  50% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0.1); }
}
.pilot-text { font-size: 0.875rem; color: rgba(255, 255, 255, 0.65); }
.pilot-text strong { color: var(--white); font-weight: 600; }

/* ══ PRICING ══════════════════════════════════════════════════════ */
.section-pricing { padding: var(--section-gap) 0; background: var(--bg-dark); position: relative; overflow: hidden; }

.pricing-header { text-align: center; max-width: 540px; margin: 0 auto 3.5rem; }
.pricing-header h2 { color: var(--white); margin-bottom: 0.75rem; }
.pricing-header p { color: rgba(255, 255, 255, 0.5); }
.pricing-header .section-label { color: rgba(255, 255, 255, 0.3); }

.pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; max-width: 820px; margin: 0 auto; }
@media (max-width: 640px) { .pricing-grid { grid-template-columns: 1fr; } }

.pricing-card {
  padding: 2.25rem;
  border-radius: var(--r-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  position: relative;
  transition: border-color 0.2s, background 0.2s;
}
.pricing-card:hover { border-color: rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.08); }
.pricing-card.featured { background: var(--white); border-color: transparent; box-shadow: 0 0 0 2px var(--accent); }
.pricing-card.featured:hover { background: var(--white); }

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.875rem;
  border-radius: 99px;
  white-space: nowrap;
}

.pricing-plan-name {
  font-family: var(--f-display);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.pricing-card:not(.featured) .pricing-plan-name { color: rgba(255, 255, 255, 0.5); }
.pricing-card.featured .pricing-plan-name { color: var(--accent); }

.pricing-price { display: flex; align-items: baseline; gap: 0.25rem; }
.price-amount {
  font-family: var(--f-display);
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}
.pricing-card:not(.featured) .price-amount { color: var(--white); }
.pricing-card.featured .price-amount { color: var(--ink); }
.price-currency { font-size: 1.125rem; font-weight: 600; }
.pricing-card:not(.featured) .price-currency { color: rgba(255, 255, 255, 0.4); }
.pricing-card.featured .price-currency { color: var(--ink-light); }
.price-period { font-size: 0.875rem; margin-left: 0.1rem; }
.pricing-card:not(.featured) .price-period { color: rgba(255, 255, 255, 0.35); }
.pricing-card.featured .price-period { color: var(--ink-light); }

.pricing-setup { font-size: 0.8125rem; margin-top: 0.35rem; }
.pricing-card:not(.featured) .pricing-setup { color: rgba(255, 255, 255, 0.35); }
.pricing-card.featured .pricing-setup { color: var(--ink-light); }

.pricing-features { display: flex; flex-direction: column; gap: 0.75rem; }
.pricing-feature { display: flex; align-items: flex-start; gap: 0.625rem; font-size: 0.9rem; }
.pricing-card:not(.featured) .pricing-feature { color: rgba(255, 255, 255, 0.65); }
.pricing-card.featured .pricing-feature { color: var(--ink-light); }
.feat-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pricing-card:not(.featured) .feat-check { background: rgba(255, 255, 255, 0.08); }
.pricing-card.featured .feat-check { background: #cc522520; }
.feat-check svg { width: 10px; height: 10px; }

.pricing-cta { margin-top: auto; }
.pricing-card.featured .btn-primary { width: 100%; justify-content: center; }
.pricing-card:not(.featured) .btn-outline-white { width: 100%; justify-content: center; }

.founding-note {
  text-align: center;
  padding: 1.25rem 1.75rem;
  background: rgba(232, 185, 74, 0.12);
  border-radius: var(--r-lg);
  border: 1px solid rgba(232, 185, 74, 0.25);
  max-width: 820px;
  margin: 1.5rem auto 0;
}
.founding-note p { color: rgba(255, 255, 255, 0.7); font-size: 0.9375rem; }
.founding-note strong { color: var(--accent-2); font-weight: 600; }

/* ══ AGENDAR ══════════════════════════════════════════════════════ */
.section-agendar { padding: var(--section-gap) 0; text-align: center; }

.agendar-header { max-width: 560px; margin: 0 auto 3rem; }
.agendar-header h2 { margin-bottom: 0.75rem; }
.agendar-header p { font-size: 1.0625rem; }

/* ══ FOOTER ══════════════════════════════════════════════════════ */
footer {
  padding: 3rem var(--pad-x) 2.5rem;
  border-top: 1px solid var(--surface-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.footer-left { display: flex; flex-direction: column; gap: 0.4rem; }
.footer-tagline { font-size: 0.8125rem; color: var(--ink-light); }
.footer-credit { font-size: 0.75rem; color: var(--muted); }
.footer-credit a { color: var(--accent); font-weight: 600; }
.footer-credit a:hover { text-decoration: underline; }
.footer-right { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Start dev server, check base styles load**

```bash
yarn dev
```

Open `http://localhost:3000`. Body background should be `#f3efe6` (warm off-white). No layout yet — that's fine. Stop server.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add global CSS from original landing page"
```

---

## Task 3: Layout and RevealObserver

**Files:**
- Create/Replace: `app/layout.tsx`
- Create: `components/RevealObserver.tsx`

- [ ] **Step 1: Write RevealObserver component**

Create `components/RevealObserver.tsx`:

```tsx
'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
```

- [ ] **Step 2: Write layout.tsx**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Field CRM — Tu equipo de campo, bajo control',
  description:
    'Field CRM reemplaza el caos de WhatsApp y Excel con una herramienta simple para equipos de ventas en terreno.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/RevealObserver.tsx
git commit -m "feat: add layout and RevealObserver"
```

---

## Task 4: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create Nav.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="wordmark" aria-label="Field CRM">
        <span className="wordmark-field">Field</span>
        <span className="wordmark-crm">CRM</span>
      </a>
      <div className="nav-links">
        <a href="#problema">El problema</a>
        <a href="#como-funciona">Cómo funciona</a>
        <a href="#precios">Precios</a>
      </div>
      <div className="nav-cta">
        <a href="#agendar" className="btn btn-primary">
          Agendá una demo
        </a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Wire up in page.tsx temporarily to test**

Replace `app/page.tsx`:

```tsx
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <>
      <Nav />
      <div style={{ height: '200vh', paddingTop: '6rem' }}>
        <p>Scroll to test nav</p>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Visual check**

```bash
yarn dev
```

Open `http://localhost:3000`. Verify:
- Nav visible at top, transparent background
- Scroll down → nav gets frosted glass background
- "Field CRM" wordmark renders with orange badge
- Mobile (<680px): nav links hidden, CTA button visible

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: add Nav component"
```

---

## Task 5: Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [vis, setVis] = useState({
    eyebrow: false,
    h1: false,
    sub: false,
    actions: false,
    trust: false,
    deco: false,
  })

  useEffect(() => {
    const timers = [
      setTimeout(() => setVis((v) => ({ ...v, eyebrow: true })), 80),
      setTimeout(() => setVis((v) => ({ ...v, h1: true })), 180),
      setTimeout(() => setVis((v) => ({ ...v, sub: true })), 300),
      setTimeout(() => setVis((v) => ({ ...v, actions: true })), 420),
      setTimeout(() => setVis((v) => ({ ...v, trust: true })), 560),
      setTimeout(() => setVis((v) => ({ ...v, deco: true })), 300),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section
      className="hero dot-grid container"
      style={{
        paddingLeft: 'var(--pad-x)',
        paddingRight: 'var(--pad-x)',
        maxWidth: '100%',
      }}
    >
      <div className="container hero-content" style={{ padding: 0 }}>
        <div className={`hero-eyebrow${vis.eyebrow ? ' visible' : ''}`}>
          <div className="hero-eyebrow-line" />
          <span>Para equipos de ventas en terreno</span>
        </div>

        <h1 className={vis.h1 ? 'visible' : ''}>
          Tu equipo en
          <br />
          el campo.
          <br />
          <em>Vos, en control.</em>
        </h1>

        <p className={`hero-sub${vis.sub ? ' visible' : ''}`}>
          Field CRM reemplaza el caos de WhatsApp y Excel con una herramienta
          simple para equipos de ventas en terreno. Sabés dónde está tu equipo,
          qué están vendiendo, y qué viene.
        </p>

        <div className={`hero-actions${vis.actions ? ' visible' : ''}`}>
          <a href="#agendar" className="btn btn-primary btn-lg btn-arrow">
            Agendá una demo &nbsp;
          </a>
          <a href="#como-funciona" className="btn btn-ghost btn-lg">
            Ver cómo funciona
          </a>
        </div>

        <div className={`hero-trust${vis.trust ? ' visible' : ''}`}>
          <div className="hero-trust-item">
            <div className="dot" />
            Implementación en días, no meses
          </div>
          <div className="hero-trust-item">
            <div className="dot" />
            Sin contratos anuales
          </div>
          <div className="hero-trust-item">
            <div className="dot" />
            Precio especial para fundadores
          </div>
        </div>
      </div>

      <div className={`hero-deco${vis.deco ? ' visible' : ''}`}>
        <svg
          viewBox="0 0 600 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <line x1="100" y1="0" x2="100" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="200" y1="0" x2="200" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="300" y1="0" x2="300" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="400" y1="0" x2="400" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="500" y1="0" x2="500" y2="700" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="0" y1="140" x2="600" y2="140" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="0" y1="280" x2="600" y2="280" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="0" y1="420" x2="600" y2="420" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <line x1="0" y1="560" x2="600" y2="560" stroke="#1C3328" strokeWidth="1" strokeOpacity="0.15" />
          <path
            d="M 80 580 L 150 480 L 260 510 L 310 380 L 420 330 L 480 200 L 520 140"
            stroke="#CC5225"
            strokeWidth="2.5"
            strokeOpacity="0.5"
            fill="none"
            strokeDasharray="8 5"
            strokeLinecap="round"
          />
          <circle cx="150" cy="480" r="7" fill="#CC5225" fillOpacity="0.6" />
          <circle cx="150" cy="480" r="14" fill="#CC5225" fillOpacity="0.12" />
          <circle cx="310" cy="380" r="9" fill="#CC5225" fillOpacity="0.8" />
          <circle cx="310" cy="380" r="18" fill="#CC5225" fillOpacity="0.12" />
          <circle cx="480" cy="200" r="7" fill="#CC5225" fillOpacity="0.5" />
          <circle cx="480" cy="200" r="14" fill="#CC5225" fillOpacity="0.1" />
          <circle cx="80" cy="580" r="4" fill="#1C3328" fillOpacity="0.25" />
          <circle cx="260" cy="510" r="4" fill="#1C3328" fillOpacity="0.25" />
          <circle cx="420" cy="330" r="4" fill="#1C3328" fillOpacity="0.25" />
          <circle cx="520" cy="140" r="4" fill="#1C3328" fillOpacity="0.25" />
        </svg>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
    </>
  )
}
```

- [ ] **Step 3: Visual check**

```bash
yarn dev
```

Open `http://localhost:3000`. Verify:
- Hero takes full viewport height
- Eyebrow line + text fades in first, then h1, sub, buttons, trust items in sequence
- SVG route decoration fades in on right side (desktop)
- Dot grid texture visible on background
- Orange accent color on "Vos, en control." and buttons

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero component with entrance animations"
```

---

## Task 6: Problem component

**Files:**
- Create: `components/Problem.tsx`

- [ ] **Step 1: Create Problem.tsx**

```tsx
export default function Problem() {
  return (
    <section className="section-problem dot-grid-light" id="problema">
      <div className="container">
        <div className="problem-grid">
          <div className="problem-intro reveal">
            <p className="section-label">El problema</p>
            <h2>Así se gestiona el equipo de ventas hoy</h2>
            <p>
              Si sos dueño o gerente de ventas, sabés de qué estamos hablando.
              El sistema que &ldquo;funciona&rdquo; es en realidad un castillo de naipes que
              depende de que nadie se enferme, se vaya, o simplemente se olvide
              de mandar el Excel.
            </p>
          </div>

          <div className="problem-cards">
            <div className="problem-card reveal reveal-delay-1">
              <div className="problem-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <h3>&ldquo;Lo mandé por WhatsApp&rdquo;</h3>
              <p>
                Visitas, cotizaciones, reclamos, novedades — todo mezclado en el
                mismo hilo. Imposible rastrear qué pasó con qué cliente.
              </p>
            </div>

            <div className="problem-card reveal reveal-delay-2">
              <div className="problem-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <h3>El Excel que nadie actualiza</h3>
              <p>
                Versiones distintas en cinco celulares distintos. Datos
                duplicados, columnas que no encajan, y ninguna foto del cliente.
              </p>
            </div>

            <div className="problem-card reveal reveal-delay-3">
              <div className="problem-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3>¿Dónde está el equipo?</h3>
              <p>
                Sin visibilidad real de cuántas visitas hizo cada vendedor, qué
                pasó en cada una, o si llegaron adonde dijeron que iban.
              </p>
            </div>
          </div>

          <div className="problem-quote reveal" style={{ gridColumn: '1 / -1' }}>
            &ldquo;Tengo diez vendedores en la calle y no sé qué está pasando hasta
            que me llaman. Para entonces,{' '}
            <strong>ya perdimos la venta.</strong>&rdquo;
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <RevealObserver />
    </>
  )
}
```

- [ ] **Step 3: Visual check**

```bash
yarn dev
```

Scroll to Problem section. Verify:
- Dark green background
- 2-col grid (problem intro + cards)
- Cards animate in on scroll with `reveal` class
- Quote block appears with orange left border at full width
- Card hover adds orange left border

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Problem.tsx app/page.tsx
git commit -m "feat: add Problem section component"
```

---

## Task 7: Solution component

**Files:**
- Create: `components/Solution.tsx`

- [ ] **Step 1: Create Solution.tsx**

```tsx
export default function Solution() {
  return (
    <section className="section-solution" id="como-funciona">
      <div className="container">
        <div className="solution-header reveal">
          <p className="section-label">Cómo funciona</p>
          <h2>Simple desde el primer día</h2>
          <p>
            No hay semanas de capacitación ni consultores. En días tu equipo ya
            está usando Field CRM sin fricciones.
          </p>
        </div>

        <div className="steps">
          <div className="step reveal reveal-delay-1">
            <div className="step-num">01</div>
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC5225" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20v-1a6 6 0 0112 0v1" />
              </svg>
            </div>
            <h3>Onboarding en horas</h3>
            <p>
              Cargás tu equipo, tus clientes y tus zonas. Nuestro equipo te
              acompaña. Sin migraciones complejas ni integraciones que demoran
              meses.
            </p>
          </div>

          <div className="step reveal reveal-delay-2">
            <div className="step-num">02</div>
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC5225" strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3>El vendedor registra en el campo</h3>
            <p>
              Visita, fotografía, nota o pedido — en segundos desde el celular.
              Sin fricción, sin papeles, sin &ldquo;después te mando el resumen&rdquo;.
            </p>
          </div>

          <div className="step reveal reveal-delay-3">
            <div className="step-num">03</div>
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC5225" strokeWidth="2" strokeLinecap="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3>Vos ves todo en tiempo real</h3>
            <p>
              Mapa de actividad, resumen de visitas, clientes sin visitar. La
              información está cuando la necesitás, no al final del día.
            </p>
          </div>

          <div className="step reveal reveal-delay-4">
            <div className="step-num">04</div>
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC5225" strokeWidth="2" strokeLinecap="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Seguimiento del equipo</h3>
            <p>
              Alertas de clientes sin visitar, tareas vencidas y métricas de
              performance. El equipo sabe qué hacer. Vos sabés cómo lo están
              haciendo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <RevealObserver />
    </>
  )
}
```

- [ ] **Step 3: Visual check**

```bash
yarn dev
```

Scroll to Solution section. Verify:
- Centered header with label, h2, description
- 2×2 grid of step cards
- Cards have numbered labels (01–04), orange SVG icons, hover lift effect
- Cards animate in on scroll

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Solution.tsx app/page.tsx
git commit -m "feat: add Solution/how-it-works component"
```

---

## Task 8: ForWhom component

**Files:**
- Create: `components/ForWhom.tsx`

- [ ] **Step 1: Create ForWhom.tsx**

```tsx
export default function ForWhom() {
  return (
    <section className="section-whom" id="para-quien">
      <div className="container">
        <div className="whom-layout">
          <div className="whom-intro reveal">
            <p className="section-label">¿Es para mí?</p>
            <h2>Para negocios donde las ventas pasan en la calle</h2>
            <p>
              Si tenés un equipo que sale todos los días a visitar clientes, y
              hoy dependés de WhatsApp o Excel para saber qué está pasando,
              Field CRM es para vos.
            </p>
            <blockquote>
              Funciona mejor con equipos de{' '}
              <strong>5 a 50 vendedores</strong> en terreno. Negocios que ya
              venden bien pero pierden información, tiempo y oportunidades por
              falta de visibilidad.
            </blockquote>
          </div>

          <div className="whom-grid">
            <div className="whom-card reveal reveal-delay-1">
              <div className="whom-card-sector">Distribución</div>
              <h4>Distribuidoras y mayoristas</h4>
              <p>Vendedores por zona que visitan puntos de venta, toman pedidos y registran exhibición.</p>
            </div>
            <div className="whom-card reveal reveal-delay-2">
              <div className="whom-card-sector">Seguros</div>
              <h4>Productores de seguros</h4>
              <p>Visitas a empresas y comercios, cotizaciones, renovaciones y seguimiento de cartera.</p>
            </div>
            <div className="whom-card reveal reveal-delay-3">
              <div className="whom-card-sector">Inmobiliario</div>
              <h4>Inmobiliarias y desarrollos</h4>
              <p>Asesores en calle con clientes, visitas a propiedades y pipeline de captaciones.</p>
            </div>
            <div className="whom-card reveal reveal-delay-4">
              <div className="whom-card-sector">Consumo masivo</div>
              <h4>Marcas de consumo</h4>
              <p>Promotores y preventistas visitando comercios, controlando exhibición y relevando precios.</p>
            </div>
            <div className="whom-card reveal reveal-delay-1">
              <div className="whom-card-sector">Servicios</div>
              <h4>Servicios a empresas</h4>
              <p>Consultores, técnicos o vendedores que gestionan cuentas y visitan clientes corporativos.</p>
            </div>
            <div className="whom-card reveal reveal-delay-2">
              <div className="whom-card-sector">Construcción</div>
              <h4>Materiales y construcción</h4>
              <p>Representantes visitando corralones, ferreterías y obras para gestionar pedidos y relaciones.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import ForWhom from '@/components/ForWhom'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <ForWhom />
      <RevealObserver />
    </>
  )
}
```

- [ ] **Step 3: Visual check**

```bash
yarn dev
```

Scroll to ForWhom section. Verify:
- Surface background (`#eae5db`)
- 2-col layout: intro text left, 3×2 grid right
- Industry cards have sector label, title, description
- Card hover adds orange border
- Blockquote has orange left border

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/ForWhom.tsx app/page.tsx
git commit -m "feat: add ForWhom section component"
```

---

## Task 9: SocialProof component

**Files:**
- Create: `components/SocialProof.tsx`

- [ ] **Step 1: Create SocialProof.tsx**

```tsx
export default function SocialProof() {
  return (
    <section className="section-proof" id="testimonios">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Lo que dicen</p>
          <h2>Primeros clientes, resultados reales</h2>
        </div>

        <div className="proof-layout">
          <div className="proof-card reveal reveal-delay-1">
            <p className="proof-card-quote">
              &ldquo;Antes tenía que llamar a cada vendedor al final del día para
              saber qué había pasado. Ahora entro a Field y en dos minutos tengo
              el resumen completo. Recuperé horas de mi semana.&rdquo;
            </p>
            <div className="proof-card-author">
              <div className="proof-avatar">MR</div>
              <div>
                <div className="proof-author-name">Marcelo R.</div>
                <div className="proof-author-role">
                  Gerente comercial · Distribuidora, Buenos Aires
                </div>
              </div>
            </div>
          </div>

          <div className="proof-card reveal reveal-delay-2">
            <p className="proof-card-quote">
              &ldquo;Lo difícil no era convencer a los vendedores de usar la
              herramienta — era encontrar una que no fuera un dolor de cabeza.
              Field lo resolvió. La adoptaron solos.&rdquo;
            </p>
            <div className="proof-card-author">
              <div className="proof-avatar">SL</div>
              <div>
                <div className="proof-author-name">Sofía L.</div>
                <div className="proof-author-role">
                  Dueña · Agencia de seguros, Córdoba
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="proof-pilot-badge reveal" style={{ marginTop: '1.25rem' }}>
          <div className="pilot-dot" />
          <p className="pilot-text">
            <strong>Actualmente en piloto</strong> con tres empresas en
            Argentina — los primeros clientes fundadores tienen acceso
            anticipado y precio especial.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import ForWhom from '@/components/ForWhom'
import SocialProof from '@/components/SocialProof'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <ForWhom />
      <SocialProof />
      <RevealObserver />
    </>
  )
}
```

- [ ] **Step 3: Visual check**

```bash
yarn dev
```

Scroll to SocialProof section. Verify:
- 2 testimonial cards side by side
- Avatar circles with initials (MR, SL)
- Pilot badge with pulsing green dot + dark background

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/SocialProof.tsx app/page.tsx
git commit -m "feat: add SocialProof section component"
```

---

## Task 10: Pricing component

**Files:**
- Create: `components/Pricing.tsx`

- [ ] **Step 1: Create Pricing.tsx**

```tsx
function CheckIcon({ color }: { color: string }) {
  return (
    <div className="feat-check">
      <svg viewBox="0 0 10 10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <polyline points="1.5,5 4,7.5 8.5,2.5" />
      </svg>
    </div>
  )
}

export default function Pricing() {
  return (
    <section className="section-pricing dot-grid-light" id="precios">
      <div className="container">
        <div className="pricing-header reveal">
          <p className="section-label">Precios</p>
          <h2>Sin letra chica</h2>
          <p>
            Precios en dólares, factura en Argentina. Sin contrato anual.
            Cancelás cuando querés.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Starter */}
          <div className="pricing-card reveal reveal-delay-1">
            <div>
              <div className="pricing-plan-name">Starter</div>
              <div className="pricing-price" style={{ marginTop: '1rem' }}>
                <span className="price-currency">USD</span>
                <span className="price-amount">99</span>
                <span className="price-period">/mes</span>
              </div>
              <div className="pricing-setup">+ costo único de setup</div>
            </div>

            <div className="pricing-features">
              {[
                'Hasta 10 vendedores',
                'Registro de visitas y clientes',
                'Mapa de actividad en tiempo real',
                'Dashboard para el manager',
                'Soporte por WhatsApp',
              ].map((feat) => (
                <div key={feat} className="pricing-feature">
                  <CheckIcon color="rgba(255,255,255,0.6)" />
                  {feat}
                </div>
              ))}
            </div>

            <div className="pricing-cta">
              <a href="#agendar" className="btn btn-outline-white">
                Agendá una demo
              </a>
            </div>
          </div>

          {/* Team (featured) */}
          <div className="pricing-card featured reveal reveal-delay-2">
            <div className="pricing-badge">Más elegido</div>
            <div>
              <div className="pricing-plan-name">Team</div>
              <div className="pricing-price" style={{ marginTop: '1rem' }}>
                <span className="price-currency">USD</span>
                <span className="price-amount">179</span>
                <span className="price-period">/mes</span>
              </div>
              <div className="pricing-setup">+ costo único de setup</div>
            </div>

            <div className="pricing-features">
              {[
                'Vendedores ilimitados',
                'Todo lo del plan Starter',
                'Gestión de rutas y zonas',
                'Reportes y métricas avanzadas',
                'Integraciones (WhatsApp, email)',
                'Soporte prioritario + onboarding',
              ].map((feat) => (
                <div key={feat} className="pricing-feature">
                  <CheckIcon color="#CC5225" />
                  {feat}
                </div>
              ))}
            </div>

            <div className="pricing-cta">
              <a href="#agendar" className="btn btn-primary btn-arrow">
                Agendá una demo &nbsp;
              </a>
            </div>
          </div>
        </div>

        <div className="founding-note reveal">
          <p>
            ⭐{' '}
            <strong>
              Precio fundador disponible para los primeros 3 clientes.
            </strong>{' '}
            Si estás leyendo esto, probablemente todavía llegás. Hablemos.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import ForWhom from '@/components/ForWhom'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <ForWhom />
      <SocialProof />
      <Pricing />
      <RevealObserver />
    </>
  )
}
```

- [ ] **Step 3: Visual check**

```bash
yarn dev
```

Scroll to Pricing section. Verify:
- Dark background with dot-grid
- 2 cards: Starter (dark/ghost) and Team (white/featured)
- Team card has orange ring + "Más elegido" badge
- Check icons: white for Starter, orange for Team
- Founding note has gold border/background

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Pricing.tsx app/page.tsx
git commit -m "feat: add Pricing section component"
```

---

## Task 11: Agendar component

**Files:**
- Create: `components/Agendar.tsx`

- [ ] **Step 1: Create Agendar.tsx**

```tsx
'use client'

import Script from 'next/script'
import { useRef } from 'react'

declare global {
  interface Window {
    calendar: {
      schedulingButton: {
        load: (options: {
          url: string
          color: string
          label: string
          target: HTMLElement
        }) => void
      }
    }
  }
}

export default function Agendar() {
  const gcalTargetRef = useRef<HTMLDivElement>(null)

  const handleDemoClick = () => {
    const btn = gcalTargetRef.current?.querySelector('button')
    btn?.click()
  }

  const handleScriptLoad = () => {
    if (!gcalTargetRef.current || !window.calendar?.schedulingButton) return
    window.calendar.schedulingButton.load({
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3urjMyKKRkaoT2Su2b3W__FpCtYueK1_A_1FPXOJlfthF0sCoMLMOXjHzEUZb1efnLuHhrouz8?gv=true',
      color: '#cc5225',
      label: 'Agendá tu demo',
      target: gcalTargetRef.current,
    })
  }

  return (
    <section className="section-agendar" id="agendar">
      <link
        href="https://calendar.google.com/calendar/scheduling-button-script.css"
        rel="stylesheet"
      />
      <Script
        src="https://calendar.google.com/calendar/scheduling-button-script.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />

      <div className="container">
        <div className="agendar-header reveal">
          <p className="section-label">Siguiente paso</p>
          <h2>Agendá una demo</h2>
          <p>
            30 minutos. Sin slides. Te mostramos Field CRM en vivo con un caso
            parecido al tuyo, y respondemos todas tus preguntas.
          </p>
          <div style={{ marginTop: 30 }}>
            <button
              onClick={handleDemoClick}
              className="btn btn-primary btn-lg"
            >
              Agendá tu demo →
            </button>
          </div>
        </div>
      </div>

      <div ref={gcalTargetRef} id="gcal-target" style={{ display: 'none' }} />
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import ForWhom from '@/components/ForWhom'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import Agendar from '@/components/Agendar'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <ForWhom />
      <SocialProof />
      <Pricing />
      <Agendar />
      <RevealObserver />
    </>
  )
}
```

- [ ] **Step 3: Visual check**

```bash
yarn dev
```

Scroll to Agendar section. Verify:
- Centered section with label, h2, description
- Orange "Agendá tu demo →" button renders
- Clicking the button opens the Google Calendar scheduling popup
- Hidden `#gcal-target` div is not visible on page

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/Agendar.tsx app/page.tsx
git commit -m "feat: add Agendar section with custom GCal button"
```

---

## Task 12: Footer component + final page assembly

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <a href="#" className="wordmark" style={{ fontSize: '1.1rem' }}>
          <span className="wordmark-field">Field</span>
          <span className="wordmark-crm">CRM</span>
        </a>
        <span className="footer-tagline">Tu equipo de campo, bajo control.</span>
        <span className="footer-credit">
          Hecho con ❤ por <a href="#">gemm-apps</a> ·{' '}
          <em>&ldquo;apps with soul&rdquo;</em>
        </span>
      </div>
      <div className="footer-right">
        <a
          href="#problema"
          style={{ fontSize: '0.8125rem', color: 'var(--ink-light)', fontWeight: 500 }}
        >
          El problema
        </a>
        <a
          href="#como-funciona"
          style={{ fontSize: '0.8125rem', color: 'var(--ink-light)', fontWeight: 500 }}
        >
          Cómo funciona
        </a>
        <a
          href="#precios"
          style={{ fontSize: '0.8125rem', color: 'var(--ink-light)', fontWeight: 500 }}
        >
          Precios
        </a>
        <a href="#agendar" className="btn btn-primary" style={{ fontSize: '0.8125rem' }}>
          Agendá una demo
        </a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Finalize page.tsx with all components**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import ForWhom from '@/components/ForWhom'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import Agendar from '@/components/Agendar'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <ForWhom />
      <SocialProof />
      <Pricing />
      <Agendar />
      <Footer />
      <RevealObserver />
    </>
  )
}
```

- [ ] **Step 3: Full visual pass**

```bash
yarn dev
```

Do a full top-to-bottom review in browser. Verify each section matches the original HTML:

1. **Nav** — transparent → frosted on scroll, wordmark, CTA button
2. **Hero** — sequential entrance animations, SVG deco, trust items, dot-grid bg
3. **Problem** — dark bg, 3 cards reveal on scroll, quote at full width
4. **Solution** — 4 step cards in 2×2 grid, scroll reveal
5. **ForWhom** — surface bg, 2-col layout, 6 industry cards
6. **SocialProof** — 2 testimonials, pilot badge with pulsing green dot
7. **Pricing** — dark bg, Starter + Team cards, founding note
8. **Agendar** — custom orange button triggers GCal popup on click
9. **Footer** — wordmark, nav links, CTA

Check mobile at 375px width — nav links hide, layouts stack to 1 col.

Stop server.

- [ ] **Step 4: TypeScript final check**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer and finalize page assembly"
```

---

## Task 13: Production build verification

- [ ] **Step 1: Run production build**

```bash
yarn build
```

Expected: Build completes with no errors. Output shows page sizes.

- [ ] **Step 2: Run production server**

```bash
yarn start
```

Open `http://localhost:3000`. Verify:
- All sections render correctly in production mode
- Animations work
- GCal button triggers popup
- No console errors

Stop server.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: verify production build"
```
