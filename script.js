/* =========================================================
   Birthday scrapbook – behaviour
   Edit CONFIG to personalise.
   ========================================================= */
'use strict';

const CONFIG = {
  password: 'Firoz',            // not case-sensitive
  name: 'Khadoos!',                // name on the red ribbon
  placeholder: 'assets/images/placeholder.svg',
  memories: [                     // swap these for your own photos or GIFs
    { src: 'assets/images/train.jpg', caption: 'train rides' },
    { src: 'assets/images/bridge.jpg', caption: 'by the river' },
    { src: 'assets/images/friends-pipe.jpg', caption: 'the whole gang' },
    { src: 'assets/images/dream-big.jpg', caption: 'dream big' },
    { src: 'assets/images/selfie.jpg', caption: 'always together' }
  ]
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- SVG templates ---------- */
const IMG = 'assets/images/';
const MASCOT_IMG = { ask: IMG + 'sky-hearts.jpg', angry: IMG + 'baby-bed.jpg', excited: IMG + 'dorayaki.jpg' };

const mascotCard = (mood, src) => `
<figure class="mascot-card" data-mood="${mood}">
  <img alt="" data-src="${src}">
  <svg class="anger" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 14 q8 -2 10 -10 M34 14 q-8 -2 -10 -10 M6 26 q8 2 10 10 M34 26 q-8 2 -10 10" fill="none" stroke="#e5322d" stroke-width="4.5" stroke-linecap="round"/></svg>
  <svg class="spk spk--1"><use href="#i-star"/></svg><svg class="spk spk--2"><use href="#i-star"/></svg><svg class="spk spk--3"><use href="#i-heart"/></svg>
</figure>`;
function setMood(root, mood, src) {
  const fig = $('.mascot-card', root); fig.dataset.mood = mood;
  const img = $('img', fig); if (src) setPhoto(img, src);
}

const giftSVG = () => `
<svg viewBox="0 0 160 170" aria-hidden="true">
  <g>
    <polygon points="20,72 80,98 80,162 20,136" fill="#2f8fdc"/>
    <polygon points="80,98 140,72 140,136 80,162" fill="#1f6fb8"/>
    <polygon points="44,80 62,88 62,152 44,144" fill="#ef5b52"/>
    <polygon points="98,90 116,82 116,146 98,154" fill="#d23f38"/>
  </g>
  <g class="lid">
    <polygon points="14,62 80,36 146,62 80,92" fill="#5fb4f2"/>
    <polygon points="14,62 80,92 80,108 14,78" fill="#2f8fdc"/>
    <polygon points="80,92 146,62 146,78 80,108" fill="#1f6fb8"/>
    <polygon points="62,46 82,38 100,46 80,56" fill="#f4766e"/>
    <polygon points="38,76 62,86 80,92 80,108 52,96" fill="#ef5b52" opacity=".0"/>
    <polygon points="58,69 80,92 80,108 58,86" fill="#ef5b52"/>
    <polygon points="80,92 102,70 102,86 80,108" fill="#d23f38"/>
    <ellipse cx="60" cy="38" rx="26" ry="14" transform="rotate(-24 60 38)" fill="#ef5b52" stroke="#b92d27" stroke-width="2"/>
    <ellipse cx="100" cy="38" rx="26" ry="14" transform="rotate(24 100 38)" fill="#ef5b52" stroke="#b92d27" stroke-width="2"/>
    <ellipse cx="60" cy="38" rx="14" ry="6" transform="rotate(-24 60 38)" fill="#c9332d" opacity=".7"/>
    <ellipse cx="100" cy="38" rx="14" ry="6" transform="rotate(24 100 38)" fill="#c9332d" opacity=".7"/>
    <circle cx="80" cy="46" r="9" fill="#f7c63a" stroke="#c9961a" stroke-width="2"/><path d="M72 47h16" stroke="#c9961a" stroke-width="1.6"/>
  </g>
</svg>
<span class="tick"><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;

const cakeSVG = () => {
  let candles = '';
  [78, 107, 136, 165, 194, 223].forEach((x, i) => {
    candles += `
    <g>
      <circle class="glow" cx="${x}" cy="46" r="20" fill="#ffd978" opacity=".6"/>
      <rect x="${x - 5}" y="56" width="10" height="46" rx="2" fill="#d4262e"/>
      <rect x="${x - 5}" y="56" width="4" height="46" rx="2" fill="#ee5a60" opacity=".7"/>
      <path class="flame" style="animation-delay:${i * .07}s" d="M${x} 28 C${x + 8} 38 ${x + 7} 50 ${x} 54 C${x - 7} 50 ${x - 8} 38 ${x} 28Z" fill="#ffb02e"/>
      <path class="flame" style="animation-delay:${i * .07}s" d="M${x} 38 C${x + 4} 44 ${x + 3} 51 ${x} 53 C${x - 3} 51 ${x - 4} 44 ${x} 38Z" fill="#fff3b0"/>
      <path class="smoke" d="M${x} 50 q-6 -10 0 -20 q6 -10 0 -20" fill="none" stroke="#aaa" stroke-width="3" stroke-linecap="round"/>
    </g>`;
  });
  return `
<svg viewBox="0 0 300 260" aria-hidden="true">
  <ellipse cx="150" cy="240" rx="138" ry="16" fill="#e9d6bf"/>
  <path d="M42 170 h216 v62 q0 10 -10 10 h-196 q-10 0 -10 -10z" fill="#f3d9b5"/>
  <path d="M42 170 h216 v22 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0z" fill="#fff4e4"/>
  <path d="M62 108 h176 v66 h-176z" fill="#f6dfbf"/>
  <path d="M62 108 h176 v20 q-11 14 -22 0 q-11 14 -22 0 q-11 14 -22 0 q-11 14 -22 0 q-11 14 -22 0 q-11 14 -22 0 q-11 14 -22 0 q-11 14 -22 0z" fill="#fffaf0"/>
  <text x="150" y="212" text-anchor="middle" font-family="Great Vibes, cursive" font-size="34" fill="#d4262e">I love you</text>
  <circle cx="88" cy="150" r="5" fill="#e45a63"/><circle cx="150" cy="156" r="5" fill="#e45a63"/><circle cx="212" cy="150" r="5" fill="#e45a63"/>
  ${candles}
</svg>`;
};

/* ---------- screen manager ---------- */
const frame = $('#frame');
const screens = Object.fromEntries($$('.screen').map(s => [s.id.replace('screen-', ''), s]));
let current = 'lock';
let busy = false;

async function show(name) {
  if (busy || name === current || !screens[name]) return;
  busy = true;
  const from = screens[current], to = screens[name];
  from.classList.remove('is-active');
  frame.dataset.theme = to.dataset.frame || 'soft';
  await sleep(reduceMotion ? 0 : 380);
  to.classList.add('is-active');
  current = name;
  $$('.pop', to).forEach(el => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
  onEnter[name] && onEnter[name]();
  await sleep(reduceMotion ? 0 : 420);
  busy = false;
}

/* ---------- typing text on an SVG arc / element ---------- */
const typers = new WeakMap();
async function typeText(el, text, speed = 70) {
  const token = {}; typers.set(el, token);
  el.textContent = '';
  fitArc(el, text);
  for (const ch of text) {
    if (typers.get(el) !== token) return;
    el.textContent += ch;
    await sleep(reduceMotion ? 0 : speed);
  }
}

/* shrink arc headlines so long text always fits the curve */
function fitArc(textPath, text) {
  const t = textPath.closest ? textPath.closest('text') : null;
  if (!t) return;
  const size = Math.max(34, Math.min(66, 700 / (text.length * .56)));
  t.style.fontSize = size + 'px';
}
$$('.arc--gifts textPath').forEach(tp => fitArc(tp, tp.textContent));

/* ---------- decorations ---------- */
function addDeco(screen, count, kinds = ['heart', 'star']) {
  if (screen.querySelector('.deco')) return;
  const box = document.createElement('div'); box.className = 'deco';
  const colors = ['#e5322d', '#1f8fe3', '#ff8f9c', '#f7c63a'];
  for (let i = 0; i < count; i++) {
    const kind = kinds[i % kinds.length];
    const el = document.createElement('i');
    el.className = kind;
    const edge = i % 2 ? Math.random() * 12 : 88 - Math.random() * 12;
    el.style.cssText = `left:${edge}%;top:${8 + Math.random() * 84}%;--s:${12 + Math.random() * 20}px;--c:${colors[i % colors.length]};--t:${4 + Math.random() * 4}s;--dl:${-Math.random() * 5}s;--r:${Math.random() * 30 - 15}deg`;
    el.innerHTML = `<svg><use href="#i-${kind}"/></svg>`;
    box.appendChild(el);
  }
  screen.prepend(box);
}

/* ---------- photos with graceful fallback ---------- */
function setPhoto(img, src) {
  img.addEventListener('error', () => { if (!img.src.endsWith('placeholder.svg')) img.src = CONFIG.placeholder; }, { once: true });
  img.src = src;
}
$$('img[data-photo]').forEach(img => setPhoto(img, img.dataset.photo));

/* =========================================================
   1. LOCK
   ========================================================= */
const lockForm = $('#lockForm'), pw = $('#pw'), captcha = $('#captcha'), pwMsg = $('#pwMsg');
let robotOK = false;

captcha.addEventListener('click', async () => {
  if (robotOK || captcha.classList.contains('is-loading')) return;
  captcha.classList.add('is-loading');
  await sleep(750);
  captcha.classList.remove('is-loading');
  robotOK = true;
  captcha.setAttribute('aria-checked', 'true');
  pwMsg.textContent = '';
});

lockForm.addEventListener('submit', e => {
  e.preventDefault();
  if (pw.value.trim().toLowerCase() !== CONFIG.password.toLowerCase()) return fail('Wrong password, try again.');
  if (!robotOK) return fail('Please confirm you are not a robot.');
  pwMsg.textContent = '';
  startMusic();
  startMascotFlow();
  show('mascot');
});
function fail(msg) {
  pwMsg.textContent = msg;
  lockForm.classList.remove('shake'); void lockForm.offsetWidth; lockForm.classList.add('shake');
  if (msg.startsWith('Wrong')) { pw.select(); }
}

/* =========================================================
   2-4. MASCOT QUESTIONS
   ========================================================= */
const mascotMain = $('#mascotMain'), arcText = $('#arcAskText'), mascotSub = $('#mascotSub'), choicesEl = $('#choices');
mascotMain.innerHTML = mascotCard('ask', MASCOT_IMG.ask);
$$('img[data-src]', mascotMain).forEach(i => setPhoto(i, i.dataset.src));

const SCENES = {
  ask: {
    text: 'I have made something for you', sub: 'Do you wanna see it?', mood: 'happy',
    choices: [{ label: 'YES', go: 'excited', r: '-4deg' }, { label: 'NO', go: 'angry', r: '5deg' }]
  },
  angry: {
    text: 'HOW DARE YOU!?', sub: '', mood: 'angry',
    choices: [{ label: 'TRY AGAIN', go: 'ask', cls: 'choice--try' }]
  },
  excited: {
    text: 'Are you really excited?', sub: '', mood: 'excited',
    choices: [{ label: 'YES', go: 'gifts', r: '-4deg' }, { label: 'YES', go: 'gifts', r: '4deg' }]
  }
};

async function playScene(key) {
  const sc = SCENES[key];
  choicesEl.innerHTML = ''; mascotSub.textContent = '';
  setMood(mascotMain, key, MASCOT_IMG[key === 'ask' ? 'ask' : key]);
  if (sc.mood === 'angry') bumpScreen();
  if (sc.mood === 'excited') confetti(60);
  await typeText(arcText, sc.text, 65);
  if (!screens.mascot.classList.contains('is-active') && current !== 'mascot') return;
  mascotSub.textContent = sc.sub;
  sc.choices.forEach((c, i) => {
    const b = document.createElement('button');
    b.className = 'choice pop ' + (c.cls || ''); b.textContent = c.label;
    b.style.setProperty('--r', c.r || '0deg'); b.style.setProperty('--d', i * .12 + 's');
    b.addEventListener('click', () => c.go === 'gifts' ? (confetti(90), show('gifts')) : playScene(c.go));
    choicesEl.appendChild(b);
  });
}
function bumpScreen() {
  const sc = $('.scene', screens.mascot);
  sc.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }], { duration: 350, iterations: 2 });
}
function startMascotFlow() { playScene('ask'); }

/* =========================================================
   5. GIFTS
   ========================================================= */
const GIFT_TARGETS = ['birthday', 'wish', 'memories'];
const giftsEl = $('#gifts');
const opened = new Set();
GIFT_TARGETS.forEach((target, i) => {
  const b = document.createElement('button');
  b.className = 'gift pop'; b.dataset.target = target; b.setAttribute('aria-label', `Open gift ${i + 1}`);
  b.style.setProperty('--d', i * .15 + 's'); b.style.setProperty('--dl', i * -1.1 + 's');
  b.innerHTML = giftSVG();
  b.addEventListener('click', async () => {
    if (busy) return;
    b.classList.add('is-opening');
    confetti(45, b.getBoundingClientRect());
    await sleep(reduceMotion ? 0 : 650);
    opened.add(target); b.classList.add('is-opened');
    show(target);
  });
  giftsEl.appendChild(b);
});
$('#mascotHint').innerHTML = `<figure class="avatar"><img alt="" data-photo="${MASCOT_IMG.ask}"></figure>`;
$$('img[data-photo]', $('#mascotHint')).forEach(i => setPhoto(i, i.dataset.photo));
$('#giftsNext').addEventListener('click', () => {
  if (opened.size < GIFT_TARGETS.length) {
    $('#giftHint').textContent = 'OPEN ALL 3 FIRST!';
    giftsEl.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-1.5deg)' }, { transform: 'rotate(1.5deg)' }, { transform: 'rotate(0)' }], { duration: 300 });
    return;
  }
  confetti(120); show('final');
});

/* =========================================================
   7. WISH
   ========================================================= */
const cake = $('#cake'), wishMsg = $('#wishMsg');
cake.innerHTML = cakeSVG();
function blowCandles() {
  if (cake.classList.contains('is-out')) return relight();
  cake.classList.add('is-out');
  wishMsg.textContent = 'Your wish is on its way. Happy birthday!';
  confetti(140);
  setTimeout(() => { if (cake.classList.contains('is-out') && current === 'wish') openLightbox(IMG + 'moon.jpg', 'your wish is on its way'); }, 1100);
}
function relight() {
  cake.classList.remove('is-out');
  wishMsg.textContent = 'Close your eyes, think of a wish, then blow the candles.';
}
cake.addEventListener('click', blowCandles);
$('#candy').addEventListener('click', blowCandles);

/* =========================================================
   8. MEMORIES
   ========================================================= */
const stringsEl = $('#strings');
const polaroids = CONFIG.memories.map((m, i) => {
  const f = document.createElement('figure');
  f.className = 'polaroid'; f.tabIndex = 0;
  f.innerHTML = `<div class="polaroid__img"><img alt="${m.caption}"></div><figcaption>${m.caption}</figcaption>`;
  setPhoto($('img', f), m.src);
  f.style.setProperty('--r', (i % 2 ? 3 : -3) + 'deg'); f.style.setProperty('--dl', -i * .8 + 's');
  const open = () => openLightbox($('img', f).src, m.caption);
  f.addEventListener('click', open);
  f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  return f;
});

let memRows = 0;
function layoutMemories() {
  const rows = innerWidth >= 760 ? 1 : 2;
  if (rows === memRows) return;
  memRows = rows;
  stringsEl.innerHTML = '';
  const groups = rows === 1 ? [polaroids] : [polaroids.slice(0, 3), polaroids.slice(3)];
  groups.forEach(g => {
    const row = document.createElement('div'); row.className = 'string';
    row.innerHTML = `<svg class="cord" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,8 Q50,48 100,8"/></svg>`;
    g.forEach((p, i) => {
      const x = (i + .5) / g.length, y = 8 + 40 * 2 * x * (1 - x);
      p.style.left = (x * 100) + '%'; p.style.top = (y - 1) + '%';
      row.appendChild(p);
      if (i < g.length - 1) {
        const bx = (i + 1) / g.length, by = 8 + 40 * 2 * bx * (1 - bx);
        const bulb = document.createElement('i'); bulb.className = 'bulb';
        bulb.style.cssText = `left:${bx * 100}%;top:${by + 1}%;--dl:${-i * .6}s`;
        row.appendChild(bulb);
      }
    });
    stringsEl.appendChild(row);
  });
}
layoutMemories();
addEventListener('resize', layoutMemories);

