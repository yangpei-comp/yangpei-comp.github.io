// Shared rendering helpers used across publication-style views.

export function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function renderAuthors(authors = []) {
  if (!authors.length) return '';
  const parts = authors.map((a) => {
    const cls = ['author', a.self ? 'author--self' : 'author--other'];
    const star = a.coFirst
      ? '<sup class="author__star" aria-label="co-first author">*</sup>'
      : '';
    return `<span class="${cls.join(' ')}">${escapeHtml(a.name)}${star}</span>`;
  });
  return `<p class="pub__authors">${parts.join('<span class="author__sep">, </span>')}</p>`;
}

export function renderKeywords(keywords = []) {
  if (!keywords.length) return '';
  const items = keywords
    .map((k, i) => {
      const sep = i < keywords.length - 1
        ? '<span class="kw-sep" aria-hidden="true"> | </span>'
        : '';
      return `<span class="kw">${escapeHtml(k)}</span>${sep}`;
    })
    .join('');
  return `<p class="kw-list">${items}</p>`;
}

export function renderLinks(links = []) {
  if (!links.length) return '';
  return `<ul class="link-row" role="list">${links
    .map(
      (l) => `<li><a class="link-btn" href="${escapeHtml(l.href ?? '#')}">${escapeHtml(l.label ?? 'link')}<span class="link-btn__arrow" aria-hidden="true">↗</span></a></li>`
    )
    .join('')}</ul>`;
}

export function renderVenue(venue) {
  if (!venue) return '';
  return `<span class="venue">${escapeHtml(venue)}</span>`;
}
