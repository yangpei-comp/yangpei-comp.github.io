import { escapeHtml } from './_shared.js';

export function renderClassifier(container, config, ctx) {
  const items = ctx.publications.slice();
  const allKeywords = new Set();
  items.forEach((p) => (p.keywords ?? []).forEach((k) => allKeywords.add(k)));
  const keywordList = Array.from(allKeywords).sort();

  container.innerHTML = `
    <div class="container">
      <header class="section__head" data-reveal>
        ${config.label ? `<span class="section__label">${escapeHtml(config.label)}</span>` : ''}
        <h2 class="section__title">${escapeHtml(config.title ?? '')}</h2>
        ${config.lede ? `<p class="section__lede">${escapeHtml(config.lede)}</p>` : ''}
      </header>
      <div class="cls" data-reveal>
        <div class="cls__panel">
          <div class="cls__panel-head">
            <span class="cls__panel-label">Keywords</span>
            <div class="cls__mode" role="radiogroup" aria-label="Match mode">
              <span class="cls__mode-label">match</span>
              <div class="seg">
                <button class="seg__btn is-active" data-mode="any" role="radio" aria-checked="true" type="button">any</button>
                <button class="seg__btn" data-mode="all" role="radio" aria-checked="false" type="button">all</button>
              </div>
            </div>
          </div>
          <ul class="cls__chips" role="list">
            ${keywordList.map((k) => `
              <li>
                <button class="chip" data-kw="${escapeHtml(k)}" aria-pressed="false" type="button">
                  <span class="chip__dot" aria-hidden="true"></span>
                  <span class="chip__label">${escapeHtml(k)}</span>
                </button>
              </li>
            `).join('')}
          </ul>
          <div class="cls__meta">
            <button class="cls__clear" type="button" data-action="clear">clear selection</button>
            <span class="cls__count" data-empty="false">
              <span id="cls-count">${items.length}</span><span class="cls__count-of"> &nbsp;of&nbsp; ${items.length}</span>
            </span>
          </div>
        </div>
        <ul class="cls__grid" role="list">
          ${items.map((p) => `
            <li class="cls-card" data-id="${escapeHtml(p.id ?? '')}" data-kws='${escapeHtml(JSON.stringify(p.keywords ?? []))}'>
              <a class="cls-card__inner" href="#${escapeHtml(p.id ?? '')}">
                <div class="cls-card__top">
                  ${p.venue ? `<span class="cls-card__venue">${escapeHtml(p.venue)}</span>` : '<span></span>'}
                  <span class="cls-card__id">${escapeHtml((p.id ?? '').toUpperCase())}</span>
                </div>
                <h3 class="cls-card__title">${escapeHtml(p.title)}</h3>
                <ul class="cls-card__kws" role="list">
                  ${(p.keywords ?? []).map((k) => `<li data-kw="${escapeHtml(k)}">${escapeHtml(k)}</li>`).join('')}
                </ul>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  // ---- interactivity ----
  const chips        = container.querySelectorAll('.chip');
  const cards        = container.querySelectorAll('.cls-card');
  const modeButtons  = container.querySelectorAll('.seg__btn');
  const countEl      = container.querySelector('#cls-count');
  const countWrap    = container.querySelector('.cls__count');
  const clearBtn     = container.querySelector('[data-action="clear"]');
  const selected     = new Set();
  let mode = 'any';

  function update() {
    let visible = 0;
    cards.forEach((card) => {
      const kws = JSON.parse(card.dataset.kws);
      let match;
      if (selected.size === 0) {
        match = true;
      } else if (mode === 'any') {
        match = kws.some((k) => selected.has(k));
      } else {
        match = [...selected].every((k) => kws.includes(k));
      }
      card.classList.toggle('is-dim', !match);
      card.classList.toggle('is-match', match && selected.size > 0);
      if (match) visible++;
      card.querySelectorAll('[data-kw]').forEach((el) => {
        el.classList.toggle('is-on', selected.has(el.dataset.kw));
      });
    });
    countEl.textContent = visible;
    if (countWrap) countWrap.dataset.empty = visible === 0 ? 'true' : 'false';
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const kw = chip.dataset.kw;
      if (selected.has(kw)) {
        selected.delete(kw);
        chip.classList.remove('is-active');
        chip.setAttribute('aria-pressed', 'false');
      } else {
        selected.add(kw);
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
      }
      update();
    });
  });

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      modeButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-checked', active ? 'true' : 'false');
      });
      update();
    });
  });

  clearBtn?.addEventListener('click', () => {
    selected.clear();
    chips.forEach((c) => {
      c.classList.remove('is-active');
      c.setAttribute('aria-pressed', 'false');
    });
    update();
  });
}
