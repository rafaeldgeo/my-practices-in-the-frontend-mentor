import {
  PROGRESS_DEBT_TOLERANCE,
  calculateProgressDebt,
  createPriorityPayload,
  getSkillStatus,
} from '../services/priority.service.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

function assertClose(description, actual, expected, tolerance = 0.01) {
  const isClose = Math.abs(actual - expected) <= tolerance

  if (isClose) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected, tolerance })
}

const referenceDate = new Date('2026-04-22T12:00:00Z')

assertEqual('tolerance is exported', PROGRESS_DEBT_TOLERANCE, 10)
assertEqual('debt calculation works', calculateProgressDebt(30, 18), 12)
assertEqual('status ahead', getSkillStatus(-0.01), 'ahead')
assertEqual('status on-track at tolerance', getSkillStatus(10), 'on-track')
assertEqual('status behind', getSkillStatus(10.01), 'behind')

const emptyPayload = createPriorityPayload({
  skills: [],
  sessions: [],
  referenceDate,
})

assertEqual('empty mode payload', emptyPayload.mode, 'empty')
assertEqual('empty state reason', emptyPayload.state.reason, 'no-data')
assertEqual('empty urgency', emptyPayload.urgency, 'none')
assertEqual('empty recommendation', emptyPayload.recommendation, {
  eyebrow: 'Start here',
  title: 'Start your learning loop',
  description: 'Add your first skill and session to turn the dashboard into an operational plan.',
})
assertEqual('empty primary action', emptyPayload.primaryAction, {
  label: 'Add your first skill',
  action: 'open_skill_form',
  intent: 'create_skill',
})
assertEqual('empty progress ring readiness', emptyPayload.progressRing.isReady, false)
assertEqual('empty flags', {
  hasNoSkills: emptyPayload.flags.hasNoSkills,
  hasNoSessions: emptyPayload.flags.hasNoSessions,
  isOnboarding: emptyPayload.flags.isOnboarding,
}, {
  hasNoSkills: true,
  hasNoSessions: true,
  isOnboarding: true,
})

const missingGoalsPayload = createPriorityPayload({
  skills: [
    {
      id: 'skill-goal-less',
      name: 'Sketching',
      goal: null,
    },
  ],
  sessions: [
    { skillId: 'skill-goal-less', durationMinutes: 30, date: '2026-04-22' },
  ],
  referenceDate,
})

assertEqual('missing goals mode payload', missingGoalsPayload.mode, 'empty')
assertEqual('missing goals reason', missingGoalsPayload.state.reason, 'missing-goals')
assertEqual('missing goals urgency', missingGoalsPayload.urgency, 'medium')
assertEqual('missing goals recommendation title', missingGoalsPayload.recommendation.title, 'Set goals to unlock the hero')
assertEqual('missing goals primary action', missingGoalsPayload.primaryAction.label, 'Set a goal')
assertEqual('missing goals progress ring readiness', missingGoalsPayload.progressRing.isReady, false)
assertEqual('missing goals flag', missingGoalsPayload.flags.hasMissingGoals, true)

const insufficientPacingPayload = createPriorityPayload({
  skills: [
    {
      id: 'skill-1',
      name: 'Spanish',
      goal: { type: 'weekly', targetHours: 5 },
    },
  ],
  sessions: [
    { skillId: 'skill-1', durationMinutes: 45, date: '2026-04-22' },
  ],
  referenceDate,
})

assertEqual('insufficient pacing mode payload', insufficientPacingPayload.mode, 'empty')
assertEqual('insufficient pacing reason', insufficientPacingPayload.state.reason, 'insufficient-pacing')
assertEqual('insufficient pacing urgency', insufficientPacingPayload.urgency, 'medium')
assertEqual('insufficient pacing recommendation eyebrow', insufficientPacingPayload.recommendation.eyebrow, 'More pacing data needed')
assertEqual('insufficient pacing primary action', insufficientPacingPayload.primaryAction.label, 'Log a short session')
assertEqual('insufficient pacing secondary action', insufficientPacingPayload.secondaryAction.label, 'Choose another skill')
assertEqual('insufficient pacing ring readiness', insufficientPacingPayload.progressRing.isReady, true)
assertEqual('insufficient pacing ring skill', insufficientPacingPayload.focusSkill.skillName, 'Spanish')

