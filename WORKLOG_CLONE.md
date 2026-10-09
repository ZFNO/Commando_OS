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
## Phase 2 - Structure and metadata

### Item 10 - duplicated dev-codename title
- Files: index.html, home.html
- Changed: index.html (the real, top-level page) now has the product title
  `<title>Commando OS</title>`. The duplicate `<title>C_OS:reloaded</title>` was removed from
  home.html, which is only ever shown inside the iframe (a document inside an iframe has no title UI).
- Verified (live DOM): document.title = "Commando OS"; the iframe document has no <title> element
  (d.querySelector('title') is null) and no page shows "C_OS:reloaded" any more.

### Item 11 - empty head (metadata + favicon)
- File: index.html
- Changed, all in the real page's <head>:
  * meta description
  * theme-color #111111 (matches the site background)
  * canonical link
  * Open Graph: og:type, og:site_name, og:title, og:description, og:url
  * Twitter card: twitter:card=summary, twitter:title, twitter:description
  * favicon as an inline SVG data URI (dark #111111 tile, faint "C", red #ff4444 dot) - no new binary
    asset added, nothing to keep in sync.
  * removed the unused `<link rel="stylesheet" href="./style.css">` (the visible page is the iframe;
    the parent only needs the inline body/iframe reset rules it already has).
- Verified (live DOM): document.title "Commando OS"; metas present = description, theme-color,
  og:type/site_name/title/description/url, twitter:card/title/description, viewport; canonical href =
  https://zfno.github.io/Commando_OS/ ; link[rel=icon] present; parent link[rel=stylesheet] count = 0.
- ASSUMPTION (D3): canonical/og:url use the GitHub Pages root URL https://zfno.github.io/Commando_OS/
  because D3 says "repo root served statically (GitHub Pages style)" and the remote is ZFNO/Commando_OS.
  If the real deploy URL differs these two hrefs must be updated.

### Item 12 - real heading structure
- Files: home.html, style.css
- Changed: `<div class="heading_title" id="titlebar">Commando_OS</div>` -> `<h1 ...>Commando_OS</h1>`
  and `<div class="heading_liner" id="typewriter_intro">` -> `<h2 ... id="typewriter_intro">`.
  The inner `.faint-blink` element was changed from <div> to <span> (a <div> is not allowed as
  content of an h1 - h1 only takes phrasing content; a span with display:inline renders identically).
  style.css got `margin: 0` added to `.heading_title` and `.heading_liner` to neutralise the UA
  margins that h1/h2 bring (divs had none), so the layout does not move.
- Verified (live DOM, iframe, fresh CSS): h1 count = 1, h2 count = 1;
    h1.heading_title: display block, margin 0px, font-size 56px (the clamp value), font-family
      "Bebas Neue", letter-spacing 9.5px, colour rgb(223,223,223) - i.e. styling unchanged
    h2.heading_liner: display block, margin 0px, font-size 12.67px, font-family "Alliance no.2" -
      styling unchanged
  The typewriter still writes into the h2 (textContent = "One AI. Infinite Profiles." mid-type).

### Item 13 - re-verify items 1 and 2 (nav textContent dump)
- Files: none (verification only)
- Evidence (live DOM, run_js on http://localhost:8123/index.html -> iframe home.html):
    nav.textContent = ".C_OS >C_OS Student Dev Enterprise Military"
    nav <li> list  = [">C_OS", "Student", "Dev", "Enterprise", "Military"]
    labels inside nav = 0
  So the stray "dev<-->" text is gone (item 1) and none of the colour-editor labels are inside the
  nav list any more (item 2). Cards still build (24 .card nodes) and the typewriter is running.
## Phase 3 - Performance

### Item 14 - 24 videos (12 cards x video + reflection video)
- File: script.js
- Changed: both the card <video> and the reflection <video> are now created with
  `preload = 'metadata'` (was unset, i.e. the browser default). Not the full "drop the duplicate and
  mirror with CSS" refactor: that would mean deleting the .reflection element and its mask/blur
  styling and rebuilding the mirrored look with -webkit-box-reflect, which cannot blur - i.e. a
  visible design change. The checklist explicitly allows "at minimum set preload to metadata", so
  that is what was done, and the real cost is handled by item 15 (only on-screen videos decode).
- Verified (live DOM, fresh cache-busted script): 24 <video> elements, `preload` = "metadata" for
  all 24 (before: 0/24). Cards and reflections still render and play (18 of 24 - the in-view ones -
  were playing once the page was treated as visible, see item 15).

### Item 15 - autoplay and visibility
- File: script.js
- Changed: added a new block after the card-building loop:
  * IntersectionObserver (rootMargin 50px) over every `.card video`: in view + tab visible -> play(),
    otherwise -> pause(). Each video records `dataset.inview`.
  * `visibilitychange` listener: tab hidden -> pause all; tab visible again -> play() the ones with
    `dataset.inview === '1'`.
  * play() rejections are swallowed (`.catch(() => {})`) so a blocked autoplay can never throw.
- WHAT THE "0 of 24 PLAYING" WAS: the automated test tab reports `document.hidden === true`
  (visibilityState "hidden"), and Chrome suspends media/rAF work there. Autoplay itself is fine:
    * before this change, in a tab reporting visibilityState "visible": 17 of 24 videos playing;
    * after this change, same tab with document.hidden forced false and visibilitychange dispatched:
      18 playing == exactly the 18 videos in view; the other 6 are paused because they are off screen.
    * with the tab hidden as normal: 0 playing, 18 flagged in-view -> this is the new
      pause-on-hidden behaviour working, not a broken autoplay.
  So the carousel is NOT static placeholders; the test tab was simply a hidden/background tab.
- Note: muting is already set (`video.muted = true`) which is what makes the autoplay policy allow it.

### Item 16 - animate() ran forever every frame
- File: script.js
- Changed: the permanent `requestAnimationFrame` loop is now gated by an IntersectionObserver on
  `.scene`:
    `let animateRafId = null; function animate() { checkIntersect(); animateRafId = requestAnimationFrame(animate); }`
    scene in view  -> start the loop once (only if animateRafId === null)
    scene off view -> cancelAnimationFrame(animateRafId); animateRafId = null
    `.scene` missing -> falls back to the old unconditional `animate();`
- Verified: because every automated tab here reports itself hidden, Chrome suspends
  IntersectionObserver/rAF callbacks in it, so the gate cannot be exercised live (a plain reload also
  shows rAF frozen at the ~9-15 frames that ran while the tab was briefly visible). Instead the exact
  code block was extracted from script.js and run against rAF/IO stubs in Node:
    PASS observed .scene
    PASS animate() started on in-view
    PASS next frame scheduled
    PASS checkIntersect keeps running in view (+3)
    PASS cancelAnimationFrame called with the live id
    PASS animateRafId cleared
    PASS no further checkIntersect while out of view
    PASS loop restarts when back in view
    PASS checkIntersect runs again
    PASS falls back to a plain loop when .scene is missing
    => ALL PASS
  Live regression check: the carousel still marks cards (9 `.card.active` at load), the typewriter
  runs and there are no errors with the new block in place.

### Item 17 - broken Google Fonts @import
- File: style.css
- Changed: the old block was four families spread over a `url(...)` broken by literal backslash +
  newline continuations (invalid CSS):
      @import url('https://fonts.googleapis.com/css2?\
      family=Emerald+Serif&\
      family=Forever+Freedom&\
      family=Bauhaus&\
      family=Bebas Neue&\
      display=swap');
  replaced with a single, correctly encoded request:
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  Emerald Serif / Forever Freedom / Bauhaus were dropped - they are never referenced anywhere in the
  live files. Also added `font-display: swap;` to the local @font-face for font/alliance-no2.woff2.
- Verified by grepping the live files (not the dist/, export/, dontinclude/, server/ copies):
    --main-font  -> only font-family var usage; value "Alliance no.2", Georgia, serif  (LOCAL woff2)
    --catchy-font -> .heading_title / .heading_title (mobile)   -> "Bebas Neue"
    --card-font  -> .card .card-text                            -> "Bebas Neue"
    "Emerald", "Forever", "Bauhaus" -> 0 hits in style.css / *.html / script.js
  Live DOM: styleSheets cssRules contains exactly 1 @import rule (parses cleanly);
  `document.fonts.check('16px "Bebas Neue"')` = true and `...("Alliance no.2")` = true,
  document.fonts.status = "loaded"; h1 computed font-family = "Bebas Neue".
## Phase 4 - Accessibility

### Item 18 - the hamburger was a bare div
- Files: home.html, script.js, style.css
- Changed:
  * home.html: `<div class="hamburger" id="hamburger">` -> 
    `<button class="hamburger" id="hamburger" type="button" aria-label="Open menu"
     aria-expanded="false" aria-controls="menu-list">`; the three bar <div>s became <span>s
     (a <div> is not phrasing content and is not valid inside a <button>), and the nav list got
     `id="menu-list"` so aria-controls points at something real.
  * script.js: the existing click handler now goes through `setMenuState(open)` which toggles
    `.active`, `aria-expanded` and `aria-label` ("Open menu" / "Close menu"). Added a document
    keydown handler: Escape closes the menu and returns focus to the hamburger.
  * style.css: `.hamburger` got a button reset (`background:none; border:0; padding:0;
    appearance:none;`) so the native button chrome does not show, and the 6 `.hamburger div`
    selectors became `.hamburger span`.
- Verified (live DOM, fresh cache-busted assets):
    tagName=BUTTON, type="button", aria-label="Open menu", aria-expanded="false",
    aria-controls="menu-list" (target exists), tabIndex=0 (reachable by Tab)
    click()      -> nav gets .active, aria-expanded="true", aria-label="Close menu"
    Escape key   -> .active removed, aria-expanded="false"
    bars: 3 spans, 25px x 3px each; with the menu open + display forced on, the X animation is
    intact: bar1 = matrix(0.707107,0.707107,-0.707107,0.707107,0.707107,7.77817)  (rotate 45deg,
    translate 6,5), bar2 = translateX(-100px) + opacity 0, bar3 = rotate(-45deg) - i.e. same as before.

### Item 19 - decorative videos in the accessibility tree
- File: script.js
- Changed: both the card video and the reflection video are created with
  `setAttribute('aria-hidden', 'true')`. They are silent, looped, control-less background clips.
- Verified (live DOM): `document.querySelectorAll('video[aria-hidden="true"]').length` = 24 out of
  24 videos.

### Item 20 - cards were click/touch only
- File: script.js
- Changed:
  * each real card is created with `card.tabIndex = 0`, `role="button"` and `aria-pressed="false"`;
  * `selectCard()` now keeps aria-pressed in sync (true on the new card, false on the previous one);
  * a keydown listener on each non-reflection card selects it on Enter or Space (with preventDefault
    so Space does not scroll).
- Verified (live DOM, fresh assets):
    .card[role="button"] = 12, cards with tabIndex 0 = 12
    card0.focus() -> document.activeElement === card0
    Enter on card0 -> .selected added, aria-pressed="true"
    Space on card1 -> .selected on card1, aria-pressed="true" on card1 and "false" on card0
    (a keydown sent to a `.reflection card` is ignored - the guard keeps reflections out of the tab order)

### Item 21 - prefers-reduced-motion only slowed things down
- Files: style.css, script.js
- Changed:
  * style.css: `@media (prefers-reduced-motion: reduce) { .a3d { animation-duration: 70s } }` ->
    `.a3d { animation: none }` - the carousel stops instead of crawling.
  * script.js: window.onload now reads `matchMedia('(prefers-reduced-motion: reduce)')` and, when it
    matches, writes the first headline / first card text straight into the DOM instead of running the
    typewriter at all.
- Verified:
  * served CSS: the media rule resolves to `.a3d { animationName: none }`.
  * live DOM with matchMedia stubbed to match (temporary check page, since the automated tab cannot
    flip the OS setting): intro = "One AI. Infinite Profiles. All Systems Go." (42 chars, complete,
    no typing), the live region holds the same text, and card1's text is the complete
    "300+ commands; comlpete commandline freedom".
  * normal page (no stub): the typewriter is still animating - sampled twice, "One AI. Infinite
    Profiles. All Systems Go." then "Deploy a".

### Item 22 - the typewriter announced unpredictably
- Files: home.html, style.css, script.js
- Changed: added a polite live region as a static text node:
  `<p class="sr-only" id="typewriter_live" aria-live="polite"></p>` right after the headline h2, plus
  a `.sr-only` visually-hidden utility in style.css. script.js updates it ONCE per headline (when
  charIndex === 0 in animateTypewriter) and once for the reduced-motion path - so screen readers get
  the whole headline instead of a stream of single characters.
- Verified (live DOM): #typewriter_live.textContent = "One AI. Infinite Profiles. All Systems Go."
  (the full headline, set once when that headline started), while the visible h2 is mid-type
  ("Deploy a"), i.e. the announcements are not per-keystroke.

