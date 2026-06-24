# Fonts

## Display — Changa One
`fonts/ChangaOne-Regular.ttf` (+ Italic)
Used for **gros titres** : the hero patrimony value on the dashboard, large titles, section starters, marketing display. Heavy condensed sans-serif with personality — pairs the trust of the blue with a confident, almost editorial voice.

```css
font-family: 'Changa One', 'Plus Jakarta Sans', system-ui, sans-serif;
```

Use at sizes ≥ 20px. Below that the closed counters muddle.

## Body & subtitles — Plus Jakarta Sans
`fonts/PlusJakartaSans-VariableFont_wght.ttf` (200→800) + matching italic axis.
Used for **everything else** : body copy, list items, labels, buttons, navigation. Geometric humanist with a generous x-height — readable down to 11px on mobile.

```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
font-variation-settings: 'wght' 500;
```

## Loading

Wired via `@font-face` at the top of `../colors_and_type.css` — already pointed at the TTF files in this folder. No CDN dependency, no Google Fonts request. Both faces are `font-display: swap` so the system fallback shows immediately while the brand face loads.

## File map

| File | Family | Style | Axis / weight |
|---|---|---|---|
| `PlusJakartaSans-VariableFont_wght.ttf` | Plus Jakarta Sans | Roman | wght 200 → 800 |
| `PlusJakartaSans-Italic-VariableFont_wght.ttf` | Plus Jakarta Sans | Italic | wght 200 → 800 |
| `ChangaOne-Regular.ttf` | Changa One | Roman | 400 |
| `ChangaOne-Italic.ttf` | Changa One | Italic | 400 |
