# Brand assets

Every Partwise icon/logo asset is generated from the single source image in this
folder, so the launcher icon and the in-app logo always stay in sync.

| Source | What it is | Feeds |
|---|---|---|
| `icon-source.png` | The figure on a dark rounded panel over black — the canonical home-screen icon | everything below |

The opaque tile feeds `icon.png` + `favicon.png` and the two iOS 18 appearance
variants directly; its sage/warm figure is keyed out to a transparent emblem for
splash, onboarding, adaptive foreground, monochrome, and notification.

## Regenerate

```
pnpm generate:brand        # → python scripts/generate-brand-assets.py
```

This (over)writes the full set under `assets/images/` — the exact files
`app.json` references:

| Output | Size | Use | From |
|---|---|---|---|
| `icon.png` | 1024² opaque | iOS light + base launcher icon | icon-source |
| `icon-dark.png` | 1024² opaque | iOS 18 dark appearance (panel → black) | icon-source |
| `icon-tinted.png` | 1024² opaque | iOS 18 tinted appearance (grayscale, system-tinted) | icon-source |
| `favicon.png` | 256² opaque | web favicon | icon-source |
| `android-icon-foreground.png` | 1024² RGBA | Android adaptive foreground (66% safe zone) | keyed emblem |
| `splash-icon.png` | 1024² RGBA | splash screen | keyed emblem |
| `logo-mark.png` | 512² RGBA | onboarding welcome mark | keyed emblem |
| `android-icon-monochrome.png` | 1024² RGBA | Android 13+ themed icon (white) | keyed emblem, filled |
| `notification-icon.png` | 96² RGBA | status-bar notification (white) | keyed emblem, filled |

The emblem is lifted from `icon-source.png` by keying out its dark panel and any
white field (see the script header for the tunables), so the sage/warm figure
floats on transparency over any background — dark splash, themed onboarding, or
the Android adaptive layer. The two white marks are the same emblem, hole-filled
and whitened (Android tints the alpha and ignores RGB).

`icon-dark.png` and `icon-tinted.png` are the iOS 18 appearance variants, wired
under `ios.icon` in `app.json` (`light`/`dark`/`tinted`); iOS shows them in dark
mode and when the user tints their home screen. The dark one keeps the full
figure on true black; the tinted one is a contrast-stretched grayscale mask iOS
recolours.

Pass `--preview` to also dump the emblem over dark/light backgrounds and the
monochrome silhouette into `scripts/_preview/` for a quick legibility check.

## Replacing the icon

Drop a new 1254² (or larger) square PNG over `icon-source.png` and rerun
`pnpm generate:brand`. Keep the figure on a near-uniform dark field — the keyer
relies on the figure being the lightest thing inside the panel.
