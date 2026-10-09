
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

function setMenuState(open) {
    nav.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

hamburger.addEventListener('click', () => {
    setMenuState(!nav.classList.contains('active'));
});

// Escape closes the mobile menu and returns focus to the hamburger
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        setMenuState(false);
        hamburger.focus();
    }
});

/*
const DATA = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemp6djl1M3htdHdicjhnZmhraWVtbjR1M3U1ODU5ZnU0M2FkbWZ5OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LPlmexh8SLjO9OwPxP/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b3E4dXJ1ajQ3cnF1eTYyd3pxenJucDF2dnlnenJhd2JicmlldnZhaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HADJFxlJv4AF2rUAB6/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NDlnc20xdHN3OGh4a2poZnIzN25ydTR4aGxmaDZ2dHEyZHBrYzRmciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8L1j9qBR3uUlG/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dXh1Z3k0MXh6djdlc242NDRvZ28wc2VsY3l1cDdmang4dTByeXZ3ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Pir43hEPSUgBR7CSVD/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OGtrZHI1ZXVyaGtzZ3RxZTE1azdzaXJ6NHQ2eTFleXBubGY3a3owNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XcYLEpqpebmoWjUbEe/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bnJnY2FvY2U4bG1icW9jam5jdmQycDVzYmJhendnbXM5NHY5a2ZnaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0EximfiVGoId7VFm/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c2Q0dXNkMWRsOHJpZDEyM2RpNTEybzE4cDFndW5iOGcwMm9xZmR6cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9eomukGUKIMLTcxXnO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkcjN2NHlub3l2NHlsanZlNzBxOTlieWN4Ymd2NXo4bWV0ZmhiYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/joP5uM0DWcREs/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkcjN2NHlub3l2NHlsanZlNzBxOTlieWN4Ymd2NXo4bWV0ZmhiYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hnO7HE86HcSiY/giphy.gif",
	
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NTdhYWU2YnR6bmd1ajZ4cmR4ZXdrb2Y0bW11MTRweG9pdWNkbDZ2ZiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/ejxrYMPC9EoAWxJ6A4/giphy.gif",

"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGNjbzZqNmcyMzA4NGl4a2w1ZGh2ODdrNTRlcjUxdmExa3kzYnoyayZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/c6O1ZXP9vBfgzxfX5q/giphy.gif",

"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGNjbzZqNmcyMzA4NGl4a2w1ZGh2ODdrNTRlcjUxdmExa3kzYnoyayZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/I7uWdHANWHEiZkx9vt/giphy.gif"
];

const N = DATA.length;
const container = document.querySelector('.a3d');
container.style.setProperty('--n', N);

for (let i = 0; i < N; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.setProperty('--i', i);

  const img = document.createElement('img');
  img.src = DATA[i];
  img.alt = 'gif image';

  const text = document.createElement('div');
  text.className = 'card-text';
  text.id = `card${i + 1}`;
  text.textContent = `FEATURE ${i + 1}`;


  card.appendChild(img);
  card.appendChild(text);

  // Create reflection div
  const reflection = document.createElement('div');
  reflection.className = 'reflection card';

  const reflectionImg = document.createElement('img');
  reflectionImg.src = DATA[i];
  reflectionImg.alt = 'gif reflection';

  reflection.appendChild(reflectionImg);
  card.appendChild(reflection);

  container.appendChild(card);
}

*/


const DATA = [
    'placeholders/gif0.webm',
    'placeholders/gif1.webm',
    'placeholders/gif2.webm',
    'placeholders/gif3.webm',
    'placeholders/gif4.webm',
    'placeholders/gif5.webm',
    'placeholders/gif6.webm',
    'placeholders/gif7.webm',
    'placeholders/gif8.webm',
    'placeholders/gif9.webm',
    'placeholders/gif10.webm',
    'placeholders/gif11.webm'
];

const N = DATA.length;
const container = document.querySelector('.a3d');
container.style.setProperty('--n', N);

