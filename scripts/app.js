// -----------------------------------------------------------------------------
// Bootstrap. Walks `sections` from data.js and dispatches each entry to its
// view module. Adding a new view means: (1) drop a module in `views/`, and
// (2) register it in the `views` map below. Nothing else changes.
// -----------------------------------------------------------------------------
import { profile, publications, sections } from './data.js';
import { renderHero }                      from './views/hero.js';
import { renderPublicationListSimple }     from './views/pub-list-simple.js';
import { renderPublicationListComplex }    from './views/pub-list-complex.js';
import { renderClassifier }                from './views/classifier.js';
import { renderFooter }                    from './views/footer.js';

const views = {
  'hero':                       renderHero,
  'publication-list-simple':    renderPublicationListSimple,
  'publication-list-complex':   renderPublicationListComplex,
  'classifier':                 renderClassifier,
  'footer':                     renderFooter,
};

const ctx = { profile, publications };

function renderSections() {
  const root = document.getElementById('sections');
  root.innerHTML = '';
  sections.forEach((entry) => {
    const fn = views[entry.view];
    if (!fn) {
      console.warn(`[homepage] unknown view: ${entry.view}`);
      return;
    }
    const el = document.createElement('section');
    el.className = `section section--${entry.view}`;
    if (entry.config?.id) el.id = entry.config.id;
    root.appendChild(el);
    fn(el, entry.config ?? {}, ctx);
  });
}

function setupReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.06, rootMargin: '0px 0px -6% 0px' }
  );
  els.forEach((el) => io.observe(el));
}

function setupScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function setupActiveNav() {
  const sectionEls = Array.from(document.querySelectorAll('.section[id]'));
  const navLinks   = Array.from(document.querySelectorAll('.topbar__nav a'));
  if (!sectionEls.length || !navLinks.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
        });
      }
    },
    { threshold: 0.18, rootMargin: '-30% 0px -55% 0px' }
  );
  sectionEls.forEach((el) => io.observe(el));
}

function init() {
  renderSections();
  requestAnimationFrame(() => {
    setupReveal();
    setupScrollProgress();
    setupActiveNav();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
