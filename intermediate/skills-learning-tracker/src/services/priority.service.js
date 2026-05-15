import { normalizeSkill } from './skill.service.js'

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

function getValidSkills(skills) {
  if (!Array.isArray(skills)) {
    return []
  }

  return skills
    .map((skill) => normalizeSkill(skill))
    .filter(
      (skill) =>
        skill &&
        isNonEmptyString(skill.id) &&
        isNonEmptyString(skill.name)
    )
}

function getGoalSkills(skills) {
  return getValidSkills(skills).filter((skill) => Boolean(skill.goal))
}

function getSessionsForSkillIds(sessions, skillIds) {
  if (!Array.isArray(sessions) || !Array.isArray(skillIds) || skillIds.length === 0) {
    return []
  }

  const allowedSkillIds = new Set(skillIds.map((skillId) => normalizeId(skillId)).filter(Boolean))

  return sessions.filter((session) => {
    if (!session || typeof session !== 'object') {
      return false
    }

    const skillId = normalizeId(session.skillId)

    return allowedSkillIds.has(skillId) && getSessionDurationMinutes(session) > 0
  })
}

function getDistinctSessionDays(sessions) {
  const distinctDays = new Set()

  if (!Array.isArray(sessions)) {
    return 0
  }

  sessions.forEach((session) => {
    const date = getSessionDate(session)

    if (date) {
      distinctDays.add(date)
    }
  })

  return distinctDays.size
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
  const normalizedSkill = normalizeSkill(skill)

  if (!normalizedSkill) {
    return null
  }

  const skillId = normalizeId(normalizedSkill.id)
  const skillName = isNonEmptyString(normalizedSkill.name) ? normalizedSkill.name.trim() : ''
  const goal = normalizedSkill.goal

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
  const targetMinutes = goal.targetHours * 60

  return {
    skillId,
    skillName,
    goalType: goal.type,
    targetHours: goal.targetHours,
    targetMinutes,
    progressDebtPercent: roundToTwoDecimals(progressDebtPercent),
    progressDebtHours: roundToTwoDecimals(getProgressDebtHours(progressDebtPercent, goal)),
    currentProgress: roundToTwoDecimals(currentProgress),
    expectedProgress: roundToTwoDecimals(expectedProgress),
    totalTime,
    minutesToday: getMinutesTodayForSkill(sessions, skillId, referenceDate),
    remainingMinutes: Math.max(0, targetMinutes - totalTime),
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

function getHealthySkills(skillAnalyses) {
  return skillAnalyses
    .filter((skill) => skill.status !== 'behind')
    .sort((skillA, skillB) => {
      if (skillB.totalTime !== skillA.totalTime) {
        return skillB.totalTime - skillA.totalTime
      }

      if (skillB.minutesToday !== skillA.minutesToday) {
        return skillB.minutesToday - skillA.minutesToday
      }

      return skillA.skillName.localeCompare(skillB.skillName)
    })
}

function createStateFlags({
  mode,
  reason,
  hasValidSkills,
  hasValidSessions,
  hasGoalSkills,
  hasPacingData,
  focusSkill,
}) {
  return {
    isAtRisk: mode === 'priority',
    isHealthyMomentum: mode === 'healthy',
    isOnboarding: reason === 'no-data',
    hasNoSkills: !hasValidSkills,
    hasNoSessions: !hasValidSessions,
    hasMissingGoals: reason === 'missing-goals',
    hasInsufficientPacingData: reason === 'insufficient-pacing',
    hasGoalSkills,
    hasPacingData,
    hasFocusSkill: Boolean(focusSkill),
  }
}

function buildRecommendation({
  mode,
  reason,
  focusSkill,
  summary,
  pacingSample,
}) {
  if (mode === 'priority' && focusSkill) {
    return {
      eyebrow: 'Operational priority',
      title: `Stay on track with ${focusSkill.skillName}`,
      description:
        focusSkill.minutesToday > 0
          ? `You already logged ${focusSkill.minutesToday} minutes today. One more session will help close the gap.`
          : `You are ${focusSkill.progressDebtHours}h behind the current pace. A focused session now will reduce the gap.`,
    }
  }

  if (mode === 'healthy' && focusSkill) {
    return {
      eyebrow: 'Healthy momentum',
      title: `Keep momentum steady with ${focusSkill.skillName}`,
      description:
        summary && Number.isFinite(Number(summary.skillsOnTrack))
          ? `${summary.skillsOnTrack} skills are on track and ${summary.skillsAhead} are ahead. Keep the rhythm with a short practice block.`
          : 'Your plan is stable. A short practice block keeps the loop moving without creating pressure.',
    }
  }

  if (reason === 'missing-goals') {
    return {
      eyebrow: 'Setup needed',
      title: 'Set goals to unlock the hero',
      description:
        'Your skills exist, but none has a valid target yet. Add goals so the tracker can read pace and surface a progress ring.',
    }
  }

  if (reason === 'insufficient-pacing') {
    return {
      eyebrow: 'More pacing data needed',
      title: focusSkill
        ? `Build enough history for ${focusSkill.skillName}`
        : 'Build enough history to read the pace',
      description:
        pacingSample.totalSessions > 0
          ? `You have ${pacingSample.totalSessions} session${pacingSample.totalSessions === 1 ? '' : 's'}, but not enough history yet to confirm pacing. Log a few more sessions.`
          : 'You have goals, but not enough session history yet to confirm pacing. Log a few sessions first.',
    }
  }

  return {
    eyebrow: 'Start here',
    title: 'Start your learning loop',
    description:
      'Add your first skill and session to turn the dashboard into an operational plan.',
  }
}

function buildActions({
  mode,
  reason,
  focusSkill,
}) {
  if (mode === 'priority' && focusSkill) {
    return {
      primaryAction: {
        label: 'Practice now',
        action: 'open_session_modal',
        intent: 'practice_now',
        skillId: focusSkill.skillId,
      },
      secondaryAction: {
        label: 'Choose another skill',
        action: 'open_skill_picker',
        intent: 'switch_skill',
        skillId: focusSkill.skillId,
      },
    }
  }

  if (mode === 'healthy' && focusSkill) {
    return {
      primaryAction: {
        label: 'Keep momentum',
        action: 'open_session_modal',
        intent: 'continue_practice',
        skillId: focusSkill.skillId,
      },
      secondaryAction: {
        label: 'Review another skill',
        action: 'open_skill_picker',
        intent: 'switch_skill',
        skillId: focusSkill.skillId,
      },
    }
  }

  if (reason === 'missing-goals') {
    return {
      primaryAction: {
        label: 'Set a goal',
        action: 'open_skill_goal_setup',
        intent: 'configure_goals',
      },
      secondaryAction: {
        label: 'Review skills',
        action: 'open_skill_list',
        intent: 'inspect_skills',
      },
    }
  }

  if (reason === 'insufficient-pacing') {
    return {
      primaryAction: {
        label: 'Log a short session',
        action: 'open_session_modal',
        intent: 'build_history',
        skillId: focusSkill ? focusSkill.skillId : null,
      },
      secondaryAction: {
        label: 'Choose another skill',
        action: 'open_skill_picker',
        intent: 'switch_skill',
      },
    }
  }

  return {
    primaryAction: {
      label: 'Add your first skill',
      action: 'open_skill_form',
      intent: 'create_skill',
    },
    secondaryAction: {
      label: 'Use sample data',
      action: 'load_sample_data',
      intent: 'seed_demo',
    },
  }
}

function buildProgressRing({
  mode,
  reason,
  focusSkill,
}) {
  if (!focusSkill || (mode === 'empty' && reason === 'missing-goals')) {
    return {
      scope: 'unavailable',
      percentage: null,
      current: null,
      target: null,
      remaining: null,
      isReady: false,
    }
  }

  return {
    scope: 'skill',
    percentage: Math.max(0, Math.min(100, roundToTwoDecimals(focusSkill.currentProgress))),
    current: focusSkill.totalTime,
    target: focusSkill.targetMinutes,
    remaining: focusSkill.remainingMinutes,
    isReady: true,
  }
}

function buildHeroPayload({
  mode,
  reason = null,
  stateLabel,
  summary = null,
  focusSkill = null,
  featuredSkill = null,
  hasValidSkills,
  hasValidSessions,
  hasGoalSkills,
  hasPacingData,
  pacingSample,
}) {
  const recommendation = buildRecommendation({
    mode,
    reason,
    focusSkill,
    summary,
    pacingSample,
  })

  const actions = buildActions({
    mode,
    reason,
    focusSkill,
  })

  const flags = createStateFlags({
    mode,
    reason,
    hasValidSkills,
    hasValidSessions,
    hasGoalSkills,
    hasPacingData,
    focusSkill,
  })

  return {
    mode,
    state: {
      kind: mode,
      reason,
      label: stateLabel,
    },
    urgency:
      mode === 'priority'
        ? 'high'
        : reason === 'missing-goals' || reason === 'insufficient-pacing'
          ? 'medium'
          : mode === 'healthy'
            ? 'low'
            : 'none',
    severity:
      mode === 'priority'
        ? 'warning'
        : mode === 'healthy'
          ? 'success'
          : reason === 'missing-goals' || reason === 'insufficient-pacing'
            ? 'warning'
            : 'neutral',
    flags,
    recommendation,
    primaryAction: actions.primaryAction,
    secondaryAction: actions.secondaryAction,
    progressRing: buildProgressRing({
      mode,
      reason,
      focusSkill,
    }),
    summary,
    featuredSkill,
    focusSkill,
  }
}

function getHeroMode(input = {}) {
  if (Array.isArray(input)) {
    const skillAnalyses = input

    if (skillAnalyses.length === 0) {
      return buildHeroPayload({
        mode: 'empty',
        reason: 'no-data',
        stateLabel: 'Start here',
        hasValidSkills: false,
        hasValidSessions: false,
        hasGoalSkills: false,
        hasPacingData: false,
        pacingSample: {
          totalSessions: 0,
          distinctDays: 0,
          totalMinutes: 0,
        },
      })
    }

    const prioritySkills = getPrioritySkills(skillAnalyses)

    if (prioritySkills.length > 0) {
      return buildHeroPayload({
        mode: 'priority',
        stateLabel: 'At risk',
        featuredSkill: prioritySkills[0],
        focusSkill: prioritySkills[0],
        hasValidSkills: true,
        hasValidSessions: true,
        hasGoalSkills: true,
        hasPacingData: true,
        pacingSample: {
          totalSessions: skillAnalyses.length,
          distinctDays: skillAnalyses.length,
          totalMinutes: 0,
        },
      })
    }

    const healthySkills = getHealthySkills(skillAnalyses)
    const focusSkill = healthySkills[0] ?? skillAnalyses[0] ?? null
    const summary = {
      skillsOnTrack: skillAnalyses.filter((skill) => skill.status === 'on-track').length,
      skillsAhead: skillAnalyses.filter((skill) => skill.status === 'ahead').length,
    }

    return buildHeroPayload({
      mode: 'healthy',
      stateLabel: 'Momentum steady',
      summary,
      focusSkill,
      hasValidSkills: true,
      hasValidSessions: true,
      hasGoalSkills: true,
      hasPacingData: true,
      pacingSample: {
        totalSessions: skillAnalyses.length,
        distinctDays: skillAnalyses.length,
        totalMinutes: 0,
      },
    })
  }

  const {
    skillAnalyses,
    hasValidSkills,
    hasValidSessions,
    hasGoalSkills,
    pacingSample,
  } = input

  if (!Array.isArray(skillAnalyses) || skillAnalyses.length === 0) {
    if (!hasValidSkills && !hasValidSessions) {
      return buildHeroPayload({
        mode: 'empty',
        reason: 'no-data',
        stateLabel: 'Start here',
        hasValidSkills,
        hasValidSessions,
        hasGoalSkills,
        hasPacingData: false,
        pacingSample,
      })
    }

    if (!hasGoalSkills) {
      return buildHeroPayload({
        mode: 'empty',
        reason: 'missing-goals',
        stateLabel: 'Goals needed',
        hasValidSkills,
        hasValidSessions,
        hasGoalSkills,
        hasPacingData: false,
        pacingSample,
      })
    }

    return buildHeroPayload({
      mode: 'empty',
      reason: 'insufficient-pacing',
      stateLabel: 'Need more pacing data',
      hasValidSkills,
      hasValidSessions,
      hasGoalSkills,
      hasPacingData: false,
      pacingSample,
    })
  }

  const prioritySkills = getPrioritySkills(skillAnalyses)

  if (prioritySkills.length > 0) {
    return buildHeroPayload({
      mode: 'priority',
      stateLabel: 'At risk',
      featuredSkill: prioritySkills[0],
      focusSkill: prioritySkills[0],
      hasValidSkills,
      hasValidSessions,
      hasGoalSkills,
      hasPacingData: true,
      pacingSample,
    })
  }

  const healthySkills = getHealthySkills(skillAnalyses)
  const focusSkill = healthySkills[0] ?? skillAnalyses[0] ?? null
  const summary = {
    skillsOnTrack: skillAnalyses.filter((skill) => skill.status === 'on-track').length,
    skillsAhead: skillAnalyses.filter((skill) => skill.status === 'ahead').length,
  }

  return buildHeroPayload({
    mode: 'healthy',
    stateLabel: 'Momentum steady',
    summary,
    focusSkill,
    hasValidSkills,
    hasValidSessions,
    hasGoalSkills,
    hasPacingData: true,
    pacingSample,
  })
}

export function createPriorityPayload({ skills = [], sessions = [], referenceDate = new Date() } = {}) {
  if (!(referenceDate instanceof Date) || Number.isNaN(referenceDate.getTime())) {
    return buildHeroPayload({
      mode: 'empty',
      reason: 'no-data',
      stateLabel: 'Start here',
      hasValidSkills: false,
      hasValidSessions: false,
      hasGoalSkills: false,
      hasPacingData: false,
      pacingSample: {
        totalSessions: 0,
        distinctDays: 0,
        totalMinutes: 0,
      },
    })
  }

  const validSkills = getValidSkills(skills)
  const validSessions = Array.isArray(sessions)
    ? sessions.filter(
        (session) =>
          session &&
          (typeof session.skillId === 'string' || typeof session.skillId === 'number')
      )
    : []

  const goalSkills = getGoalSkills(validSkills)
  const goalSkillIds = goalSkills.map((skill) => normalizeId(skill.id)).filter(Boolean)
  const goalSessions = getSessionsForSkillIds(validSessions, goalSkillIds)
  const pacingSample = {
    totalSessions: goalSessions.length,
    distinctDays: getDistinctSessionDays(goalSessions),
    totalMinutes: goalSessions.reduce((total, session) => total + getSessionDurationMinutes(session), 0),
  }
  const hasValidSkills = validSkills.length > 0
  const hasValidSessions = validSessions.length > 0
  const hasGoalSkills = goalSkills.length > 0
  const hasPacingData = goalSessions.length >= 2 && pacingSample.distinctDays >= 2

  if (!hasValidSkills && !hasValidSessions) {
    return buildHeroPayload({
      mode: 'empty',
      reason: 'no-data',
      stateLabel: 'Start here',
      hasValidSkills,
      hasValidSessions,
      hasGoalSkills,
      hasPacingData: false,
      pacingSample,
    })
  }

  if (!hasGoalSkills) {
    return buildHeroPayload({
      mode: 'empty',
      reason: 'missing-goals',
      stateLabel: 'Goals needed',
      hasValidSkills,
      hasValidSessions,
      hasGoalSkills,
      hasPacingData: false,
      pacingSample,
    })
  }

  const skillAnalyses = goalSkills
    .map((skill) => buildSkillAnalysis(skill, sessions, referenceDate))
    .filter(Boolean)

  if (!hasPacingData) {
    const fallbackFocusSkill = getHealthySkills(skillAnalyses)[0] ?? skillAnalyses[0] ?? null

    return buildHeroPayload({
      mode: 'empty',
      reason: 'insufficient-pacing',
      stateLabel: 'Need more pacing data',
      focusSkill: fallbackFocusSkill,
      hasValidSkills,
      hasValidSessions,
      hasGoalSkills,
      hasPacingData: false,
      pacingSample,
    })
  }

  return getHeroMode({
    skillAnalyses,
    hasValidSkills,
    hasValidSessions,
    hasGoalSkills,
    pacingSample,
  })
}

export {
  PROGRESS_DEBT_TOLERANCE,
  calculateProgressDebt,
  getHeroMode,
  getPrioritySkills,
  getSkillStatus,
}
