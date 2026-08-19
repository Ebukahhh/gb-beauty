/* ============================================
   GB Beauty Spa — main.js (Minimalist)
   ============================================ */

/* ---- Loader ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('gone');
    setTimeout(() => { loader.style.display = 'none'; }, 800);
    initReveal();
  }, 1900);
});

/* ---- Navbar: colour-switch based on section background ---- */
const navbar = document.getElementById('navbar');

function updateNav() {
  const y = window.scrollY;
  if (y > 60) {
    // detect if current section is light or dark
    const midEl = document.elementFromPoint(window.innerWidth / 2, 90);
    const section = midEl?.closest('section, .ticker, footer');
    const isLight = section?.classList.contains('section-light');
    navbar.classList.toggle('solid', !isLight);
    navbar.classList.toggle('solid-light', !!isLight);
  } else {
    navbar.classList.remove('solid', 'solid-light');
  }

  // flip link colours based on navbar bg
  const onLight = navbar.classList.contains('solid-light');
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('on-light', onLight);
  });

  updateActiveLinks();
}
window.addEventListener('scroll', updateNav, { passive: true });

/* ---- Active nav links ---- */
function updateActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + navbar.offsetHeight + 80;
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}

/* ---- Mobile Nav ---- */
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('is-open');
  navOverlay.classList.toggle('open');
  document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
});

function closeMobileNav() {
  navToggle.classList.remove('is-open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth' });
    closeMobileNav();
  });
});

/* ---- Scroll Reveal ---- */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ---- Counter animation ---- */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const raw = el.textContent.trim();
    const num = parseInt(raw);
    const suffix = raw.replace(/[0-9]/g, '');
    if (isNaN(num)) return;
    let start = 0;
    const dur = 1600;
    const step = num / (dur / 16);
    const run = setInterval(() => {
      start = Math.min(start + step, num);
      el.textContent = Math.floor(start) + suffix;
      if (start >= num) clearInterval(run);
    }, 16);
    counterObs.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.h-stat-num').forEach(el => counterObs.observe(el));

/* ---- Testimonial Slider ---- */
const track   = document.getElementById('testiTrack');
const cards   = document.querySelectorAll('.testi-card');
const dotsWrap = document.getElementById('testiDots');
const prevBtn = document.getElementById('testiPrev');
const nextBtn = document.getElementById('testiNext');

let slide = 0;
let autoT;
let vis = visCount();

function visCount() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function buildDots() {
  dotsWrap.innerHTML = '';
  const total = Math.max(0, cards.length - vis) + 1;
  for (let i = 0; i < total; i++) {
    const b = document.createElement('button');
    b.className = `t-dot${i === slide ? ' on' : ''}`;
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  }
}

function go(i) {
  vis = visCount();
  const max = Math.max(0, cards.length - vis);
  slide = Math.max(0, Math.min(i, max));
  const w = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${slide * w}px)`;
  dotsWrap.querySelectorAll('.t-dot').forEach((d, idx) => d.classList.toggle('on', idx === slide));
  resetAuto();
}

function resetAuto() {
  clearInterval(autoT);
  autoT = setInterval(() => go(slide >= cards.length - vis ? 0 : slide + 1), 5000);
}

prevBtn?.addEventListener('click', () => go(slide - 1));
nextBtn?.addEventListener('click', () => go(slide + 1));
window.addEventListener('resize', () => { vis = visCount(); buildDots(); go(slide); });

buildDots();
resetAuto();

// Touch swipe
let tx = 0;
track?.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
track?.addEventListener('touchend', e => {
  const d = tx - e.changedTouches[0].screenX;
  if (Math.abs(d) > 50) go(d > 0 ? slide + 1 : slide - 1);
});

/* ---- Booking Form ---- */
const form    = document.getElementById('bookingForm');
const success = document.getElementById('fSuccess');
const dateIn  = document.getElementById('bookDate');

if (dateIn) {
  const t = new Date();
  dateIn.min = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
}

form?.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(f => {
    if (!f.value.trim()) {
      ok = false;
      f.style.borderColor = 'rgba(180,60,60,0.6)';
      f.addEventListener('input', () => { f.style.borderColor = ''; }, { once: true });
    }
  });
  if (!ok) return;
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Request Appointment';
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 9000);
  }, 1200);
});
