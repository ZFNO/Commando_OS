# WORKLOG_CLONE - C_OS improvement pass

Companion log for IMPROVEMENTS.md (the item numbers are the contract).
Repo: L:\__repo\C_OS   Branch: master. Local commits only - never pushed.
Baseline at start: eca1540 (docs: add improvement checklist), working tree clean.
Append-only. ASCII only, no BOM.

## Decisions applied (human had not answered; assumptions per task brief)
- D1 KEEP THE IFRAME (assumed). No single-page restructure. index.js deleted (item 8).
     Item 9 is documented instead of redesigned around.
- D2 Do NOT delete anything except index.js. dist/, export/, mac_commando*, mac_commando.zip,
     scriptx.js, scriptjs_scratch.js, versions/, x.bat, dontinclude/ were all left alone.
     Item 23 is documented only.
- D3 README written assuming the repo root is served statically (GitHub Pages style), and it
     mentions update.bat. Flagged again in Phase 5 (item 25).

Note on local verification: the preview server is python SimpleHTTP with no Cache-Control header,
so Chrome can serve a stale style.css / script.js on a plain reload. Whenever a check depended on
an edited asset, the link/script URL was cache-busted (?v=...) before measuring.

---

## Phase 1 - Correctness bugs

### Item 1 - home.html malformed comment
- File: home.html
- Changed: the two malformed dev markers `<!--> dev<-->` and `<!-- >dev<-->` no longer exist; they
  were folded into the item-2 restructure and replaced by one proper comment
  `<!-- dev panel: colour editor (dev only, safe to delete after publish) -->`.
- Why: `<!--> dev<-->` / `<!-- >dev<-->` do not parse as a comment, so the browser leaked the
  literal text "dev<-->" into the nav.
