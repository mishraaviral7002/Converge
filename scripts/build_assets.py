#!/usr/bin/env python3
"""Builds the animated SVG assets used by the Converge README."""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets"
OUT.mkdir(exist_ok=True)

C = dict(
    SANS="'Segoe UI',Ubuntu,'Helvetica Neue',Arial,sans-serif",
    MONO="'Fira Code','SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace",
    BG="#0b1018", BG2="#121a2c", PANEL="#0e1524", LINE="#1f2a3d", CHIP="#161f33",
    VIOLET="#8b7cff", TEAL="#2dd4bf", AMBER="#f59e0b", PINK="#f472b6",
    TEXT="#e6edf7", MUTED="#9fb0c8", DIM="#5b6b88",
)


def tpl(s, **kw):
    for k, v in {**C, **kw}.items():
        s = s.replace(f"%{k}%", str(v))
    return s


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def save(name, svg):
    (OUT / name).write_text(svg.strip() + "\n", encoding="utf-8")
    print("wrote", name)


COMMON_CSS = """
.fu{opacity:0;animation:fu .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.pulse{animation:pulse 1.8s ease-in-out infinite}
@keyframes pulse{50%{opacity:.25}}
.march{animation:march 1.4s linear infinite}
@keyframes march{to{stroke-dashoffset:-18}}
.blink{animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
"""

