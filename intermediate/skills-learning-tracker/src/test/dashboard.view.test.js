import { createDashboardView } from '../view/dashboard/dashboard.view.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

function createMockElement() {
  const listeners = {}

  return {
    innerHTML: '',
    hidden: false,
    addEventListener(type, callback) {
      listeners[type] = callback
    },
    contains() {
      return true
    },
    dispatchEvent(event) {
      const handler = listeners[event.type]

      if (typeof handler === 'function') {
        handler(event)
      }
    },
  }
}

const previousDocument = globalThis.document
const featured = createMockElement()
const stats = createMockElement()
const consistency = createMockElement()
const recentActivity = createMockElement()

globalThis.document = {
  getElementById(id) {
    switch (id) {
      case 'featured':
        return featured
      case 'stats':
        return stats
      case 'consistency':
        return consistency
      case 'recent-activity':
        return recentActivity
      default:
        return null
    }
  },
}

try {
  const view = createDashboardView()
  let capturedAction = null

  view.init()
  view.onHeroAction = (action) => {
    capturedAction = action
  }
  view.bindEvents()

  view.render({
    featuredInsight: {
      mode: 'priority',
      state: {
        kind: 'priority',
        reason: null,
        label: 'At risk',
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
    consistency: {
      range: {
        startDate: '2026-04-16',
        endDate: '2026-04-22',
        days: 7,
      },
      summary: {
        totalMinutes: 45,
        totalSessions: 2,
        activeDays: 1,
        emptyDays: 6,
        longestActiveRun: 1,
        currentActiveRun: 1,
        peakDay: {
          date: '2026-04-17',
          totalMinutes: 45,
          sessionCount: 2,
          bucket: 'medium',
          accessibilityLabel: 'Apr 17, 2026: 2 sessions, 45m, medium consistency, single-day rhythm',
        },
      },
      cells: [
        {
          date: '2026-04-16',
          totalMinutes: 0,
          sessionCount: 0,
          consistencyScore: 0,
          intensityLevel: 'empty',
          bucket: 'empty',
          isActive: false,
          isEmpty: true,
          isToday: false,
          isFuture: false,
          activeRunLength: 0,
          accessibilityLabel: 'Apr 16, 2026: 0 sessions, 0m, empty consistency, single-day rhythm',
          summaryLabel: '0 sessions, 0m, empty consistency, single-day rhythm',
        },
        {
          date: '2026-04-17',
          totalMinutes: 45,
          sessionCount: 2,
          consistencyScore: 46,
          intensityLevel: 'medium',
          bucket: 'medium',
          isActive: true,
          isEmpty: false,
          isToday: false,
          isFuture: false,
          activeRunLength: 1,
          accessibilityLabel: 'Apr 17, 2026: 2 sessions, 45m, medium consistency, single-day rhythm',
          summaryLabel: '2 sessions, 45m, medium consistency, single-day rhythm',
        },
      ],
    },
    recentActivity: [],
  })

  assertEqual('stats header rendered', stats.innerHTML.includes('Momentum at a glance'), true)
  assertEqual('stats primary group rendered', stats.innerHTML.includes('dashboard__definition-list--primary'), true)
  assertEqual('stats secondary group rendered', stats.innerHTML.includes('dashboard__definition-list--secondary'), true)
  assertEqual('stats label rendered', stats.innerHTML.includes('Weekly practice'), true)
  assertEqual('stats trend data rendered', stats.innerHTML.includes('data-kpi-trend="stable"'), true)
  assertEqual('stats trend badge rendered', stats.innerHTML.includes('dashboard__kpi-trend--stable'), true)
  assertEqual('hero primary action rendered', featured.innerHTML.includes('Practice now'), true)
  assertEqual('hero primary skill id rendered', featured.innerHTML.includes('data-skill-id="skill-1"'), true)
  assertEqual('heatmap panel title rendered', consistency.innerHTML.includes('dashboard__panel-title">Heatmap'), true)
  assertEqual('heatmap legend rendered', consistency.innerHTML.includes('dashboard__heatmap-legend'), true)
  assertEqual('heatmap grid rendered', consistency.innerHTML.includes('role="grid"'), true)
  assertEqual('heatmap week grouping rendered', consistency.innerHTML.includes('dashboard__heatmap-week'), true)
  assertEqual('heatmap bucket class rendered', consistency.innerHTML.includes('dashboard__heatmap-cell--medium'), true)
  assertEqual('heatmap bucket data rendered', consistency.innerHTML.includes('data-bucket="medium"'), true)
  assertEqual('heatmap accessibility label rendered', consistency.innerHTML.includes('Apr 17, 2026: 2 sessions, 45m, medium consistency, single-day rhythm'), true)
  assertEqual('heatmap fallback text rendered', consistency.innerHTML.includes('dashboard__heatmap-fallback'), true)

  const primaryButton = {
    dataset: {
      action: 'open_session_modal',
      intent: 'practice_now',
      skillId: 'skill-1',
    },
    closest() {
      return primaryButton
    },
  }

  featured.dispatchEvent({
    type: 'click',
    target: primaryButton,
  })

  assertEqual('hero primary action binding', capturedAction, {
    action: 'open_session_modal',
    intent: 'practice_now',
    skillId: 'skill-1',
  })

  view.render({
    featuredInsight: {
      mode: 'priority',
      state: {
        kind: 'priority',
        reason: null,
        label: 'At risk',
      },
      recommendation: {
        eyebrow: 'Operational priority',
        title: 'Stay on track with TypeScript',
        description: 'You are behind the current pace.',
      },
      primaryAction: {
        label: 'Practice now',
        action: 'open_session_modal',
        intent: 'practice_now',
        skillId: 'skill-2',
      },
      secondaryAction: {
        label: 'Choose another skill',
        action: 'open_skill_picker',
        intent: 'switch_skill',
      },
      featuredSkill: {
        skillId: 'skill-2',
        skillName: 'TypeScript',
        progressDebtPercent: 32.5,
        progressDebtHours: 4.2,
        currentProgress: 10,
        expectedProgress: 42,
        totalTime: 10,
        minutesToday: 10,
        status: 'behind',
      },
    },
    globalStats: {
      streak: {
        key: 'streak',
        label: 'Current streak',
        value: 2,
        displayValue: '2 days',
        trend: 'up',
        periodLabel: 'Current day chain',
      },
      weeklyPractice: {
        key: 'weeklyPractice',
        label: 'Weekly practice',
        value: 40,
        displayValue: '40m this week',
        trend: 'up',
        periodLabel: 'Last 7 days',
      },
      skillsPracticed: {
        key: 'skillsPracticed',
        label: 'Skills practiced',
        value: 2,
        displayValue: '2 skills this week',
        trend: 'up',
        periodLabel: 'Last 7 days',
      },
      totalLearningTime: {
        key: 'totalLearningTime',
        label: 'Total learning time',
        value: 40,
        displayValue: '40m total',
        trend: 'up',
        periodLabel: 'All time',
      },
    },
    consistency: {
      range: {
        startDate: '2026-04-16',
        endDate: '2026-04-22',
        days: 7,
      },
      summary: {
        totalMinutes: 45,
        totalSessions: 2,
        activeDays: 1,
        emptyDays: 6,
        longestActiveRun: 1,
        currentActiveRun: 1,
        peakDay: {
          date: '2026-04-17',
          totalMinutes: 45,
          sessionCount: 2,
          bucket: 'medium',
          accessibilityLabel: 'Apr 17, 2026: 2 sessions, 45m, medium consistency, single-day rhythm',
        },
      },
      cells: [
        {
          date: '2026-04-17',
          totalMinutes: 45,
          sessionCount: 2,
          consistencyScore: 46,
          intensityLevel: 'medium',
          bucket: 'medium',
          isActive: true,
          isEmpty: false,
          isToday: false,
          isFuture: false,
          activeRunLength: 1,
          accessibilityLabel: 'Apr 17, 2026: 2 sessions, 45m, medium consistency, single-day rhythm',
          summaryLabel: '2 sessions, 45m, medium consistency, single-day rhythm',
        },
      ],
    },
    recentActivity: [],
  })

  const updatedButton = {
    dataset: {
      action: 'open_session_modal',
      intent: 'practice_now',
      skillId: 'skill-2',
    },
    closest() {
      return updatedButton
    },
  }

  featured.dispatchEvent({
    type: 'click',
    target: updatedButton,
  })

  assertEqual('hero action uses updated render data', capturedAction, {
    action: 'open_session_modal',
    intent: 'practice_now',
    skillId: 'skill-2',
  })

  view.render({
    featuredInsight: null,
    globalStats: null,
    consistency: {
      range: {
        startDate: '',
        endDate: '',
        days: 0,
      },
      summary: {
        totalMinutes: 0,
        totalSessions: 0,
        activeDays: 0,
        emptyDays: 0,
        longestActiveRun: 0,
        currentActiveRun: 0,
        peakDay: null,
      },
      cells: [],
    },
    recentActivity: [],
  })

  assertEqual('stats empty state rendered', stats.innerHTML.includes('No data available'), true)
} finally {
  globalThis.document = previousDocument
}

console.log('dashboard view tests finished')