for (let i = 0; i < N; i++) {
    const card = document.createElement('div');
    card.className = 'card';           // same class
    card.style.setProperty('--i', i); // same inline style
    card.tabIndex = 0;                // keyboard reachable
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    const video = document.createElement('video');
    video.src = DATA[i];
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-hidden', 'true');
    video.controls = false;
    video.disablePictureInPicture = true;
    video.controlsList = "nodownload nofullscreen noremoteplayback";
    video.addEventListener('contextmenu', e => e.preventDefault());


    const blocker = document.createElement('div');
    blocker.className = "video-blocker";
    //blocker.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
    // Optionally add JS for tap if you want custom action
    card.appendChild(blocker);



    const text = document.createElement('div');
    text.className = 'card-text';      // same class
    text.id = `card${i + 1}`;
    text.textContent = `FEATURE ${i + 1}`;

    card.appendChild(video);
    card.appendChild(text);

    // reflection as in your original code
    const reflection = document.createElement('div');
    reflection.className = 'reflection card';

    const reflectionVideo = document.createElement('video');
    reflectionVideo.src = DATA[i];
    reflectionVideo.autoplay = true;
    reflectionVideo.loop = true;
    reflectionVideo.muted = true;
    reflectionVideo.playsInline = true;
    reflectionVideo.preload = 'metadata';
    reflectionVideo.setAttribute('aria-hidden', 'true');
    reflectionVideo.controls = false;
    reflectionVideo.disablePictureInPicture = true;
    reflectionVideo.controlsList = "nodownload nofullscreen noremoteplayback";
    reflectionVideo.addEventListener('contextmenu', e => e.preventDefault());

    reflection.appendChild(reflectionVideo);
    card.appendChild(reflection);

    container.appendChild(card);
}



//---- video autoplay + visibility (only decode what is on screen) ----
const videos = document.querySelectorAll('.card video');

function playVideo(v) {
    const p = v.play();
    // autoplay can be rejected (e.g. hidden tab) - swallow the rejection
    if (p && typeof p.catch === 'function') p.catch(() => {});
}

const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const v = entry.target;
        v.dataset.inview = entry.isIntersecting ? '1' : '0';
        if (entry.isIntersecting && !document.hidden) {
            playVideo(v);
        } else {
            v.pause();
        }
    });
}, { rootMargin: '50px' });

videos.forEach(v => videoObserver.observe(v));

document.addEventListener('visibilitychange', () => {
    videos.forEach(v => {
        if (document.hidden) {
            v.pause();
        } else if (v.dataset.inview === '1') {
            playVideo(v);
        }
    });
});
//---- end video autoplay + visibility ----



/*links  
const DATA = [
    '1540968221243-29f5d70540bf',
    '1596135187959-562c650d98bc',
    '1628944682084-831f35256163',
    '1590013330451-3946e83e0392',
    '1590421959604-741d0eec0a2e',
    '1572613000712-eadc57acbecd',
    '1570097192570-4b49a6736f9f',
    '1620789550663-2b10e0080354',
    '1617775623669-20bff4ffaa5c',
    '1548600916-dc8492f8e845',
    '1573824969595-a76d4365a2e6',
    '1633936929709-59991b5fdd72'
  ];

  const N = DATA.length;
  const container = document.querySelector('.a3d');
  container.style.setProperty('--n', N);

  for (let i = 0; i < N; i++) {
    const img = document.createElement('img');
    img.className = 'card';
    img.src = `https://images.unsplash.com/photo-${DATA[i]}?w=280`;
    img.alt = 'jellifish';
    img.style.setProperty('--i', i);
    container.appendChild(img);
  }
*/


//------toggle root values-------
const root = document.documentElement;

let defaultValues = {
    '--background': '#780116',
    '--main-h1': '#F7b538',
    '--faint-blink': '#ff4444',
    '--main-h2': '#ff4444',
    '--main-h3': '#000000',
    '--nav-logo': '#F7b538',
    '--nav-items': '#ff4444',
    '--nav-items-hover': '#C32f27',
    '--nav-hamburger': '#ff4444',
    '--card-text': '#F7b538',
};

