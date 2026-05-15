import { createPriorityPayload } from './priority.service.js'

import { normalizeSkill } from './skill.service.js'

function normalizeId(value) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return ''
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== ''
}

function isValidDateString(date) {
  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
}

function getSessionDurationMinutes(session) {
  if (!session || typeof session !== 'object' || Array.isArray(session)) {
    return 0
  }

  if (typeof session.durationMinutes === 'number' && Number.isFinite(session.durationMinutes)) {
    return session.durationMinutes
  }

  if (typeof session.duration === 'number' && Number.isFinite(session.duration)) {
    return session.duration
  }

  return 0
}

function getSessionDate(session) {
  if (!session || typeof session !== 'object' || Array.isArray(session)) {
    return null
  }

  if (isValidDateString(session.date)) {
    return session.date
  }

  return null
}

function getLastPracticedAt(sessions, skillId) {
  if (!Array.isArray(sessions) || skillId === '') {
    return null
  }

  const lastSession = sessions
    .filter(
      (session) =>
        session &&
        normalizeId(session.skillId) === skillId &&
        getSessionDurationMinutes(session) > 0 &&
        getSessionDate(session)
    )
    .sort((sessionA, sessionB) => {
      const dateA = getSessionDate(sessionA) ?? ''
      const dateB = getSessionDate(sessionB) ?? ''

      return dateB.localeCompare(dateA)
    })[0]

  return getSessionDate(lastSession)
}

function getTotalMinutesForSkill(sessions, skillId) {
  if (!Array.isArray(sessions) || skillId === '') {
    return 0
  }

  return sessions.reduce((total, session) => {
    if (!session || normalizeId(session.skillId) !== skillId) {
      return total
    }

    return total + getSessionDurationMinutes(session)
  }, 0)
}

function formatProgressPercent(value) {
  const number = Number.isFinite(Number(value)) ? Number(value) : 0
  const rounded = Math.round(Math.min(number, 100) * 10) / 10

  return Number.isInteger(rounded) ? `${rounded}` : `${rounded.toFixed(1)}`
}

function buildSkillItem(skill, sessions, isPriority) {
  const normalizedSkill = normalizeSkill(skill)
  const skillId = normalizeId(normalizedSkill?.id)
  const skillName = isNonEmptyString(normalizedSkill?.name) ? normalizedSkill.name.trim() : ''
  const goal = normalizedSkill?.goal
  const totalMinutes = getTotalMinutesForSkill(sessions, skillId)
  const lastPracticedAt = getLastPracticedAt(sessions, skillId)

  if (skillId === '' || skillName === '') {
    return null
  }

  const hasGoal = Boolean(goal)
  const progressPercent = hasGoal ? Math.round(((totalMinutes / (goal.targetHours * 60)) * 100) * 10) / 10 : null
  const progressLabel =
    !hasGoal
      ? 'No goal set'
      : progressPercent !== null && progressPercent >= 100
        ? 'Completed'
        : `${formatProgressPercent(progressPercent)}% completed`

  return {
    id: skillId,
    name: skillName,
    progressLabel,
    progressPercent,
    hasGoal,
    isPriority,
    lastPracticedAt,
    sortRank: 0,
  }
}

function getCurrentPrioritySkillId({
  priorityPayload,
  currentSkillId,
  validSkills,
}) {
  const explicitSkillId = normalizeId(currentSkillId)
  const validSkillIds = new Set(
    Array.isArray(validSkills) ? validSkills.map((skill) => normalizeId(skill.id)).filter(Boolean) : []
  )

  if (explicitSkillId !== '' && validSkillIds.has(explicitSkillId)) {
    return explicitSkillId
  }

  const featuredSkillId = normalizeId(priorityPayload?.featuredSkill?.skillId)

  if (featuredSkillId !== '') {
    return featuredSkillId
  }

  return normalizeId(priorityPayload?.focusSkill?.skillId)
}

function sortSkills(items) {
  return [...items].sort((skillA, skillB) => {
    if (skillA.isPriority !== skillB.isPriority) {
      return skillA.isPriority ? -1 : 1
    }

    const aHasRecentPractice = skillA.lastPracticedAt !== null
    const bHasRecentPractice = skillB.lastPracticedAt !== null

    if (aHasRecentPractice !== bHasRecentPractice) {
      return aHasRecentPractice ? -1 : 1
    }

    if (aHasRecentPractice && bHasRecentPractice && skillA.lastPracticedAt !== skillB.lastPracticedAt) {
      return skillB.lastPracticedAt.localeCompare(skillA.lastPracticedAt)
    }

    return skillA.name.localeCompare(skillB.name)
  })
}

function buildEmptyState(purpose = 'practice') {
  const isGoalSetup = purpose === 'goal_setup'

  return {
    title: 'No skills available yet',
    description: isGoalSetup
      ? 'Add your first skill before setting a goal.'
      : 'Add your first skill to start picking a practice target.',
    actionLabel: 'Create your first skill',
  }
}

export function createSkillPickerPayload({
  skills = [],
  sessions = [],
  currentSkillId = '',
  referenceDate = new Date(),
  purpose = 'practice',
} = {}) {
  const validSkills = Array.isArray(skills)
    ? skills
        .map((skill) => normalizeSkill(skill))
        .filter((skill) => skill && isNonEmptyString(skill.id) && isNonEmptyString(skill.name))
    : []

  if (validSkills.length === 0) {
    return {
      skills: [],
      emptyState: buildEmptyState(purpose),
      hasSkills: false,
      purpose,
    }
  }

  const priorityPayload = createPriorityPayload({
    skills: validSkills,
    sessions,
    referenceDate,
  })
  const prioritySkillId = getCurrentPrioritySkillId({
    priorityPayload,
    currentSkillId,
    validSkills,
  })
  const orderedSkills = sortSkills(
    validSkills
      .map((skill) => buildSkillItem(skill, sessions, normalizeId(skill.id) === prioritySkillId))
      .filter(Boolean)
  ).map((skill, index) => ({
    ...skill,
    sortRank: index,
  }))

  return {
    skills: orderedSkills,
    emptyState: null,
    hasSkills: true,
    purpose,
  }
}
