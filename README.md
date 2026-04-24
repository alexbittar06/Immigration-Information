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

**Project-site URLs:** GitHub often links to `…/Immigration-Information` *without* a trailing slash. In that case, plain relative links like `./legal.html` would incorrectly resolve to `…/legal.html` at the domain root (404). Each HTML page sets a `<base>` tag with a tiny script: on `*.github.io`, **only** when the path is exactly `/YourRepo` or `/YourRepo/`, the base is set to `/YourRepo/`. On real pages like `…/legal.html`, the base stays `./`, so “Home” (`index.html`) always resolves next to the other HTML files.

Do **not** put `README.md` in `public/`—it can be published as a static file and confuse local testing. If “Home” ever shows README text, check the address bar: it should be `https://<user>.github.io/<repo>/…`, not the GitHub **repository** page (`github.com/...`), which always shows the repo README.

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
