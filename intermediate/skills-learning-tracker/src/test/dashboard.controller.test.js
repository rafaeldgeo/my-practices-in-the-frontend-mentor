import { createDashboardController } from '../controller/dashboard/dashboard.controller.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

const calls = {
  render: null,
  priority: null,
}

const controller = createDashboardController({
  store: {
    async getSkills() {
      return [
        { id: 'skill-1', name: 'Spanish' },
      ]
    },
    async getSessions() {
      return [
        { skillId: 'skill-1', durationMinutes: 30, date: '2026-04-22' },
      ]
    },
  },
  dashboardService: {
    createDashboardData({ skills, sessions }) {
      return {
        globalStats: {
          totalTime: 30,
          totalSessions: sessions.length,
          currentStreak: 1,
        },
        consistency: [],
        recentActivity: [],
        skills: skills.map((skill) => ({
          skillId: skill.id,
          skillName: skill.name,
          totalTime: 30,
          status: { type: 'onTrack' },
        })),
      }
    },
  },
  createPriorityPayload({ skills, sessions }) {
    calls.priority = { skills, sessions }

    return {
      mode: 'priority',
      featuredSkill: {
        skillId: 'skill-1',
        skillName: 'Spanish',
        progressDebtPercent: 12.5,
        progressDebtHours: 1.2,
        currentProgress: 18,
        expectedProgress: 30,
        totalTime: 30,
        minutesToday: 30,
        status: 'behind',
      },
    }
  },
  view: {
    render(payload) {
      calls.render = payload
    },
  },
})

await controller.updateDashboard()

assertEqual('priority payload factory received source data', calls.priority, {
  skills: [{ id: 'skill-1', name: 'Spanish' }],
  sessions: [{ skillId: 'skill-1', durationMinutes: 30, date: '2026-04-22' }],
})

assertEqual('render receives dashboard data plus priority payload', calls.render, {
  globalStats: {
    totalTime: 30,
    totalSessions: 1,
    currentStreak: 1,
  },
  consistency: [],
  recentActivity: [],
  skills: [
    {
      skillId: 'skill-1',
      skillName: 'Spanish',
      totalTime: 30,
      status: { type: 'onTrack' },
    },
  ],
  featured: {
    mode: 'priority',
    featuredSkill: {
      skillId: 'skill-1',
      skillName: 'Spanish',
      progressDebtPercent: 12.5,
      progressDebtHours: 1.2,
      currentProgress: 18,
      expectedProgress: 30,
      totalTime: 30,
      minutesToday: 30,
      status: 'behind',
    },
  },
})

console.log('dashboard controller tests finished')