const lightbox = $('#lightbox');
function openLightbox(src, caption) {
  $('img', lightbox).src = src; $('figcaption', lightbox).textContent = caption;
  lightbox.hidden = false;
}
lightbox.addEventListener('click', () => { lightbox.hidden = true; });
addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.hidden = true; });

/* =========================================================
   9. LETTER – staggered paragraph reveal
   ========================================================= */
$$('.letter__dear, .letter__body p, .letter__sign').forEach((el, i) => el.style.setProperty('--i', i));

/* =========================================================
   10. FINAL
   ========================================================= */
$('#replayBtn').addEventListener('click', () => { opened.clear(); $$('.gift').forEach(g => g.classList.remove('is-opening', 'is-opened')); $('#giftHint').textContent = ''; show('gifts'); });
$('#lockBtn').addEventListener('click', () => {
  opened.clear(); $$('.gift').forEach(g => g.classList.remove('is-opening', 'is-opened'));
  robotOK = false; captcha.setAttribute('aria-checked', 'false'); pw.value = ''; pwMsg.textContent = '';
  stopMusic(); show('lock');
});

/* ---------- per-screen entry hooks ---------- */
const onEnter = {
  gifts() {
    const hint = $('#giftHint');
    if (opened.size < GIFT_TARGETS.length) typeText(hint, 'CLICK ON THE GIFTS', 70);
    else { hint.textContent = 'ALL OPENED! TAP THE ARROW'; }
  },
  letter() { $('#letterScroll').scrollTop = 0; },
  birthday() { confetti(70); },
  wish() { relight(); },
  final() { confetti(120); }
};

