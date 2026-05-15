import {
  createSkill as createSkillService,
  createSkillGoal,
  normalizeSkill,
  updateSkillGoal,
} from '../services/skill.service.js'
import { createSkill, validateSkill } from '../model/skill.model.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

const skill = createSkill({
  name: 'Japanese',
  color: '  #22c55e  ',
})

assertEqual('model delegates to service for createSkill', skill.goal, null)
assertEqual('official skill shape keys', Object.keys(skill), ['id', 'name', 'color', 'createdAt', 'goal'])
assertEqual('skill name is preserved', skill.name, 'Japanese')
assertEqual('skill color is normalized', skill.color, '#22c55e')
assertEqual('skill createdAt is a timestamp string', typeof skill.createdAt, 'string')
assertEqual('skill goal is optional', skill.goal, null)

const validation = validateSkill(skill)
assertEqual('official skill validates', validation, {
  isValid: true,
  errors: [],
})

const normalizedLegacySkill = normalizeSkill({
  id: 42,
  name: '  Legacy Skill  ',
  color: '',
  createdAt: '2024-04-21T00:00:00Z',
  targetHours: 12,
})

assertEqual('legacy skill normalizes into official shape', normalizedLegacySkill, {
  id: '42',
  name: 'Legacy Skill',
  color: '#059669',
  createdAt: '2024-04-21T00:00:00Z',
  goal: {
    type: 'total',
    targetHours: 12,
  },
})

assertEqual(
  'createSkill service keeps goal optional when omitted',
  createSkillService({ name: 'Writing' }).goal,
  null
)

assertEqual(
  'createSkill service accepts an inline goal',
  createSkillService({
    name: 'Analytics',
    color: '#0ea5e9',
    goalType: 'weekly',
    targetHours: '6',
  }).goal,
  {
    type: 'weekly',
    targetHours: 6,
  }
)

assertEqual(
  'createSkillGoal normalizes goal form data',
  createSkillGoal({ goalType: 'weekly', targetHours: '8' }),
  {
    type: 'weekly',
    targetHours: 8,
  }
)

assertEqual(
  'updateSkillGoal preserves official skill shape',
  updateSkillGoal(
    {
      id: 'skill-goal-less',
      name: 'Sketching',
      goal: null,
    },
    {
      goalType: 'total',
      targetHours: 12,
    }
  ),
  {
    id: 'skill-goal-less',
    name: 'Sketching',
    color: '#059669',
    createdAt: '',
    goal: {
      type: 'total',
      targetHours: 12,
    },
  }
)

console.log('skill tests finished')
