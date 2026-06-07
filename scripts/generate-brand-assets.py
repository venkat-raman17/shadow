"""
Generate all Partwise brand image variants from a single source logo.

Source:  assets/partwise-logo-original.png  (1254x1254, opaque, dark panel + centered emblem)
Run:     python scripts/generate-brand-assets.py

Expo prebuild generates per-density variants from these canonical sources, so we only emit
the source sizes. Outputs (all under assets/images/):

  icon.png                     1024  base + iOS app icon (opaque, flattened)
  favicon.png                   256  web favicon (opaque, flattened)
  android-icon-foreground.png  1024  adaptive icon foreground (emblem, 66% safe zone)
  android-icon-monochrome.png  1024  Android 13+ themed icon (white S-divided disc, safe zone)
  splash-icon.png              1024  splash logo (emblem on transparent)
  notification-icon.png          96  Android notification icon (white S-divided disc)
  logo-mark.png                 512  in-app intro emblem (emblem on transparent)

The monochrome + notification marks are alpha-only silhouettes (Android tints them white and
ignores RGB), so the two-tone emblem is represented by a clean disc split by an S-curve — the
"two parts" idea, legible down to status-bar size.
"""
import math
import os

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "partwise-logo-original.png")
IMG = os.path.join(ROOT, "assets", "images")
DARK = (14, 13, 12)          # #0e0d0c app background
SS = 4                       # supersample factor for smooth edges

# Emblem geometry within the 1254x1254 source (measured from center scans).
CX, CY, R = 626, 625, 418


def load_src():
    return Image.open(SRC).convert("RGB")


def circle_mask(size):
    """Antialiased circular alpha mask, white inside."""
    big = Image.new("L", (size * SS, size * SS), 0)
    ImageDraw.Draw(big).ellipse([0, 0, size * SS - 1, size * SS - 1], fill=255)
    return big.resize((size, size), Image.LANCZOS)


def extract_emblem():
    """Crop the centered emblem and apply a circular alpha mask -> square RGBA."""
    src = load_src()
    crop = src.crop((CX - R, CY - R, CX + R, CY + R)).convert("RGBA")
    crop.putalpha(circle_mask(crop.size[0]))
    return crop


def place(emblem, canvas_size, diameter):
    """Center `emblem` (scaled to `diameter`) on a transparent square canvas."""
    e = emblem.resize((diameter, diameter), Image.LANCZOS)
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    off = (canvas_size - diameter) // 2
    canvas.alpha_composite(e, (off, off))
    return canvas


def flatten(size):
    """Resize source onto an opaque square (no alpha) for the iOS/base icon + favicon."""
    bg = Image.new("RGB", (size, size), DARK)
    bg.paste(load_src().resize((size, size), Image.LANCZOS), (0, 0))
    return bg


def divided_disc(diameter):
    """White disc split by a smooth S-curve -> RGBA (diameter x diameter), transparent outside."""
    s = diameter * SS
    circle = Image.new("L", (s, s), 0)
    ImageDraw.Draw(circle).ellipse([0, 0, s - 1, s - 1], fill=255)
    cx, top, bot, amp = s / 2, s * 0.034, s * 0.966, s * 0.146
    pts = []
    for i in range(121):
        t = i / 120.0
        pts.append((cx + amp * math.sin(2 * math.pi * t + 0.55), top + t * (bot - top)))
    line = Image.new("L", (s, s), 0)
    ImageDraw.Draw(line).line(pts, fill=255, width=int(s * 0.0205), joint="curve")
    line = line.filter(ImageFilter.GaussianBlur(s * 0.0024))
    line = ImageChops.multiply(line, circle)
    alpha = ImageChops.subtract(circle, line).resize((diameter, diameter), Image.LANCZOS)
    white = Image.new("RGBA", (diameter, diameter), (255, 255, 255, 255))
    white.putalpha(alpha)
    return white


def silhouette(canvas_size, diameter):
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    off = (canvas_size - diameter) // 2
    canvas.alpha_composite(divided_disc(diameter), (off, off))
    return canvas


def save(img, name):
    img.save(os.path.join(IMG, name))
    print(f"  {name:30s} {img.size[0]}x{img.size[1]} {img.mode}")


def main():
    print("Generating Partwise brand assets...")
    emblem = extract_emblem()
    save(flatten(1024), "icon.png")
    save(flatten(256), "favicon.png")
    save(place(emblem, 1024, 676), "android-icon-foreground.png")  # 66% adaptive safe zone
    save(place(emblem, 1024, 900), "splash-icon.png")
    save(place(emblem, 512, 480), "logo-mark.png")
    save(silhouette(1024, 676), "android-icon-monochrome.png")     # 66% safe zone
    save(silhouette(96, 72), "notification-icon.png")
    print("Done.")


if __name__ == "__main__":
    main()