- Verified (live DOM, http://localhost:8123/index.html -> iframe home.html):
    before: nav.textContent = ".C_OS >C_OS Student Dev Enterprise Military dev<--> --background: --main-h1: ... Close"
    after : nav.textContent = ".C_OS >C_OS Student Dev Enterprise Military"
  No "dev<-->" substring remains in the nav.

### Item 2 - dev colour panel was inside the nav ul
- File: home.html
- Changed: the whole dev block (toggleBtn, editColorsBtn, #colorMenu, #colorForm, #closeMenu) was
  removed from the <li> inside <ul class="menu-list"> and moved into a new top-level
  <div class="dev-panel"> placed after </nav>. The nav <ul> now ends right after the "Military" item.
- Verified (live DOM): document.querySelectorAll('nav label').length  before: 10 labels were being
  rendered into the nav list;  after: 0.  nav.textContent no longer contains "--background:".
  The editor still works: #colorForm has 10 inputs (script.js still fills it).

### Item 3 - empty toggleBtn / editColorsBtn
- Files: home.html (plus a small style.css rule for the new container)
- Changed: the two buttons are now labelled "Toggle colors" and "Edit colors" (they were empty but
  still clickable), and the whole dev block is wrapped in <div class="dev-panel"> with a dev-only
  comment so it can be deleted wholesale after publish. style.css got a `.dev-panel` rule
  (position: fixed; bottom:0; left:0; z-index:10001) so relocating the block does not shift layout.
- Verified (live DOM): toggleBtn.textContent = "Toggle colors", editColorsBtn.textContent =
  "Edit colors"; both are still wired (menu open/close + colour toggle still work).

### Item 4 - guard the dev lookups in script.js   [highest value fix]
- File: script.js
- Changed: all four dev lookups are guarded, no other logic touched:
    colorForm      -> if (form) { ...loop... }
    editColorsBtn  -> const editColorsBtn = ...; const colorMenu = ...; if (editColorsBtn && colorMenu) {...}
    closeMenu      -> const closeMenu = ...; if (closeMenu && colorMenu) {...}
    toggleBtn      -> const toggleBtn = ...; if (toggleBtn) {...}
- Verified:
  * static: the served script.js has 0 occurrences of
    getElementById('toggleBtn'|'editColorsBtn'|'closeMenu').addEventListener  (was 3).
  * runtime with the dev block ACTUALLY REMOVED: built a throwaway copy of home.html with the whole
    <div class="dev-panel"> stripped, served it on the same local server with a cache-busted script
    URL, and the site still worked:
      - 24 .card elements created (12 cards + 12 reflections)
      - typewriter_intro typing ("One AI. Infinite" after ~2s)
      - 7 .card.active (checkIntersect()/animate() running - that code sits AFTER the dev block)
    Without the guard that copy throws at form.appendChild and everything after it dies.
  * first run of that test looked like a failure; it was Chrome serving a cached script.js.
    Re-ran with script.js?v=devcheck1 and it passed.

### Item 5 - invalid inline style on .logo-burger
- Files: home.html, style.css
- Changed: removed `style= "@media (max-width: 600px) { }font-size: 50px;"` from the .logo-burger
  anchor (a media query is not allowed in a style attribute, so font-size 50px was dropped).
  Added the intent to style.css inside the existing @media (max-width: 600px) block:
    nav.active .logo-burger { font-size: 50px; }
  (nav.active specificity is needed to beat the existing nav.active .logo-burger { font-size:1.5rem }.)
- Verified: live DOM .logo-burger computed font-size = 24px (1.5rem) at desktop width - unchanged,
  because the new rule only applies <= 600px. The rule is present in the served style.css.

### Item 6 - .card.selected wiped the 3D transform chain
- File: style.css
- Changed: .card.selected { transform: scale(1.1); transition: transform ... } ->
  .card.selected { scale: 1.1; transition: scale ... }  (the independent scale property, the same
  technique .card:hover { scale: 1.01 } already uses).
  Also fixed the identical bug in @keyframes card-pulse (transform: scale(..) -> scale: ..), which is
  used by the second .card.selected rule - otherwise the pulse would re-replace the rotatey/translatez
  chain and the selected card would still pop out of the ring.
- Verified (fresh CSS, cache-busted link; first card, classList add 'selected'):
    before: transform = matrix(1.05,0,0,1.05,0,0)   scale = none        <- chain wiped
    after : transform = matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,-492.631,1)  <- rotatey+translatez kept
            scale = 1.05 (from card-pulse)                               <- independent scale applied

### Item 7 - invalid declarations
- File: style.css
- Changed:
  * nav { height:200px; ... height:65px; } -> removed the first height:200px (kept 65px).
  * nav ul { opacity: transparent; } -> opacity: 1; (transparent is not a valid opacity value).
  * mobile nav.active ul { display: relative; } -> removed (invalid value; display:flex was already
    declared earlier in the same rule).
- Verified: served style.css has 0 occurrences of "height:200px", "opacity: transparent",
  "display: relative". Live DOM: nav height = 65px, nav ul opacity = 1.

### Item 8 - delete dead index.js
- File: index.js (deleted with git rm)
- Changed: file removed. index.html uses a full-screen iframe, so the "fetch home.html into body"
  script was dead code (D1 = keep the iframe).
- Verified: grep for "index.js" across *.html/*.js/*.md/*.bat returned only the checklist text (plus
  unrelated matches inside the gitignored server/node_modules). index.html / home.html / script.js /
  style.css unaffected and the site still loads.

### Item 9 - position: fixed inside the iframe (documented, not redesigned - D1 = keep iframe)
- Files: none (documentation only)
- Finding: the iframe is full-screen (width:100vw; height:100vh; inset:0), so the iframe's own
  viewport is the same size as the top-level viewport. position: fixed inside it therefore lands
  where the design expects.
- Evidence (live DOM: top window 633x579; iframe 633.3x579.3 at 0,0; iframe innerWidth/Height 633x579):
    .bounding-box -> position fixed, left 216.6 (= 34.2% of 633), width 253.3 (= 40vw), height 579.3 (= 100vh)
    #colorMenu and .reflection likewise compute against the iframe viewport (= window viewport here).
- Residual risk: only becomes an issue if the iframe is ever letterboxed (smaller than the window).
  Not the case today. Left as-is.
