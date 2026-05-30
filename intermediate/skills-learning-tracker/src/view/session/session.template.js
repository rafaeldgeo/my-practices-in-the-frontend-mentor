function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeSkillAccent(color) {
  const candidate = typeof color === 'string' ? color.trim() : ''

  if (!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(candidate)) {
    return ''
  }

  return candidate
}

export function createSessionTemplate({
  skillId,
  skillName,
  skillColor,
  feedbackMessage = '',
} = {}) {
  const safeSkillId = escapeHtml(skillId ?? '')
  const safeSkillName = escapeHtml(skillName ?? '')
  const safeSkillLabel = safeSkillName || safeSkillId || 'Practice session'
  const safeSkillColor = normalizeSkillAccent(skillColor)
  const safeFeedbackMessage = escapeHtml(feedbackMessage ?? '')
  const hasFeedbackMessage = String(feedbackMessage ?? '').trim() !== ''
  const inlineStyle = safeSkillColor ? ` style="--session-accent: ${escapeHtml(safeSkillColor)};"` : ''

  return `
    <section
      class="session"
      ${inlineStyle}
      aria-labelledby="session-title"
      aria-describedby="session-action session-description session-feedback"
    >
      <header class="session__header">
        <span class="session__accent" aria-hidden="true"></span>
        <div class="session__heading">
          <p class="session__eyebrow">Practice now</p>
          <h2 class="session__title" id="session-title">${safeSkillLabel}</h2>
          <p class="session__action" id="session-action">Log a practice session</p>
        </div>
      </header>

      <p class="session__description" id="session-description">
        Choose a duration and continue.
      </p>

      <form class="session-form">
        <fieldset class="session-form__group">
          <legend class="session-form__legend">Duration</legend>
          <div class="session-form__presets" role="group" aria-label="Practice duration presets">
            <button type="button" class="session-form__preset" data-duration="15">15m</button>
            <button type="button" class="session-form__preset" data-duration="30">30m</button>
            <button type="button" class="session-form__preset" data-duration="60">60m</button>
            <button type="button" class="session-form__preset session-form__preset--custom" data-duration="custom">
              Custom
            </button>
          </div>
        </fieldset>

        <div class="session-form__custom" hidden>
          <label class="session-form__label" for="custom-duration">Custom duration</label>
          <input
            class="session-form__input"
            id="custom-duration"
            type="number"
            name="custom-duration"
            min="1"
            placeholder="25"
          />
        </div>

        <footer class="session-form__footer">
          <p
            class="session-form__feedback"
            id="session-feedback"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            tabindex="-1"
            ${hasFeedbackMessage ? '' : 'hidden'}
          >${safeFeedbackMessage}</p>

          <div class="session-form__actions">
            <button type="button" class="session-form__dismiss" data-session-close>
              Close
            </button>
            <button type="submit" class="session-form__submit">Log Practice</button>
          </div>
        </footer>
      </form>
    </section>
  `
}
