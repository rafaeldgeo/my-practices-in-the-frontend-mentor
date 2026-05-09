const DEFAULT_SKILL_COLOR = '#059669'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function createSkillFormTemplate({ color = DEFAULT_SKILL_COLOR } = {}) {
  const safeColor = escapeHtml(color || DEFAULT_SKILL_COLOR)

  return `
    <section class="skill-form-view" aria-labelledby="skill-form-title">
      <h2 class="skill-form-view__title" id="skill-form-title">Nova Skill</h2>

      <form class="skill-form">
        <div class="skill-form__feedback" aria-live="polite"></div>

        <div class="skill-form__field">
          <label for="skill-name">Nome da skill</label>
          <input
            id="skill-name"
            name="name"
            type="text"
            required
          />
        </div>

        <div class="skill-form__field">
          <label for="skill-color">Cor da skill</label>
          <input
            id="skill-color"
            name="color"
            type="color"
            value="${safeColor}"
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </section>
  `
}
