# Pro UI Kit — Artisan/supplier-facing

iPhone 390×844 prototype for the **Pro** side of Passeport Maison — what an artisan, supplier, or service company sees once they're verified into the marketplace.

## What's interactive
- **Bottom nav (4 items)** : Dashboard / Catalogue / Messages / Vitrine.
- **Dashboard** : verified-Pro status banner, monthly stats, recent demand cards.
- **Catalogue** : list of services with active/inactive toggle state.
- **Messages** : conversation list with unread counts.
- **Vitrine** : the Pro's public profile card (gradient header) + specialties + project photos.

## Shared with mobile kit
`MobileShell.jsx` is imported from `../mobile/` — `Phone`, `StatusBar`, `Header`, `Btn`, `Badge`, `Card`, `Ic`, `SectionTitle` are all reused. Only the **bottom nav** (4 vs 5 items, different icons, pill-style active state on `surface-card`) and the screen content are pro-specific.

## Files
| File | Role |
|---|---|
| `index.html` | Stage + script loader (imports `../mobile/MobileShell.jsx`) |
| `ProScreens.jsx` | Pro-specific bottom nav, dashboard, catalogue, messages, vitrine |
| `ProApp.jsx` | Root composition |
