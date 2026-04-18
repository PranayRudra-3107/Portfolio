# Pranay Rudra — Portfolio

Personal portfolio website. No build step, no dependencies — open `index.html` directly or serve with any static file server.

## Quick start

### Option 1 — Python (recommended, pre-installed on macOS/Linux)

```bash
# Python 3
python3 -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000).

### Option 2 — Node.js `npx serve`

```bash
npx serve .
```

Open the URL printed in the terminal (default: [http://localhost:3000](http://localhost:3000)).

### Option 3 — VS Code Live Server extension

1. Install the **Live Server** extension by Ritwick Dey.
2. Right-click `index.html` → **Open with Live Server**.

### Option 4 — Open directly in browser (no server needed)

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

> Note: Some browsers restrict local font loading when opened as a `file://` URL. Use a server for the best experience.

---

## Adding your CV

Place your resume PDF at:

```
assets/Shiva_Pranay_Rudra_Resume.pdf
```

The **Download CV** button and the link in the About section both point to this path.

---

## Project structure

```
Portfolio/
├── index.html                  # Main page (Hero, About, Process, Projects, Contact)
├── case-study-rag.html         # Case study: Agentic RAG Interface
├── case-study-dashboard.html   # Case study: Healthcare Benefits Dashboard
├── case-study-mcp.html         # Case study: MCP Server Management UI
├── case-study-servo.html       # Case study: Servo — Service Marketplace
├── css/
│   ├── design-system.css       # Design tokens, reset, typography, buttons, cards
│   └── styles.css              # Section styles + responsive breakpoints
├── js/
│   └── main.js                 # Scroll reveal, nav, form validation, animations
└── assets/
    └── Shiva_Pranay_Rudra_Resume.pdf   # ← add your CV here
```

---

## Customisation

| What | Where |
|---|---|
| Colors, spacing, typography | `css/design-system.css` → `:root` variables |
| Section content / copy | `index.html` |
| Case study content | `case-study-*.html` |
| Animations / interactions | `js/main.js` |

---

## Deployment

This is a static site — deploy anywhere that serves HTML files.

**Netlify (drag and drop)**
1. Go to [netlify.com](https://netlify.com) → Sites → drag the `Portfolio/` folder.

**GitHub Pages**
1. Push this repo to GitHub.
2. Go to Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your site is live at `https://<username>.github.io/<repo-name>`.

**Vercel**
```bash
npx vercel
```

---

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). CSS custom properties, `IntersectionObserver`, and `backdrop-filter` are required — all supported in browsers released after 2020.