/* generic navigation buttons */
$$('[data-goto]').forEach(b => b.addEventListener('click', () => show(b.dataset.goto)));

/* decorative floaters */
['mascot', 'gifts', 'birthday', 'wish', 'final'].forEach(k => addDeco(screens[k], 12, ['heart', 'bell', 'star', 'dora']));

/* =========================================================
   Music (optional – only shown if the mp3 exists)
   ========================================================= */
const bgm = $('#bgm'), musicBtn = $('#musicBtn');
let musicOK = true;
bgm.addEventListener('error', () => { musicOK = false; musicBtn.hidden = true; });
function startMusic() {
  if (!musicOK) return;
  bgm.volume = .6;
  bgm.play().then(() => { musicBtn.hidden = false; musicBtn.setAttribute('aria-pressed', 'true'); }).catch(() => { });
}
function stopMusic() { bgm.pause(); bgm.currentTime = 0; musicBtn.hidden = true; }
musicBtn.addEventListener('click', () => {
  const on = musicBtn.getAttribute('aria-pressed') === 'true';
  on ? bgm.pause() : bgm.play().catch(() => { });
  musicBtn.setAttribute('aria-pressed', String(!on));
});

/* =========================================================
   Tap sparkles + confetti (lightweight canvas)
   ========================================================= */