const activeValues = {
    '--background': '#780116',
    '--main-h1': '#F7b538',
    '--faint-blink': '#ff4444',
    '--main-h2': '#ff4444',
    '--main-h3': '#000000',
    '--nav-logo': '#F7b538',
    '--nav-items': '#ff4444',
    '--nav-items-hover': '#C32f27',
    '--nav-hamburger': '#ff4444',
    '--card-text': '#F7b538',
};

// Create form inputs dynamically (dev block - guarded, safe to delete after publish)
const form = document.getElementById('colorForm');
if (form) {
    for (const [varName, color] of Object.entries(activeValues)) {
        const label = document.createElement('label');
        label.textContent = varName + ': ';
        label.style.display = 'block';

        const input = document.createElement('input');
        input.type = 'color';
        input.value = color;
        input.dataset.var = varName;

        input.addEventListener('input', e => {
            root.style.setProperty(e.target.dataset.var, e.target.value);
        });

        label.appendChild(input);
        form.appendChild(label);
    }
}

// Show/hide menu (dev block - guarded, safe to delete after publish)
const editColorsBtn = document.getElementById('editColorsBtn');
const colorMenu = document.getElementById('colorMenu');
if (editColorsBtn && colorMenu) {
    editColorsBtn.addEventListener('click', () => {
        if (colorMenu.style.display === 'none' || !colorMenu.style.display) {
            colorMenu.style.display = 'block';
        } else {
            colorMenu.style.display = 'none';
        }
    });
}

const closeMenu = document.getElementById('closeMenu');
if (closeMenu && colorMenu) {
    closeMenu.addEventListener('click', () => {
        colorMenu.style.display = 'none';
    });
}




let active = false;

function applyColors(colors) {
    for (const [key, value] of Object.entries(colors)) {
        root.style.setProperty(key, value);
    }
}

const toggleBtn = document.getElementById('toggleBtn');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        if (active) {
            applyColors(defaultValues);
        } else {
            applyColors(activeValues);
        }
        active = !active;
    });
}
//------toggle root values-------



//-------------bounding box----------------------
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
});



document.querySelectorAll('.bounding-box').forEach(el => {
    observer.observe(el);
});

const cards = document.querySelectorAll('.card');
const box = document.querySelector('.bounding-box');

function isIntersecting(card, box) {
    const cardRect = card.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
    return !(
        cardRect.right < boxRect.left ||
        cardRect.left > boxRect.right ||
        cardRect.bottom < boxRect.top ||
        cardRect.top > boxRect.bottom
    );
}

function checkIntersect() {
    cards.forEach(card => {
        if (isIntersecting(card, box)) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

let animateRafId = null;

function animate() {
    checkIntersect();
    animateRafId = requestAnimationFrame(animate);
}

// only run the per-frame intersection check while the carousel scene is on screen
const scene = document.querySelector('.scene');
if (scene) {
    const sceneObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (animateRafId === null) animate();
            } else if (animateRafId !== null) {
                cancelAnimationFrame(animateRafId);
                animateRafId = null;
            }
        });
    });
    sceneObserver.observe(scene);
} else {
    animate();
}




/*
const carousel = document.querySelector('.a3d'); // your rotating carousel element
let scrollSpeed = 0.001; // tune speed

window.addEventListener('mousemove', e => {
  const rect = box.getBoundingClientRect();
  if (e.clientX < rect.left) {
    // outside left
    scrollCarousel(-scrollSpeed);
  } else if (e.clientX > rect.right) {
    // outside right
    scrollCarousel(scrollSpeed);
  }
});

function scrollCarousel(delta) {
  // Use same progress variable as your animation
  progress += delta;
  if (progress > 1) progress -= 1;
  if (progress < 0) progress += 1;
  carousel.style.animationDelay = `-${progress * 60}s`;
}

*/


//-------------bounding box----------------------
//-------------Typewriter----------------------
const headlines = [
    "One AI. Infinite Profiles. All Systems Go.",
    "Deploy a dev agent in seconds.",
    "Start a project → Run your team _ Alone.",
    "Power at your fingertips. What will you do?"
];



