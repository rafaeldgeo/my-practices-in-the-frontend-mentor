import { transformDemoDataset } from '../utils/demo-temporal.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

function assertTrue(description, actual) {
  assertEqual(description, actual, true)
}

function isWithinSafeWindow(timestamp) {
  const date = new Date(timestamp)

  if (Number.isNaN(date.getTime())) {
    return false
  }

  const minutesSinceMidnight = date.getUTCHours() * 60 + date.getUTCMinutes()

  return minutesSinceMidnight >= 8 * 60 && minutesSinceMidnight <= 13 * 60
}

function isAtOrBeforeReference(timestamp, referenceDate) {
  const parsedTimestamp = Date.parse(timestamp)
  const parsedReference = referenceDate instanceof Date ? referenceDate.getTime() : Date.parse(referenceDate)

  if (Number.isNaN(parsedTimestamp) || Number.isNaN(parsedReference)) {
    return false
  }

  return parsedTimestamp <= parsedReference
}

const referenceDate = new Date('2026-04-22T12:00:00Z')

const demoData = {
  demoTimeline: {
    anchorDate: '2026-03-19',
  },
  skills: [
    {
      id: 'skill-1',
      createdAt: '2026-03-19T18:30:00Z',
    },
  ],
  sessions: [
    {
      id: 's-001',
      skillId: 'skill-1',
      date: '2026-03-19',
      createdAt: '2026-03-19T18:30:00Z',
    },
    {
      id: 's-002',
      skillId: 'skill-1',
      date: '2026-03-18',
      createdAt: '2026-03-18T08:00:00Z',
    },
  ],
  activities: [
    {
      id: 'a-001',
      type: 'session',
      skillId: 'skill-1',
      timestamp: '2026-03-19T21:45:00Z',
      date: '2026-03-19',
    },
  ],
}

const shifted = transformDemoDataset(demoData, referenceDate)

assertEqual('demo timeline keeps the domain shape', shifted.demoTimeline, demoData.demoTimeline)
assertEqual('latest session aligns to reference date', shifted.sessions[0].date, '2026-04-22')
assertEqual('older session keeps relative gap', shifted.sessions[1].date, '2026-04-21')
assertTrue('latest session timestamp stays in the safe window', isWithinSafeWindow(shifted.sessions[0].createdAt))
assertTrue('older session timestamp stays in the safe window', isWithinSafeWindow(shifted.sessions[1].createdAt))
assertTrue('skill timestamp stays in the safe window', isWithinSafeWindow(shifted.skills[0].createdAt))
assertTrue('activity timestamp stays in the safe window', isWithinSafeWindow(shifted.activities[0].timestamp))
assertTrue('demo timestamps are normalized away from late evening hours', shifted.sessions[0].createdAt < '2026-04-22T13:00:00Z')
assertEqual('original payload is not mutated', demoData.sessions[0].date, '2026-03-19')

const earlyReferenceDate = new Date('2026-04-22T09:30:00Z')
const earlyShifted = transformDemoDataset(demoData, earlyReferenceDate)

assertTrue(
  'current-day session timestamp does not exceed the reference clock',
  isAtOrBeforeReference(earlyShifted.sessions[0].createdAt, earlyReferenceDate)
)
assertTrue(
  'current-day activity timestamp does not exceed the reference clock',
  isAtOrBeforeReference(earlyShifted.activities[0].timestamp, earlyReferenceDate)
)

console.log('demo temporal tests finished')
