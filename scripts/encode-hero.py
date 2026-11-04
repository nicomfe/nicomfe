"""Pack the rendered PNG frames into a looping transparent GIF."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
FRAME_DIR = Path("/tmp/hero-frames")
OUT = ROOT / "assets" / "hero.gif"


def load_frames():
    paths = sorted(FRAME_DIR.glob("frame_*.png"))
    if not paths:
        raise SystemExit(f"No frames in {FRAME_DIR}. Run scripts/render-hero.mjs first.")
    return [Image.open(path).convert("RGBA") for path in paths]


def flatten(im):
    alpha = im.getchannel("A")
    mask = alpha.point(lambda a: 255 if a >= 128 else 0)
    flat = Image.new("RGB", im.size, (255, 255, 255))
    flat.paste(im.convert("RGB"), mask=mask)
    return flat, mask


def main():
    frames = load_frames()
    flats = []
    masks = []
    for im in frames:
        flat, mask = flatten(im)
        flats.append(flat)
        masks.append(mask)

    sample_indexes = [0, 10, 24, 70, 110, 150, len(frames) - 1]
    sample = Image.new("RGB", (flats[0].width, flats[0].height * len(sample_indexes)))
    for row, index in enumerate(sample_indexes):
        sample.paste(flats[index], (0, row * flats[0].height))

    palette_image = sample.quantize(
        colors=254,
        method=Image.Quantize.MEDIANCUT,
        dither=Image.Dither.NONE,
    )
    palette = palette_image.getpalette()[: 256 * 3]
    palette += [0] * (256 * 3 - len(palette))

    quantized = []
    for flat, mask in zip(flats, masks):
        frame = flat.quantize(palette=palette_image, dither=Image.Dither.NONE)
        frame.putpalette(palette)
        transparent = mask.point(lambda a: 0 if a else 255)
        frame.paste(255, mask=transparent)
        quantized.append(frame)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    quantized[0].save(
        OUT,
        save_all=True,
        append_images=quantized[1:],
        duration=70,
        loop=0,
        disposal=2,
        transparency=255,
        optimize=False,
    )
    print(f"wrote {OUT} ({len(quantized)} frames)")


if __name__ == "__main__":
    main()
