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

## Project structure

- `server.js`: tiny static file server
- `public/index.html`: site content and sections
- `public/styles.css`: styling
- `public/app.js`: state legal-links and interactive guide logic

## Customize

- Add or edit guidance text in `public/index.html` and `public/app.js`
- Expand the interactive paths in the `journeyTree` object in `public/app.js`
- Replace state legal resource links if you have a preferred source
