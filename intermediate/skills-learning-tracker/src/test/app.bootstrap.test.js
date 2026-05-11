import { createSkillsLearningTrackerApp } from '../app.bootstrap.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

function createStubView(renderResultFactory = () => '') {
  const view = {
    initCalls: 0,
    bindCalls: 0,
    renderCalls: [],
    onSubmit: null,
    onSelect: null,
    init() {
      this.initCalls += 1
    },
    bindEvents() {
      this.bindCalls += 1
    },
    render(payload) {
      this.renderCalls.push(payload)
      return renderResultFactory(payload)
    },
  }

  return view
}

const storeState = {
  skills: [
    { id: 'skill-1', name: 'Spanish' },
    { id: 'skill-2', name: 'TypeScript' },
  ],
  sessions: [],
  activities: [],
}

const store = {
  async getSkills() {
    return storeState.skills
  },
  async getSessions() {
    return storeState.sessions
  },
  async saveSkill(skill) {
    storeState.skills = [...storeState.skills, skill]
    return skill
  },
  async saveSession(session) {
    storeState.sessions = [...storeState.sessions, session]
    return session
  },
  async saveActivity(activity) {
    storeState.activities = [...storeState.activities, activity]
    return activity
  },
}

const dashboardView = createStubView()
const headerView = createStubView()
const modalView = createStubView()
const sessionView = createStubView(({ skillId }) => `<session data-skill-id="${skillId}"></session>`)
const skillFormView = createStubView(() => '<skill-form></skill-form>')
const skillPickerView = createStubView(() => '<skill-picker></skill-picker>')

const modalController = {
  openCalls: [],
  closeCalls: 0,
  open(payload) {
    this.openCalls.push(payload)
  },
  close() {
    this.closeCalls += 1
  },
}

const sessionService = {
  createSession({ skillId, duration }) {
    return {
      id: `session-${storeState.sessions.length + 1}`,
      skillId,
      duration,
      createdAt: '2026-05-11T12:00:00Z',
      date: '2026-05-11',
    }
  },
}

const activityService = {
  createActivityFromSession({ session, skillName }) {
    return {
      id: `activity-${session.id}`,
      type: 'session',
      message: `Practiced ${skillName}`,
      timestamp: session.createdAt,
      skillId: session.skillId,
      skillName,
    }
  },
}

const skillService = {
  createSkill(data) {
    return {
      id: data.name.toLowerCase(),
      name: data.name,
      color: data.color,
    }
  },
}

