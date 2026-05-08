import { escapeHtml } from './_shared.js';

function externalAttrs(href) {
  return /^https?:\/\//.test(href) || /\.pdf$/i.test(href)
    ? ' target="_blank" rel="noopener"'
    : '';
}

export function renderFooter(container, config, ctx) {
  const lastUpdated = config.lastUpdated ?? new Date().toISOString().slice(0, 10);
  const date = new Date(lastUpdated);
  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  container.innerHTML = `
    <div class="container">
      <div class="foot">
        <div class="foot__col">
          <p class="foot__eyebrow">Last updated</p>
          <p class="foot__text">
            <time class="foot__time" datetime="${escapeHtml(lastUpdated)}">${escapeHtml(dateString)}</time>
          </p>
        </div>
        <div class="foot__col">
          <p class="foot__eyebrow">Elsewhere</p>
          <ul class="foot__links" role="list">
            ${(ctx.profile.links ?? []).map((l) => `<li><a href="${escapeHtml(l.href)}"${externalAttrs(l.href)}>${escapeHtml(l.label)}<span aria-hidden="true">↗</span></a></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="foot__rule" aria-hidden="true"></div>
      <div class="foot__bottom">
        <span class="foot__copy">© ${date.getFullYear()} ${escapeHtml(ctx.profile.name)}.</span>
        <span class="foot__sig">Made with intent in ${escapeHtml(monthYear)}.</span>
      </div>
    </div>
  `;
}