# ───────────────────────── HERO ─────────────────────────
HERO = """
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="340" viewBox="0 0 900 340" role="img" aria-label="Converge: an AI-powered collaborative whiteboard. Think together. Build smarter.">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%BG%"/><stop offset="1" stop-color="%BG2%"/></linearGradient>
  <linearGradient id="tt" x1="0" x2="1"><stop offset="0" stop-color="%VIOLET%"/><stop offset="1" stop-color="%TEAL%"/></linearGradient>
  <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#ffffff" fill-opacity=".08"/></pattern>
  <radialGradient id="aura" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="%VIOLET%" stop-opacity=".25"/><stop offset="1" stop-color="%VIOLET%" stop-opacity="0"/></radialGradient>
  <clipPath id="win"><rect x="520" y="36" width="356" height="268" rx="14"/></clipPath>
  __TYPECLIP__
</defs>
<style>
%COMMON%
.lab{font:600 12px %MONO%;letter-spacing:3px;fill:%AMBER%}
.ttl{font:800 66px %SANS%;letter-spacing:-2px;fill:url(#tt)}
.tag{font:600 22px %SANS%;fill:%TEXT%}
.chip{font:600 12.5px %SANS%;fill:%TEXT%}
.mono{font:500 12px %MONO%;fill:%MUTED%}
.nt{font:800 14px %SANS%;fill:%TEXT%}
.pop{opacity:0;transform-box:fill-box;transform-origin:center;animation:pop .8s cubic-bezier(.2,.9,.3,1.3) forwards}
@keyframes pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
.ring{transform-box:fill-box;transform-origin:center;animation:ping 2.4s ease-out infinite}
@keyframes ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.4);opacity:0}}
.aura{animation:aura 5s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes aura{50%{transform:scale(1.15);opacity:.7}}
</style>

<rect width="900" height="340" rx="18" fill="url(#bg)"/>
<rect width="900" height="340" rx="18" fill="url(#dots)"/>
<circle class="aura" cx="700" cy="170" r="210" fill="url(#aura)"/>

<!-- left column -->
<g class="fu" style="animation-delay:.1s"><circle class="pulse" cx="52" cy="56" r="4" fill="%AMBER%"/><text class="lab" x="64" y="60">AI-POWERED COLLABORATIVE WHITEBOARD</text></g>
<text class="ttl fu" x="44" y="132" style="animation-delay:.25s">Converge</text>
__TYPED__
__CHIPS__
<g class="fu" style="animation-delay:1.1s">
  <circle cx="58" cy="268" r="11" fill="%VIOLET%" stroke="%BG%" stroke-width="2"/>
  <circle cx="76" cy="268" r="11" fill="%TEAL%" stroke="%BG%" stroke-width="2"/>
  <circle cx="94" cy="268" r="11" fill="%PINK%" stroke="%BG%" stroke-width="2"/>
  <circle class="pulse" cx="120" cy="268" r="4" fill="#22c55e"/>
  <text class="mono" x="132" y="272">3 collaborators in this room</text>
</g>
<g class="fu" style="animation-delay:1.25s">
  <rect x="48.5" y="288.5" width="190" height="24" rx="12" fill="%CHIP%" stroke="%AMBER%" stroke-opacity=".6"/>
  <circle class="pulse" cx="64" cy="300.5" r="3.5" fill="%AMBER%"/>
  <text class="mono" x="76" y="304" style="font-size:11px;fill:%AMBER%">IN ACTIVE DEVELOPMENT</text>
</g>

<!-- whiteboard window -->
<g class="fu" style="animation-delay:.5s">
  <rect x="520.5" y="36.5" width="355" height="267" rx="14" fill="%PANEL%" stroke="%LINE%"/>
  <rect x="521" y="37" width="354" height="34" fill="#0c1220" clip-path="url(#win)"/>
  <circle cx="540" cy="54" r="4" fill="#ef4444"/><circle cx="555" cy="54" r="4" fill="%AMBER%"/><circle cx="570" cy="54" r="4" fill="#22c55e"/>
  <text class="mono" x="590" y="58" style="font-size:11px">board / converge-room</text>
  <circle cx="824" cy="54" r="7" fill="%VIOLET%" stroke="#0c1220" stroke-width="2"/>
  <circle cx="840" cy="54" r="7" fill="%TEAL%" stroke="#0c1220" stroke-width="2"/>
  <circle cx="856" cy="54" r="7" fill="%PINK%" stroke="#0c1220" stroke-width="2"/>
</g>

<g clip-path="url(#win)">
  <!-- sticky notes -->
  <g class="pop" style="animation-delay:.9s"><rect x="546" y="96" width="100" height="64" rx="8" fill="#241d4d" stroke="%VIOLET%"/><text class="nt" x="560" y="120">Ideas</text><rect x="560" y="130" width="64" height="4" rx="2" fill="%MUTED%" opacity=".5"/><rect x="560" y="140" width="44" height="4" rx="2" fill="%MUTED%" opacity=".35"/></g>
  <g class="pop" style="animation-delay:1.1s"><rect x="730" y="112" width="100" height="64" rx="8" fill="#0f2f2e" stroke="%TEAL%"/><text class="nt" x="744" y="136">Plan</text><rect x="744" y="146" width="64" height="4" rx="2" fill="%MUTED%" opacity=".5"/><rect x="744" y="156" width="44" height="4" rx="2" fill="%MUTED%" opacity=".35"/></g>
  <g class="pop" style="animation-delay:1.3s"><rect x="640" y="214" width="100" height="56" rx="8" fill="#3a2a0c" stroke="%AMBER%"/><text class="nt" x="654" y="238">Tasks</text><rect x="654" y="248" width="64" height="4" rx="2" fill="%MUTED%" opacity=".5"/></g>

  <!-- connectors drawn live by collaborators -->
  <path d="M646 128 C 680 118, 700 150, 730 144" fill="none" stroke="%VIOLET%" stroke-width="2.4" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">
    <animate attributeName="stroke-dashoffset" dur="8s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;.15;.4;1"/>
    <animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="1;1;0" keyTimes="0;.92;1"/>
  </path>
  <path d="M780 176 C 790 214, 770 240, 740 242" fill="none" stroke="%TEAL%" stroke-width="2.4" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">
    <animate attributeName="stroke-dashoffset" dur="8s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;.45;.7;1"/>
    <animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="1;1;0" keyTimes="0;.92;1"/>
  </path>

  <!-- AI assistant (planned) -->
  <line class="march" x1="598" y1="250" x2="640" y2="244" stroke="%AMBER%" stroke-width="1.6" stroke-dasharray="4 5"/>
  <circle class="ring" cx="580" cy="252" r="17" fill="none" stroke="%AMBER%"/>
  <circle cx="580" cy="252" r="17" fill="#1c1330" stroke="%AMBER%" stroke-dasharray="3 3"/>
  <text x="580" y="256" text-anchor="middle" style="font:800 11px %MONO%;fill:%AMBER%">AI</text>
  <text x="580" y="284" text-anchor="middle" style="font:500 9px %MONO%;fill:%MUTED%">assistant · planned</text>

  <!-- live cursors -->
  <g>
    <animateMotion dur="8s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;.15;.4;1" path="M646 128 C 680 118, 700 150, 730 144"/>
    <animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.05;.92;1"/>
    <path d="M0 0 L0 16 L4.5 12 L8 19 L10.5 18 L7 11 L13 11 Z" fill="%VIOLET%" stroke="#0b1018" stroke-width="1"/>
    <rect x="12" y="16" width="38" height="18" rx="9" fill="%VIOLET%"/><text x="31" y="28.5" text-anchor="middle" style="font:700 10px %SANS%;fill:#0b1018">Aria</text>
  </g>
  <g>
    <animateMotion dur="8s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;.45;.7;1" path="M780 176 C 790 214, 770 240, 740 242"/>
    <animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.05;.92;1"/>
    <path d="M0 0 L0 16 L4.5 12 L8 19 L10.5 18 L7 11 L13 11 Z" fill="%TEAL%" stroke="#0b1018" stroke-width="1"/>
    <rect x="12" y="16" width="34" height="18" rx="9" fill="%TEAL%"/><text x="29" y="28.5" text-anchor="middle" style="font:700 10px %SANS%;fill:#0b1018">Sam</text>
  </g>
  <g>
    <animateMotion dur="9s" repeatCount="indefinite" path="M690 88 C 720 74, 770 80, 780 98 C 790 118, 700 112, 690 88 Z"/>
    <path d="M0 0 L0 16 L4.5 12 L8 19 L10.5 18 L7 11 L13 11 Z" fill="%PINK%" stroke="#0b1018" stroke-width="1"/>
    <rect x="12" y="16" width="30" height="18" rx="9" fill="%PINK%"/><text x="27" y="28.5" text-anchor="middle" style="font:700 10px %SANS%;fill:#0b1018">Kai</text>
  </g>
</g>
</svg>
"""


