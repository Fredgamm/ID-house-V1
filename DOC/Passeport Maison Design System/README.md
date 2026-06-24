# Passeport Maison — Design System

> **Documentez, valorisez et partagez votre bien immobilier.**

Passeport Maison is a mobile-first French digital passport for residential property. Owners catalogue every fixture, appliance, and document attached to their home; the result is a transferable "carnet de santé" that increases trust at sale, simplifies insurance claims, and connects the owner to a verified marketplace of artisans.

This is the visual + interaction system that powers it.

---

## Sources

This design system was built from:
- A detailed product spec provided by the team (identity, color tokens, type ramp, ~25 component anatomies, animations, dark-mode).
- **Brand fonts** uploaded by the team: Plus Jakarta Sans (variable, roman + italic) and Changa One (regular + italic).
- A **Figma reference**: *[FREE] Estatery — Real Estate SaaS Web and Mobile UI Kit (Community)*, scoped to the two iPhone-X landing pages. The system inherits Estatery's visual DNA — purple primary, dark-blue near-black text, soft purple surfaces — adapted for Passeport Maison's tone and patrimony focus.

If you have an internal codebase or a private Figma, reattach via the Import menu and re-run — recreations from real source are always tighter than recreations from a spec.

---

## Audience & Tone

- **Owners**: French homeowners, 30–55, urban + peri-urban, mid-to-high household income, comfortable with banking apps but not power users.
- **Pros**: artisans, suppliers, agents who plug into a Pro-only side of the app with their own catalogue, messaging, and showcase.
- **Voice**: serious but accessible, modern, reassuring. The product handles patrimony — copy reads like a banking app crossed with a real-estate concierge. Inspirations: **Notion** (clarity), **Revolut** (premium cards), **MeilleursAgents** (real estate authority), **Estatery** (visual vocabulary).

---

## Content Fundamentals

**Language**: French only. Formal `vous` everywhere — never `tu`. Sentence-case headings (no Title Case, no ALL CAPS except for tiny meta tags ≤2 words).

**Address forms**:
- Owner-facing: *« Votre bien »*, *« Votre patrimoine »*, *« Vos équipements »* — the home is the user's, the app is the steward.
- System voice: *« Nous »* used sparingly, only when the platform commits to something (*« Nous vérifions chaque professionnel »*).
- Pro-facing: same vouvoiement, slightly more direct (*« Gérez votre catalogue »*).

**Tone calibration**:
- Money: non-breaking space before €, e.g. `12 450 €` (never `€12,450` or `12.450€`). Patrimony values get the hero type ramp at 40–56px, Plus Jakarta Sans ExtraBold.
- Use precise nouns over puffery: *« 14 équipements »* > *« plusieurs éléments »*. Lists of counts beat adjectives.
- Reassure on data: *« Données chiffrées et stockées en France »* — concrete, never vague.

**Casing**:
- Buttons: sentence-case verbs first — *« Ajouter un équipement »*, *« Inviter un pro »*.
- Section titles: sentence case — *« Vos pièces »* not *« Vos Pièces »*.
- Badges: 11px / weight 600, never small-caps unless an acronym.

**Emoji**: not used in product UI. Reserved for marketing only (and even there, sparingly). Never in buttons, never in headers.

**Numbers & units**:
- `1 250 €` (espace insécable, € après)
- `45 m²` (espace, m²)
- Surface always `m²`, never `m2` or `sqm`
- Dates: `12 mars 2025` (no ordinal)
- Time: `14:30` (24h)

**Microcopy examples**:
- Empty state for pièces: *« Aucune pièce ajoutée pour le moment. Commencez par le salon. »*
- Pro verification pending: *« Vérification en cours — sous 24 h ouvrées »*
- AI suggestion badge: *« Suggéré par l'IA »* — never *« AI »* alone.

---

## Visual Foundations

### Color vibe
**Purple confidence**. The dominant brand color is `#7065F0` — a saturated cool violet that sits between trust and innovation. Inherited from Estatery; we keep it because patrimony in 2026 feels less corporate-blue and more new-money optimistic. Everything else is greyscale, **warmed slightly toward indigo** (`#000929` text, `#E0DEF7` borders, `#F7F7FD` surfaces — the gray family has a blue undertone).

Color appears in narrow doses through **functional pairs**:
- `fixed` (rose) for built-in equipment
- `movable` (lavender, on-brand) for movable furniture
- `pro` (green) for verified pros
- `premium` (amber) for paid features
- `ai` (sky blue) for AI assists

Never invent new colors — pick from these pairs.

Imagery is **warm and bright** with real interiors. No stock-photo people. Slight grain optional. **Avoid blue-purple→pink gradients, glassmorphism, and crypto vibes.** Our gradient is `135°, #7065F0 → #5245ED` — used only on the value card, premium upgrade modal, and hero sections.

### Type
**Single font: Plus Jakarta Sans** (variable, 200 → 800). Weight does the work — no display face, no Inter, no system fallback at large sizes. Hero numbers (`428 500 €`) use ExtraBold 800 at 40–56px; section headings Bold 700 at 24–32px; body Medium 500 at 14–16px. Italic axis is available but used sparingly (foreign loanwords only).

Changa One TTFs are also in `fonts/` but are no longer actively used in the system — they're kept available in case the brand team wants a display face for marketing. The active system is mono-font.

### Spacing & layout
4px base. Page padding is **24px horizontal** (Estatery default — gives more breathing room than the iOS 20). Card padding is 16px. Sections gap 16px (with title) or 8px (with divider). The bottom nav is fixed (64px) with a 34px iOS safe area below.

