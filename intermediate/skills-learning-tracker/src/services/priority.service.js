const PROGRESS_DEBT_TOLERANCE = 10
const MS_PER_DAY = 24 * 60 * 60 * 1000

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== ''
}

function normalizeId(value) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return ''
}

function isValidDateString(date) {
  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
}

function getUtcDateParts(referenceDate = new Date()) {
  return {
    year: referenceDate.getUTCFullYear(),
    month: referenceDate.getUTCMonth(),
    day: referenceDate.getUTCDate(),
    dayOfWeek: referenceDate.getUTCDay(),
  }
}

function getUtcDayStart(referenceDate = new Date()) {
  const { year, month, day } = getUtcDateParts(referenceDate)
  return Date.UTC(year, month, day)
}

function getStartOfWeekUtc(referenceDate = new Date()) {
  const { year, month, day, dayOfWeek } = getUtcDateParts(referenceDate)
  const mondayOffset = (dayOfWeek + 6) % 7
  return Date.UTC(year, month, day - mondayOffset)
}

function getStartOfYearUtc(referenceDate = new Date()) {
  return Date.UTC(referenceDate.getUTCFullYear(), 0, 1)
}

function getStartOfNextYearUtc(referenceDate = new Date()) {
  return Date.UTC(referenceDate.getUTCFullYear() + 1, 0, 1)
}