def hero():
    text, k, cw = "Think together. Build smarter.", 30, 12.6
    w = round(k * cw)
    kt = [0.0] + [0.05 + 0.30 * j / k for j in range(1, k + 1)] + [0.85, 1.0]
    vals = [0] + [round(cw * j, 1) for j in range(1, k + 1)] + [0, 0]
    kt_s = ";".join(f"{t:.4f}" for t in kt)
    clip = (f'<clipPath id="ty"><rect x="48" y="150" width="0" height="36">'
            f'<animate attributeName="width" dur="10s" repeatCount="indefinite" calcMode="discrete" keyTimes="{kt_s}" values="{";".join(map(str, vals))}"/></rect></clipPath>')
    xs = [48] + [round(48 + cw * j, 1) for j in range(1, k + 1)] + [48, 48]
    typed = (f'<g class="fu" style="animation-delay:.45s"><text class="tag" x="48" y="176" textLength="{w}" lengthAdjust="spacing" clip-path="url(#ty)">{esc(text)}</text>'
             f'<g class="blink"><rect y="155" width="3" height="26" fill="%TEAL%" x="48">'
             f'<animate attributeName="x" dur="10s" repeatCount="indefinite" calcMode="discrete" keyTimes="{kt_s}" values="{";".join(map(str, xs))}"/></rect></g></g>')
    chips, x = [], 48
    for j, label in enumerate(["Real-time sync", "tldraw canvas", "AI planning"]):
        cwid = int(len(label) * 7.4 + 30)
        chips.append(f'<g class="fu" style="animation-delay:{0.75 + j * 0.12:.2f}s"><rect x="{x + .5}" y="204.5" width="{cwid}" height="26" rx="13" fill="%CHIP%" stroke="%LINE%"/>'
                     f'<circle cx="{x + 14}" cy="217.5" r="3" fill="%TEAL%"/><text class="chip" x="{x + 24}" y="222">{esc(label)}</text></g>')
        x += cwid + 10
    svg = HERO.replace("__TYPECLIP__", clip).replace("__TYPED__", typed).replace("__CHIPS__", "".join(chips))
    save("hero.svg", tpl(svg, COMMON=COMMON_CSS))


