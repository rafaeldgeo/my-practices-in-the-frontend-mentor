import { createSkill, validateSkill } from '../model/skill.model.js'

const skill = createSkill({
  name: 'js',
  startDate: '2026-04-21',
  targetHours: 60
})

console.log('SKILL:', skill)

const validation = validateSkill(skill)

console.log('VALIDATION:', validation)