/* 
standout features 5, 6 3
*/
const cardtext = {
    card1: ['300+ commands; comlpete commandline freedom', 'streamlined workflows'],
    
    card2: ['automated documentat usage and organization', 'automate document editing with their own custom histories'],
    
    card3: ['script tracking system', 'every piece of code in the conversation is documented and saved within the session and accessible from a menu to be retrieved along with a permanent script saving system'],
    
    card4: ['get the right LLM for the job at any point in the conversation powerfully paired with a strong macro feature system', 'Models from OpenAI, Deepseek, Claude, Qwen and more'],
    
    card5: ['proprietary office suites integrated within the environment for document management', 'journaling for executives for a personal onenote/notion-like experience with notebooks along with a spreadsheets, pdfs and powerpoints.'],
    
    card6: ['voice mode for hands free interaction while still preserving internal commands', 'seamless integration with RVC and Whisper for integrating hands free assistants and custom voices.'],
    
    card7: ['customizable personas and tasks with prompt hotkeys', 'issue commands with the least amount of actions possible with multi level macros for different scales of interaction and efficiency'],
    
    card8: ['test your code directly', 'integrated runtimes for multiple languages within the application'],
    
    card9: ['add, edit, delete frequently used prompts as shortcuts', 'very powerful alias manager to avoid typing the same or similar prompts everytime'],
    
    card10: ['seamlessly switch between models and personas', 'global and local modes for extra personalized experiences'],
    
    card11: ['Multiple entry point text editing', 'send from another source and the proper agent receives it'],
    
    card12: ['very powerful document editing with their own custom histories ', 'edit documents with your small team that gets autogenerated to complete the task']
};



function animateTypewriter(element, texts, textIndex = 0, charIndex = 0) {
    // announce each headline once (not every keystroke) through the polite live region
    if (charIndex === 0 && element.id === 'typewriter_intro') {
        const live = document.getElementById('typewriter_live');
        if (live) live.textContent = texts[textIndex];
    }
    if (charIndex < texts[textIndex].length) {
        element.textContent = texts[textIndex].substring(0, charIndex + 1);
        setTimeout(() => {
            animateTypewriter(element, texts, textIndex, charIndex + 1);
        }, 60);
    } else {
        setTimeout(() => {
            const nextIndex = (textIndex + 1) % texts.length;
            animateTypewriter(element, texts, nextIndex, 0);
        }, 3000);
    }
}


const el = document.querySelector('.a3d');
let progress = 0;  // from 0 to 1

// true while a card is lifted into the foreground (revolve paused)
let carouselFocused = false;



// hover-to-pause is a desktop affordance: on touch devices the sticky :hover
// state would otherwise leave the carousel permanently paused.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    el.addEventListener('mouseenter', () => {
        if (carouselFocused) return;
        el.style.animationPlayState = 'paused';
    });

    el.addEventListener('mouseleave', () => {
        if (carouselFocused) return;
        el.style.animationPlayState = 'running';
    });
}

el.addEventListener('wheel', e => {
    if (carouselFocused) return;
    if (el.style.animationPlayState === 'paused') {
        e.preventDefault();
        // update progress by wheel delta
        progress += e.deltaY * 0.0001;
        if (progress > 1) {
            progress -= 1;
        } else if (progress < 0) {
            progress += 1;
        }
        el.style.animationDelay = `-${progress * 60}s`;
    }
});

let startX = 0;
let startY = 0;
let isThrottled = false;
//inertia
let lastX = 0;
let velocity = 0;
let lastTime = 0;
let animationId = null;

let isDragging = false;
let rafId = null;

// Card selection functionality
let selectedCard = null;
let touchStartTime = 0;
let touchStartX = 0;
let touchStartY = 0;
const MAX_TOUCH_TIME = 300;
const MAX_TOUCH_MOVE = 10;



/* ---------------- card click/tap -> foreground focus ----------------
 * Selecting a card lifts it out of the carousel into a static, full-size
 * foreground view (its reflection hidden, the revolve paused). Selecting the
 * foregrounded card again sends it back and resumes the revolve.
 */
