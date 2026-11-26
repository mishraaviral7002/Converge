#!/usr/bin/env python3
"""Hand-drawn, flat blue-and-orange assets for the Converge README."""
import math
import random
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets"
OUT.mkdir(exist_ok=True)

PAPER, INK, GREY, RULE = "#FBF7F0", "#14213D", "#5B6785", "#E4DCCB"
BLUE, BLUE_L, ORANGE, ORANGE_L = "#2F6FED", "#D6E4FF", "#FF7A1A", "#FFE1C7"
SANS = "-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
DUR = 12  # seconds per loop


def save(name, svg):
    (OUT / name).write_text(svg.strip() + "\n", encoding="utf-8")
    print("wrote", name)


# ───────────── hand-drawn helpers ─────────────
class Pen:
    def __init__(self, seed):
        self.r = random.Random(seed)

    def j(self, a):
        return self.r.uniform(-a, a)

    def line(self, x1, y1, x2, y2, bow=2.0):
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        dx, dy = x2 - x1, y2 - y1
        n = math.hypot(dx, dy) or 1
        b = self.j(bow)
        return (f"M{x1 + self.j(.8):.1f} {y1 + self.j(.8):.1f} Q{mx - dy / n * b:.1f} {my + dx / n * b:.1f} "
                f"{x2 + self.j(.8):.1f} {y2 + self.j(.8):.1f}")

    def rect(self, x, y, w, h):
        return " ".join([self.line(x, y, x + w, y), self.line(x + w, y, x + w, y + h),
                         self.line(x + w, y + h, x, y + h), self.line(x, y + h, x, y)])

    def curve(self, x1, y1, c1x, c1y, c2x, c2y, x2, y2, head=True):
        d = (f"M{x1 + self.j(.6):.1f} {y1 + self.j(.6):.1f} C{c1x + self.j(2):.1f} {c1y + self.j(2):.1f} "
             f"{c2x + self.j(2):.1f} {c2y + self.j(2):.1f} {x2 + self.j(.6):.1f} {y2 + self.j(.6):.1f}")
        if head:
            ang = math.atan2(y2 - c2y, x2 - c2x)
            for sp in (0.5, -0.5):
                d += f" M{x2:.1f} {y2:.1f} L{x2 - 11 * math.cos(ang + sp):.1f} {y2 - 11 * math.sin(ang + sp):.1f}"
        return d

    def wobble(self, x1, x2, y, amp=2.2, step=22):
        pts, x = [], x1
        while x < x2:
            pts.append((x, y + self.j(amp)))
            x += step
        pts.append((x2, y + self.j(amp)))
        return "M" + " L".join(f"{px:.1f} {py:.1f}" for px, py in pts)


def draw_anim(s, e):
    return (f'<animate attributeName="stroke-dashoffset" dur="{DUR}s" repeatCount="indefinite" values="1.02;1.02;0;0" keyTimes="0;{s};{e};1"/>'
            f'<animate attributeName="opacity" dur="{DUR}s" repeatCount="indefinite" values="1;1;0" keyTimes="0;.93;1"/>')


def stroke(d, color, w, s, e, extra=""):
    return (f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" '
            f'pathLength="1" stroke-dasharray="1" stroke-dashoffset="0" {extra}>{draw_anim(s, e)}</path>')


def sketch(fn, color, w, s, e):
    """Draw the same shape twice with different jitter, so it reads as pen on a whiteboard."""
    return stroke(fn(), color, w, s, e) + stroke(fn(), color, round(w * .5, 2), s + .005, e + .005, 'opacity=".5"')


def fade(inner, s, d=.04):
    return (f'<g opacity="1"><animate attributeName="opacity" dur="{DUR}s" repeatCount="indefinite" '
            f'values="0;0;1;1;0" keyTimes="0;{s};{s + d};.93;1"/>{inner}</g>')


