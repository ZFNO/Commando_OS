# Commando OS

Static landing page / pitch deck for **Commando OS** - an AI agent workspace:
*one AI, infinite profiles, all systems go*.

It is plain HTML, CSS and JavaScript. No build step, no package manager, no framework.

> Pitch material only - no working software ships from this repo and nothing here is
> production-ready.

## What is in here

- `index.html` - entry page. Loads `home.html` in a full-screen iframe and carries the page
  title, meta / Open Graph tags, `theme-color` and an inline SVG favicon.
- `home.html` - the deck itself: nav, `h1`/`h2` headings, the 3D card carousel.
- `style.css` - all styling: dark `#111111` background, the card ring and reflection, nav,
  reduced-motion rules.
- `script.js` - builds the 12 cards and their video reflections, carousel drag/inertia, the
  typewriter, plus the visibility and accessibility hooks.
- `placeholders/*.webm` - the 12 looping placeholder clips the cards play.
- `font/alliance-no2.woff2` - self-hosted body font (Bebas Neue is loaded from Google Fonts).
- `update.bat` - local convenience script: `git add .`, `git commit`, `git push`.
- `IMPROVEMENTS.md` - the prioritised improvement checklist for this pass.
- `WORKLOG_CLONE.md` - running log of every change made against that checklist.
- `ROLLBACK_NOTE.md` - frozen notes on the pre-improvement baseline commits.

`dist/`, `export/`, `dontinclude/`, `mac_commando/`, `mac_commando.zip`, `scriptx.js`,
`scriptjs_scratch.js`, `versions/` and `server/` are scratch or legacy copies and are **not**
part of the published site.

## Run it locally

Any static file server works. The repository **root** must be the web root, because `index.html`
loads `home.html`, `style.css` and `script.js` through relative paths:

```
python -m http.server 8123
# then open http://localhost:8123/index.html
```

## Deploy

The site is static, so deployment is simply serving this repository's root - the GitHub Pages way:

1. Commit to `master` and push.
2. Repository Settings -> Pages -> Source: *Deploy from a branch*.
3. Branch `master`, folder `/ (root)`, save.

ASSUMPTION: the canonical / Open Graph URL in `index.html` is currently
`https://zfno.github.io/Commando_OS/`. Update those two hrefs if the site is hosted elsewhere.

`update.bat` is only a local shortcut for `git add .` + `git commit` + `git push`. It does not
build anything - GitHub Pages serves the committed files directly.

## Contact

For questions about Commando OS, use the contact details on the deck.

---

*This repo is for presenting ideas, not shipping code.*
