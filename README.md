# Enlyst — Digital Platform & Enhanced Brand System

Welcome to the official codebase for **Enlyst**, the operating partner platform and talent architecture firm engineered to **"bandage the battle wounds of business."**

---

## 🎨 Enhanced Logo & Brand System (2025–2026)

Based directly on the official Enlyst Brand Guidelines:
- **Geometry**: The founder's three-stripe diagonal parallelogram cascade in forward motion.
- **Single-Hue Opacity Rule**: Exactly **100% · 58% · 26%** for depth, hierarchy, and cross-background adaptability.
- **Typography**: Precision **Instrument Serif** (headlines & brand mark) + **Inter** (UI & body) + **DM Mono** (enlysoft only).
  - *All fonts served via Bunny Fonts (`fonts.bunny.net`) to comply with Pakistan accessibility standards.*
- **Palette**:
  - `enlyst` (HR & Talent): **#2D5BE3** (HR Blue)
  - `enlysum` (Finance & Accounting): **#1A7A4A** (Finance Green)
  - `enlybiz` (Marketing & Growth): **#C4620A** (Biz Amber)
  - `enlysoft` (Cloud & Technology): **#6B3FA0** (Tech Purple)
  - Neutrals: **#111111** (Obsidian) & **#F7F6F3** (Surface Off-White)

### Ready-to-Use Logo Assets (`assets/images/logo/`)
| File | Format | Purpose |
|---|---|---|
| `enlyst-primary-light.svg` | SVG | Horizontal mark + dark text for light backgrounds |
| `enlyst-primary-dark.svg` | SVG | Horizontal mark + white text for dark mode |
| `enlyst-primary-brand.svg` | SVG | White mark + white text on #2D5BE3 HR Blue |
| `enlyst-stacked-light.svg` | SVG | Centered mark above wordmark for light surfaces |
| `enlyst-stacked-dark.svg` | SVG | Centered mark above wordmark for dark surfaces |
| `enlyst-icon-color.svg` | SVG | Standalone three-stripe mark in HR Blue |
| `enlyst-favicon.svg` & `.png` | SVG / PNG | 64×64 rounded-square favicon |
| `enlyst-social-400x400.png` | PNG | 400×400 high-res social avatar (LinkedIn, Twitter) |
| `enlysum-*.svg` | SVG | Finance division variants in #1A7A4A |
| `enlybiz-*.svg` | SVG | Marketing division variants in #C4620A |
| `enlysoft-*.svg` | SVG | Tech division variants in #6B3FA0 with DM Mono |

👉 **Open `brand.html` in your browser to view the interactive logo gallery and download assets!**

---

## 🌟 Strategic Features

1. **"Bandaging the Battle Wounds of Business" Narrative**:
   - Compelling hero hook addressing inflation, cutthroat competition, and regulatory burdens.
   - Interactive pain-point healer mapping issues to Enlyst's four operating divisions.

2. **Sniper AI™ Sourcing Solution**:
   - Proprietary machine learning system developed by Enlyst Smart Recruiting.
   - Slashes time-to-hire and delivers **15% to 35% cost-of-hiring reduction**.
   - Integrates with ATS (Greenhouse, Lever, Workday) with 7-day free trial options.

3. **Recruitment Process Outsourcing (RPO) & Performance Management**:
   - End-to-end recruitment delegation for startups and enterprise organizations.
   - Whole-person evaluation metrics: balancing productivity, quality, and burnout avoidance.
   - Upskilling academy: Data Analytics ($92k+ entry salary), CBAP®, and Google Career Certificates.

4. **Interactive Cost Savings & ROI Calculator**:
   - Sliders for open positions, base salaries, and hiring cycles calculating direct dollar savings from Enlyst RPO.

5. **Dynamic Theme Engine**:
   - Seamless one-click switch between Obsidian dark theme and editorial light theme, with automated logo inversion.

---

## 🚀 How to Run the Website

### Option 1: One-Click Launch (Recommended)
Double-click `start.bat` in this folder. It starts the local server and opens `index.html` in your default browser.

### Option 2: Python Command
Run:
```bash
python server.py
```
Then visit [http://localhost:8000](http://localhost:8000).

### Option 3: Direct File View
Double-click `index.html` (or `brand.html`) to open directly in any browser.

---

## 📁 Project Structure

```
c:\Enlyst Project\
├── index.html              # Core platform & recruitment website
├── brand.html              # Interactive Brand Guidelines & Logo Showcase
├── server.py               # Local Python server with automatic browser launch
├── start.bat               # Windows one-click launcher
├── README.md               # Documentation
└── assets\
    ├── css\
    │   └── style.css       # Brand guidelines styling, typography & animations
    ├── js\
    │   ├── data.js         # Jobs, candidates, and market data
    │   └── app.js          # Interactive particles, calculator, theme engine, modals
    └── images\
        ├── logo\           # Full enhanced vector & raster logo suite
        ├── hero.jpg        # High-res executive leadership photography
        ├── leader.jpg      # Partner portrait
        └── network.jpg     # 3D talent network visualization
```