const dashboardService = {
  createDashboardData({ skills, sessions }) {
    const featuredSkillId = sessions.length > 0 ? sessions[sessions.length - 1].skillId : skills[0]?.id
    const featuredSkill = skills.find((skill) => skill.id === featuredSkillId) ?? skills[0] ?? null

    return {
      globalStats: {
        streak: {
          key: 'streak',
          label: 'Current streak',
          value: sessions.length,
          displayValue: `${sessions.length} ${sessions.length === 1 ? 'day' : 'days'}`,
          trend: sessions.length > 0 ? 'up' : 'down',
          periodLabel: 'Current day chain',
        },
        weeklyPractice: {
          key: 'weeklyPractice',
          label: 'Weekly practice',
          value: sessions.reduce((total, session) => total + session.duration, 0),
          displayValue: `${sessions.reduce((total, session) => total + session.duration, 0)}m this week`,
          trend: sessions.length > 0 ? 'up' : 'down',
          periodLabel: 'Last 7 days',
        },
        skillsPracticed: {
          key: 'skillsPracticed',
          label: 'Skills practiced',
          value: skills.length,
          displayValue: `${skills.length} skills this week`,
          trend: sessions.length > 0 ? 'up' : 'stable',
          periodLabel: 'Last 7 days',
        },
        totalLearningTime: {
          key: 'totalLearningTime',
          label: 'Total learning time',
          value: sessions.reduce((total, session) => total + session.duration, 0),
          displayValue: `${sessions.reduce((total, session) => total + session.duration, 0)}m total`,
          trend: sessions.length > 0 ? 'up' : 'down',
          periodLabel: 'All time',
        },
      },
      consistency: [],
      recentActivity: [],
      skills,
      featuredInsight: featuredSkill
        ? {
            mode: 'priority',
            state: {
              kind: 'priority',
              reason: null,
              label: 'At risk',
            },
            recommendation: {
              eyebrow: 'Operational priority',
              title: `Stay on track with ${featuredSkill.name}`,
              description: 'You are behind the current pace.',
            },
            primaryAction: {
              label: 'Practice now',
              action: 'open_session_modal',
              intent: 'practice_now',
              skillId: featuredSkill.id,
            },
            secondaryAction: {
              label: 'Choose another skill',
              action: 'open_skill_picker',
              intent: 'switch_skill',
            },
            featuredSkill: {
              skillId: featuredSkill.id,
              skillName: featuredSkill.name,
              progressDebtPercent: 12.5,
              progressDebtHours: 1.2,
              currentProgress: 18,
              expectedProgress: 30,
              totalTime: sessions.reduce((total, session) => total + session.duration, 0),
              minutesToday: sessions.length > 0 ? sessions[sessions.length - 1].duration : 0,
              status: 'behind',
            },
          }
        : {
            mode: 'empty',
            state: {
              kind: 'empty',
              reason: 'no-data',
              label: 'Awaiting data',
            },
            recommendation: {
              eyebrow: 'Start here',
              title: 'Start your learning loop',
              description: 'Add your first skill and session to turn the dashboard into an operational plan.',
            },
            primaryAction: {
              label: 'Add your first skill',
              action: 'open_skill_form',
              intent: 'create_skill',
            },
            secondaryAction: {
              label: 'Use sample data',
              action: 'load_sample_data',
              intent: 'seed_demo',
            },
          },
    }
  },
}

const app = createSkillsLearningTrackerApp({
  store,
  activityService,
  dashboardService,
  skillService,
  sessionService,
  dashboardView,
  headerView,
  modalView,
  sessionView,
  skillFormView,
  skillPickerView,
  modalController,
})

const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

await app.init()

assertEqual('dashboard renders on init', dashboardView.renderCalls.length, 1)
assertEqual(
  'initial featured skill comes from dashboard data',
  dashboardView.renderCalls[0].featuredInsight.primaryAction.skillId,
  'skill-1'
)

await app.handleHeroAction({
  action: 'open_session_modal',
  intent: 'practice_now',
  skillId: 'skill-2',
})

assertEqual('primary hero action opens session modal with preselected skill', sessionView.renderCalls[0], {
  skillId: 'skill-2',
  skillName: 'TypeScript',
})

await app.handleHeroAction({
  action: 'open_skill_picker',
  intent: 'switch_skill',
})

assertEqual('secondary hero action opens picker with skills', skillPickerView.renderCalls[0].skills, [
  { id: 'skill-1', name: 'Spanish' },
  { id: 'skill-2', name: 'TypeScript' },
])

skillPickerView.onSelect('skill-1')
await flush()

assertEqual('picker selection opens session modal', sessionView.renderCalls[1], {
  skillId: 'skill-1',
  skillName: 'Spanish',
})

await app.handleSessionSubmit({
  skillId: 'skill-2',
  duration: 30,
})

assertEqual('session is persisted', storeState.sessions.length, 1)
assertEqual('activity is persisted', storeState.activities.length, 1)
assertEqual('dashboard refresh is triggered after save', dashboardView.renderCalls.length, 2)
assertEqual(
  'featured insight changes after refresh',
  dashboardView.renderCalls[1].featuredInsight.featuredSkill.skillId,
  'skill-2'
)
assertEqual('modal closes after session save', modalController.closeCalls, 1)

console.log('app bootstrap tests finished')