# ───────────────────────── HEADINGS ─────────────────────────
HEAD = """
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="56" viewBox="0 0 900 56" role="img" aria-label="%TITLE%">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="%VIOLET%"/><stop offset="1" stop-color="%TEAL%"/></linearGradient></defs>
<style>
%COMMON%
.n{font:600 13px %MONO%;fill:%AMBER%;letter-spacing:2px}
.t{font:800 24px %SANS%;fill:%TEXT%}
.s{font:500 13px %MONO%;fill:%MUTED%}
.bar{transform-box:fill-box;transform-origin:left;animation:grow 1.6s cubic-bezier(.2,.8,.2,1) both}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.sh{animation:sh 4s ease-in-out infinite}
@keyframes sh{0%{transform:translateX(-80px);opacity:0}20%{opacity:.9}60%,100%{transform:translateX(880px);opacity:0}}
</style>
<rect x=".5" y=".5" width="899" height="55" rx="12" fill="%BG%" stroke="%LINE%"/>
<circle class="pulse" cx="26" cy="28" r="4" fill="%AMBER%"/>
<text class="n" x="42" y="33">%NUM%</text>
<text class="t" x="96" y="36">%TITLE%</text>
<text class="s" x="874" y="33" text-anchor="end">%SUB%</text>
<rect class="bar" x="14" y="51" width="872" height="3" rx="1.5" fill="url(#g)"/>
<rect class="sh" x="14" y="51" width="60" height="3" rx="1.5" fill="#ffffff" fill-opacity=".7"/>
</svg>
"""


def headings():
    for slug, num, title, sub in [
        ("overview", "01", "Overview", "what it is"),
        ("demo", "02", "Live demo", "try it"),
        ("features", "03", "Features", "capabilities"),
        ("how", "04", "How it works", "architecture"),
        ("stack", "05", "Tech stack", "tools"),
        ("start", "06", "Getting started", "setup"),
        ("roadmap", "07", "Roadmap", "what's next"),
        ("contrib", "08", "Contributing", "join in"),
    ]:
        save(f"heading-{slug}.svg", tpl(HEAD, COMMON=COMMON_CSS, NUM=num, TITLE=title, SUB=sub))


# ───────────────────────── FEATURE CARDS ─────────────────────────
def ic_canvas(c): return f'<rect x="1" y="3" width="26" height="20" rx="4" fill="none" stroke="{c}" stroke-width="1.8"/><path d="M5 17 q4 -9 8 0 t8 0" fill="none" stroke="{c}" stroke-width="1.8" stroke-linecap="round"/>'
def ic_people(c): return f'<circle cx="10" cy="9" r="4.5" fill="none" stroke="{c}" stroke-width="1.8"/><circle cx="21" cy="11" r="3.5" fill="none" stroke="{c}" stroke-width="1.8"/><path d="M2 25 a8 8 0 0 1 16 0 M16 25 a6 6 0 0 1 11 -1" fill="none" stroke="{c}" stroke-width="1.8" stroke-linecap="round"/>'
def ic_room(c): return f'<path d="M5 26 V12 a9 9 0 0 1 18 0 V26 Z" fill="none" stroke="{c}" stroke-width="1.8" stroke-linejoin="round"/><circle cx="18" cy="18" r="1.6" fill="{c}"/>'
def ic_lock(c): return f'<rect x="4" y="12" width="20" height="14" rx="3.5" fill="none" stroke="{c}" stroke-width="1.8"/><path d="M8 12 V9 a6 6 0 0 1 12 0 V12" fill="none" stroke="{c}" stroke-width="1.8" stroke-linecap="round"/>'
def ic_spark(c): return f'<path d="M14 1 L17 11 L27 14 L17 17 L14 27 L11 17 L1 14 L11 11 Z" fill="none" stroke="{c}" stroke-width="1.8" stroke-linejoin="round"/>'
def ic_plan(c): return f'<path d="M2 7 l3 3 l5 -6 M2 18 l3 3 l5 -6" fill="none" stroke="{c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 8 H27 M15 19 H27" stroke="{c}" stroke-width="1.8" stroke-linecap="round"/>'
def ic_map(c): return f'<circle cx="14" cy="14" r="4" fill="none" stroke="{c}" stroke-width="1.8"/><circle cx="4" cy="5" r="2.5" fill="none" stroke="{c}" stroke-width="1.6"/><circle cx="24" cy="6" r="2.5" fill="none" stroke="{c}" stroke-width="1.6"/><circle cx="14" cy="25" r="2.5" fill="none" stroke="{c}" stroke-width="1.6"/><path d="M6 7 L11 11 M22 8 L17 11 M14 18 V22.5" stroke="{c}" stroke-width="1.6"/>'
def ic_grid(c): return f'<rect x="2" y="2" width="10" height="10" rx="2.5" fill="none" stroke="{c}" stroke-width="1.8"/><rect x="16" y="2" width="10" height="10" rx="2.5" fill="none" stroke="{c}" stroke-width="1.8"/><rect x="2" y="16" width="10" height="10" rx="2.5" fill="none" stroke="{c}" stroke-width="1.8"/><rect x="16" y="16" width="10" height="10" rx="2.5" fill="none" stroke="{c}" stroke-width="1.8"/>'


