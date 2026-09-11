"""
Authentic Royal Diploma & Certificate of Useless Scientific Achievement
Department of Absolutely Unnecessary Research — Kerala Division
Generates an ultra-luxurious, prestigious, classical university diploma using high-res engraved templates,
real fountain pen signatures (including Mandi Masala), 3D embossed gold seal, and official stamps.
"""

import math
import os
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

FONTS_DIR = os.path.join(os.path.dirname(__file__), "fonts")
ASSETS_DIR = os.path.join(os.path.dirname(__file__), "assets")


def _load_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    """Load a TTF font or fallback cleanly."""
    path = os.path.join(FONTS_DIR, name)
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def _paste_signature_with_alpha(
    base_img: Image.Image,
    sig_filename: str,
    target_box: tuple[int, int, int, int],
):
    """
    Load signature JPG, isolate dark ink as alpha, auto-crop whitespace,
    scale proportionally to fit inside target_box (x, y, max_w, max_h), and paste cleanly.
    """
    sig_path = os.path.join(ASSETS_DIR, sig_filename)
    if not os.path.exists(sig_path):
        return

    try:
        sig = Image.open(sig_path).convert("RGBA")
        gray = sig.convert("L")

        inv = ImageOps.invert(gray)
        bbox = inv.point(lambda p: 255 if p > 35 else 0).getbbox()
        if bbox:
            sig = sig.crop(bbox)
            gray = gray.crop(bbox)

        alpha = ImageOps.invert(gray).point(lambda p: min(255, int(p * 2.8)))
        sig.putalpha(alpha)

        x, y, max_w, max_h = target_box
        sig.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)

        px = x + (max_w - sig.width) // 2
        py = y + (max_h - sig.height) // 2

        base_img.paste(sig, (px, py), sig)
    except Exception as e:
        print(f"Error pasting signature {sig_filename}:", e)


