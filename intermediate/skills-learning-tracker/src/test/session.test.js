import { createSession, validateSession } from '../model/session.model.js'
import { createSessionTemplate } from '../view/session/session.template.js'

const session = createSession({
  skillId: 'js',
  date: '2026-04-21',
  duration: 60,
  notes: 'Estudando MVC'
})

console.log('SESSION:', session)

const validation = validateSession(session)

console.log('VALIDATION:', validation)

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
  } else {
    console.error(`❌ ${description}`, { actual, expected })
  }
}

const template = createSessionTemplate({
  skillId: 'skill-1',
  skillName: 'teste 1',
})

assertEqual('template returns a string', typeof template, 'string')
assertEqual('template includes title', template.includes('<h2'), true)
assertEqual('template includes start session text', template.includes('Start Session'), true)
assertEqual('template includes skill name', template.includes('Skill: teste 1'), true)
assertEqual('template includes session form', template.includes('class="session-form"'), true)
assertEqual('template includes preset buttons', template.includes('15m') && template.includes('30m') && template.includes('60m') && template.includes('Custom'), true)
assertEqual('template includes hidden custom field', template.includes('class="session-form__custom" hidden'), true)
assertEqual('template includes custom input', template.includes('name="custom-duration"') && template.includes('type="number"') && template.includes('min="1"'), true)
assertEqual('template includes submit button', template.includes('type="submit"') && template.includes('Save Session'), true)

console.log('session template tests finished')
