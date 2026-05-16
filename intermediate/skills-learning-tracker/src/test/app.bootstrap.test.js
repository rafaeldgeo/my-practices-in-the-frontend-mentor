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
    feedbackCalls: [],
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
    setFeedbackMessage(message) {
      this.feedbackCalls.push(message)
    },
    clearFeedbackMessage() {
      this.feedbackCalls.push('')
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
  async updateSkill(skill) {
    storeState.skills = storeState.skills.map((currentSkill) =>
      currentSkill.id === skill.id ? skill : currentSkill
    )
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
  validateSessionInput({ duration }) {
    return typeof duration === 'number' && duration > 0
      ? { isValid: true, errors: [] }
      : { isValid: false, errors: ['duration must be a number greater than zero'] }
  },
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
      createdAt: '2026-05-15T12:00:00Z',
      goal: null,
    }
  },
  updateSkillGoal(skill, data) {
    return {
      ...skill,
      goal: {
        type: data.goalType,
        targetHours: Number(data.targetHours),
      },
    }
  },
}

const skillPickerService = {
  createSkillPickerPayload({ skills, sessions, currentSkillId, purpose }) {
    return {
      purpose,
      skills: skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        progressLabel: skill.id === currentSkillId ? '35.6% completed' : 'No goal set',
        progressPercent: skill.id === currentSkillId ? 35.6 : null,
        hasGoal: skill.id === currentSkillId,
        isPriority: skill.id === currentSkillId,
        lastPracticedAt: null,
        sortRank: skill.id === currentSkillId ? 0 : 1,
      })),
      emptyState: null,
      hasSkills: Array.isArray(skills) && skills.length > 0,
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
  skillPickerService,
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
  feedbackMessage: '',
})

await app.handleHeroAction({
  action: 'open_skill_picker',
  intent: 'switch_skill',
})

assertEqual('secondary hero action opens picker with skills', skillPickerView.renderCalls[0].skills, [
  {
    id: 'skill-1',
    name: 'Spanish',
    progressLabel: 'No goal set',
    progressPercent: null,
    hasGoal: false,
    isPriority: false,
    lastPracticedAt: null,
    sortRank: 1,
  },
  {
    id: 'skill-2',
    name: 'TypeScript',
    progressLabel: 'No goal set',
    progressPercent: null,
    hasGoal: false,
    isPriority: false,
    lastPracticedAt: null,
    sortRank: 1,
  },
])
assertEqual('secondary hero action opens practice picker copy', skillPickerView.renderCalls[0].purpose, 'practice')

skillPickerView.onSelect('skill-1')
await flush()

assertEqual('picker selection opens session modal', sessionView.renderCalls[1], {
  skillId: 'skill-1',
  skillName: 'Spanish',
  feedbackMessage: '',
})

await app.handleHeroAction({
  action: 'open_skill_goal_setup',
  intent: 'configure_goals',
})

assertEqual('goal setup opens the picker with goal copy', skillPickerView.renderCalls[1].purpose, 'goal_setup')

skillPickerView.onSelect('skill-1')
await flush()

assertEqual('goal setup opens the skill form in goal mode', skillFormView.renderCalls[0], {
  mode: 'goal_setup',
  skill: {
    id: 'skill-1',
    name: 'Spanish',
  },
})

skillFormView.onSubmit({
  goalType: 'weekly',
  targetHours: '12',
})
await flush()

assertEqual('goal setup updates the existing skill', storeState.skills[0], {
  id: 'skill-1',
  name: 'Spanish',
  goal: {
    type: 'weekly',
    targetHours: 12,
  },
})
assertEqual('goal setup refreshes the dashboard', dashboardView.renderCalls.length, 2)
assertEqual('goal setup closes the modal', modalController.closeCalls, 1)

await app.handleSessionSubmit({
  skillId: 'skill-2',
  duration: 30,
})

assertEqual('session is persisted', storeState.sessions.length, 1)
assertEqual('activity is persisted', storeState.activities.length, 1)
assertEqual('dashboard refresh is triggered after session save', dashboardView.renderCalls.length, 3)
assertEqual(
  'featured insight changes after refresh',
  dashboardView.renderCalls[2].featuredInsight.featuredSkill.skillId,
  'skill-2'
)
assertEqual('modal closes after session save', modalController.closeCalls, 2)

await app.handleSessionSubmit({
  skillId: 'skill-2',
  duration: 0,
})

assertEqual('invalid session is rejected before persistence', storeState.sessions.length, 1)
assertEqual('invalid session does not refresh the dashboard', dashboardView.renderCalls.length, 3)
assertEqual('invalid session keeps the modal open', modalController.closeCalls, 2)
assertEqual(
  'invalid session surfaces visible feedback',
  sessionView.feedbackCalls.at(-1),
  'Pick a duration to log this practice.'
)

console.log('app bootstrap tests finished')
