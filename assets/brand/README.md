# Brand assets

Every Partwise icon/logo asset is generated from the two source images in this
folder, so the launcher icon and the in-app logo always stay in sync.

| Source | What it is | Feeds |
|---|---|---|
| `app-icon-source.png` | The beveled figure on a dark panel over black — the home-screen icon "with effect" | `icon.png`, `favicon.png` |
| `logo-source.png` | The figure on a dark rounded panel over white — the in-app logo | splash, onboarding, adaptive foreground, monochrome, notification |

## Regenerate

```
pnpm generate:brand        # → python scripts/generate-brand-assets.py
```

This (over)writes the full set under `assets/images/` — the exact files
`app.json` references:

| Output | Size | Use | From |
|---|---|---|---|
| `icon.png` | 1024² opaque | iOS / base launcher icon | app-icon-source |
| `favicon.png` | 256² opaque | web favicon | app-icon-source |
| `android-icon-foreground.png` | 1024² RGBA | Android adaptive foreground (66% safe zone) | logo emblem |
| `splash-icon.png` | 1024² RGBA | splash screen | logo emblem |
| `logo-mark.png` | 512² RGBA | onboarding welcome mark | logo emblem |
| `android-icon-monochrome.png` | 1024² RGBA | Android 13+ themed icon (white) | logo emblem, filled |
| `notification-icon.png` | 96² RGBA | status-bar notification (white) | logo emblem, filled |

The emblem is lifted from `logo-source.png` by keying out its dark panel and
white field (see the script header for the tunables), so the sage/warm figure
floats on transparency over any background — dark splash, themed onboarding, or
the Android adaptive layer. The two white marks are the same emblem, hole-filled
and whitened (Android tints the alpha and ignores RGB).

Pass `--preview` to also dump the emblem over dark/light backgrounds and the
monochrome silhouette into `scripts/_preview/` for a quick legibility check.

## Replacing the logo

Drop a new 1254² (or larger) square PNG over the matching source file and rerun
`pnpm generate:brand`. The launcher icon may be opaque edge-to-edge; the logo
source should keep the figure on a near-uniform dark field (the keyer relies on
the figure being the lightest thing inside the panel).
