// Compatibility model for the official Skill contract.
// The service owns normalization; this module keeps validation available for tests.

import { createSkill as createOfficialSkill, normalizeSkill } from '../services/skill.service.js'

const GOAL_TYPES = new Set(['weekly', 'total'])

function isValidDateString(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return false
  }

  const parsed = Date.parse(value)

  return !Number.isNaN(parsed)
}

function isValidGoal(goal) {
  if (goal === undefined || goal === null) {
    return true
  }

  if (!goal || typeof goal !== 'object' || Array.isArray(goal)) {
    return false
  }

  const type = typeof goal.type === 'string' ? goal.type.trim() : ''
  const targetHours = Number(goal.targetHours)

  return GOAL_TYPES.has(type) && Number.isFinite(targetHours) && targetHours > 0
}

export const createSkill = createOfficialSkill

export function validateSkill(skill) {
  const errors = []

  if (!skill || typeof skill !== 'object' || Array.isArray(skill)) {
    return {
      isValid: false,
      errors: ['Skill must be an object'],
    }
  }

  const normalizedSkill = normalizeSkill(skill)

  if (typeof normalizedSkill?.id !== 'string' || normalizedSkill.id.trim() === '') {
    errors.push('id is required and must be a string')
  }

  if (typeof normalizedSkill?.name !== 'string' || normalizedSkill.name.trim() === '') {
    errors.push('name is required and must be a non-empty string')
  }

  if (typeof normalizedSkill?.createdAt !== 'string' || normalizedSkill.createdAt.trim() === '') {
    errors.push('createdAt is required and must be a string')
  } else if (!isValidDateString(normalizedSkill.createdAt)) {
    errors.push('createdAt must be a valid date string')
  }

  if (normalizedSkill?.color !== undefined && typeof normalizedSkill.color !== 'string') {
    errors.push('color must be a string when provided')
  }

  if (!isValidGoal(skill.goal)) {
    errors.push('goal must be null or an object with a valid type and targetHours')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
