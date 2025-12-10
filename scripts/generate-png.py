import os

target_dir = "/home/neon/programs/web_dev/Portfolio-v1/components/reactbits/Components"

def generate_fallback_png():
    path = os.path.join(target_dir, "lanyard.png")
    # minimal 10x10 white pixel png pattern
    # This is a valid 1x1 white pixel, repeated
    data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\x0bIDAT\x08\xd7c\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xdc\xccY\xe7\x00\x00\x00\x00IEND\xaeB`\x82'
    with open(path, 'wb') as f:
        f.write(data)
    print("✓ Generated fallback lanyard.png")

generate_fallback_png()