# ───────────── hero ─────────────
def hero():
    pen = Pen(4)
    notes = [("ideas", 58, BLUE_L, BLUE, .04), ("feedback", 128, ORANGE_L, ORANGE, .08), ("deadlines", 198, BLUE_L, BLUE, .12)]
    parts = []
    for i, (label, y, fill, edge, s) in enumerate(notes):
        rot = (-2.2, 1.6, -1.2)[i]
        cx, cy = 576, y + 28
        body = (f'<rect x="516" y="{y}" width="120" height="56" rx="3" fill="{fill}"/>'
                f'<text x="530" y="{y + 24}" style="font:700 15px {SANS};fill:{INK}">{label}</text>'
                f'<path d="{pen.line(530, y + 36, 600, y + 36, 1)} {pen.line(530, y + 45, 578, y + 45, 1)}" stroke="{GREY}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".55"/>')
        parts.append(f'<g transform="rotate({rot} {cx} {cy})">{fade(body, s)}'
                     f'{sketch(lambda y=y: pen.rect(516, y, 120, 56), INK, 1.8, s, s + .05)}</g>')
    # arrows converging on the plan card
    for k, (x1, y1, c1x, c1y, c2x, c2y, x2, y2, s) in enumerate([
        (640, 90, 690, 86, 706, 138, 734, 148, .16),
        (640, 160, 684, 160, 706, 164, 734, 164, .22),
        (640, 230, 690, 232, 708, 188, 734, 180, .28)]):
        parts.append(sketch(lambda a=(x1, y1, c1x, c1y, c2x, c2y, x2, y2): pen.curve(*a), BLUE, 2.4, s, s + .1))
    # plan card
    card = (f'<rect x="738" y="122" width="122" height="84" rx="4" fill="{ORANGE_L}"/>'
            f'<text x="754" y="150" style="font:800 20px {SANS};fill:{INK}">plan</text>'
            f'<path d="{pen.line(776, 170, 842, 170, 1)} {pen.line(776, 190, 824, 190, 1)}" stroke="{GREY}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".6"/>'
            f'<path d="{pen.rect(754, 164, 10, 10)} {pen.rect(754, 184, 10, 10)}" stroke="{INK}" stroke-width="1.6" fill="none" stroke-linecap="round"/>')
    parts.append(fade(card, .40, .05))
    parts.append(sketch(lambda: pen.rect(738, 122, 122, 84), ORANGE, 2.8, .40, .49))
    parts.append(stroke("M755 170 L759 174 L766 164", ORANGE, 2.6, .52, .57))
    parts.append(stroke("M755 190 L759 194 L766 184", ORANGE, 2.6, .59, .64))
    # AI sticker (planned)
    sticker = (f'<rect x="752" y="72" width="94" height="26" rx="13" fill="{PAPER}" stroke="{ORANGE}" stroke-width="1.8" stroke-dasharray="5 4"/>'
               f'<text x="799" y="89" text-anchor="middle" style="font:700 12px {SANS};fill:{ORANGE};letter-spacing:.5px">AI, soon</text>')
    parts.append(fade(sticker, .70, .04))
    parts.append(stroke("M799 102 L799 118 M793 112 L799 119 L805 112", ORANGE, 2, .74, .79))
    # toolbar
    tool = f'<rect x="596" y="270" width="176" height="28" rx="8" fill="{PAPER}" stroke="{RULE}"/>'
    tool += f'<rect x="672" y="274" width="24" height="20" rx="5" fill="{ORANGE_L}"/>'
    tool += (f'<path d="M612 276 L612 292 L616.5 288 L620 295 L622 294 L618.5 287.5 L624 287.5 Z" fill="{INK}"/>'
             f'<path d="M644 292 L654 278 L658 282 L648 295 Z" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linejoin="round"/>'
             f'<rect x="676" y="279" width="16" height="11" rx="2" fill="none" stroke="{INK}" stroke-width="1.6"/>'
             f'<path d="M712 292 L726 281 M720 280 L727 281 L725 288" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
             f'<rect x="742" y="277" width="16" height="16" rx="2" fill="{BLUE_L}" stroke="{INK}" stroke-width="1.6"/>')
    # title underline
    underline = stroke(pen.wobble(108, 424, 134, 2.4), ORANGE, 4, .03, .13) + stroke(pen.wobble(112, 410, 138, 2), ORANGE, 2, .05, .15, 'opacity=".6"')

    svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="340" viewBox="0 0 900 340" role="img" aria-label="Converge: a shared whiteboard for teams. Ideas, feedback and deadlines converge into one plan.">
<defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#D9CFBC"/></pattern></defs>
<rect width="900" height="340" rx="16" fill="{PAPER}"/>
<rect width="900" height="340" rx="16" fill="url(#dots)" opacity=".7"/>
<rect x=".75" y=".75" width="898.5" height="338.5" rx="15.5" fill="none" stroke="{RULE}" stroke-width="1.5"/>

<!-- mark + title -->
<g transform="translate(48 78)">
  <path d="M2 6 L30 22 M2 22 L30 22 M2 38 L30 22" stroke="{BLUE}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <circle cx="38" cy="22" r="7" fill="{ORANGE}"/>
