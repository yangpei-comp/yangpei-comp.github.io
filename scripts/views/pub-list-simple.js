import {
  escapeHtml, renderAuthors, renderKeywords, renderLinks, renderVenue,
} from './_shared.js';

export function renderPublicationListSimple(container, config, ctx) {
  const items = ctx.publications.filter(config.filter ?? (() => true));
  const isCompact = config.density === 'compact';

  container.innerHTML = `
    <div class="container">
      <header class="section__head" data-reveal>
        <h2 class="section__title">${escapeHtml(config.title ?? '')}</h2>
        ${config.lede ? `<p class="section__lede">${escapeHtml(config.lede)}</p>` : ''}
      </header>
      <ol class="pub-list pub-list--simple ${isCompact ? 'pub-list--compact' : ''}" role="list">
        ${items.map((p) => {
          const tldr  = p.tldr ? `<p class="pub__tldr"><span class="pub__tldr-badge">TL;DR</span><span class="pub__tldr-text">${escapeHtml(p.tldr)}</span></p>` : '';
          const kws   = renderKeywords(p.keywords);
          const links = renderLinks(p.links);
          const body  = (tldr + kws + links).trim();
          return `
          <li class="pub pub--simple" data-reveal>
            <article id="${escapeHtml(p.id ?? '')}">
              <header class="pub__head">
                <h3 class="pub__title">${escapeHtml(p.title)}</h3>
                ${renderVenue(p.venue)}
              </header>
              ${renderAuthors(p.authors)}
              ${body ? `<div class="pub__main">${tldr}${kws}${links}</div>` : ''}
            </article>
          </li>
        `;}).join('')}
      </ol>
    </div>
  `;
}