const focusLayer = document.createElement('div');
focusLayer.id = 'focus-layer';
focusLayer.setAttribute('aria-hidden', 'true');
document.body.appendChild(focusLayer);

let focusedCard = null;      // the real card currently lifted forward
let focusClone = null;       // its overlay clone
let focusOpenedAt = 0;       // guards against the opening tap's synthetic click
let lastTouchHandled = 0;    // guards against click-after-touch double firing

// natural aspect ratio of a card's media (fallback: 9:16 portrait)
function mediaAspect(media) {
    const vw = media.videoWidth || media.naturalWidth || 0;
    const vh = media.videoHeight || media.naturalHeight || 0;
    return (vw && vh) ? (vw / vh) : (9 / 16);
}

// largest centred box of the given aspect that fits the viewport
function fitRect(ar) {
    const maxW = window.innerWidth * 0.9;
    const maxH = window.innerHeight * 0.9;
    let w = maxW, h = w / ar;
    if (h > maxH) { h = maxH; w = h * ar; }
    return {
        left: (window.innerWidth - w) / 2,
        top: (window.innerHeight - h) / 2,
        w: w, h: h,
        radius: Math.min(w, h) * 0.045
    };
}

function setBox(node, l, t, w, h, r) {
    node.style.left = l + 'px';
    node.style.top = t + 'px';
    node.style.width = w + 'px';
    node.style.height = h + 'px';
    if (r != null) node.style.borderRadius = r + 'px';
}

function openFocus(card) {
    const media = card.querySelector(':scope > video, :scope > img') ||
                  card.querySelector('video, img');
    if (!media) return;

    // clear any clone still animating out from a previous close
    focusLayer.querySelectorAll('.focus-clone').forEach(n => n.remove());

    // freeze the revolve
    carouselFocused = true;
    if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    el.style.animationPlayState = 'paused';

    const start = card.getBoundingClientRect();

    // clone the media into a fixed overlay so it can leave the 3D carousel
    const clone = document.createElement('div');
    clone.className = 'focus-clone';
    setBox(clone, start.left, start.top, start.width, start.height, null);
    clone.style.borderRadius = '1.5em';

    const m = document.createElement(media.tagName === 'IMG' ? 'img' : 'video');
    m.src = media.currentSrc || media.src;
    if (media.tagName !== 'IMG') {
        m.muted = true; m.loop = true; m.autoplay = true;
        m.setAttribute('playsinline', '');
        m.disablePictureInPicture = true;
        m.addEventListener('contextmenu', e => e.preventDefault());
    } else {
        m.alt = '';
    }
    clone.appendChild(m);
    focusLayer.appendChild(clone);

    // hide the original card (and, being its child, its reflection)
    card.style.transition = 'opacity 0.25s ease';
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';
    card.setAttribute('aria-pressed', 'true');

    const t = fitRect(mediaAspect(media));

    // commit the start geometry, then animate out to the foreground fit
    clone.getBoundingClientRect();
    const dur = '0.6s', ease = 'cubic-bezier(.22,.9,.24,1)';
    clone.style.transition =
        'left ' + dur + ' ' + ease + ', top ' + dur + ' ' + ease + ', ' +
        'width ' + dur + ' ' + ease + ', height ' + dur + ' ' + ease + ', ' +
        'border-radius ' + dur + ' ease, box-shadow ' + dur + ' ease';

    // synchronous target set (transition still animates); the forced reflow
    // above committed the start geometry so the box morphs instead of jumping.
    setBox(clone, t.left, t.top, t.w, t.h, t.radius);
    clone.classList.add('open');

    focusedCard = card;
    focusClone = clone;
    focusOpenedAt = Date.now();
    focusLayer.setAttribute('aria-hidden', 'false');

    clone.addEventListener('click', () => {
        if (Date.now() - focusOpenedAt < 350) return; // ignore the opening tap's click
        closeFocus();
    });
}

