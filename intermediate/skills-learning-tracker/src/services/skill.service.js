/**
 * Skill service.
 * Shapes raw form data into a normalized skill object.
 */
export function createSkill(data = {}) {
  const now = Date.now()
  const name = typeof data.name === 'string' ? data.name.trim() : ''

  return {
    id: now,
    name,
    createdAt: now,
  }
}
