function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function renderSkillOption(skill) {
  if (!skill || typeof skill !== 'object') {
    return ''
  }

  const skillId = typeof skill.id === 'string' ? skill.id : String(skill.id ?? '')
  const skillName = typeof skill.name === 'string' ? skill.name : ''

  if (skillId.trim() === '' || skillName.trim() === '') {
    return ''
  }

  return `
    <li class="skill-picker__item">
      <button
        class="skill-picker__option"
        data-skill-id="${escapeHtml(skillId)}"
        type="button"
      >
        ${escapeHtml(skillName)}
      </button>
    </li>
  `
}

export function createSkillPickerTemplate({ skills = [] } = {}) {
  const items = Array.isArray(skills) ? skills.map((skill) => renderSkillOption(skill)).filter(Boolean) : []

  return `
    <section class="skill-picker" aria-labelledby="skill-picker-title">
      <header class="skill-picker__header">
        <p class="skill-picker__eyebrow">Choose another skill</p>
        <h2 class="skill-picker__title" id="skill-picker-title">Select a skill to practice</h2>
      </header>

      ${
        items.length > 0
          ? `
            <ul class="skill-picker__list">
              ${items.join('')}
            </ul>
          `
          : `<p class="skill-picker__empty">No skills available yet.</p>`
      }
    </section>
  `
}
