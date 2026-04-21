import { createSession, validateSession } from '../model/session.model.js'

const session = createSession({
  skillId: 'js',
  date: '2026-04-21',
  duration: 60,
  notes: 'Estudando MVC'
})

console.log('SESSION:', session)

const validation = validateSession(session)

console.log('VALIDATION:', validation)