# Py-Microgrid Website

The website for [Py-Microgrid](https://github.com/Hanrong-Huang/Py-Microgrid), an open-source Python toolkit for sizing and optimizing hybrid microgrids (solar PV, wind, battery, and genset) on NREL's HOPP framework.

**Live site:** https://hanrong-huang.github.io/py_microgrid_webpage/

## Run locally

```bash
git clone https://github.com/Hanrong-Huang/py_microgrid_webpage.git
cd py_microgrid_webpage
python -m http.server 8000     # or: npm install && npm run dev
```

Then open http://localhost:8000.

## Build

The site is static HTML/CSS/JS with no framework. `npm run build` writes a minified copy to `dist/`:

```bash
npm install
npm run build
```

## Structure

```
index.html                 # Single-page site
assets/css/main.css        # Design tokens, base styles, utilities
assets/css/components.css  # Component styles
assets/js/main.js          # Theme toggle, tabs, diagram popups, scroll reveals
docs/, examples/           # Redirects into index.html
.github/workflows/         # GitHub Pages deploy
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow, which minifies the source into `dist/` and publishes it to GitHub Pages. No manual step required.

## About the package

Py-Microgrid co-optimizes PV, wind, battery, and genset against a load profile and returns the least-cost system, with LCOE, net present cost, and CO₂ analysis. See the [main repository](https://github.com/Hanrong-Huang/Py-Microgrid) for installation and usage.

## License

BSD 3-Clause. Built on [NREL HOPP](https://github.com/NREL/HOPP) and developed at UNSW Sydney.

Contact: [hanrong.huang@unsw.edu.au](mailto:hanrong.huang@unsw.edu.au)
