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

assertEqual('empty mode payload', emptyPayload, { mode: 'empty' })

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
assertEqual('featured skill selected by largest debt', priorityPayload.featuredSkill.skillId, 'skill-3')
assertEqual('featured skill name', priorityPayload.featuredSkill.skillName, 'TypeScript')
assertEqual('featured skill status', priorityPayload.featuredSkill.status, 'behind')
assertEqual('featured skill totalTime', priorityPayload.featuredSkill.totalTime, 25)
assertEqual('featured skill minutesToday', priorityPayload.featuredSkill.minutesToday, 15)
assertClose('featured skill progress debt percent', priorityPayload.featuredSkill.progressDebtPercent, 30.2, 0.2)
assertClose('featured skill progress debt hours', priorityPayload.featuredSkill.progressDebtHours, 60.4, 0.5)
assertClose('featured skill current progress', priorityPayload.featuredSkill.currentProgress, 0.21, 0.05)
assertClose('featured skill expected progress', priorityPayload.featuredSkill.expectedProgress, 30.41, 0.05)

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
assertEqual('healthy summary', healthyPayload.summary, {
  skillsOnTrack: 1,
  skillsAhead: 1,
})

console.log('priority tests finished')
