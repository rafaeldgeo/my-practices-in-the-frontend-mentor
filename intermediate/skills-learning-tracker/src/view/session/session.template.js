function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function createSessionTemplate({ skillId } = {}) {
  const safeSkillId = escapeHtml(skillId ?? '')

  return `
    <section class="session" aria-labelledby="session-title">
      <header class="session__header">
        <p class="session__eyebrow">Session</p>
        <h2 class="session__title" id="session-title">Start Session</h2>
        <p class="session__skill">Skill: ${safeSkillId}</p>
      </header>

      <form class="session-form">
        <fieldset class="session-form__group">
          <legend class="session-form__legend">Choose a duration</legend>
          <div class="session-form__presets" role="group" aria-label="Session duration presets">
            <button type="button" class="session-form__preset">15m</button>
            <button type="button" class="session-form__preset">30m</button>
            <button type="button" class="session-form__preset">60m</button>
            <button type="button" class="session-form__preset">Custom</button>
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
          />
        </div>

        <div class="session-form__actions">
          <button type="submit" class="session-form__submit">Save Session</button>
        </div>
      </form>
    </section>
  `
}