function getCalendarDateLabel(referenceDate = new Date()) {
  const year = referenceDate.getUTCFullYear()
  const month = String(referenceDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(referenceDate.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getSkillGoal(skill) {
  if (!skill || typeof skill !== 'object' || Array.isArray(skill)) {
    return null
  }

  const goal = skill.goal

  if (
    goal &&
    typeof goal === 'object' &&
    !Array.isArray(goal) &&
    (goal.type === 'weekly' || goal.type === 'total') &&
    typeof goal.targetHours === 'number' &&
    Number.isFinite(goal.targetHours) &&
    goal.targetHours > 0
  ) {
    return goal
  }

  if (
    (skill.targetHours === undefined || skill.targetHours === null) &&
    (skill.goalType === undefined || skill.goalType === null)
  ) {
    return null
  }

  if (
    (skill.goalType === 'weekly' || skill.goalType === 'total') &&
    typeof skill.targetHours === 'number' &&
    Number.isFinite(skill.targetHours) &&
    skill.targetHours > 0
  ) {
    return {
      type: skill.goalType,
      targetHours: skill.targetHours,
    }
  }

  if (
    typeof skill.targetHours === 'number' &&
    Number.isFinite(skill.targetHours) &&
    skill.targetHours > 0
  ) {
    return {
      type: 'total',
      targetHours: skill.targetHours,
    }
  }

  return null
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

function getMinutesTodayForSkill(sessions, skillId, referenceDate) {
  if (!Array.isArray(sessions) || skillId === '') {
    return 0
  }

  const todayLabel = getCalendarDateLabel(referenceDate)

  return sessions.reduce((total, session) => {
    if (
      !session ||
      normalizeId(session.skillId) !== skillId ||
      getSessionDate(session) !== todayLabel
    ) {
      return total
    }

    return total + getSessionDurationMinutes(session)
  }, 0)
}

function getProgressExpectedPercent(goal, referenceDate) {
  if (!goal) {
    return null
  }

  if (goal.type === 'weekly') {
    const weekStart = getStartOfWeekUtc(referenceDate)
    const currentDayStart = getUtcDayStart(referenceDate)
    const elapsedMs = Math.max(0, currentDayStart - weekStart)

    return Math.min(100, (elapsedMs / (7 * MS_PER_DAY)) * 100)
  }

  if (goal.type === 'total') {
    const yearStart = getStartOfYearUtc(referenceDate)
    const nextYearStart = getStartOfNextYearUtc(referenceDate)
    const elapsedMs = Math.max(0, getUtcDayStart(referenceDate) - yearStart)
    const totalMs = Math.max(MS_PER_DAY, nextYearStart - yearStart)

    return Math.min(100, (elapsedMs / totalMs) * 100)
  }

  return null
}

function getProgressCurrentPercent(totalMinutes, goal) {
  if (!goal) {
    return null
  }

  return (totalMinutes / (goal.targetHours * 60)) * 100
}

function calculateProgressDebt(expectedProgress, currentProgress) {
  if (
    typeof expectedProgress !== 'number' ||
    Number.isNaN(expectedProgress) ||
    typeof currentProgress !== 'number' ||
    Number.isNaN(currentProgress)
  ) {
    return null
  }

  return expectedProgress - currentProgress
}

function getSkillStatus(progressDebtPercent) {
  if (typeof progressDebtPercent !== 'number' || Number.isNaN(progressDebtPercent)) {
    return null
  }

  if (progressDebtPercent < 0) {
    return 'ahead'
  }

  if (progressDebtPercent <= PROGRESS_DEBT_TOLERANCE) {
    return 'on-track'
  }

  return 'behind'
}

function roundToTwoDecimals(value) {
  return Math.round(value * 100) / 100
}

function getProgressDebtHours(progressDebtPercent, goal) {
  if (
    typeof progressDebtPercent !== 'number' ||
    Number.isNaN(progressDebtPercent) ||
    !goal ||
    goal.targetHours <= 0
  ) {
    return null
  }

  if (progressDebtPercent <= 0) {
    return 0
  }

  return (progressDebtPercent / 100) * goal.targetHours
}

function buildSkillAnalysis(skill, sessions, referenceDate) {
  if (!skill || typeof skill !== 'object' || Array.isArray(skill)) {
    return null
  }

  const skillId = normalizeId(skill.id)
  const skillName = isNonEmptyString(skill.name) ? skill.name.trim() : ''
  const goal = getSkillGoal(skill)

  if (skillId === '' || skillName === '' || !goal) {
    return null
  }

  const totalTime = getTotalMinutesForSkill(sessions, skillId)
  const currentProgress = getProgressCurrentPercent(totalTime, goal)
  const expectedProgress = getProgressExpectedPercent(goal, referenceDate)
  const progressDebtPercent = calculateProgressDebt(expectedProgress, currentProgress)

  if (progressDebtPercent === null) {
    return null
  }

  const status = getSkillStatus(progressDebtPercent)

  return {
    skillId,
    skillName,
    progressDebtPercent: roundToTwoDecimals(progressDebtPercent),
    progressDebtHours: roundToTwoDecimals(getProgressDebtHours(progressDebtPercent, goal)),
    currentProgress: roundToTwoDecimals(currentProgress),
    expectedProgress: roundToTwoDecimals(expectedProgress),
    totalTime,
    minutesToday: getMinutesTodayForSkill(sessions, skillId, referenceDate),
    status,
  }
}

function getPrioritySkills(skillAnalyses) {
  return skillAnalyses
    .filter((skill) => skill.status === 'behind')
    .sort((skillA, skillB) => {
      if (skillB.progressDebtPercent !== skillA.progressDebtPercent) {
        return skillB.progressDebtPercent - skillA.progressDebtPercent
      }

      if (skillB.progressDebtHours !== skillA.progressDebtHours) {
        return skillB.progressDebtHours - skillA.progressDebtHours
      }

      return skillA.skillName.localeCompare(skillB.skillName)
    })
}

function getHeroMode(skillAnalyses) {
  if (!Array.isArray(skillAnalyses) || skillAnalyses.length === 0) {
    return { mode: 'empty' }
  }

  const prioritySkills = getPrioritySkills(skillAnalyses)

  if (prioritySkills.length > 0) {
    return {
      mode: 'priority',
      featuredSkill: prioritySkills[0],
    }
  }

  return {
    mode: 'healthy',
    summary: {
      skillsOnTrack: skillAnalyses.filter((skill) => skill.status === 'on-track').length,
      skillsAhead: skillAnalyses.filter((skill) => skill.status === 'ahead').length,
    },
  }
}

export function createPriorityPayload({ skills = [], sessions = [], referenceDate = new Date() } = {}) {
  if (!(referenceDate instanceof Date) || Number.isNaN(referenceDate.getTime())) {
    return { mode: 'empty' }
  }

  const skillAnalyses = Array.isArray(skills)
    ? skills
        .map((skill) => buildSkillAnalysis(skill, sessions, referenceDate))
        .filter(Boolean)
    : []

  return getHeroMode(skillAnalyses)
}

export {
  PROGRESS_DEBT_TOLERANCE,
  calculateProgressDebt,
  getHeroMode,
  getPrioritySkills,
  getSkillStatus,
}