FEAT = """
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="190" viewBox="0 0 900 190" role="img" aria-label="%ARIA%">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="%VIOLET%"/><stop offset="1" stop-color="%TEAL%"/></linearGradient></defs>
<style>
%COMMON%
.ft{font:800 15px %SANS%;fill:%TEXT%}
.fd{font:500 12px %SANS%;fill:%MUTED%}
.tg{font:600 9px %MONO%;letter-spacing:1.5px}
.top{transform-box:fill-box;transform-origin:left;animation:grow 1.4s cubic-bezier(.2,.8,.2,1) both}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.ic{animation:bob 3.4s ease-in-out infinite}
@keyframes bob{50%{transform:translateY(-3px)}}
</style>
%CARDS%
</svg>
"""


def feature_row(slug, aria, planned, cards):
    col = "%AMBER%" if planned else "%TEAL%"
    tag = "PLANNED" if planned else "LIVE"
    out = []
    for i, (icon, title, lines) in enumerate(cards):
        x = 1 + i * 224
        border = (f'<rect class="march" x="{x + .5}" y="10.5" width="207" height="168" rx="14" fill="%PANEL%" stroke="%AMBER%" stroke-opacity=".7" stroke-dasharray="4 5"/>'
                  if planned else f'<rect x="{x + .5}" y="10.5" width="207" height="168" rx="14" fill="%PANEL%" stroke="%LINE%"/>')
        desc = "".join(f'<text class="fd" x="{x + 18}" y="{126 + j * 18}">{esc(t)}</text>' for j, t in enumerate(lines))
        out.append(
            f'<g class="fu" style="animation-delay:{i * 0.12:.2f}s">{border}'
            f'<rect class="top" x="{x + 18}" y="11" width="56" height="3" rx="1.5" fill="url(#g)" style="animation-delay:{i * 0.12 + .3:.2f}s"/>'
            f'<g class="ic" style="animation-delay:{i * 0.4:.1f}s"><g transform="translate({x + 18} 32)">{icon(col)}</g></g>'
            f'<circle class="pulse" cx="{x + 150}" cy="46" r="3" fill="{col}"/><text class="tg" x="{x + 192}" y="49.5" text-anchor="end" fill="{col}">{tag}</text>'
            f'<text class="ft" x="{x + 18}" y="100">{esc(title)}</text>{desc}</g>'
        )
    save(f"features-{slug}.svg", tpl(FEAT.replace("%CARDS%", "".join(out)), COMMON=COMMON_CSS, ARIA=esc(aria)))


def features():
    feature_row("now", "Available now: whiteboard, real-time collaboration, room-based boards, secure sign-in", False, [
        (ic_canvas, "Interactive whiteboard", ["A full canvas to sketch,", "write, and arrange ideas,", "built on tldraw."]),
        (ic_people, "Real-time collaboration", ["Everyone edits the same", "board at once and sees", "changes live."]),
        (ic_room, "Room-based boards", ["A board ID is a room.", "Share it and collaborators", "join the same space."]),
        (ic_lock, "Secure sign-in", ["Cookie-based sessions so", "only signed-in users can", "join a board."]),
    ])
    feature_row("planned", "Planned: AI brainstorming, intelligent planning, visual mind mapping, shared workspaces", True, [
        (ic_spark, "AI brainstorming", ["Generate ideas, summarise", "discussions, and explore", "possible solutions."]),
        (ic_plan, "Intelligent planning", ["Turn ideas into plans,", "tasks, and workflows", "automatically."]),
        (ic_map, "Visual mind mapping", ["Connect related concepts", "and make relationships", "between ideas visible."]),
        (ic_grid, "Shared workspaces", ["Organise boards around", "teams, projects, and", "goals."]),
    ])


