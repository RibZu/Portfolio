import os
import requests
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

def process_and_save(url, out_path, target_width=800):
    print(f"Downloading {url}...")
    response = requests.get(url)
    response.raise_for_status()
    img = Image.open(BytesIO(response.content))
    
    # Resize
    w_percent = (target_width / float(img.size[0]))
    h_size = int((float(img.size[1]) * float(w_percent)))
    img = img.resize((target_width, h_size), Image.Resampling.LANCZOS)
    
    # Save as WebP
    img.save(out_path, 'WEBP')
    print(f"Saved {out_path}")

def create_placeholder(out_path, width=800, height=450):
    img = Image.new('RGB', (width, height), color='#1d2d3d')
    img.save(out_path, 'WEBP')
    print(f"Saved {out_path}")

def create_og_image(out_path, text):
    img = Image.new('RGB', (1200, 630), color='#1d2d3d')
    draw = ImageDraw.Draw(img)
    # Simple text (we don't have exact font, so we'll just try default or leave it basic)
    # Actually, social images can be very basic if we just use the palette.
    draw.rectangle([(50, 50), (1150, 580)], outline='#5980a6', width=10)
    img.save(out_path, 'PNG')
    print(f"Saved {out_path}")

def main():
    os.makedirs('public/img/projects', exist_ok=True)
    os.makedirs('public/og', exist_ok=True)
    
    urls = {
        'red-social-artesanos.webp': 'https://raw.githubusercontent.com/RibZu/RedSocialArtesanos/main/docs/screenshots/feed.png',
        'tyh-noticias.webp': 'https://raw.githubusercontent.com/RibZu/TyH-Noticias/main/docs/screenshots/01_home.png'
    }
    
    for filename, url in urls.items():
        process_and_save(url, os.path.join('public/img/projects', filename))
        
    create_placeholder('public/img/projects/placeholder.webp')
    create_og_image('public/og/og-es.png', 'Simón Riberi Zunino')
    create_og_image('public/og/og-en.png', 'Simón Riberi Zunino')

if __name__ == '__main__':
    main()