</g>
<text x="108" y="118" style="font:800 62px {SANS};letter-spacing:-2px;fill:{INK}">Converge</text>
{underline}
<text x="48" y="178" style="font:700 24px {SANS};fill:{BLUE}">Think together. Build smarter.</text>
<text x="48" y="208" style="font:400 15.5px {SANS};fill:{GREY}">A shared whiteboard for teams. Open a board,</text>
<text x="48" y="230" style="font:400 15.5px {SANS};fill:{GREY}">share its ID, and everyone who joins edits</text>
<text x="48" y="252" style="font:400 15.5px {SANS};fill:{GREY}">the same canvas, live.</text>

<g transform="rotate(-3 118 292)">
  <rect x="48" y="276" width="140" height="30" rx="6" fill="none" stroke="{ORANGE}" stroke-width="2"/>
  <text x="118" y="296" text-anchor="middle" style="font:800 11.5px {SANS};letter-spacing:1.5px;fill:{ORANGE}">WORK IN PROGRESS</text>
</g>

<!-- whiteboard -->
<rect x="498" y="38" width="380" height="270" rx="8" fill="{INK}"/>
<rect x="492" y="32" width="380" height="270" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2"/>
{"".join(parts)}
{tool}
</svg>
"""
    save("hero.svg", svg)


# ───────────── how it works ─────────────
def flow():
    pen = Pen(9)
    steps = [("1", "Sign in", "cookie-based session", False), ("2", "Open a board", "the board ID is the room", False),
             ("3", "Edit together", "changes sync live", False), ("4", "Ask the AI", "summaries and plans", True)]
    parts = []
    for i, (n, title, sub, planned) in enumerate(steps):
        x, y, w, h = 34 + i * 220, 52, 178, 102
        s = .04 + i * .17
        col = ORANGE if planned else BLUE
        body = (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{ORANGE_L if planned else BLUE_L}" fill-opacity=".55"/>'
                f'<text x="{x + 18}" y="{y + 56}" style="font:800 17px {SANS};fill:{INK}">{title}</text>'
                f'<text x="{x + 18}" y="{y + 77}" style="font:400 13px {SANS};fill:{GREY}">{sub}</text>')
        parts.append(fade(body, s, .05))
        if planned:
            parts.append(fade(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="none" stroke="{ORANGE}" stroke-width="2" stroke-dasharray="7 5"/>', s, .05))
        else:
            parts.append(sketch(lambda x=x, y=y, w=w, h=h: pen.rect(x, y, w, h), INK, 1.9, s, s + .07))
        num = (f'<text x="{x + 18}" y="{y + 22}" text-anchor="middle" style="font:800 13px {SANS};fill:{col}">{n}</text>')
        parts.append(fade(num, s + .02, .04))
        ring = "M" + " L".join(f"{x + 18 + 11 * math.cos(a):.1f} {y + 17 + 11 * math.sin(a):.1f}" for a in [k * 0.3 for k in range(0, 23)])
        parts.append(stroke(ring, col, 1.8, s + .02, s + .07))
        if i < 3:
            ax = x + w + 6
            parts.append(sketch(lambda ax=ax, y=y, h=h, pl=(i == 2): pen.curve(ax, y + h / 2, ax + 12, y + h / 2 - 4, ax + 22, y + h / 2 + 3, ax + 32, y + h / 2, True),
                                ORANGE if i == 2 else BLUE, 2.4, s + .08, s + .13))
    svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="210" viewBox="0 0 900 210" role="img" aria-label="Flow: sign in, open a board, edit together, ask the AI (planned)">
<rect width="900" height="210" rx="14" fill="{PAPER}"/>
<rect x=".75" y=".75" width="898.5" height="208.5" rx="13.5" fill="none" stroke="{RULE}" stroke-width="1.5"/>
{"".join(parts)}
<g style="font:500 12px {SANS};fill:{GREY}">
  <path d="M34 184 H62" stroke="{INK}" stroke-width="2" stroke-linecap="round"/><text x="70" y="188">works today</text>
  <path d="M168 184 H196" stroke="{ORANGE}" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 4"/><text x="204" y="188">planned</text>
</g>
</svg>
"""
    save("how-it-works.svg", svg)


# ───────────── divider ─────────────
def divider():
    pen = Pen(21)
    right = "M890 14 " + " ".join(f"L{890 - i * 26:.1f} {14 + pen.j(2):.1f}" for i in range(1, 17))
    parts = stroke(pen.wobble(10, 436, 14, 2, 26), BLUE, 3, .02, .12) + stroke(right, BLUE, 3, .02, .12)
    dot = fade(f'<circle cx="450" cy="14" r="7" fill="{ORANGE}"/>', .12, .03)
    svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="28" viewBox="0 0 900 28" role="presentation" aria-hidden="true">
{parts}{dot}
</svg>
"""
    save("divider.svg", svg)


if __name__ == "__main__":
    hero(); flow(); divider()
