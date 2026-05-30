const DEFAULT_SKILL_COLOR = '#059669'
const GOAL_TYPES = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'total', label: 'Total' },
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeSkillName(skill) {
  return typeof skill?.name === 'string' ? skill.name.trim() : ''
}

function normalizeGoalType(goal) {
  if (goal && typeof goal.type === 'string' && goal.type.trim() !== '') {
    return goal.type.trim()
  }

  return 'weekly'
}

function normalizeTargetHours(goal) {
  if (goal && Number.isFinite(Number(goal.targetHours)) && Number(goal.targetHours) > 0) {
    return String(goal.targetHours)
  }

  return '1'
}

function renderGoalFields({ goalType, targetHours, isRequired } = {}) {
  const requiredAttribute = isRequired ? ' required' : ''
  const disabledAttribute = isRequired ? '' : ' disabled'

  return `
    <fieldset class="skill-form__goal-fields">
      <legend class="skill-form__goal-legend">Goal details</legend>

      <div class="skill-form__field">
        <label for="skill-goal-type">Goal type</label>
        <select id="skill-goal-type" name="goalType"${requiredAttribute}${disabledAttribute}>
          ${GOAL_TYPES.map(
            ({ value, label }) =>
              `<option value="${escapeHtml(value)}"${value === goalType ? ' selected' : ''}>${escapeHtml(label)}</option>`
          ).join('')}
        </select>
      </div>

      <div class="skill-form__field">
        <label for="skill-goal-target-hours">Target hours</label>
        <input
          id="skill-goal-target-hours"
          name="targetHours"
          type="number"
          min="1"
          step="1"
          inputmode="numeric"
          value="${escapeHtml(targetHours)}"${requiredAttribute}${disabledAttribute}
        />
      </div>
    </fieldset>
  `
}

function renderCreateMode({ color = DEFAULT_SKILL_COLOR } = {}) {
  const safeColor = escapeHtml(color || DEFAULT_SKILL_COLOR)

  return `
    <section class="skill-form-view" aria-labelledby="skill-form-title" aria-describedby="skill-form-description">
      <h2 class="skill-form-view__title" id="skill-form-title">Add a Skill</h2>
      <p class="skill-form-view__description" id="skill-form-description">
        Create the skill first. Optional goals help track long-term progress.
      </p>

      <form class="skill-form" data-mode="create">
        <div class="skill-form__feedback" aria-live="polite"></div>

        <div class="skill-form__field">
          <label for="skill-name">Skill name</label>
          <input
            id="skill-name"
            name="name"
            type="text"
            required
          />
        </div>

        <div class="skill-form__field">
          <label for="skill-color">Color</label>
          <input id="skill-color" name="color" type="color" value="${safeColor}" />
        </div>

        <section class="skill-form__goal">
          <div class="skill-form__goal-header">
            <button
              class="skill-form__goal-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="skill-goal-panel"
            >
              Optional goal
            </button>
          </div>

          <div class="skill-form__goal-panel" id="skill-goal-panel" hidden>
            ${renderGoalFields({
              goalType: 'weekly',
              targetHours: '1',
              isRequired: false,
            })}
          </div>
        </section>

        <button type="submit">Add skill</button>
      </form>
    </section>
  `
}

function renderGoalSetupMode({ skill = {} } = {}) {
  const skillName = normalizeSkillName(skill)
  const goal = skill?.goal ?? null
  const goalType = escapeHtml(normalizeGoalType(goal))
  const targetHours = escapeHtml(normalizeTargetHours(goal))
  const skillId = escapeHtml(String(skill?.id ?? ''))
  const skillColor = escapeHtml(typeof skill?.color === 'string' && skill.color.trim() !== '' ? skill.color : DEFAULT_SKILL_COLOR)

  return `
    <section class="skill-form-view" aria-labelledby="skill-form-title" aria-describedby="skill-form-description">
      <h2 class="skill-form-view__title" id="skill-form-title">Set a goal for ${escapeHtml(skillName || 'this skill')}</h2>
      <p class="skill-form-view__description" id="skill-form-description">
        Keep this flow focused: set one goal now, or choose No goal set later.
      </p>

      <form class="skill-form" data-mode="goal_setup" data-skill-id="${skillId}">
        <div class="skill-form__feedback" aria-live="polite"></div>

        <div class="skill-form__skill-summary" aria-label="Selected skill">
          <span class="skill-form__skill-name">${escapeHtml(skillName)}</span>
          <span class="skill-form__skill-color" aria-hidden="true" style="background-color: ${skillColor}"></span>
        </div>

        ${renderGoalFields({
          goalType,
          targetHours,
          isRequired: true,
        })}

        <button type="submit">Save goal</button>
      </form>
    </section>
  `
}

export function createSkillFormTemplate({ mode = 'create', skill = null, color = DEFAULT_SKILL_COLOR } = {}) {
  if (mode === 'goal_setup') {
    return renderGoalSetupMode({ skill })
  }

  return renderCreateMode({ color })
}
