# Paly AI Labs website (v2)

Static site for Paly AI Labs at Palo Alto High School: plain HTML, CSS and JavaScript with no build step.

- Pages: `index.html`, `speakers.html`, `team.html`, `get-involved.html`
- Shared files: `styles.css`, `main.js`, `cursor.js`, `assets/`
- Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000
- Deploy: pushing to `main` runs `.github/workflows/deploy.yml`, which publishes the site to GitHub Pages at palyai.org (custom domain in `CNAME`).

The previous version (v1, a Vite/React app) is preserved in this repository's history before the v2 commit.
