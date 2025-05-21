from PIL import Image

def remove_background_with_tolerance(image_path, output_path, tolerance=10):
    img = Image.open(image_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size

    # Sample background from top-left pixel
    bg_r, bg_g, bg_b, _ = pixels[0, 0]

    def is_close(c1, c2, tol):
        return all(abs(a - b) <= tol for a, b in zip(c1, c2))

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_close((r, g, b), (bg_r, bg_g, bg_b), tolerance):
                pixels[x, y] = (0, 0, 0, 0)

    img.save(output_path)

# Run it
remove_background_with_tolerance("ukubona-dark.png", "ukubona-dark-transparent.png", tolerance=16)