# ───────────────────────── FLOW ─────────────────────────
FLOW = """
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="170" viewBox="0 0 900 170" role="img" aria-label="Flow: sign in, open a board, edit together, AI assist (planned)">
<defs>
  <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="%VIOLET%"/><stop offset="1" stop-color="%TEAL%"/></linearGradient>
  <radialGradient id="pk" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="%TEAL%"/><stop offset="1" stop-color="%TEAL%" stop-opacity="0"/></radialGradient>
</defs>
<style>
%COMMON%
.no{font:600 10px %MONO%;letter-spacing:2px;fill:%AMBER%}
.nt{font:800 16px %SANS%;fill:%TEXT%}
.ns{font:500 12px %SANS%;fill:%MUTED%}
.lg{font:500 10px %MONO%;fill:%DIM%}
.lit{fill-opacity:0;stroke-opacity:.3;animation:lit 8s ease-in-out infinite}
@keyframes lit{0%{fill-opacity:0;stroke-opacity:.3}4%,12%{fill-opacity:.14;stroke-opacity:1}22%,100%{fill-opacity:0;stroke-opacity:.3}}
</style>
<line x1="195" y1="82" x2="255" y2="82" stroke="%LINE%" stroke-width="2"/>
<line x1="425" y1="82" x2="485" y2="82" stroke="%LINE%" stroke-width="2"/>
<line x1="655" y1="82" x2="715" y2="82" stroke="%AMBER%" stroke-opacity=".7" stroke-width="2" stroke-dasharray="4 5" class="march"/>
__NODES__
<g>
  <animateMotion dur="8s" repeatCount="indefinite" calcMode="linear" path="M25 82 H885" keyPoints="0;1" keyTimes="0;1"/>
  <circle r="14" fill="url(#pk)"/><circle r="4.5" fill="#ffffff"/>
</g>
<text class="lg" x="25" y="154">solid: available now</text>
<text class="lg" x="875" y="154" text-anchor="end">dashed: planned</text>
</svg>
"""


def flow():
    steps = [("STEP 01", "Sign in", "cookie-based session", "%VIOLET%", False),
             ("STEP 02", "Open a board", "join the room by ID", "%TEAL%", False),
             ("STEP 03", "Edit together", "live sync for everyone", "%PINK%", False),
             ("STEP 04", "AI assist", "summaries and plans", "%AMBER%", True)]
    out = []
    for i, (no, title, sub, col, planned) in enumerate(steps):
        x = 25 + i * 230
        center = x + 85
        delay = max((center - 25) / 860 * 8 - 0.35, 0)
        dash = ' stroke-dasharray="4 5"' if planned else ""
        out.append(
            f'<g class="fu" style="animation-delay:{i * 0.15:.2f}s">'
            f'<rect x="{x + .5}" y="48.5" width="169" height="68" rx="14" fill="%PANEL%" stroke="%LINE%"{dash}/>'
            f'<rect class="lit" x="{x + .5}" y="48.5" width="169" height="68" rx="14" fill="{col}" stroke="{col}"{dash} style="animation-delay:{delay:.2f}s"/>'
            f'<text class="no" x="{x + 16}" y="68">{no}</text><text class="nt" x="{x + 16}" y="88">{title}</text><text class="ns" x="{x + 16}" y="106">{sub}</text></g>'
        )
    save("flow.svg", tpl(FLOW.replace("__NODES__", "".join(out)), COMMON=COMMON_CSS))


# ───────────────────────── STACK MARQUEE ─────────────────────────
def stack():
    names = ["React", "Vite", "TypeScript", "tldraw", "Tailwind CSS", "Node.js", "Express", "Socket.IO", "Vercel", "Render"]
    cols = ["%TEAL%", "%VIOLET%", "%TEAL%", "%PINK%", "%TEAL%", "%VIOLET%", "%TEXT%", "%PINK%", "%TEXT%", "%AMBER%"]
    pills, x = [], 0
    for n, c in zip(names, cols):
        w = int(len(n) * 8 + 34)
        pills.append(f'<g transform="translate({x} 0)"><rect x=".5" y="17.5" width="{w}" height="30" rx="15" fill="%CHIP%" stroke="%LINE%"/>'
                     f'<circle cx="16" cy="32.5" r="3.5" fill="{c}"/><text class="pn" x="28" y="37">{esc(n)}</text></g>')
        x += w + 14
    total = x
    group = "".join(pills)
    svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="64" viewBox="0 0 900 64" role="img" aria-label="Tech stack: {', '.join(names)}">
