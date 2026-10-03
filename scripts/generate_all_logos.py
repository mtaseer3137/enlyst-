"""
Comprehensive Logo Generator for Enlyst according to Brand Guidelines 2025.
Outputs:
  - Vector SVGs with exact outlined paths and Bunny Font fallbacks
  - High-res raster PNGs (social profile, dark/light logos, favicon)
"""

import os
from PIL import Image, ImageDraw
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

TTF_PATH = os.path.join('assets', 'fonts', 'InstrumentSerif-Regular.ttf')
LOGO_DIR = os.path.join('assets', 'images', 'logo')
os.makedirs(LOGO_DIR, exist_ok=True)

def get_text_svg_path(ttf_path, text, font_size=36, letter_spacing=-1.2, x_offset=0, y_offset=0):
    font = TTFont(ttf_path)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font['hmtx']
    units_per_em = font['head'].unitsPerEm

    scale = font_size / units_per_em
    current_x = x_offset
    combined_path = []

    for char in text:
        glyph_name = cmap.get(ord(char))
        if not glyph_name:
            continue
        
        pen = SVGPathPen(glyph_set)
        t_pen = TransformPen(pen, (scale, 0, 0, -scale, current_x, y_offset))
        glyph = glyph_set[glyph_name]
        glyph.draw(t_pen)
        
        d = pen.getCommands()
        if d:
            combined_path.append(d)
        
        advance_width = hmtx[glyph_name][0] * scale
        current_x += advance_width + letter_spacing

    return " ".join(combined_path), current_x - x_offset

# Mark coordinates with x shifted by +10 to keep all coordinates >= 2:
# Stripe 1: (10, 4) L (50, 4) L (42, 18) L (2, 18) Z
# Stripe 2: (18, 22) L (58, 22) L (50, 36) L (10, 36) Z
# Stripe 3: (26, 40) L (66, 40) L (58, 54) L (18, 54) Z
def generate_svg_mark(color="#2D5BE3", opacity1=1.0, opacity2=0.58, opacity3=0.26, x_shift=10, y_shift=2):
    s1 = f"M{0+x_shift} {4+y_shift} L{40+x_shift} {4+y_shift} L{32+x_shift} {18+y_shift} L{-8+x_shift} {18+y_shift} Z"
    s2 = f"M{8+x_shift} {22+y_shift} L{48+x_shift} {22+y_shift} L{40+x_shift} {36+y_shift} L{0+x_shift} {36+y_shift} Z"
    s3 = f"M{16+x_shift} {40+y_shift} L{56+x_shift} {40+y_shift} L{48+x_shift} {54+y_shift} L{8+x_shift} {54+y_shift} Z"

    return f"""  <g id="enlyst-mark">
    <path d="{s1}" fill="{color}" fill-opacity="{opacity1}"/>
    <path d="{s2}" fill="{color}" fill-opacity="{opacity2}"/>
    <path d="{s3}" fill="{color}" fill-opacity="{opacity3}"/>
  </g>"""

def build_horizontal_logo(filename, text="enlyst", mark_color="#2D5BE3", text_color="#111111", bg_color=None, width=220, height=58):
    path_d, text_w = get_text_svg_path(TTF_PATH, text, font_size=38, letter_spacing=-1.2, x_offset=74, y_offset=40)
    bg_rect = f'<rect width="{width}" height="{height}" fill="{bg_color}"/>\n' if bg_color else ''

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" fill="none">
{bg_rect}{generate_svg_mark(color=mark_color)}
  <g id="enlyst-wordmark">
    <path d="{path_d}" fill="{text_color}"/>
  </g>
