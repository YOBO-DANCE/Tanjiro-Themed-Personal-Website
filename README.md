<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sekuya&display=swap" rel="stylesheet">


<h1 style="font-size: 50%; font-family: 'Sekuya', system-ui; text-shadow: 0 0 10% #46b077;" align="center">Tanjiro-Themed Personal Website</h1>

A vanilla JavaScript personal portfolio website themed around Demon Slayer's Tanjiro Kamado, featuring scroll-scrubbed frame animation, a physics-based custom cursor, and an interactive Nichirin sword rack.
<div style="display: flex; justify-content: center;">
<img src="./README_FILES/Screenshot 2026-09-05 145045.png" alt="Hero Screenshot" style="width: 80%;">
</div>

---
## 👉 [Live Demo](https://tanjiropersonal.netlify.app)

---

## Quick Start

Run either of the following commands to start a local development server:

```bash
# Option 1: Serve using Node.js (opens on http://localhost:3000)
npx serve .
```

![Node Server Demo](./README_FILES/Node-Server-Demo.gif)

```bash
# Option 2: Serve using Python (opens on http://localhost:8000)
python -m http.server 8000
```

![Python Server Demo](./README_FILES/Python-Server-Demo.gif)

Open `http://localhost:3000` (for Node) or `http://localhost:8000` (for Python). That's it.

---

## Features

- ### 300-frame canvas animation scrubbed to scroll — GSAP ScrollTrigger pins the section and advances frames 1:1 with scroll position; dual portrait/landscape asset sets.
  ![Frame Animation Demo](./README_FILES/Scroll-Animation-Demo.gif)

- ### Physics-based custom cursor — 20 trailing circles with spring interpolation and gradient color mapping; auto-disables on touch devices.
  <div align="center">
    <img src="./README_FILES/Custom-Cursor-Demo.gif" alt="Custom Cursor Demo" style="">
  </div>

- ### Interactive Nichirin sword rack — 5 swords as portfolio items; click opens a glassmorphism modal with dynamic content (book link, YouTube playlist, or stats).
  ![Sword Rack Demo](./README_FILES/Sword-Rack-Demo.gif)

- ### Full glassmorphism system — Consistent `backdrop-filter: blur(20px)`
  <div align="center">

    <img src="./README_FILES/Screenshot-2026-09-05-151351.png" alt="Glassmorphism UI Preview" width="800" />

    <br>

    <img src="./README_FILES/Screenshot 2026-09-05 151419.png" alt="Glassmorphism UI Preview" width="800" />

    <br>

    <img src="./README_FILES/Screenshot 2026-09-05 151444.png" alt="Glassmorphism UI Preview" width="800" />

    <br>

    <img src="./README_FILES/Screenshot 2026-09-05 151515.png" alt="Glassmorphism UI Preview" width="800" />

  </div>


- ### Responsive at 5 breakpoints — 1023/900/768/600/390px with layout shifts
    ![Responsive Demo](README_FILES/Responsive-Demo.gif)

---

## Run Locally

### Requirements
- Any static file server (Node, Python, PHP, Go, etc.)
- No Node/Python version constraints — pure HTML/CSS/JS

### Commands

```bash
# Option 1: Node (serves on :3000)
npx serve .

# Option 2: Python (serves on :8000)
python -m http.server 8000

# Option 3: PHP (serves on :8000)
php -S localhost:8000
```

### Assets Note
The canvas animation preloads **600 images** (300 landscape + 300 portrait frames). First load may take 5–10s on slow connections. For development, reduce `frameCount` in `js/script.js` (around line 91) to a smaller number.

---

## How It Works

### Scroll-Scrubbed Frame Animation
Instead of video, the "Who Am I" section uses a `<canvas>` rendering 300 preloaded PNG frames. GSAP's `ScrollTrigger` maps scroll progress → frame index with `scrub: 0.5`, creating a buttery frame-perfect animation that feels like video but responds to scroll direction/speed instantly.

### Custom Cursor Physics
20 circles follow the mouse with a spring-damper model: each circle chases the previous one at 30% of the distance per frame (`requestAnimationFrame`). Scale decreases linearly from front to back. Zero dependencies, ~40 lines.

### Sword Rack Data Model
All sword content lives in HTML `data-*` attributes — no JS objects to maintain. One click handler reads `data-type` and renders the appropriate modal template (book button, song list, or plain stats). Adding a sword = one HTML block.

### Glassmorphism Consistency
Three reusable glass patterns defined in CSS:
- `.glass-box` (hero overlay)
- `.Introduction-para` (bio card)
- `.stats-modal` (sword detail)

Each uses identical `backdrop-filter`, border, and shadow values — change one place, updates everywhere.

---

## Credits

| Asset / Library | Source |
|-----------------|--------|
| GSAP 3.12.5 + ScrollTrigger | [GreenSock](https://greensock.com/gsap/) |
| DM Sans, Sekuya, Titillium Web, Black Ops One | [Google Fonts](https://fonts.google.com/) |
| Blood Crow Condensed | Base64-embedded in CSS (woff2 + woff) |
| Hero video | Self-captured / generated |
| Nichirin sword illustrations | Custom / fan assets |
| Haganezuka character art | Demon Slayer franchise (Ufotable) |
| Frame sequence (300 frames) | Generated via ezgif / custom pipeline |

---

## Accessibility Status

- [ ] `prefers-reduced-motion` — disable cursor, reduce animation duration
- [ ] Focus-visible styles for keyboard navigation
- [ ] ARIA labels
- [ ] Alt text on decorative images

---

## Badges


<p align="center">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/YOBO-DANCE/Tanjiro-Themed-Personal-Website">
  <img alt="GitHub followers" src="https://img.shields.io/github/followers/YOBO-DANCE">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/YOBO-DANCE/Tanjiro-Themed-Personal-Website">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/YOBO-DANCE/Tanjiro-Themed-Personal-Website">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/YOBO-DANCE/Tanjiro-Themed-Personal-Website">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/YOBO-DANCE/Tanjiro-Themed-Personal-Website">
  <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Ftanjiropersonal.netlify.app">
  <img alt="GitHub License" src="https://img.shields.io/github/license/YOBO-DANCE/Tanjiro-Themed-Personal-Website">

</p>

---

*Sun Breathing 12th Form - Flame DANCE!!!!*
