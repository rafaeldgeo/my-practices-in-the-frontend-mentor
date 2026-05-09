/**
 * Skill service.
 * Shapes raw form data into a normalized skill object.
 */
const DEFAULT_SKILL_COLOR = '#059669'

function normalizeColor(value) {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim()
  }

  return DEFAULT_SKILL_COLOR
}

export function createSkill(data = {}) {
  const now = Date.now()
  const name = typeof data.name === 'string' ? data.name.trim() : ''

  return {
    id: String(now),
    name,
    color: normalizeColor(data.color),
    createdAt: now,
  }
}
