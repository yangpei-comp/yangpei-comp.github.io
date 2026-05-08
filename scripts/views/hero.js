import { escapeHtml } from './_shared.js';

// Open external pages and downloadable files in a new tab.
function externalAttrs(href) {
  return /^https?:\/\//.test(href) || /\.pdf$/i.test(href)
    ? ' target="_blank" rel="noopener"'
    : '';
}

// Lightweight inline-link support inside the intro text:
// `[label](url)` becomes <a> while the rest stays escaped plain text.
function renderInlineLinks(text) {
  const escaped = escapeHtml(text);
  return escaped.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    return `<a href="${url}"${externalAttrs(url)}>${label}</a>`;
  });
}

export function renderHero(container, config, ctx) {
  const { profile } = ctx;
  const aff   = profile.affiliation || null;
  const email = profile.email       || null;

  const metaLine = (aff || email)
    ? `<p class="hero__meta" data-reveal>
         ${aff   ? `<span class="hero__affil">${escapeHtml(aff)}</span>` : ''}
         ${aff && email ? `<span class="hero__meta-sep" aria-hidden="true">·</span>` : ''}
         ${email ? `<a class="hero__email" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ''}
       </p>`
    : '';

  container.innerHTML = `
    <div class="hero">
      <div class="hero__inner">
        <figure class="hero__photo" data-reveal>
          <img src="${escapeHtml(profile.photo)}" alt="Portrait of ${escapeHtml(profile.name)}" />
        </figure>
        <div class="hero__text">
          <h1 class="hero__name" data-reveal>${escapeHtml(profile.name)}</h1>
          ${metaLine}
          <p class="hero__intro" data-reveal>${renderInlineLinks(profile.intro)}</p>
          <ul class="hero__links" role="list" data-reveal>
            ${(profile.links ?? []).map((l) => `
              <li>
                <a class="btn btn--${escapeHtml(l.kind ?? 'ghost')}" href="${escapeHtml(l.href)}"${externalAttrs(l.href)}>
                  <span class="btn__label">${escapeHtml(l.label)}</span>
                  <span class="btn__arrow" aria-hidden="true">→</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  // Build the topbar.
  const topbar = document.getElementById('topbar');
  if (topbar) {
    topbar.innerHTML = `
      <div class="topbar__progress" id="scroll-progress" aria-hidden="true"></div>
      <div class="topbar__inner">
        <a class="topbar__identity" href="#top" aria-label="Back to top">
          <span class="topbar__photo">
            <img src="${escapeHtml(profile.photo)}" alt="" />
          </span>
          <span class="topbar__name">${escapeHtml(profile.name)}</span>
        </a>
        <nav class="topbar__nav" aria-label="Primary">
          <a href="#publications">Publications</a>
          <a href="#talks">Talks</a>
        </nav>
        <div class="topbar__actions">
          ${(profile.links ?? [])
            .filter((l) => l.kind === 'primary')
            .slice(0, 1)
            .map((l) => `<a class="btn btn--small btn--primary" href="${escapeHtml(l.href)}"${externalAttrs(l.href)}><span class="btn__label">${escapeHtml(l.label)}</span><span class="btn__arrow" aria-hidden="true">→</span></a>`)
            .join('')}
        </div>
      </div>
    `;
  }

  // Show the topbar once the hero scrolls out of view.
  const heroEl = container.querySelector('.hero');
  if (topbar && heroEl) {
    const io = new IntersectionObserver(
      ([entry]) => { topbar.dataset.state = entry.isIntersecting ? 'hidden' : 'visible'; },
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
    );
    io.observe(heroEl);
  }
}