function closeFocus(opts) {
    opts = opts || {};
    const card = focusedCard, clone = focusClone;
    if (!card || !clone) return;
    focusedCard = null;
    focusClone = null;

    card.setAttribute('aria-pressed', 'false');
    focusLayer.setAttribute('aria-hidden', 'true');

    const restore = () => {
        if (clone.parentNode) clone.parentNode.removeChild(clone);
        // only un-hide / un-freeze this card if it is not focused again already
        if (focusedCard !== card) {
            card.style.opacity = '';
            card.style.pointerEvents = '';
            setTimeout(() => {
                if (focusedCard !== card) card.style.transition = '';
            }, 300);
        }
        // only resume the revolve if nothing else is focused now
        if (!focusedCard) {
            carouselFocused = false;
            if (!isDragging) el.style.animationPlayState = 'running';
        }
    };

    if (opts.instant) { restore(); return; }

    const r = card.getBoundingClientRect();
    clone.classList.remove('open');
    clone.style.transition =
        'left .45s ease-in, top .45s ease-in, width .45s ease-in, ' +
        'height .45s ease-in, border-radius .45s ease-in, box-shadow .45s ease-in';
    setBox(clone, r.left, r.top, r.width, r.height, null);
    clone.style.borderRadius = '1.5em';

    let done = false;
    const onEnd = (e) => {
        if (e.target !== clone || e.propertyName !== 'width' || done) return;
        done = true;
        clone.removeEventListener('transitionend', onEnd);
        restore();
    };
    clone.addEventListener('transitionend', onEnd);
    setTimeout(() => {
        if (done) return;
        done = true;
        clone.removeEventListener('transitionend', onEnd);
        restore();
    }, 750);
}

function activateCard(card) {
    if (focusedCard === card) {
        closeFocus();
    } else {
        if (focusedCard) closeFocus({ instant: true });
        openFocus(card);
    }
}

// click / tap / keyboard on the real cards (not the nested reflections)
document.querySelectorAll('.a3d > .card').forEach(card => {
    let ts = { time: 0, x: 0, y: 0 };

    card.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        ts.time = Date.now();
        ts.x = touch.clientX;
        ts.y = touch.clientY;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
        const touch = e.changedTouches[0];
        const dt = Date.now() - ts.time;
        const mx = Math.abs(touch.clientX - ts.x);
        const my = Math.abs(touch.clientY - ts.y);
        if (dt < MAX_TOUCH_TIME && mx < MAX_TOUCH_MOVE && my < MAX_TOUCH_MOVE) {
            lastTouchHandled = Date.now();
            activateCard(card);
        }
    }, { passive: true });

    card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (Date.now() - lastTouchHandled < 600) return; // synthetic click after a tap
        activateCard(card);
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            activateCard(card);
        }
    });
});

// Escape closes the foregrounded card
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && focusedCard) closeFocus();
});

// keep the foregrounded card fitted if the window changes size
window.addEventListener('resize', () => {
    if (!focusedCard || !focusClone) return;
    const media = focusedCard.querySelector('video, img');
    if (!media) return;
    const t = fitRect(mediaAspect(media));
    setBox(focusClone, t.left, t.top, t.w, t.h, t.radius);
});

/*
el.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;

  lastX = startX;
  lastTime = Date.now();
  velocity = 0;

  // Stop any existing animation
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  el.style.animationPlayState = 'paused';
}, { passive: false });
*/

// Carousel touch handlers
function handleTouchStart(e) {
    if (carouselFocused) return;
    const touch = e.touches[0];
    touchStartTime = Date.now();
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    startCarouselDrag(touch);
}

// Otherwise proceed with carousel drag
function startCarouselDrag(touch) {
    isDragging = true;
    startX = touch.clientX;
    startY = touch.clientY;

    lastX = startX;
    lastTime = Date.now();
    velocity = 0;

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }

    el.style.animationPlayState = 'paused';
}

scene.addEventListener('touchstart', handleTouchStart, { passive: false });





