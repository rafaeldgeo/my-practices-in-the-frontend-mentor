import { createSkill, validateSkill } from '../model/skill.model.js'

const skill = createSkill({
  name: 'js',
  startDate: '2026-04-21',
  targetHours: 60
})

console.log('SKILL:', skill)

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
  } else {
    console.error(`❌ ${description}`, { actual, expected })
  }
}

assertEqual('skill id is a string', typeof skill.id, 'string')

const validation = validateSkill(skill)

console.log('VALIDATION:', validation)
