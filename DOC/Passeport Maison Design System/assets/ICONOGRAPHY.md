# Iconography

## Primary library — Phosphor Icons

Loaded via CDN. Use the **regular** weight for almost everything; **fill** weight only when an icon is active/selected (e.g. the focused tab in the bottom nav).

```html
<!-- Add once in <head> -->
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>

<!-- Use anywhere -->
<i class="ph ph-house"></i>
<i class="ph-fill ph-house"></i>   <!-- selected state -->
```

Sizing — set `font-size` on the icon element. Bottom nav = 22px. Inline list items = 20px. Section icons = 18px. Inside badges = 12px.

Color — never set explicitly; icons inherit `currentColor`. Color only changes when the parent container's text color changes (e.g. `--fixed-text` on a fixed-equipment badge tints the icon to match).

## Icon → screen mapping

### Owner bottom nav (5 items max)
| Section | Phosphor name | Fill on active |
|---|---|---|
| Home / Dashboard | `house` | yes |
| Plan / Floorplan | `squares-four` | yes |
| Equipment | `package` | yes |
| Report / Rapport | `file-text` | yes |
| Marketplace | `storefront` | yes |

### Pro bottom nav (4 items)
| Section | Phosphor name |
|---|---|
| Dashboard | `chart-line` |
| Catalogue | `list-bullets` |
| Messages | `chat-circle-dots` |
| Vitrine | `storefront` |

### Other recurring icons
| Use | Phosphor name |
|---|---|
| Back | `caret-left` |
| Close | `x` |
| More menu | `dots-three` |
| Search | `magnifying-glass` |
| Filter | `funnel` |
| Add | `plus` |
| AI suggestion | `sparkle` |
| Verified pro | `seal-check` |
| Premium / locked | `crown` |
| Camera | `camera` |
| Document | `file` |
| Download | `download-simple` |
| Share | `share-network` |
| Edit | `pencil-simple` |
| Trash | `trash` |

### Room types (floorplan picker)
| Room | Phosphor name |
|---|---|
| Salon | `armchair` |
| Cuisine | `cooking-pot` |
| Chambre | `bed` |
| Salle de bain | `bathtub` |
| Bureau | `desk` |
| Couloir | `path` |
| Garage | `garage` |
| Terrasse | `tree-evergreen` |

## Fallback library

**Lucide** (`https://unpkg.com/lucide@latest`) — use only when Phosphor lacks a glyph. Note that Lucide is stroke-only at 2px; pair it with `stroke-width="1.5"` to match Phosphor's regular weight visually.

## Forbidden

- Emoji in product UI (😊, 🏠, …) — never.
- Unicode glyphs as icons (★, ♥, ✓) — use Phosphor equivalents (`star`, `heart`, `check`).
- Hand-rolled SVG one-offs — always pick the closest Phosphor glyph instead.
- PNG icons — vector only.
- Color baked into the SVG — icons inherit `currentColor`.

## Logo

The brand mark lives in `../assets/logo-mark.svg` (square, blue background) and `../assets/logo-lockup.svg` (mark + wordmark, horizontal). A dark-mode lockup is at `../assets/logo-lockup-dark.svg`.

> ⚠️ **Provisional logo**: this mark was generated against the brief — house silhouette + amber passport stamp. If the brand has an official mark, drop the SVGs here and update the existing files in place. The mark works at 24px minimum.
