"""
Generate every Partwise brand image asset from two refined source images.

Sources (assets/brand/):
  app-icon-source.png  1254^2 opaque — beveled figure on a dark panel over black;
                       the launcher / home-screen icon, "with effect".
  logo-source.png      1254^2 opaque — figure on a dark rounded panel over white;
                       the in-app logo (splash + onboarding welcome mark).

Run:  pnpm generate:brand        (-> python scripts/generate-brand-assets.py)
      python scripts/generate-brand-assets.py --preview   (also dumps previews)

Outputs (all under assets/images/) — exactly the set app.json references:

  icon.png                    1024 opaque  iOS / base launcher icon       <- app-icon-source
  favicon.png                  256 opaque  web favicon                    <- app-icon-source
  android-icon-foreground.png 1024 RGBA    adaptive icon foreground       <- logo emblem
  splash-icon.png             1024 RGBA    splash logo                    <- logo emblem
  logo-mark.png                512 RGBA    in-app onboarding mark          <- logo emblem
  android-icon-monochrome.png 1024 RGBA    Android 13+ themed (white)     <- logo emblem, filled
  notification-icon.png         96 RGBA    status-bar notification (white) <- logo emblem, filled

The emblem is lifted from logo-source by keying out its near-uniform dark panel
(a luminance gate) and its white field (a per-channel-min gate), eroding the
panel edge so the rounded-tile boundary leaves no halo, then trimming and
recentring so the sage/warm figure floats on transparency over any background.
"""
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRAND = os.path.join(ROOT, "assets", "brand")
IMG = os.path.join(ROOT, "assets", "images")
APP_ICON_SRC = os.path.join(BRAND, "app-icon-source.png")
LOGO_SRC = os.path.join(BRAND, "logo-source.png")
PREVIEW_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_preview")

DARK = (14, 13, 12)          # #0e0d0c — app + splash background
PAPER = (245, 241, 234)      # #f5f1ea — a warm/light theme background (preview only)

# --- emblem keying tunables (logo-source, 1254^2) -------------------------
WHITE_MIN = 205   # a pixel whose min channel exceeds this is the white field
ERODE = 19        # MinFilter window: erode the panel mask to drop edge AA (~9px)
LUM_LO = 52       # luminance at/below this is the dark panel -> transparent
LUM_HI = 122      # luminance at/above this is solid figure -> opaque


def emblem_rgba(logo):
    """Lift the figure from logo-source as an RGBA cutout, trimmed to its bbox."""
    rgb = logo.convert("RGB")
    r, g, b = rgb.split()
    arr = np.asarray(rgb).astype(np.int16)
    mn = arr.min(axis=2)                              # per-pixel min channel
    notwhite = Image.fromarray(((mn <= WHITE_MIN) * 255).astype(np.uint8), "L")
    notwhite = notwhite.filter(ImageFilter.MinFilter(ERODE))   # erode the panel edge
    lum = rgb.convert("L")
    bright = lum.point(
        lambda v: 0 if v <= LUM_LO else (255 if v >= LUM_HI else int((v - LUM_LO) * 255 / (LUM_HI - LUM_LO)))
    )
    alpha = np.minimum(np.asarray(notwhite), np.asarray(bright)).astype(np.uint8)
    out = rgb.convert("RGBA")
    out.putalpha(Image.fromarray(alpha, "L"))
    return out.crop(out.getchannel("A").getbbox())


def fill_holes(mask):
    """Solid-fill the figure: flood the exterior of `mask`, keep the rest filled."""
    a = np.asarray(mask.point(lambda v: 255 if v > 64 else 0).convert("L"))
    filled = Image.new("L", (mask.width + 2, mask.height + 2), 0)
    filled.paste(Image.fromarray(a, "L"), (1, 1))
    # Flood the border (exterior background) with grey; whatever stays black is enclosed.
    ImageDraw.floodfill(filled, (0, 0), 128, thresh=0)
    f = np.asarray(filled)[1:-1, 1:-1]
    solid = ((a > 0) | (f == 0)).astype(np.uint8) * 255   # original strokes OR enclosed holes
    return Image.fromarray(solid, "L")


def place(emblem, canvas_size, diameter):
    """Scale `emblem` so its longer side == diameter, centre on a transparent square."""
    scale = diameter / max(emblem.size)
    w, h = round(emblem.size[0] * scale), round(emblem.size[1] * scale)
    e = emblem.resize((w, h), Image.LANCZOS)
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    canvas.alpha_composite(e, ((canvas_size - w) // 2, (canvas_size - h) // 2))
    return canvas


def whiten(emblem, canvas_size, diameter):
    """A solid white silhouette of the emblem (Android tints the alpha; RGB ignored)."""
    solid = fill_holes(emblem.getchannel("A"))
    white = Image.new("RGBA", solid.size, (255, 255, 255, 0))
    white.putalpha(solid)
    white = white.crop(white.getchannel("A").getbbox())
    return place(white, canvas_size, diameter)


def flatten(src, size):
    """Opaque square (no alpha) for the iOS/base icon + favicon."""
    bg = Image.new("RGB", (size, size), DARK)
    bg.paste(src.convert("RGB").resize((size, size), Image.LANCZOS), (0, 0))
    return bg


def save(img, name):
    img.save(os.path.join(IMG, name))
    print(f"  {name:30s} {img.size[0]}x{img.size[1]} {img.mode}")


def preview(emblem):
    os.makedirs(PREVIEW_DIR, exist_ok=True)
    for bg, tag in ((DARK, "dark"), (PAPER, "paper")):
        c = Image.new("RGB", (520, 520), bg)
        e = place(emblem, 520, 440).convert("RGBA")
        c.paste(e, (0, 0), e)
        c.save(os.path.join(PREVIEW_DIR, f"emblem-on-{tag}.png"))
    mono = whiten(emblem, 256, 220)
    chk = Image.new("RGB", (256, 256), (90, 90, 90))
    chk.paste(mono, (0, 0), mono)
    chk.save(os.path.join(PREVIEW_DIR, "monochrome-on-grey.png"))
    print(f"  previews -> {PREVIEW_DIR}")


def main():
    do_preview = "--preview" in sys.argv
    print("Generating Partwise brand assets...")
    app_icon = Image.open(APP_ICON_SRC)
    logo = Image.open(LOGO_SRC)
    emblem = emblem_rgba(logo)
    print(f"  emblem cut: {emblem.size[0]}x{emblem.size[1]} (from {logo.size[0]}x{logo.size[1]} logo)")

    # Launcher icon + favicon: the designed tile, opaque.
    save(flatten(app_icon, 1024), "icon.png")
    save(flatten(app_icon, 256), "favicon.png")

    # In-app + adaptive: the figure emblem on transparency.
    save(place(emblem, 1024, 614), "android-icon-foreground.png")   # within Android 66% safe zone
    save(place(emblem, 1024, 820), "splash-icon.png")
    save(place(emblem, 512, 440), "logo-mark.png")

    # Alpha-only white marks (Android tints them).
    save(whiten(emblem, 1024, 614), "android-icon-monochrome.png")
    save(whiten(emblem, 96, 60), "notification-icon.png")

    if do_preview:
        preview(emblem)
    print("Done.")


if __name__ == "__main__":
    main()
