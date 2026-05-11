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
  heroAction: null,
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
          streak: {
            key: 'streak',
            label: 'Current streak',
            value: 1,
            displayValue: '1 day',
            trend: 'stable',
            periodLabel: 'Current day chain',
          },
          weeklyPractice: {
            key: 'weeklyPractice',
            label: 'Weekly practice',
            value: 30,
            displayValue: '30m this week',
            trend: 'stable',
            periodLabel: 'Last 7 days',
          },
          skillsPracticed: {
            key: 'skillsPracticed',
            label: 'Skills practiced',
            value: 1,
            displayValue: '1 skill this week',
            trend: 'stable',
            periodLabel: 'Last 7 days',
          },
          totalLearningTime: {
            key: 'totalLearningTime',
            label: 'Total learning time',
            value: 30,
            displayValue: '30m total',
            trend: 'stable',
            periodLabel: 'All time',
          },
        },
        consistency: [],
        recentActivity: [],
        skills: skills.map((skill) => ({
          skillId: skill.id,
          skillName: skill.name,
          totalTime: 30,
          status: { type: 'on-track' },
        })),
        featuredInsight: {
          mode: 'priority',
          state: {
            kind: 'priority',
            reason: null,
            label: 'At risk',
          },
          urgency: 'high',
          severity: 'warning',
          flags: {
            isAtRisk: true,
            isHealthyMomentum: false,
            isOnboarding: false,
            hasNoSkills: false,
            hasNoSessions: false,
            hasMissingGoals: false,
            hasInsufficientPacingData: false,
            hasGoalSkills: true,
            hasPacingData: true,
            hasFocusSkill: true,
          },
          recommendation: {
            eyebrow: 'Operational priority',
            title: 'Stay on track with Spanish',
            description: 'You are behind the current pace.',
          },
          primaryAction: {
            label: 'Practice now',
            action: 'open_session_modal',
            intent: 'practice_now',
            skillId: 'skill-1',
          },
          secondaryAction: {
            label: 'Choose another skill',
            action: 'open_skill_picker',
            intent: 'switch_skill',
          },
          progressRing: {
            scope: 'skill',
            percentage: 18,
            current: 30,
            target: 300,
            remaining: 270,
            isReady: true,
          },
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
      }
    },
  },
  onHeroAction(action) {
    calls.heroAction = action
  },
  view: {
    render(payload) {
      calls.render = payload
    },
  },
})

await controller.updateDashboard()
controller.handleHeroAction({
  action: 'open_session_modal',
  intent: 'practice_now',
  skillId: 'skill-1',
})

assertEqual('render receives dashboard data as a single payload', calls.render, {
  globalStats: {
    streak: {
      key: 'streak',
      label: 'Current streak',
      value: 1,
      displayValue: '1 day',
      trend: 'stable',
      periodLabel: 'Current day chain',
    },
    weeklyPractice: {
      key: 'weeklyPractice',
      label: 'Weekly practice',
      value: 30,
      displayValue: '30m this week',
      trend: 'stable',
      periodLabel: 'Last 7 days',
    },
    skillsPracticed: {
      key: 'skillsPracticed',
      label: 'Skills practiced',
      value: 1,
      displayValue: '1 skill this week',
      trend: 'stable',
      periodLabel: 'Last 7 days',
    },
    totalLearningTime: {
      key: 'totalLearningTime',
      label: 'Total learning time',
      value: 30,
      displayValue: '30m total',
      trend: 'stable',
      periodLabel: 'All time',
    },
  },
  consistency: [],
  recentActivity: [],
  skills: [
    {
      skillId: 'skill-1',
      skillName: 'Spanish',
      totalTime: 30,
      status: { type: 'on-track' },
    },
  ],
  featuredInsight: {
    mode: 'priority',
    state: {
      kind: 'priority',
      reason: null,
      label: 'At risk',
    },
    urgency: 'high',
    severity: 'warning',
    flags: {
      isAtRisk: true,
      isHealthyMomentum: false,
      isOnboarding: false,
      hasNoSkills: false,
      hasNoSessions: false,
      hasMissingGoals: false,
      hasInsufficientPacingData: false,
      hasGoalSkills: true,
      hasPacingData: true,
      hasFocusSkill: true,
    },
    recommendation: {
      eyebrow: 'Operational priority',
      title: 'Stay on track with Spanish',
      description: 'You are behind the current pace.',
    },
    primaryAction: {
      label: 'Practice now',
      action: 'open_session_modal',
      intent: 'practice_now',
      skillId: 'skill-1',
    },
    secondaryAction: {
      label: 'Choose another skill',
      action: 'open_skill_picker',
      intent: 'switch_skill',
    },
    progressRing: {
      scope: 'skill',
      percentage: 18,
      current: 30,
      target: 300,
      remaining: 270,
      isReady: true,
    },
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

assertEqual('hero action is passed through', calls.heroAction, {
  action: 'open_session_modal',
  intent: 'practice_now',
  skillId: 'skill-1',
})

console.log('dashboard controller tests finished')