### Backgrounds
Mostly flat `surface-default` (white in light, deep indigo `#0E0854` in dark). **One signature gradient**: the hero "soft purple wash" — `linear-gradient(180deg, #E0DEF7 0%, transparent 100%)` — used at the top of marketing/landing surfaces and inside the dashboard's Value card. No repeating patterns, no textures, no full-bleed photography inside the app shell.

### Animation
Snappy, never bouncy.
- Screen transitions: `fade 150ms ease`
- Bottom sheet: `translateY(100%) → 0` in `250ms ease`
- Modal: `scale(0.95) opacity(0) → 1` in `200ms ease`
- Pulse (pending state): `scale 1 → 1.08 → 1` over `2s ease-in-out infinite`
- No spring physics. No long durations. Hover/press use opacity 0.8, never scale.

### Hover / press states
- Tappable surfaces: background tint change in `150ms`
- Press: `opacity 0.8` — no transform
- Buttons: `hover` darkens by one shade (opacity 0.85); `active` = opacity 0.8
- Cards do **not** scale on press

### Borders
- Default `1.5px solid var(--border)` (= `#E0DEF7`) — note the 1.5px weight, inherited from Estatery; sharper than 1px, softer than 2px.
- Focus states promote to `var(--primary-600)` with a 4px `rgba(112,101,240,0.12)` outer ring.
- Most cards get a border **and** a subtle shadow.

### Shadow system
Six tokens — `xs sm md lg xl` plus a `card` preset, a `segment-active` preset, a `purple` preset for primary-CTA glow, and a `hero` preset (the diffused `0 4px 200px rgba(232,249,247,0.2)` that lives behind hero sections). Shadows base off `rgba(0,9,41,…)` — the dark-blue text color — so they sit warmer than pure-gray drop-shadows.

### Radii
8 / 10 / 12 / 14 / 16 / 20 / 24 / 50%. **Cards, buttons, inputs, segments all use 8** (Estatery default — geometric and confident). Modals 20. Bottom sheets 24/24/0/0. Avatars 50%.

### Transparency & blur
Used sparingly. The **Upgrade modal** has a faux-blurred backdrop (`backdrop-filter: blur(20px)` over a semi-opaque overlay). Status bar in "over" mode is transparent. Bottom nav has a subtle backdrop blur on iOS to feel native.

### Cards
- **Radius 8** (not 12 — Estatery convention)
- 1.5px border `--border` (`#E0DEF7`)
- `--shadow-card` (very light double shadow)
- 16px internal padding
- Background `--surface-card` (white)
- **Hero/feature variants**: solid soft-purple bg `#F7F7FD` with 1.5px border instead of white+shadow

### Signature pattern — stat circles
Estatery's most recognizable visual unit: a **64×64 white circle with `#E0DEF7` border, a 56×56 light-purple fill, and a 32×32 icon centered**. A small `#7065F0` rounded-square (24×24, radius 8) badge sits at the bottom-right of the circle to carry a secondary glyph (e.g. a key over a tenant icon, a check over a verified house). We reuse this pattern for the dashboard's headline stats, the marketplace category nav, and the AI-nudge avatars. Documented in `preview/brand-stat-circles.html`.

### Iconography
**Lucide Icons** (regular weight, stroke-width 1.75) — loaded via UMD CDN (`https://unpkg.com/lucide@0.453.0`). Wide coverage of home/equipment categories, plays nicely with Estatery's clean visual vibe. Icons render as inline SVG (so they survive html-to-image capture for previews + export). Icons inherit `currentColor` — never colored explicitly except when a parent functional pair (e.g. `fixed-text`) dictates the tint.

> **Substitution note** (Iconography): the original spec called for **Phosphor Icons**. We swapped to Lucide because Lucide ships an inline-SVG API that's compatible with html-to-image (used for design-system previews and PPTX export), while Phosphor relies on an `@font-face` icon font that doesn't render through that pipeline. Lucide's regular set at 1.75 stroke matches Phosphor's regular weight visually within a couple percent. If a glyph is missing or off, the icon mapping lives in `ui_kits/mobile/MobileShell.jsx` (`PH_TO_LUCIDE`) — extend there.

Never used: emoji in product UI, PNG icons, hand-rolled SVG sets, Unicode glyphs as icons.

---

## Index

Root files:
- **README.md** — this file
- **SKILL.md** — Agent Skill manifest (works in Claude Code too)
- **colors_and_type.css** — every token, every variable. Import this first.

Folders:
- **fonts/** — Plus Jakarta Sans variable + Changa One TTFs (loading info in `fonts/README.md`)
- **assets/** — logo SVGs (mark + lockup, light + dark), iconography reference
- **preview/** — design-system cards rendered in the Design System tab (colors, type, spacing, components, brand)
- **ui_kits/mobile/** — owner-facing iPhone clickable prototype (5-tab nav)
- **ui_kits/pro/** — pro/artisan-facing clickable prototype (4-tab nav)

---

## Tech-stack mapping (for engineers)

This system was specced against **SvelteKit 2.5 + Svelte 5 (runes) + Tailwind CSS 4**. The HTML/JSX preview files in this repo are visual references — port the tokens in `colors_and_type.css` directly into Tailwind 4's `@theme` block, then re-implement components as `.svelte` files. Mobile-first breakpoint is `sm: 390px`. No external UI libs (no shadcn, Flowbite, etc.) — everything custom.

Accessibility target: **WCAG AA**. Contrast ratios in the token set are all ≥4.5:1 against their intended surface.
