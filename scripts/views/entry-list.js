// Dense list view for things like honours, scholarships, teaching, service.
// Each item is a row with a bold main text, an optional gray italic comment,
// and a right-aligned year. The data shape is open: views read the fields
// they recognise and ignore the rest, so new fields can be added freely
// (e.g. links, notes) without touching this view, mirroring the publication
// list contract.
import { escapeHtml } from './_shared.js';

export function renderEntryList(container, config, ctx) {
  const items = (ctx.entries ?? []).filter(config.filter ?? (() => true));

  container.innerHTML = `
    <div class="container">
      <header class="section__head" data-reveal>
        <h2 class="section__title">${escapeHtml(config.title ?? '')}</h2>
        ${config.lede ? `<p class="section__lede">${escapeHtml(config.lede)}</p>` : ''}
      </header>
      <ol class="entry-list" role="list">
        ${items.map((it) => {
          const head = [
            it.text    ? `<span class="entry__text">${escapeHtml(it.text)}</span>` : '',
            it.text && it.comment ? '<span class="entry__sep" aria-hidden="true">,</span> ' : '',
            it.comment ? `<span class="entry__comment">${escapeHtml(it.comment)}</span>` : '',
          ].join('');
          return `
          <li class="entry" data-reveal>
            <div class="entry__col">${head}</div>
            ${it.year != null ? `<span class="entry__year">${escapeHtml(String(it.year))}</span>` : ''}
          </li>
        `;}).join('')}
      </ol>
    </div>
  `;
}
