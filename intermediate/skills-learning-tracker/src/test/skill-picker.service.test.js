import { createSkillPickerPayload } from '../services/skill-picker.service.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

const payload = createSkillPickerPayload({
  currentSkillId: 'skill-b',
  referenceDate: new Date('2026-04-22T12:00:00Z'),
  skills: [
    {
      id: 'skill-a',
      name: 'Algebra',
      goal: { type: 'weekly', targetHours: 4 },
    },
    {
      id: 'skill-b',
      name: 'Biology',
      goal: null,
    },
    {
      id: 'skill-c',
      name: 'Chemistry',
      goal: { type: 'total', targetHours: 10 },
    },
    {
      id: 'skill-d',
      name: 'Design',
      goal: { type: 'weekly', targetHours: 2 },
    },
    {
      id: 'skill-e',
      name: 'Economics',
      goal: { type: 'weekly', targetHours: 2 },
    },
    {
      id: 'skill-f',
      name: 'French',
      goal: { type: 'weekly', targetHours: 2 },
    },
  ],
  sessions: [
    { skillId: 'skill-a', durationMinutes: 30, date: '2026-04-18' },
    { skillId: 'skill-c', durationMinutes: 45, date: '2026-04-21' },
    { skillId: 'skill-d', durationMinutes: 75, date: '2026-04-22' },
    { skillId: 'skill-e', durationMinutes: 240, date: '2026-04-22' },
    { skillId: 'skill-f', durationMinutes: 120, date: '2026-04-22' },
  ],
})

const goalSetupPayload = createSkillPickerPayload({
  purpose: 'goal_setup',
  skills: [],
  sessions: [],
})

assertEqual('ordered skill ids', payload.skills.map((skill) => skill.id), [
  'skill-b',
  'skill-d',
  'skill-e',
  'skill-f',
  'skill-c',
  'skill-a',
])
assertEqual('priority skill contract', payload.skills[0], {
  id: 'skill-b',
  name: 'Biology',
  progressLabel: 'No goal set',
  progressPercent: null,
  hasGoal: false,
  isPriority: true,
  lastPracticedAt: null,
  sortRank: 0,
})
assertEqual('recently practiced skill contract', payload.skills[1], {
  id: 'skill-d',
  name: 'Design',
  progressLabel: '62.5% completed',
  progressPercent: 62.5,
  hasGoal: true,
  isPriority: false,
  lastPracticedAt: '2026-04-22',
  sortRank: 1,
})
assertEqual(
  'completed skill is visually clamped',
  payload.skills.find((skill) => skill.id === 'skill-e')?.progressLabel,
  'Completed'
)
assertEqual(
  'exactly complete skill is visually clamped',
  payload.skills.find((skill) => skill.id === 'skill-f')?.progressLabel,
  'Completed'
)
assertEqual(
  'raw progress remains unmodified',
  payload.skills.find((skill) => skill.id === 'skill-e')?.progressPercent,
  200
)
assertEqual('remaining alphabetical skill contract', payload.skills.find((skill) => skill.id === 'skill-a'), {
  id: 'skill-a',
  name: 'Algebra',
  progressLabel: '12.5% completed',
  progressPercent: 12.5,
  hasGoal: true,
  isPriority: false,
  lastPracticedAt: '2026-04-18',
  sortRank: 5,
})

const emptyPayload = createSkillPickerPayload({
  skills: [],
  sessions: [],
})

const fallbackPayload = createSkillPickerPayload({
  currentSkillId: 'missing-skill',
  skills: [
    {
      id: 'skill-x',
      name: 'Xylophone',
      goal: { type: 'weekly', targetHours: 2 },
    },
    {
      id: 'skill-y',
      name: 'Yoga',
      goal: { type: 'weekly', targetHours: 2 },
    },
  ],
  sessions: [
    { skillId: 'skill-y', durationMinutes: 30, date: '2026-04-21' },
  ],
})

assertEqual('empty payload has no skills', emptyPayload.hasSkills, false)
assertEqual('empty payload skills array', emptyPayload.skills, [])
assertEqual('empty payload fallback', emptyPayload.emptyState, {
  title: 'No skills available yet',
  description: 'Add your first skill to start picking a practice target.',
  actionLabel: 'Create your first skill',
})
assertEqual('goal setup payload purpose', goalSetupPayload.purpose, 'goal_setup')
assertEqual('goal setup payload copy', goalSetupPayload.emptyState, {
  title: 'No skills available yet',
  description: 'Add your first skill before setting a goal.',
  actionLabel: 'Create your first skill',
})
assertEqual('invalid current skill does not win', fallbackPayload.skills[0].id !== 'missing-skill', true)

console.log('skill picker service tests finished')