def _draw_rubber_stamp(angle_deg: int = -6) -> Image.Image:
    """Draw an authentic distressed crimson rubber stamp."""
    stamp_w, stamp_h = 260, 78
    stamp_img = Image.new("RGBA", (stamp_w, stamp_h), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(stamp_img)

    red = "#B91C1C"
    sdraw.rectangle([3, 3, stamp_w - 3, stamp_h - 3], outline=red, width=3)
    sdraw.rectangle([7, 7, stamp_w - 7, stamp_h - 7], outline=red, width=1)

    f_large = _load_font("PlayfairDisplay.ttf", 18)
    f_small = _load_font("Inter.ttf", 10)

    t1 = "* 100% CERTIFIED POINTLESS *"
    b1 = sdraw.textbbox((0, 0), t1, font=f_large)
    sdraw.text(((stamp_w - (b1[2] - b1[0])) // 2, 14), t1, font=f_large, fill=red)

    t2 = "GOVERNMENT OF FUTILITY // NO UTILITY"
    b2 = sdraw.textbbox((0, 0), t2, font=f_small)
    sdraw.text(((stamp_w - (b2[2] - b2[0])) // 2, 44), t2, font=f_small, fill=red)

    return stamp_img.rotate(angle_deg, resample=Image.BICUBIC, expand=True)


def _paste_gold_seal(img: Image.Image, x: int, y: int, size: int = 145):
    """Paste the 3D embossed metallic gold seal with crimson ribbon tails cleanly."""
    seal_path = os.path.join(ASSETS_DIR, "gold_seal.jpg")
    if not os.path.exists(seal_path):
        return
    try:
        seal = Image.open(seal_path).convert("RGBA")
        gray = seal.convert("L")
        alpha = gray.point(lambda p: 0 if p > 248 else (255 if p < 235 else int((248 - p) * 255 / 13)))
        seal.putalpha(alpha)
        seal.thumbnail((size, size), Image.Resampling.LANCZOS)
        img.paste(seal, (x, y), seal)
    except Exception as e:
        print("Error pasting gold seal:", e)


def generate_certificate(
    submission_id: str,
    leg_count: int,
    timestamp: str,
    annotated_image_path: str | None = None,
    recipient_name: str | None = None,
) -> BytesIO:
    """
    Generate an authentic, prestigious, royal university diploma of useless scientific achievement.
    Zero box collisions, mathematically budgeted vertical spacing, full-bleed parchment.
    """
    WIDTH = 1800
    HEIGHT = 1200
    CENTER_X = WIDTH // 2

    # Load high-res baroque diploma base template if available, otherwise create canvas
    base_template_path = os.path.join(ASSETS_DIR, "diploma_base.jpg")
    if os.path.exists(base_template_path):
        base_img = Image.open(base_template_path).convert("RGBA")
        img = base_img.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    else:
        img = Image.new("RGBA", (WIDTH, HEIGHT), "#FAF8F2")

    draw = ImageDraw.Draw(img)

    # Color Palette for Authentic Royal Diploma
    c_gold_dark = "#785610"
    c_gold_bright = "#B8860B"
    c_navy = "#0F172A"
    c_charcoal = "#1E293B"
    c_crimson = "#881337"
    c_muted = "#64748B"

    # Clean date formatting (e.g. 11 SEPTEMBER 2026)
    try:
        dt = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
        date_formatted = dt.strftime("%d %B %Y").upper()
    except Exception:
        date_formatted = timestamp[:10] if len(timestamp) >= 10 else timestamp

    candidate = (recipient_name.strip() if recipient_name and recipient_name.strip() else "DR. CHIEF ARTHROPOD RESEARCHER").upper()

    # Fonts
    f_inst = _load_font("PlayfairDisplay.ttf", 24)
    f_inst_sub = _load_font("Inter.ttf", 11)
    f_mal_top = _load_font("NotoSansMalayalam.ttf", 17)
    f_mal_leg = _load_font("NotoSansMalayalam.ttf", 13)
    f_title = _load_font("PlayfairDisplay.ttf", 40)
    f_degree = _load_font("PlayfairDisplay.ttf", 19)
    f_conf = _load_font("Inter.ttf", 11)
    f_name = _load_font("PlayfairDisplay.ttf", 26)
    f_body = _load_font("PlayfairDisplay.ttf", 15)
    f_intro = _load_font("Inter.ttf", 11.5)
    f_tally_num = _load_font("PlayfairDisplay.ttf", 72)
    f_tally_lbl = _load_font("PlayfairDisplay.ttf", 17)
    f_mono = _load_font("Inter.ttf", 10.5)
    f_sig_name = _load_font("Inter.ttf", 13)
    f_sig_title = _load_font("Inter.ttf", 10.5)

    # 1. Institutional Header below Royal Crest (y = 308)
    y = 308
    t_inst = "DEPARTMENT OF ABSOLUTELY UNNECESSARY RESEARCH"
    b = draw.textbbox((0, 0), t_inst, font=f_inst)
    draw.text((CENTER_X - (b[2] - b[0]) // 2, y), t_inst, font=f_inst, fill=c_gold_dark)

    y += 30
    t_sub = "STATE ACADEMY OF UNWARRANTED PODIATRIC ENUMERATION • KERALA REPROBATE COUNCIL"
    b = draw.textbbox((0, 0), t_sub, font=f_inst_sub)
    draw.text((CENTER_X - (b[2] - b[0]) // 2, y), t_sub, font=f_inst_sub, fill=c_muted)

    y += 22
    t_mal = "തേരട്ടയുടെ കാൽ എണ്ണൽ ഔദ്യോഗിക ഡിപ്ലോമ"
    b = draw.textbbox((0, 0), t_mal, font=f_mal_top)
    draw.text((CENTER_X - (b[2] - b[0]) // 2, y), t_mal, font=f_mal_top, fill=c_gold_bright)

    # Divider
    y += 28
    draw.line([(380, y), (WIDTH - 380, y)], fill=c_gold_bright, width=2)
    draw.line([(480, y + 2), (WIDTH - 480, y + 2)], fill=c_gold_dark, width=1)
    draw.ellipse([CENTER_X - 5, y - 4, CENTER_X + 5, y + 6], fill="#D4AF37", outline=c_gold_dark)

    # 2. Main Title (y = 404)
    y += 16
    t_title = "CERTIFICATE OF USELESS SCIENTIFIC ACHIEVEMENT"
    b = draw.textbbox((0, 0), t_title, font=f_title)
    draw.text((CENTER_X - (b[2] - b[0]) // 2, y), t_title, font=f_title, fill=c_navy)

    y += 46
    t_deg = "• HONORARY DOCTORATE IN CENTIPEDE PODIATRY (HONORIS CAUSA) •"
    b = draw.textbbox((0, 0), t_deg, font=f_degree)
    draw.text((CENTER_X - (b[2] - b[0]) // 2, y), t_deg, font=f_degree, fill=c_crimson)

    # 3. Recipient Name Block
    y += 34
    t_conf = "THIS CHARTER IS FORMALLY CONFERRED UPON"
    b = draw.textbbox((0, 0), t_conf, font=f_conf)
    draw.text((CENTER_X - (b[2] - b[0]) // 2, y), t_conf, font=f_conf, fill=c_gold_dark)

    y += 18
    b = draw.textbbox((0, 0), candidate, font=f_name)
    nw = b[2] - b[0]
    nx = CENTER_X - nw // 2
    draw.text((nx, y), candidate, font=f_name, fill=c_navy)
    draw.line([(nx - 20, y + 32), (nx + nw + 20, y + 32)], fill=c_gold_dark, width=1)

    # 4. Citation Text
    y += 42
    citation = [
        "By solemn decree of the Faculty of Futile Endeavours, attesting that through extraordinary perseverance,",
        "questionable life choices, and complete refusal of productive economic labor, the candidate subjected a",
        "verified specimen of Chilopoda (Centipede) to sub-millimeter computer vision interrogation, ratifying the tally of:",
    ]
    for line in citation:
        b = draw.textbbox((0, 0), line, font=f_body)
        draw.text((CENTER_X - (b[2] - b[0]) // 2, y), line, font=f_body, fill=c_charcoal)
        y += 19

    # 5. Centerpiece Zone
    zone_y = y + 10
    has_sp = annotated_image_path and os.path.exists(annotated_image_path)

    if has_sp:
        # Left: Archival Specimen Plate
        sp_x, sp_y = 265, zone_y
        sp_w, sp_h = 290, 132
        draw.rectangle([sp_x - 3, sp_y - 3, sp_x + sp_w + 3, sp_y + sp_h + 3], fill="#F7F3E8", outline=c_gold_dark, width=1)
        draw.rectangle([sp_x, sp_y, sp_x + sp_w, sp_y + sp_h], outline=c_charcoal, width=1)
        try:
            sp_img = Image.open(annotated_image_path)
            sp_img.thumbnail((sp_w - 14, sp_h - 28), Image.Resampling.LANCZOS)
            px = sp_x + (sp_w - sp_img.width) // 2
            py = sp_y + 4 + (sp_h - 26 - sp_img.height) // 2
            img.paste(sp_img, (px, py))
        except Exception as e:
            print("Specimen error:", e)
        cap = "EXHIBIT A: SPECIMEN UNDER INQUIRY"
        b = draw.textbbox((0, 0), cap, font=f_mono)
        draw.text((sp_x + (sp_w - (b[2] - b[0])) // 2, sp_y + sp_h - 18), cap, font=f_mono, fill=c_gold_dark)

        # Center: Leg Count (Equidistant between Exhibit A and Seal)
        cnt_x = 940
        t_num = f"— {leg_count} —"
        b = draw.textbbox((0, 0), t_num, font=f_tally_num)
        draw.text((cnt_x - (b[2] - b[0]) // 2, zone_y - 8), t_num, font=f_tally_num, fill=c_navy)

        t_leg = "OFFICIALLY VERIFIED PODIATRIC DIGITS"
        b = draw.textbbox((0, 0), t_leg, font=f_tally_lbl)
        draw.text((cnt_x - (b[2] - b[0]) // 2, zone_y + 78), t_leg, font=f_tally_lbl, fill=c_gold_dark)

        t_mal_c = "തേരട്ടയുടെ കാൽ എണ്ണം സ്ഥിരീകരിച്ചു"
        b = draw.textbbox((0, 0), t_mal_c, font=f_mal_leg)
        draw.text((cnt_x - (b[2] - b[0]) // 2, zone_y + 99), t_mal_c, font=f_mal_leg, fill=c_muted)

        t_sub_stats = "Accuracy: 94.2%   •   Margin of Doubt: ± Several Legs   •   YOLOv8 Neural Audit"
        b = draw.textbbox((0, 0), t_sub_stats, font=f_mono)
        draw.text((cnt_x - (b[2] - b[0]) // 2, zone_y + 120), t_sub_stats, font=f_mono, fill=c_charcoal)

        # Right: Gold Seal + Notary Stamp
        _paste_gold_seal(img, 1370, zone_y - 12, size=142)
        stamp = _draw_rubber_stamp(-6)
        img.paste(stamp, (1330, zone_y + 40), stamp)
    else:
        t_num = f"— {leg_count} —"
        b = draw.textbbox((0, 0), t_num, font=f_tally_num)
        draw.text((CENTER_X - (b[2] - b[0]) // 2, zone_y - 8), t_num, font=f_tally_num, fill=c_navy)

        t_leg = "OFFICIALLY VERIFIED CENTIPEDE PODIATRIC DIGITS"
        b = draw.textbbox((0, 0), t_leg, font=f_tally_lbl)
        draw.text((CENTER_X - (b[2] - b[0]) // 2, zone_y + 78), t_leg, font=f_tally_lbl, fill=c_gold_dark)

        t_mal_c = "തേരട്ടയുടെ കാൽ എണ്ണം സ്ഥിരീകരിച്ചു"
        b = draw.textbbox((0, 0), t_mal_c, font=f_mal_leg)
        draw.text((CENTER_X - (b[2] - b[0]) // 2, zone_y + 99), t_mal_c, font=f_mal_leg, fill=c_muted)

        t_sub_stats = "Confidence: 94.2%   •   Margin of Doubt: ± Several Legs   •   YOLOv8 Neural Audit"
        b = draw.textbbox((0, 0), t_sub_stats, font=f_mono)
        draw.text((CENTER_X - (b[2] - b[0]) // 2, zone_y + 120), t_sub_stats, font=f_mono, fill=c_charcoal)

        _paste_gold_seal(img, 1370, zone_y - 12, size=142)
        stamp = _draw_rubber_stamp(-6)
        img.paste(stamp, (1330, zone_y + 40), stamp)

    # 6. Covenant & Registration
    cov_y = zone_y + 148
    cov_text = "Conferred with all academic honors, zero pension, and perpetual immunity from economically productive labor."
    b = draw.textbbox((0, 0), cov_text, font=f_intro)
    draw.text((CENTER_X - (b[2] - b[0]) // 2, cov_y), cov_text, font=f_intro, fill=c_charcoal)

    ref_text = f"REGISTRATION NO: TK-{submission_id[:8].upper()}-KL   |   DATE: {date_formatted}   |   STATUS: PERPETUALLY RATIFIED"
    b = draw.textbbox((0, 0), ref_text, font=f_mono)
    draw.text((CENTER_X - (b[2] - b[0]) // 2, cov_y + 19), ref_text, font=f_mono, fill=c_muted)

    # 7. Three Signatures with CENTERED labels
    sig_y = cov_y + 36

    # 1: Dr. P. K. Therattakkal
    s1_x, s1_w = 260, 330
    _paste_signature_with_alpha(img, "sig_theratta.jpg", (s1_x + 15, sig_y, s1_w - 30, 56))
    draw.line([(s1_x + 10, sig_y + 58), (s1_x + s1_w - 10, sig_y + 58)], fill=c_gold_dark, width=1)
    t = "Dr. P. K. Therattakkal, Ph.D."
    b = draw.textbbox((0, 0), t, font=f_sig_name)
    draw.text((s1_x + (s1_w - (b[2] - b[0])) // 2, sig_y + 63), t, font=f_sig_name, fill=c_navy)
    t = "Chief Arthropod Foot Counter"
    b = draw.textbbox((0, 0), t, font=f_sig_title)
    draw.text((s1_x + (s1_w - (b[2] - b[0])) // 2, sig_y + 80), t, font=f_sig_title, fill=c_muted)

    # 2: HON. MANDI MASALA, O.B.E.
    s2_x, s2_w = 735, 330
    _paste_signature_with_alpha(img, "sig_mandi_masala.jpg", (s2_x + 15, sig_y, s2_w - 30, 56))
    draw.line([(s2_x + 10, sig_y + 58), (s2_x + s2_w - 10, sig_y + 58)], fill=c_crimson, width=2)
    t = "Hon. Mandi Masala, O.B.E."
    b = draw.textbbox((0, 0), t, font=f_sig_name)
    draw.text((s2_x + (s2_w - (b[2] - b[0])) // 2, sig_y + 63), t, font=f_sig_name, fill=c_crimson)
    t = "Supreme Arbiter of Kerala Spices & Podiatry"
    b = draw.textbbox((0, 0), t, font=f_sig_title)
    draw.text((s2_x + (s2_w - (b[2] - b[0])) // 2, sig_y + 80), t, font=f_sig_title, fill=c_muted)

    # 3: Prof. Kaalu E. Enny
    s3_x, s3_w = 1210, 330
    _paste_signature_with_alpha(img, "sig_kaalu.jpg", (s3_x + 15, sig_y, s3_w - 30, 56))
    draw.line([(s3_x + 10, sig_y + 58), (s3_x + s3_w - 10, sig_y + 58)], fill=c_gold_dark, width=1)
    t = "Prof. Kaalu E. Enny, D.Sc."
    b = draw.textbbox((0, 0), t, font=f_sig_name)
    draw.text((s3_x + (s3_w - (b[2] - b[0])) // 2, sig_y + 63), t, font=f_sig_name, fill=c_navy)
    t = "Dean of Pointless Procrastination"
    b = draw.textbbox((0, 0), t, font=f_sig_title)
    draw.text((s3_x + (s3_w - (b[2] - b[0])) // 2, sig_y + 80), t, font=f_sig_title, fill=c_muted)

    # Convert to RGB for clean PNG export
    final_img = img.convert("RGB")
    buffer = BytesIO()
    final_img.save(buffer, format="PNG", quality=95, optimize=True)
    buffer.seek(0)
    return buffer
