import {
  createSession,
  validateSession,
  validateSessionInput,
} from '../model/session.model.js'
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
assertEqual('template includes quick log text', template.includes('Quick log'), true)
assertEqual('template includes skill name', template.includes('Practicing <strong>teste 1</strong>'), true)
assertEqual('template includes semantic aria links', template.includes('aria-labelledby="session-title"') && template.includes('aria-describedby="session-skill session-description session-feedback"'), true)
assertEqual('template includes session form', template.includes('class="session-form"'), true)
assertEqual('template includes preset buttons', template.includes('15m') && template.includes('30m') && template.includes('60m') && template.includes('Custom length'), true)
assertEqual('template uses explicit duration data attributes', template.includes('data-duration="15"') && template.includes('data-duration="30"') && template.includes('data-duration="60"') && template.includes('data-duration="custom"'), true)
assertEqual('template includes quick duration hint', template.includes('Tap a preset, or switch to a custom length when you need one.'), true)
assertEqual('template includes hidden custom field', template.includes('class="session-form__custom" hidden'), true)
assertEqual('template includes custom input', template.includes('name="custom-duration"') && template.includes('type="number"') && template.includes('min="1"'), true)
assertEqual('template includes live feedback region', template.includes('class="session-form__feedback"') && template.includes('role="status"') && template.includes('aria-live="polite"'), true)
assertEqual('template includes close actions', template.includes('data-session-close') && template.includes('type="button"') && template.includes('Close'), true)
assertEqual('template includes submit button', template.includes('type="submit"') && template.includes('Log practice'), true)

const sessionValidation = validateSessionInput({
  skillId: 'js',
  duration: 45,
})

assertEqual('draft validation accepts canonical duration', sessionValidation, {
  isValid: true,
  errors: [],
})

const invalidSessionValidation = validateSessionInput({
  skillId: 'js',
  duration: 0,
})

assertEqual(
  'draft validation rejects invalid duration',
  invalidSessionValidation.isValid,
  false
)

console.log('session template tests finished')