addEventListener('pointerdown', e => {
  if (reduceMotion) return;
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('span'); s.className = 'tap-fx';
    const a = Math.random() * Math.PI * 2, d = 26 + Math.random() * 30;
    s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;color:${['#e5322d', '#1f8fe3', '#f7c63a'][i % 3]}`;
    s.innerHTML = `<svg><use href="#i-${i % 2 ? 'heart' : 'star'}"/></svg>`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
});

const cvs = $('#confetti'), ctx = cvs.getContext('2d');
let parts = [], raf = 0;
function sizeCanvas() { const r = devicePixelRatio > 1 ? 1.5 : 1; cvs.width = innerWidth * r; cvs.height = innerHeight * r; ctx.setTransform(r, 0, 0, r, 0, 0); }
sizeCanvas(); addEventListener('resize', sizeCanvas);
function confetti(n = 80, rect) {
  if (reduceMotion) return;
  const ox = rect ? rect.left + rect.width / 2 : innerWidth / 2;
  const oy = rect ? rect.top + rect.height / 2 : innerHeight * .35;
  const cols = ['#e5322d', '#1f8fe3', '#ff8f9c', '#ffffff', '#9fd2fa', '#f7c63a'];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 7;
    parts.push({ x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, w: 6 + Math.random() * 6, h: 4 + Math.random() * 5, r: Math.random() * 6, vr: Math.random() * .4 - .2, c: cols[i % cols.length], life: 110 + Math.random() * 40 });
  }
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter(p => p.life > 0);
  for (const p of parts) {
    p.vy += .24; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
    ctx.save(); ctx.globalAlpha = Math.min(1, p.life / 30);
    ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
  }
  raf = parts.length ? requestAnimationFrame(tick) : 0;
  if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
}

/* ribbon name */
$('#bdayName').textContent = CONFIG.name;
