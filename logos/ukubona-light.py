# Load the image again
img = Image.open("/mnt/data/ukubona-dark.png").convert("RGBA")

# We'll replace all non-transparent, non-background pixels with pure black
new_data = []
for item in img.getdata():
    r, g, b, a = item
    if r < 40 and g < 40 and b < 40:  # Background threshold
        new_data.append((0, 0, 0, 0))  # Make transparent
    elif a > 0:
        new_data.append((0, 0, 0, 255))  # Pure black
    else:
        new_data.append((0, 0, 0, 0))  # Keep transparent

# Update image with clean black logo on transparent background
img.putdata(new_data)
final_output_path = "/mnt/data/ukubona-dark-pureblack.png"
img.save(final_output_path, "PNG")

final_output_path
