# C_OS - Improvement Checklist

Repo: L:\__repo\C_OS
Baseline commit: 8b29ad1 (wip: cardtext formatting before improvements) - master, not pushed
Created: 2026-08-26

Legend: [ ] todo    [~] in progress    [x] done    [-] skipped

## Decisions needed before further code changes
- [x] D1 Iframe or single page: drop the iframe in index.html and inline home.html, or keep it. Affects items 8, 9, 10, 11.
- [x] D2 Deletion scope: which of these are live vs junk - dist/, export/, mac_commando/, mac_commando.zip, scriptx.js, scriptjs_scratch.js, versions/, x.bat, dontinclude/
- [x] D3 Deploy path: GitHub Pages from repo root, or the update.bat plus export/ flow. README must match.

## Phase 1 - Correctness bugs
- [x] 1 home.html - malformed comment. The line parses as an empty comment followed by literal text, so the browser renders the stray text into the nav. Confirmed live: the nav currently prints it. Fix to a normal comment.
- [x] 2 home.html - the dev colour panel sits inside the nav ul, so its form labels are appended into the nav list and the nav text becomes a run of css variable names plus Close. Give the panel a top level wrapper outside nav.
- [x] 3 home.html - toggleBtn and editColorsBtn are empty buttons: invisible but still clickable dead spots. Label them or gate the whole dev block.
- [x] 4 script.js - guard the dev lookups. getElementById on colorForm, editColorsBtn, toggleBtn and closeMenu is unguarded, so deleting the dev section (which the HTML comment tells you to do) throws and kills the carousel and the typewriter. Wrap in if (el) or use optional chaining. Highest value single fix.
- [x] 5 home.html - remove the invalid inline style on .logo-burger: a media query is not allowed in a style attribute, so font-size 50px is silently dropped. Move it to style.css.
- [x] 6 style.css - .card.selected sets transform: scale(1.1), which replaces the card 3D transform chain (rotatey plus translatez), so the selected card pops out of the ring. Use the independent scale property instead.
- [x] 7 style.css - invalid declarations: nav declares height twice (200px then 65px), nav ul has opacity: transparent (needs a number), mobile nav.active ul has display: relative.
- [x] 8 index.js is dead code - it fetches home.html into index.html, but index.html uses a full screen iframe instead. Delete it or switch to the fetch approach. Depends on D1.
- [x] 9 position: fixed inside the iframe - .bounding-box, #colorMenu and .reflection anchor to the iframe rather than the viewport. Re-check after D1.


## Phase 2 - Structure and metadata
- [x] 10 index.html and home.html share the same title C_OS:reloaded, a dev codename, so the title is duplicated. Give the real page a product title and drop the duplicate.
- [x] 11 The head is nearly empty. Add meta description, canonical, Open Graph, Twitter card, theme-color (site background is #111111) and a favicon. Remove the unused stylesheet link from index.html, since the visible page is the iframe.
- [x] 12 There is no heading structure at all: the h1 is a div with class heading_title. Make Commando_OS a real h1 and the typewriter line an h2 or p.
- [x] 13 Re-verify fixes 1 and 2 by dumping the nav textContent again with run_js.

## Phase 3 - Performance
- [x] 14 24 videos: each of the 12 cards builds a video plus a second video for its reflection. Drop the duplicate and mirror with CSS, or at minimum set preload to metadata.
- [x] 15 Autoplay and visibility: pause off screen and on a hidden tab (IntersectionObserver plus visibilitychange). Measured 0 of 24 playing in the test tab, so confirm autoplay works in a real tab. If it does not, the carousel is static placeholders.
- [x] 16 animate() runs checkIntersect every animation frame forever for 24 cards, on top of 24 CSS animated videos. Gate it to while .scene is in view, or drop it and rely on IntersectionObserver.
- [x] 17 style.css font import is broken: four families over a line broken url with stray backslashes, three of those families do not exist on Google Fonts and are never used, and Bebas Neue is unencoded. Keep the local alliance-no2 woff2, fix or self host the rest, and add display swap.

## Phase 4 - Accessibility
- [x] 18 The hamburger is a bare div: not focusable, no keyboard support, no aria-label, aria-expanded or aria-controls. Make it a button, toggle aria-expanded in the existing click handler, and close the menu on Escape.
- [x] 19 The videos are decorative. Add aria-hidden so 24 silent videos stay out of the accessibility tree.
- [x] 20 Cards are click and touch only. Add tabindex, a role, and Enter/Space handling to selectCard.
- [x] 21 prefers-reduced-motion only slows the carousel to 70s. Stop the carousel and the typewriter outright.
- [x] 22 The typewriter has no aria-live, so the headline is announced unpredictably. Add aria-live polite or expose a static text node.

## Phase 5 - Cleanup and DX
- [x] 23 Scratch and dead files tracked in git: scriptjs_scratch.js, scriptx.js, versions/scr.js, x.bat (empty), mac_commando.zip plus its extracted folder, and the stale dist/ build. Depends on D2.
- [x] 24 .gitignore is inconsistent: it lists dist, sub, server, dontinclude and .bat, yet several of those are tracked. Reconcile.
- [x] 25 README is one line. Add what the project is, how to run it locally, and how to deploy.
- [x] 26 Add .editorconfig (utf-8, no BOM). style.css, index.js and README.md currently carry a UTF-8 BOM while index.html, home.html and script.js do not.

## Verified - no action needed
- [x] The single non-ASCII character in script.js is a right arrow (U+2192) inside a headline. It is valid; the garbled text seen on the console was a terminal encoding artifact, not a file bug.

## Status log
- 2026-08-26 - Baseline committed as 8b29ad1, documentation and formatting only, no behaviour change. Working tree clean, nothing pushed.
- 2026-08-26 - Local preview server running on port 8123 for visual review.
- 2026-08-26 - This checklist written. No source files changed yet.

- 2026-10-09 - Phase 1 complete (items 1-9). index.js deleted, dev panel moved out of the nav,
  dev lookups in script.js guarded, CSS invalid declarations fixed, .card.selected uses scale.
  Assumption taken for D1: keep the iframe (item 9 documented, not redesigned).
- 2026-10-09 - Phase 2 complete (items 10-13). Product title + full metadata/FB/Twitter/theme-color
  /inline-SVG favicon on the real page, duplicate title dropped, real h1/h2 heading structure,
  item 1+2 re-verified live. Canonical URL assumes GitHub Pages root (D3).
- 2026-10-09 - Phase 3 complete (items 14-17). Videos preload=metadata + play/pause on
  visibility + off-screen pause, animate() rAF loop gated to the in-view scene, broken Google
  Fonts @import replaced with a single encoded Bebas Neue + font-display swap on the local woff2.
- 2026-10-09 - Phase 4 complete (items 18-22). Hamburger is a real button with aria-expanded/
  aria-controls + Escape-to-close, decorative videos aria-hidden, cards keyboard-selectable,
  reduced-motion stops the carousel + typewriter, polite live region announces each headline once.
- 2026-10-09 - Phase 5 complete (items 23-26). Scratch/dead files documented only (D2 = no
  deletions), .gitignore reconciled without untracking anything, README rewritten for a static
  GitHub-Pages-style root deploy (D3), .editorconfig added and the stray UTF-8 BOMs removed.
- 2026-10-09 - ALL PHASES DONE (items 1-26). Nothing pushed; all commits local on master.
