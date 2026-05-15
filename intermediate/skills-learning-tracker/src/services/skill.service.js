/**
 * Skill service.
 * Owns the official skill contract and normalizes legacy inputs into it.
 */
const DEFAULT_SKILL_COLOR = '#059669'
const GOAL_TYPES = new Set(['weekly', 'total'])

function normalizeId(value) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return ''
}

function normalizeName(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeColor(value) {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim()
  }

  return DEFAULT_SKILL_COLOR
}

function normalizeCreatedAt(value) {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(value).toISOString()
  }

  return ''
}

function normalizeGoalCandidate(goal) {
  if (!goal || typeof goal !== 'object' || Array.isArray(goal)) {
    return null
  }

  const type = typeof goal.type === 'string' ? goal.type.trim() : ''
  const targetHours = Number(goal.targetHours)

  if (!GOAL_TYPES.has(type) || !Number.isFinite(targetHours) || targetHours <= 0) {
    return null
  }

  return {
    type,
    targetHours,
  }
}

function normalizeLegacyGoal(skill = {}) {
  const legacyType = typeof skill.goalType === 'string' ? skill.goalType.trim() : ''
  const targetHours = Number(skill.targetHours)

  if (GOAL_TYPES.has(legacyType) && Number.isFinite(targetHours) && targetHours > 0) {
    return {
      type: legacyType,
      targetHours,
    }
  }

  if (Number.isFinite(targetHours) && targetHours > 0) {
    return {
      type: 'total',
      targetHours,
    }
  }

  return null
}

function normalizeGoalFormInput(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return null
  }

  const type =
    typeof input.goalType === 'string'
      ? input.goalType.trim()
      : typeof input.type === 'string'
        ? input.type.trim()
        : ''
  const targetHours = Number(input.targetHours)

  return normalizeGoalCandidate({ type, targetHours })
}

export function normalizeGoal(goal, skill = {}) {
  return normalizeGoalCandidate(goal) ?? normalizeLegacyGoal(skill)
}

export function normalizeSkill(skill = {}) {
  if (!skill || typeof skill !== 'object' || Array.isArray(skill)) {
    return null
  }

  return {
    id: normalizeId(skill.id),
    name: normalizeName(skill.name),
    color: normalizeColor(skill.color),
    createdAt: normalizeCreatedAt(skill.createdAt),
    goal: normalizeGoal(skill.goal, skill),
  }
}

export function createSkill(data = {}) {
  const createdAt = new Date().toISOString()

  return normalizeSkill({
    id: `skill_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    name: data.name,
    color: data.color,
    createdAt,
    goal: normalizeGoal(data.goal, data),
  })
}

export function createSkillGoal(data = {}) {
  return normalizeGoalFormInput(data)
}

export function updateSkillGoal(skill = {}, data = {}) {
  const normalizedSkill = normalizeSkill(skill)

  if (!normalizedSkill) {
    return null
  }

  const goal = normalizeGoalFormInput(data)

  if (!goal) {
    return null
  }

  return {
    ...normalizedSkill,
    goal,
  }
}