</svg>"""

    with open(os.path.join(LOGO_DIR, filename), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Created: {filename}")

def build_stacked_logo(filename, text="enlyst", mark_color="#2D5BE3", text_color="#111111", bg_color=None):
    width, height = 140, 110
    # Center mark: mark width is 64 (from x=2 to x=66). Centering in 140: offset x = (140 - 64)/2 + 8 = 46.
    mark_svg = generate_svg_mark(color=mark_color, x_shift=44, y_shift=2)
    path_d, text_w = get_text_svg_path(TTF_PATH, text, font_size=30, letter_spacing=-1.0, x_offset=0, y_offset=0)
    
    # Center text horizontally: x = (140 - text_w) / 2, y = 92
    text_x = round((width - text_w) / 2)
    path_d_centered, _ = get_text_svg_path(TTF_PATH, text, font_size=30, letter_spacing=-1.0, x_offset=text_x, y_offset=94)

    bg_rect = f'<rect width="{width}" height="{height}" fill="{bg_color}"/>\n' if bg_color else ''

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" fill="none">
{bg_rect}{mark_svg}
  <g id="enlyst-wordmark">
    <path d="{path_d_centered}" fill="{text_color}"/>
  </g>
</svg>"""

    with open(os.path.join(LOGO_DIR, filename), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Created: {filename}")

def build_icon_logo(filename, color="#2D5BE3", bg_color=None, padding=8):
    # Mark dimensions: width 64 (2 to 66), height 50 (6 to 56)
    w = 68 + padding * 2
    h = 58 + padding * 2
    bg_rect = f'<rect width="{w}" height="{h}" fill="{bg_color}"/>\n' if bg_color else ''

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" fill="none">
{bg_rect}{generate_svg_mark(color=color, x_shift=10+padding, y_shift=padding)}
</svg>"""

    with open(os.path.join(LOGO_DIR, filename), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Created: {filename}")

def build_favicon_svg(filename, color="#2D5BE3"):
    size = 64
    # Inside 64x64 rounded square (rx=14)
    # Scale down mark to fit nicely: scale ~ 0.65
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}" fill="none">
  <rect width="{size}" height="{size}" rx="14" fill="{color}"/>
  <g transform="translate(6, 6) scale(0.76)">
    <path d="M10 6 L50 6 L42 20 L2 20 Z" fill="#FFFFFF"/>
    <path d="M18 24 L58 24 L50 38 L10 38 Z" fill="#FFFFFF" fill-opacity="0.58"/>
    <path d="M26 42 L66 42 L58 56 L18 56 Z" fill="#FFFFFF" fill-opacity="0.26"/>
  </g>
</svg>"""

    with open(os.path.join(LOGO_DIR, filename), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Created: {filename}")

def build_social_avatar_svg(filename, color="#2D5BE3", bg="#111111"):
    size = 400
    # Scale up mark from 64x50 to ~220px width: scale = 3.2
    # Width = 64 * 3.2 = 205. Height = 50 * 3.2 = 160.
    # Center: x_offset = (400 - 205)/2 = 98. y_offset = (400 - 160)/2 = 120.
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}" fill="none">
  <rect width="{size}" height="{size}" rx="48" fill="{bg}"/>
  <g transform="translate(70, 115) scale(3.2)">
    <path d="M8 4 L48 4 L40 18 L0 18 Z" fill="{color}"/>
    <path d="M16 22 L56 22 L48 36 L8 36 Z" fill="{color}" fill-opacity="0.58"/>
    <path d="M24 40 L64 40 L56 54 L16 54 Z" fill="{color}" fill-opacity="0.26"/>
  </g>
</svg>"""

    with open(os.path.join(LOGO_DIR, filename), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Created: {filename}")

# Generate raster PNGs using Pillow
def render_png_assets():
    # 1. Favicon PNG 64x64
    fav_size = 64
    fav = Image.new("RGBA", (fav_size, fav_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(fav)
    # Rounded rect
    draw.rounded_rectangle([0, 0, fav_size-1, fav_size-1], radius=14, fill=(45, 91, 227, 255))
    
    # 3 stripes in white with opacities
    # Scale:
    def draw_stripe(pts, opacity):
        col = (255, 255, 255, int(255 * opacity))
        draw.polygon(pts, fill=col)

    # Coords scaled for 64x64:
    draw_stripe([(14, 11), (44, 11), (38, 22), (8, 22)], 1.0)
    draw_stripe([(20, 25), (50, 25), (44, 36), (14, 36)], 0.58)
    draw_stripe([(26, 39), (56, 39), (50, 50), (20, 50)], 0.26)

    fav.save(os.path.join(LOGO_DIR, 'enlyst-favicon.png'))
    fav.save('favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("Created: enlyst-favicon.png and favicon.ico")

    # 2. Social Avatar 400x400 PNG
    soc_size = 400
    soc = Image.new("RGBA", (soc_size, soc_size), (17, 17, 17, 255))
    draw_soc = ImageDraw.Draw(soc)
    draw_soc.rounded_rectangle([0, 0, soc_size-1, soc_size-1], radius=48, fill=(17, 17, 17, 255))

    # Scale 5.5x
    ox, oy = 80, 100
    def draw_soc_stripe(pts, opacity):
        col = (45, 91, 227, int(255 * opacity))
        draw_soc.polygon(pts, fill=col)

    draw_soc_stripe([(ox+30, oy+15), (ox+190, oy+15), (ox+150, oy+68), (ox-10, oy+68)], 1.0)
    draw_soc_stripe([(ox+65, oy+82), (ox+225, oy+82), (ox+185, oy+135), (ox+25, oy+135)], 0.58)
    draw_soc_stripe([(ox+100, oy+149), (ox+260, oy+149), (ox+220, oy+202), (ox+60, oy+202)], 0.26)

    soc.save(os.path.join(LOGO_DIR, 'enlyst-social-400x400.png'))
    print("Created: enlyst-social-400x400.png")

if __name__ == '__main__':
    # 1. Enlyst Parent
    build_horizontal_logo('enlyst-primary-light.svg', 'enlyst', mark_color="#2D5BE3", text_color="#111111", width=200, height=56)
    build_horizontal_logo('enlyst-primary-dark.svg', 'enlyst', mark_color="#2D5BE3", text_color="#FFFFFF", width=200, height=56)
    build_horizontal_logo('enlyst-primary-brand.svg', 'enlyst', mark_color="#FFFFFF", text_color="#FFFFFF", bg_color="#2D5BE3", width=200, height=56)
    build_stacked_logo('enlyst-stacked-light.svg', 'enlyst', mark_color="#2D5BE3", text_color="#111111")
    build_stacked_logo('enlyst-stacked-dark.svg', 'enlyst', mark_color="#2D5BE3", text_color="#FFFFFF")
    build_icon_logo('enlyst-icon-color.svg', color="#2D5BE3")
    build_icon_logo('enlyst-icon-white.svg', color="#FFFFFF")
    build_icon_logo('enlyst-icon-mono-black.svg', color="#111111")
    build_favicon_svg('enlyst-favicon.svg', color="#2D5BE3")
    build_social_avatar_svg('enlyst-social-400x400.svg', color="#2D5BE3", bg="#111111")

    # 2. Enlysum (Finance & Accounting - #1A7A4A)
    build_horizontal_logo('enlysum-primary-light.svg', 'enlysum', mark_color="#1A7A4A", text_color="#111111", width=215, height=56)
    build_horizontal_logo('enlysum-primary-dark.svg', 'enlysum', mark_color="#1A7A4A", text_color="#FFFFFF", width=215, height=56)

    # 3. Enlybiz (Marketing & Growth - #C4620A)
    build_horizontal_logo('enlybiz-primary-light.svg', 'enlybiz', mark_color="#C4620A", text_color="#111111", width=210, height=56)
    build_horizontal_logo('enlybiz-primary-dark.svg', 'enlybiz', mark_color="#C4620A", text_color="#FFFFFF", width=210, height=56)

    # 4. Enlysoft (Cloud & Tech - #6B3FA0, DM Mono font)
    def build_enlysoft_svg(filename, text_color="#E2E8F0", bg_color=None):
        width, height = 220, 56
        bg = f'<rect width="{width}" height="{height}" fill="{bg_color}"/>\n' if bg_color else ''
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" fill="none">
  <defs>
    <style>
      @import url('https://fonts.bunny.net/css?family=dm-mono:400,500');
      .mono-text {{ font-family: 'DM Mono', monospace; font-size: 24px; font-weight: 400; }}
    </style>
  </defs>
{bg}{generate_svg_mark(color="#6B3FA0")}
  <text x="74" y="37" fill="{text_color}" class="mono-text">enlysoft</text>
</svg>"""
        with open(os.path.join(LOGO_DIR, filename), 'w', encoding='utf-8') as f:
            f.write(svg)
        print(f"Created: {filename}")

    build_enlysoft_svg('enlysoft-primary-dark.svg', text_color="#E2E8F0")
    build_enlysoft_svg('enlysoft-primary-light.svg', text_color="#1A1A1A")

    # Raster outputs
    render_png_assets()
    print("All logos built successfully!")
