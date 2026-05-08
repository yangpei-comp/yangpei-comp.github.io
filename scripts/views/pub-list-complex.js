import {
  escapeHtml, renderAuthors, renderKeywords, renderLinks, renderVenue,
} from './_shared.js';

export function renderPublicationListComplex(container, config, ctx) {
  const items = ctx.publications.filter(config.filter ?? (() => true));

  container.innerHTML = `
    <div class="container">
      <header class="section__head" data-reveal>
        <h2 class="section__title">${escapeHtml(config.title ?? '')}</h2>
        ${config.lede ? `<p class="section__lede">${escapeHtml(config.lede)}</p>` : ''}
      </header>
      <div class="pub-list pub-list--complex">
        ${items.map((p, i) => {
          const abstract = p.abstract ? `<p class="pub__abstract">${escapeHtml(p.abstract)}</p>` : '';
          const kws      = renderKeywords(p.keywords);
          const links    = renderLinks(p.links);
          const body     = (abstract + kws + links).trim();
          return `
          <article class="pub pub--complex ${i % 2 === 1 ? 'is-flipped' : ''}" id="${escapeHtml(p.id ?? '')}" data-reveal>
            ${p.figure ? `
              <figure class="pub-figure">
                <img src="${escapeHtml(p.figure)}" alt="" loading="lazy" />
              </figure>
            ` : ''}
            <div class="pub-body">
              <div class="pub__col">
                <h3 class="pub__title pub__title--xl">${escapeHtml(p.title)}</h3>
                ${renderAuthors(p.authors)}
                ${body ? `<div class="pub__main">${abstract}${kws}${links}</div>` : ''}
              </div>
              ${renderVenue(p.venue)}
            </div>
          </article>
        `;}).join('')}
      </div>
    </div>
  `;
}
