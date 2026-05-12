import { transformDemoDataset } from '../utils/demo-temporal.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
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
}

const shifted = transformDemoDataset(demoData, referenceDate)

assertEqual('demo timeline keeps the domain shape', shifted.demoTimeline, demoData.demoTimeline)
assertEqual('latest session aligns to reference date', shifted.sessions[0].date, '2026-04-22')
assertEqual('older session keeps relative gap', shifted.sessions[1].date, '2026-04-21')
assertEqual('skill timestamps are shifted', shifted.skills[0].createdAt, '2026-04-22T18:30:00Z')
assertEqual('original payload is not mutated', demoData.sessions[0].date, '2026-03-19')

console.log('demo temporal tests finished')
