function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function createSkillDomId(skillId) {
  const normalizedId = String(skillId).trim().replace(/[^a-zA-Z0-9_-]+/g, '-')

  return normalizedId === '' ? 'skill-picker-item' : `skill-picker-item-${normalizedId}`
}

function createSkillAccentStyle(color) {
  const normalizedColor = typeof color === 'string' ? color.trim() : ''

  if (!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(normalizedColor)) {
    return ''
  }

  return ` style="--skill-accent: ${escapeHtml(normalizedColor)};"`
}

function renderSkillOption(skill) {
  if (!skill || typeof skill !== 'object') {
    return ''
  }

  const skillId = typeof skill.id === 'string' ? skill.id : String(skill.id ?? '')
  const skillName = typeof skill.name === 'string' ? skill.name : ''
  const progressLabel = typeof skill.progressLabel === 'string' ? skill.progressLabel : ''
  const skillDomId = createSkillDomId(skillId)

  if (skillId.trim() === '' || skillName.trim() === '') {
    return ''
  }

  return `
    <li class="skill-picker__item">
      <button
        class="skill-picker__option"
        ${createSkillAccentStyle(skill.color)}
        data-skill-id="${escapeHtml(skillId)}"
        data-sort-rank="${escapeHtml(String(skill.sortRank ?? ''))}"
        aria-labelledby="${escapeHtml(`${skillDomId}-name`)}"
        aria-describedby="${escapeHtml(`${skillDomId}-progress`)}"
        type="button"
      >
        <span class="skill-picker__content">
          <span class="skill-picker__name" id="${escapeHtml(`${skillDomId}-name`)}">${escapeHtml(skillName)}</span>
          <span class="skill-picker__progress" id="${escapeHtml(`${skillDomId}-progress`)}">${escapeHtml(progressLabel)}</span>
        </span>
      </button>
    </li>
  `
}

function renderEmptyState(emptyState = {}) {
  const title = typeof emptyState.title === 'string' ? emptyState.title : 'No skills available yet'
  const description =
    typeof emptyState.description === 'string'
      ? emptyState.description
      : 'Add your first skill to start picking a practice target.'
  const actionLabel =
    typeof emptyState.actionLabel === 'string' ? emptyState.actionLabel : 'Create your first skill'

  return `
    <div class="skill-picker__empty" role="status" aria-live="polite">
      <div class="skill-picker__empty-copy">
        <h3 class="skill-picker__empty-title">${escapeHtml(title)}</h3>
        <p class="skill-picker__empty-description">${escapeHtml(description)}</p>
      </div>
      <button class="skill-picker__empty-action" type="button">${escapeHtml(actionLabel)}</button>
    </div>
  `
}

function getPickerCopy(purpose = 'practice') {
  if (purpose === 'goal_setup') {
    return {
      eyebrow: 'Set up a goal',
      title: 'Select a skill to configure',
      description: 'Choose a skill, then define a simple goal to track long-term progress.',
    }
  }

  return {
    eyebrow: 'Choose another skill',
    title: 'Select a skill to practice',
    description: 'Pick a skill, then launch a practice session right away.',
  }
}

export function createSkillPickerTemplate({ skills = [], emptyState = null, purpose = 'practice' } = {}) {
  const items = Array.isArray(skills) ? skills.map((skill) => renderSkillOption(skill)).filter(Boolean) : []
  const copy = getPickerCopy(purpose)

  return `
    <section class="skill-picker" aria-labelledby="skill-picker-title" aria-describedby="skill-picker-description">
      <header class="skill-picker__header">
        <div class="skill-picker__copy">
          <p class="skill-picker__eyebrow">${escapeHtml(copy.eyebrow)}</p>
          <h2 class="skill-picker__title" id="skill-picker-title">${escapeHtml(copy.title)}</h2>
          <p class="skill-picker__description" id="skill-picker-description">
            ${escapeHtml(copy.description)}
          </p>
        </div>
      </header>

      ${items.length > 0
        ? `<ul class="skill-picker__list" aria-label="Available skills">${items.join('')}</ul>`
        : renderEmptyState(emptyState)}
    </section>
  `
}
