"""
Build complete vector and raster logo suite for Enlyst according to official Brand Guidelines 2025.
"""

import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

def get_text_svg_path(ttf_path, text, font_size=36, letter_spacing=-1.2):
    font = TTFont(ttf_path)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font['hmtx']
    units_per_em = font['head'].unitsPerEm

    scale = font_size / units_per_em
    # SVG coordinates have y pointing downwards, font coordinates have y pointing upwards.
    # We flip y and offset.
    
    current_x = 0.0
    combined_path = []

    for char in text:
        glyph_name = cmap.get(ord(char))
        if not glyph_name:
            continue
        
        pen = SVGPathPen(glyph_set)
        # Transform: scale x by scale, scale y by -scale, translate
        t_pen = TransformPen(pen, (scale, 0, 0, -scale, current_x, 0))
        glyph = glyph_set[glyph_name]
        glyph.draw(t_pen)
        
        d = pen.getCommands()
        if d:
            combined_path.append(d)
        
        advance_width = hmtx[glyph_name][0] * scale
        current_x += advance_width + letter_spacing

    return " ".join(combined_path), current_x

if __name__ == '__main__':
    ttf_path = os.path.join('assets', 'fonts', 'InstrumentSerif-Regular.ttf')
    d, width = get_text_svg_path(ttf_path, 'enlyst', font_size=36, letter_spacing=-1.2)
    print(f"Generated SVG path length: {len(d)}, total text width: {width:.2f}px")
