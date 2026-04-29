# Field CRM Landing — Design Spec

**Date:** 2026-04-29  
**Status:** Approved

## Goal

Convert existing single-file HTML landing page into a Next.js project with one component per section. Pixel-identical output. No new features.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Yarn
- Plain CSS (no Tailwind, no CSS Modules)

## File Structure

```
field-CRM-landing/
├── app/
│   ├── layout.tsx          # font links, metadata, globals.css import
│   ├── page.tsx            # assembles all section components
│   └── globals.css         # all CSS from original HTML (tokens, reset, utilities, components)
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── Solution.tsx
│   ├── ForWhom.tsx
│   ├── SocialProof.tsx
│   ├── Pricing.tsx
│   ├── Agendar.tsx
│   └── Footer.tsx
├── hooks/
│   └── useReveal.ts        # shared IntersectionObserver hook
├── package.json
├── tsconfig.json
└── next.config.ts
```

## CSS Strategy

All CSS lives in `app/globals.css`. This mirrors the original `<style>` block exactly:
- CSS custom properties (tokens)
- Reset
- Utilities (`.container`, `.reveal`, `.dot-grid`, etc.)
- Buttons, tags, section headings
- Per-section styles

No CSS Modules. No scoping. Landing page — global CSS is appropriate.

## Components

### Nav
- `'use client'` — reads `window.scrollY`
- `useEffect` adds `scrolled` class to nav element when `scrollY > 40`
- Renders wordmark, nav links, CTA button

### Hero
- `'use client'` — entrance animations
- `useEffect` + `setTimeout` sequence sets boolean state flags
- Flags map to `visible` classNames on each element (matches original CSS transitions)
- Contains inline SVG route decoration

### Problem
- Server component (no interactivity)
- `.reveal` elements picked up by global `useReveal` hook instances or IntersectionObserver in parent

### Solution
- Server component
- 4-step grid, static

### ForWhom
- Server component
- 2-col layout, 6 industry cards

### SocialProof
- Server component
- 2 testimonial cards + animated pilot badge (CSS animation only, no JS)

### Pricing
- Server component
- Starter + Team cards, founding note

### Agendar
- `'use client'` — script interaction
- `next/script` with `strategy="lazyOnload"` loads Google Calendar scheduling script
- On script `onLoad`, calls `calendar.schedulingButton.load(...)` targeting a hidden `div#gcal-target`
- Custom `.btn.btn-primary` button onClick imperatively triggers `.click()` on the injected Google button
- Hidden div styled `display: none` until button is injected, then stays hidden (button inside is invisible via CSS)

### Footer
- Server component
- Wordmark, nav links, tagline, credit

## Shared Hook: useReveal

```ts
// hooks/useReveal.ts
// Returns [ref, isVisible] using IntersectionObserver
// threshold: 0.12, rootMargin: '0px 0px -40px 0px'
// Unobserves after first intersection (one-shot)
```

Used in client components (Nav, Hero, Agendar). Server components use the `.reveal` class — the global IntersectionObserver script in `layout.tsx` (via `next/script` inline) picks them up after hydration.

## Animations

All animations use CSS transitions already defined in `globals.css`. JS only toggles `.visible` class. No animation library.

Hero entrance: sequential `setTimeout` calls in `useEffect` add `visible` to each element.

Scroll reveal: `IntersectionObserver` in a `<script>` tag in `layout.tsx` (same logic as original HTML script block).

## Google Calendar Integration

```
Script src: https://calendar.google.com/calendar/scheduling-button-script.js
CSS href:   https://calendar.google.com/calendar/scheduling-button-script.css
Calendar URL: https://calendar.google.com/calendar/appointments/schedules/AcZssZ3urjMyKKRkaoT2Su2b3W__FpCtYueK1_A_1FPXOJlfthF0sCoMLMOXjHzEUZb1efnLuHhrouz8?gv=true
Color: #cc5225
Label: (hidden — custom button used instead)
```

Custom button calls `document.querySelector('#gcal-target button')?.click()` to trigger the calendar popup.

## Out of Scope

- No routing beyond single page
- No backend / API routes
- No state management
- No analytics
- No i18n
