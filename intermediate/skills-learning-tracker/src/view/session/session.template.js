function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function createSessionTemplate({ skillId, skillName, feedbackMessage = '' } = {}) {
  const safeSkillId = escapeHtml(skillId ?? '')
  const safeSkillName = escapeHtml(skillName ?? '')
  const safeFeedbackMessage = escapeHtml(feedbackMessage ?? '')
  const hasFeedbackMessage = String(feedbackMessage ?? '').trim() !== ''

  return `
    <section
      class="session"
      aria-labelledby="session-title"
      aria-describedby="session-skill session-description session-feedback"
    >
      <header class="session__header">
        <div class="session__heading">
          <p class="session__eyebrow">Quick log</p>
          <h2 class="session__title" id="session-title">Log practice</h2>
          <p class="session__skill" id="session-skill">
            Practicing <strong>${safeSkillName || safeSkillId}</strong>
          </p>
        </div>
      </header>

      <p class="session__description" id="session-description">
        Pick a duration, save it fast, and keep the momentum moving.
      </p>

      <form class="session-form">
        <fieldset class="session-form__group">
          <legend class="session-form__legend">Quick durations</legend>
          <p class="session-form__hint">
            Tap a preset, or switch to a custom length when you need one.
          </p>
          <div class="session-form__presets" role="group" aria-label="Practice duration presets">
            <button type="button" class="session-form__preset" data-duration="15">15m</button>
            <button type="button" class="session-form__preset" data-duration="30">30m</button>
            <button type="button" class="session-form__preset" data-duration="60">60m</button>
            <button type="button" class="session-form__preset session-form__preset--custom" data-duration="custom">
              Custom length
            </button>
          </div>
        </fieldset>

        <div class="session-form__custom" hidden>
          <label class="session-form__label" for="custom-duration">Custom length</label>
          <p class="session-form__custom-hint">
            Use this when the session does not fit one of the quick blocks.
          </p>
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
            <button type="submit" class="session-form__submit">Log practice</button>
          </div>
        </footer>
      </form>
    </section>
  `
}
