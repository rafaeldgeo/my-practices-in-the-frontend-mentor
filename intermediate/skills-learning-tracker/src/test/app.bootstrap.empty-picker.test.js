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
  return {
    renderCalls: [],
    initCalls: 0,
    bindCalls: 0,
    onSubmit: null,
    onSelect: null,
    onCreateSkill: null,
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
}

const storeState = {
  skills: [],
}

const store = {
  async getSkills() {
    return storeState.skills
  },
  async getSessions() {
    return []
  },
  async saveSkill(skill) {
    storeState.skills = [...storeState.skills, skill]
    return skill
  },
  async saveSession() {},
  async saveActivity() {},
}

const dashboardView = createStubView()
const headerView = createStubView()
const modalView = createStubView()
const sessionView = createStubView(() => '<session></session>')
const skillFormView = createStubView(() => '<skill-form></skill-form>')
const skillPickerView = createStubView(() => '<skill-picker-empty></skill-picker-empty>')

const skillService = {
  createSkill(data) {
    return {
      id: 'skill-1',
      name: data.name,
      color: data.color,
      createdAt: '2026-05-15T12:00:00Z',
      goal:
        data.goalType && data.targetHours
          ? {
              type: data.goalType,
              targetHours: Number(data.targetHours),
            }
          : null,
    }
  },
}

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

const app = createSkillsLearningTrackerApp({
  store,
  activityService: {
    createActivityFromSession() {
      return {}
    },
  },
  dashboardService: {
    createDashboardData() {
      return {
        globalStats: {},
        consistency: {},
        recentActivity: {},
        skills: [],
        featuredInsight: {
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
            label: 'Review skills',
            action: 'open_skill_picker',
            intent: 'switch_skill',
          },
        },
      }
    },
  },
  skillPickerService: {
    createSkillPickerPayload() {
      return {
        skills: [],
        emptyState: {
          title: 'No skills available yet',
          description: 'Add your first skill to start picking a practice target.',
          actionLabel: 'Create your first skill',
        },
        hasSkills: false,
      }
    },
  },
  sessionService: {
    createSession() {
      return {}
    },
  },
  dashboardView,
  headerView,
  modalView,
  sessionView,
  skillFormView,
  skillPickerView,
  modalController,
  skillService,
})

await app.handleHeroAction({
  action: 'open_skill_picker',
  intent: 'switch_skill',
})

assertEqual('empty picker opens modal', modalController.openCalls.length, 1)
assertEqual('empty picker renders empty state', skillPickerView.renderCalls[0].hasSkills, false)
assertEqual('empty picker exposes fallback content', skillPickerView.renderCalls[0].emptyState, {
  title: 'No skills available yet',
  description: 'Add your first skill to start picking a practice target.',
  actionLabel: 'Create your first skill',
})

skillPickerView.onCreateSkill()

assertEqual('fallback action opens skill form', skillFormView.renderCalls.length, 1)
assertEqual('fallback action reuses modal controller', modalController.openCalls.length, 2)

skillFormView.onSubmit({
  name: 'Japanese',
  color: '#22c55e',
  goalType: 'weekly',
  targetHours: '8',
})

await new Promise((resolve) => setTimeout(resolve, 0))

assertEqual('create flow persists the new skill', storeState.skills[0], {
  id: 'skill-1',
  name: 'Japanese',
  color: '#22c55e',
  createdAt: '2026-05-15T12:00:00Z',
  goal: {
    type: 'weekly',
    targetHours: 8,
  },
})
assertEqual('create flow closes the modal', modalController.closeCalls, 1)

console.log('app bootstrap empty picker tests finished')
