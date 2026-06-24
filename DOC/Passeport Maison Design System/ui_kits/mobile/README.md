# Mobile UI Kit — Owner-facing

iPhone 390×844 prototype for the **owner** side of Passeport Maison.

## What's interactive
- **Bottom nav** (5 items) switches between Home / Plan / Équipements / Rapport / Marché.
- **Home** → tap the `+` to open the add-equipment bottom sheet (3 ways to add).
- **Équipements** → tap any row to open the equipment detail bottom sheet.
- **Filter chips** filter the equipment list live by type.
- **Upgrade modal** with faux-blurred backdrop can be triggered from the Value card (in Tweaks-equipped builds).

## Files
| File | Role |
|---|---|
| `index.html` | Stage + script loader |
| `MobileShell.jsx` | Phone frame, status bar, header, bottom nav, atoms (Btn/Badge/Card/Sheet…) |
| `HomeScreen.jsx` | Dashboard — value card, quick actions, AI nudge, recent equipment |
| `PlanScreen.jsx` | 2D floor plan SVG placeholder + room list |
| `EquipmentScreen.jsx` | Filter chips + scrollable equipment list |
| `MarketplaceScreen.jsx` | Search bar, category grid, supplier cards |
| `App.jsx` | Root composition + cross-screen sheets/modals |

## What this is not
A real product. The floor plan is a static SVG schematic — in production this is a proper 2D/3D renderer. The "Scanner" / "Photo" paths are stubs. The marketplace search is decorative.

## Tech-stack note
This file is React for previewability. The spec calls for **Svelte 5 + Tailwind 4**. To port: each `Component.jsx` maps 1:1 to a `Component.svelte`; the `TOK` object in `MobileShell.jsx` maps to Tailwind 4 `@theme` tokens which already exist in `colors_and_type.css`.