<defs>
  <linearGradient id="fd" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".08" stop-color="#fff"/><stop offset=".92" stop-color="#fff"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
  <mask id="m"><rect width="900" height="64" fill="url(#fd)"/></mask>
</defs>
<style>
.pn{{font:600 13px %SANS%;fill:%TEXT%}}
.sc{{animation:sc 26s linear infinite}}
@keyframes sc{{to{{transform:translateX(-{total}px)}}}}
</style>
<g mask="url(#m)"><g class="sc">{group}<g transform="translate({total} 0)">{group}</g><g transform="translate({total * 2} 0)">{group}</g></g></g>
</svg>
"""
    save("stack.svg", tpl(svg))


# ───────────────────────── ROADMAP ─────────────────────────
def roadmap(done=5, total=10):
    w = 852
    fill = round(w * done / total)
    ticks = "".join(f'<rect x="{24 + w * i / total - .75:.1f}" y="50" width="1.5" height="18" fill="%BG%"/>' for i in range(1, total))
    svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="96" viewBox="0 0 900 96" role="img" aria-label="Roadmap progress: {done} of {total} shipped">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="%VIOLET%"/><stop offset="1" stop-color="%TEAL%"/></linearGradient></defs>
<style>
%COMMON%
.l{{font:600 11px %MONO%;letter-spacing:2px;fill:%MUTED%}}
.v{{font:800 16px %SANS%;fill:%TEXT%}}
.sh{{animation:sh 3.2s ease-in-out infinite}}
@keyframes sh{{0%{{transform:translateX(-120px);opacity:0}}30%{{opacity:.55}}80%,100%{{transform:translateX({fill}px);opacity:0}}}}
</style>
<text class="l" x="24" y="32">ROADMAP PROGRESS</text>
<text class="v" x="876" y="32" text-anchor="end">{done} of {total} shipped</text>
<rect x="24" y="50" width="{w}" height="18" rx="9" fill="%CHIP%"/>
<clipPath id="c"><rect x="24" y="50" width="{w}" height="18" rx="9"/></clipPath>
<g clip-path="url(#c)">
  <rect x="24" y="50" width="0" height="18" fill="url(#g)"><animate attributeName="width" from="0" to="{fill}" dur="1.8s" begin=".2s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".2 .8 .2 1"/></rect>
  <rect class="sh" x="24" y="50" width="90" height="18" fill="#ffffff" fill-opacity=".35"/>
</g>
{ticks}
<circle class="pulse" cx="{24 + fill}" cy="59" r="5" fill="#ffffff"/>
</svg>
"""
    save("roadmap.svg", tpl(svg, COMMON=COMMON_CSS))


# ───────────────────────── FOOTER ─────────────────────────
def footer():
    wave = "M0 66 Q75 40 150 66 T300 66 T450 66 T600 66 T750 66 T900 66 T1050 66 T1200 66 V100 H0 Z"
    svg = """
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="100" viewBox="0 0 900 100" role="img" aria-label="Think together. Build smarter.">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="%VIOLET%"/><stop offset="1" stop-color="%TEAL%"/></linearGradient></defs>
<style>
.f{font:600 15px %MONO%;letter-spacing:3px;fill:%TEAL%;animation:pulse 3s ease-in-out infinite}
@keyframes pulse{50%{opacity:.55}}
</style>
<text class="f" x="450" y="32" text-anchor="middle">THINK TOGETHER. BUILD SMARTER.</text>
<path d="__W__" fill="url(#g)" opacity=".35"><animateTransform attributeName="transform" type="translate" from="0 0" to="-300 0" dur="9s" repeatCount="indefinite"/></path>
<path d="__W__" fill="url(#g)" opacity=".6"><animateTransform attributeName="transform" type="translate" from="-300 8" to="0 8" dur="6s" repeatCount="indefinite"/></path>
</svg>
""".replace("__W__", wave)
    save("footer.svg", tpl(svg))


if __name__ == "__main__":
    hero(); headings(); features(); flow(); stack(); roadmap(); footer()