const priorityPayload = createPriorityPayload({
  skills: [
    {
      id: 'skill-1',
      name: 'Spanish',
      goal: { type: 'weekly', targetHours: 5 },
    },
    {
      id: 'skill-2',
      name: 'Guitar',
      goal: { type: 'weekly', targetHours: 3 },
    },
    {
      id: 'skill-3',
      name: 'TypeScript',
      goal: { type: 'total', targetHours: 200 },
    },
  ],
  sessions: [
    { skillId: 'skill-1', durationMinutes: 75, date: '2026-04-22' },
    { skillId: 'skill-1', durationMinutes: 75, date: '2026-04-21' },
    { skillId: 'skill-2', durationMinutes: 45, date: '2026-04-22' },
    { skillId: 'skill-2', durationMinutes: 45, date: '2026-04-20' },
    { skillId: 'skill-3', durationMinutes: 15, date: '2026-04-22' },
    { skillId: 'skill-3', durationMinutes: 10, date: '2026-04-19' },
  ],
  referenceDate,
})

assertEqual('priority mode payload', priorityPayload.mode, 'priority')
assertEqual('priority state label', priorityPayload.state.label, 'At risk')
assertEqual('priority urgency', priorityPayload.urgency, 'high')
assertEqual('priority severity', priorityPayload.severity, 'warning')
assertEqual('featured skill selected by largest debt', priorityPayload.featuredSkill.skillId, 'skill-3')
assertEqual('featured skill name', priorityPayload.featuredSkill.skillName, 'TypeScript')
assertEqual('featured skill status', priorityPayload.featuredSkill.status, 'behind')
assertEqual('featured skill totalTime', priorityPayload.featuredSkill.totalTime, 25)
assertEqual('featured skill minutesToday', priorityPayload.featuredSkill.minutesToday, 15)
assertClose('featured skill progress debt percent', priorityPayload.featuredSkill.progressDebtPercent, 30.2, 0.2)
assertClose('featured skill progress debt hours', priorityPayload.featuredSkill.progressDebtHours, 60.4, 0.5)
assertClose('featured skill current progress', priorityPayload.featuredSkill.currentProgress, 0.21, 0.05)
assertClose('featured skill expected progress', priorityPayload.featuredSkill.expectedProgress, 30.41, 0.05)
assertEqual('priority recommendation title', priorityPayload.recommendation.title, 'Stay on track with TypeScript')
assertEqual('priority primary action', priorityPayload.primaryAction.label, 'Practice now')
assertEqual('priority secondary action', priorityPayload.secondaryAction.label, 'Choose another skill')
assertEqual('priority ring readiness', priorityPayload.progressRing.isReady, true)
assertEqual('priority ring current', priorityPayload.progressRing.current, 25)
assertEqual('priority ring target', priorityPayload.progressRing.target, 12000)

const healthyPayload = createPriorityPayload({
  skills: [
    {
      id: 'skill-a',
      name: 'Writing',
      goal: { type: 'weekly', targetHours: 5 },
    },
    {
      id: 'skill-b',
      name: 'Design',
      goal: { type: 'total', targetHours: 100 },
    },
  ],
  sessions: [
    { skillId: 'skill-a', durationMinutes: 60, date: '2026-04-22' },
    { skillId: 'skill-b', durationMinutes: 2400, date: '2026-04-19' },
  ],
  referenceDate,
})

assertEqual('healthy mode payload', healthyPayload.mode, 'healthy')
assertEqual('healthy state label', healthyPayload.state.label, 'Momentum steady')
assertEqual('healthy urgency', healthyPayload.urgency, 'low')
assertEqual('healthy severity', healthyPayload.severity, 'success')
assertEqual('healthy summary', healthyPayload.summary, {
  skillsOnTrack: 1,
  skillsAhead: 1,
})
assertEqual('healthy recommendation title', healthyPayload.recommendation.title, 'Keep momentum steady with Design')
assertEqual('healthy primary action', healthyPayload.primaryAction.label, 'Keep momentum')
assertEqual('healthy secondary action', healthyPayload.secondaryAction.label, 'Review another skill')
assertEqual('healthy ring readiness', healthyPayload.progressRing.isReady, true)
assertEqual('healthy focus skill', healthyPayload.focusSkill.skillName, 'Design')

console.log('priority tests finished')