scene.addEventListener('touchmove', e => {
    if (!isDragging || isThrottled) return;

    const currentX = e.touches[0].clientX;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;

    if (deltaTime > 0) {
        velocity = (currentX - lastX) / deltaTime; // pixels per ms
    }

    lastX = currentX;
    lastTime = currentTime;

    // Your existing drag code
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(e.touches[0].clientY - startY);

    if (diffX > diffY) {
        e.preventDefault();

        const deltaX = currentX - startX;
        startX = currentX;

        progress += -deltaX * 0.001;
        if (progress > 1) progress -= 1;
        if (progress < 0) progress += 1;

        // Cancel previous RAF
        if (rafId) cancelAnimationFrame(rafId);

        // Update CSS immediately in next frame
        rafId = requestAnimationFrame(() => {
            el.style.animationDelay = `-${progress * 60}s`;
        });
    }

    isThrottled = true;
    setTimeout(() => { isThrottled = false; }, 16);
}, { passive: false });

scene.addEventListener('touchend', () => {
    isDragging = false;
    if (carouselFocused) return;

    // Clean up RAF
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }

    // Start inertia animation
    if (Math.abs(velocity) > 0.1) { // threshold
        applyInertia();
    } else {
        el.style.animationPlayState = 'running';
    }
});

function applyInertia() {
    const friction = 0.95; // adjust for feel
    const minVelocity = 0.01;

    function animate() {
        if (Math.abs(velocity) < minVelocity) {
            el.style.animationPlayState = 'running';
            return;
        }

        progress += -velocity * 0.05; // adjust multiplier for strength
        if (progress > 1) progress -= 1;
        if (progress < 0) progress += 1;
        el.style.animationDelay = `-${progress * 60}s`;

        velocity *= friction;
        animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
}

/*
el.addEventListener('touchstart', () => {
  el.style.animationPlayState = 'paused';
});

el.addEventListener('touchend', () => {
  el.style.animationPlayState = 'running';
});
*/




window.onload = () => {
    // prefers-reduced-motion: show the text statically instead of typing it
    const reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // For single intro element
    const intro = document.getElementById('typewriter_intro');
    if (intro) {
        if (reduceMotion) {
            intro.textContent = headlines[0];
            const live = document.getElementById('typewriter_live');
            if (live) live.textContent = headlines[0];
        } else {
            animateTypewriter(intro, headlines);
        }
    }

    // For all card-text elements
    const cardsText = document.querySelectorAll('.card-text');
    cardsText.forEach((card, index) => {
        const key = 'card' + (index + 1);
        const texts = cardtext[key];
        if (!texts) return;
        if (reduceMotion) {
            card.textContent = texts[0];
        } else {
            animateTypewriter(card, texts);
        }
    });

    // Prevent context menu on cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('contextmenu', e => e.preventDefault());
        //card.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
        //card.addEventListener('mousedown', e => e.preventDefault());
    });
};





/*
// Typewriter for intro
let hIndex1 = 0;
let charIndex1 = 0;
function typeEffect() {
  const element = document.getElementById("typewriter_intro");
  const text = headlines[hIndex1];
  if (charIndex1 < text.length) {
    element.textContent = text.substring(0, charIndex1 + 1);
    charIndex1++;
    setTimeout(typeEffect, 60);
  } else {
    setTimeout(() => {
      charIndex1 = 0;
      hIndex1 = (hIndex1 + 1) % headlines.length;
      typeEffect();
    }, 3000);
  }
}

// Typewriter for card-text (multiple elements)
let hIndex2 = 0;
let charIndex2 = 0;
function cardtypeEffect() {
  const element = document.querySelector(".card-text"); // first one only
  const text = headlines[hIndex2];
  if (!element) return; // guard
  if (charIndex2 < text.length) {
    element.textContent = text.substring(0, charIndex2 + 1);
    charIndex2++;
    setTimeout(cardtypeEffect, 60); // call itself
  } else {
    setTimeout(() => {
      charIndex2 = 0;
      hIndex2 = (hIndex2 + 1) % headlines.length;
      cardtypeEffect();
    }, 3000);
  }
}

window.onload = () => {
  typeEffect();
  cardtypeEffect();
};
*/
//-------------typewriter----------------------
