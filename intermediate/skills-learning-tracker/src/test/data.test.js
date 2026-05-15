import { fetchData, getSessions, getSkills, updateSkill } from '../store/data.store.js'

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

  assertEqual('fetchData normalizes skills into the official contract', data.skills, [
    {
      id: 'skill-1',
      name: 'Spanish',
      color: '#059669',
      createdAt: '',
      goal: null,
    },
    {
      id: 'skill-2',
      name: 'TypeScript',
      color: '#059669',
      createdAt: '',
      goal: null,
    },
  ])
  assertEqual('fetchData preserves sessions', data.sessions, sampleData.sessions)
  assertEqual('fetchData preserves activities', data.activities, sampleData.activities)
  assertEqual('getSkills returns the normalized skills collection', skills, data.skills)
  assertEqual('getSessions returns the sessions collection', sessions, sampleData.sessions)

  const updatedSkill = await updateSkill({
    id: 'skill-1',
    name: 'Spanish',
    goal: {
      type: 'weekly',
      targetHours: 5,
    },
  })

  assertEqual('updateSkill replaces an existing skill in cache', updatedSkill, {
    id: 'skill-1',
    name: 'Spanish',
    color: '#059669',
    createdAt: '',
    goal: {
      type: 'weekly',
      targetHours: 5,
    },
  })
  assertEqual(
    'updateSkill keeps the skills collection aligned',
    (await getSkills())[0],
    {
      id: 'skill-1',
      name: 'Spanish',
      color: '#059669',
      createdAt: '',
      goal: {
        type: 'weekly',
        targetHours: 5,
      },
    }
  )
} finally {
  globalThis.fetch = previousFetch
}

console.log('data tests finished')
