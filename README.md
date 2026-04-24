# Immigration Information Website

Simple Node + npm website that provides:

- Basic "know your rights" information
- Steps for what to do if detained
- Legal resource links by U.S. state
- Interactive click-through immigration situation guide

## Run locally

1. Open a terminal in this directory:
   - `cd /escnfs/home/abittar/Immigration-Information`
2. Start the site:
   - `npm start`
3. Open:
   - `http://localhost:3000`

## Publish on GitHub Pages

The site is static files under `public/`. GitHub Pages does not run `server.js`; the workflow below uploads `public/` as the site root.

1. On GitHub: open the repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Push this repo (including `.github/workflows/deploy-github-pages.yml`). The **Deploy to GitHub Pages** workflow runs on every push to `main`.
4. After the first successful run, Pages shows a URL like  
   `https://alexbittar06.github.io/Immigration-Information/`  
   (your username + repo name). Opening that URL loads `public/index.html`.

If the workflow fails, check **Actions** → the failed run → logs. Common fixes: enable **Settings → Pages → Source: GitHub Actions**; ensure **Actions** are allowed in **Settings → Actions → General**.

## Project structure

- `server.js`: tiny static file server
- `public/index.html`: site content and sections
- `public/styles.css`: styling
- `public/app.js`: state legal-links and interactive guide logic

## Customize

- Add or edit guidance text in `public/index.html` and `public/app.js`
- Expand the interactive paths in the `journeyTree` object in `public/app.js`
- Replace state legal resource links if you have a preferred source
