# Sachin Jha — Portfolio

Personal portfolio site for Sachin Jha, Senior Cloud Architect.
Pure static HTML/CSS/JS — no build step, no dependencies.

## Structure

```
Portfolio11/
├── index.html    # All content and structure
├── styles.css    # Design system and layout
├── script.js     # Scroll reveals, nav behavior
└── README.md
```

## Preview locally

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

## Deploy to GitHub Pages

1. Create a repository named `<your-username>.github.io`
   (or any repo name, e.g. `portfolio`).
2. Push these files to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Source: Deploy from a branch →
   Branch: `main` / `(root)` → Save.**
4. The site goes live at `https://<your-username>.github.io/<repo>/`
   (or `https://<your-username>.github.io/` if the repo is named
   `<your-username>.github.io`).

Every future update is just `git push` — no build pipeline.

## Before going live — personalize

- **Email**: the Contact section lists `sonusachin108@gmail.com` (personal)
  and `sachin.jha@celebaltech.com` (work).
- **Content**: all copy lives in `index.html` in clearly labeled sections
  (Hero, About, Capabilities, Work, Experience, Projects, Case Study,
  Thinking, Writing, Contact).

## Editing tips

- Colors, fonts, and spacing are CSS variables at the top of `styles.css`
  (`--accent`, `--ink`, etc.) — change the whole theme from one place.
- Add a new work item by copying a `<article class="work__row">` block.
