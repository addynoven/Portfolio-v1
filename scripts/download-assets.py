import requests
import os

url_glb = "https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/demo/Components/Lanyard/card.glb"
url_png = "https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/demo/Components/Lanyard/lanyard.png"

target_dir = "/home/neon/programs/web_dev/Portfolio-v1/components/reactbits/Components"

def download_file(url, filename, is_binary=True):
    path = os.path.join(target_dir, filename)
    print(f"Downloading {filename}...")
    try:
        r = requests.get(url, stream=True)
        if r.status_code == 200:
            with open(path, 'wb' if is_binary else 'w') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"✓ Saved {filename}")
            
            # Verify magic bytes
            with open(path, 'rb') as f:
                header = f.read(4)
                if filename.endswith('.glb'):
                    if header == b'glTF':
                        print("  ✓ Magic bytes confirmed: glTF")
                    else:
                        print(f"  ❌ Invalid magic bytes: {header}")
                elif filename.endswith('.png'):
                    if header.startswith(b'\x89PNG'):
                        print("  ✓ Magic bytes confirmed: PNG")
                    else:
                        print(f"  ❌ Invalid magic bytes: {header}")
        else:
            print(f"❌ Failed to download {filename}: Status {r.status_code}")
    except Exception as e:
        print(f"❌ Error downloading {filename}: {e}")

# Generate fallback PNG if download fails
def generate_fallback_png():
    path = os.path.join(target_dir, "lanyard.png")
    # minimal 1x1 white pixel png
    data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\x0bIDAT\x08\xd7c\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xdc\xccY\xe7\x00\x00\x00\x00IEND\xaeB`\x82'
    with open(path, 'wb') as f:
        f.write(data)
    print("✓ Generated fallback lanyard.png")

download_file(url_glb, "card.glb")
download_file(url_png, "lanyard.png")

if not os.path.exists(os.path.join(target_dir, "lanyard.png")):
    generate_fallback_png()
