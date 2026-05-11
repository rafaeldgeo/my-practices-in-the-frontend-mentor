import { fetchData, getSkills, getSessions } from '../store/data.store.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

const sampleData = {
  skills: [
    { id: 'skill-1', name: 'Spanish' },
    { id: 'skill-2', name: 'TypeScript' },
  ],
  sessions: [
    { skillId: 'skill-1', duration: 30, date: '2026-05-10' },
    { skillId: 'skill-2', duration: 45, date: '2026-05-11' },
  ],
  activities: [
    { id: 'activity-1', type: 'session' },
  ],
}

const previousFetch = globalThis.fetch

globalThis.fetch = async () => ({
  ok: true,
  status: 200,
  async json() {
    return sampleData
  },
})

try {
  const data = await fetchData()
  const skills = await getSkills()
  const sessions = await getSessions()

  assertEqual('fetchData returns the raw data', data, sampleData)
  assertEqual('getSkills returns the skills collection', skills, sampleData.skills)
  assertEqual('getSessions returns the sessions collection', sessions, sampleData.sessions)
} finally {
  globalThis.fetch = previousFetch
}

console.log('data tests finished')
