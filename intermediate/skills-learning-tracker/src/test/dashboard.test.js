import { createDashboardData } from '../services/dashboard.service.js';

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);

  if (isEqual) {
    console.log(`✅ ${description}`);
  } else {
    console.error(`❌ ${description}`, { actual, expected });
  }
}

function getHeatmapCell(consistency, date) {
  return consistency?.cells?.find((cell) => cell.date === date);
}

const dashboardData = createDashboardData({
  referenceDate: new Date('2026-04-22T12:00:00Z'),
  skills: [
    {
      id: 'skill-1',
      name: 'Spanish',
      goal: { type: 'weekly', targetHours: 5 },
      createdAt: '2026-04-21T11:00:00Z',
    },
    {
      id: 'skill-2',
      name: 'Guitar',
      goal: { type: 'weekly', targetHours: 3 },
      createdAt: '2026-04-23T10:00:00Z',
    },
    {
      id: 'skill-3',
      name: 'TypeScript',
      goal: { type: 'total', targetHours: 200 },
      createdAt: '2026-04-19T08:00:00Z',
    },
  ],
  sessions: [
    { skillId: 'skill-1', duration: 40, date: '2026-04-21', createdAt: '2026-04-21T08:00:00Z' },
    { skillId: 'skill-1', durationMinutes: 25, date: '2026-04-21', createdAt: '2026-04-21T10:00:00Z' },
    { skillId: 'skill-2', duration: 50, date: '2026-04-22', createdAt: '2026-04-22T12:00:00Z' },
    { skillId: 'skill-2', duration: 20, date: '2026-04-20', createdAt: '2026-04-20T07:30:00Z' },
    { skillId: 'skill-3', duration: 10, date: '2026-04-19', createdAt: '2026-04-19T11:00:00Z' },
    { skillId: 'skill-3', duration: 15, date: '2026-04-18', createdAt: '2026-04-18T14:00:00Z' },
  ],
});

assertEqual('retorno existe', typeof dashboardData === 'object', true);
assertEqual('globalStats streak', dashboardData.globalStats.streak, {
  key: 'streak',
  label: 'Current streak',
  value: 5,
  displayValue: '5 days',
  trend: 'up',
  periodLabel: 'Current day chain',
});
assertEqual('globalStats weeklyPractice', dashboardData.globalStats.weeklyPractice, {
  key: 'weeklyPractice',
  label: 'Weekly practice',
  value: 160,
  displayValue: '2h 40m this week',
  trend: 'up',
  periodLabel: 'Last 7 days',
});
assertEqual('globalStats skillsPracticed', dashboardData.globalStats.skillsPracticed, {
  key: 'skillsPracticed',
  label: 'Skills practiced',
  value: 3,
  displayValue: '3 skills this week',
  trend: 'up',
  periodLabel: 'Last 7 days',
});
assertEqual('globalStats totalLearningTime', dashboardData.globalStats.totalLearningTime, {
  key: 'totalLearningTime',
  label: 'Total learning time',
  value: 160,
  displayValue: '2h 40m total',
  trend: 'up',
  periodLabel: 'All time',
});
assertEqual('consistency range', dashboardData.consistency.range, {
  startDate: '2026-03-19',
  endDate: '2026-04-22',
  days: 35,
});
assertEqual('consistency total minutes', dashboardData.consistency.summary.totalMinutes, 160);
assertEqual('consistency total sessions', dashboardData.consistency.summary.totalSessions, 6);
assertEqual('consistency active days', dashboardData.consistency.summary.activeDays, 5);
assertEqual('consistency empty days', dashboardData.consistency.summary.emptyDays, 30);
assertEqual('consistency longest active run', dashboardData.consistency.summary.longestActiveRun, 5);
assertEqual('consistency current active run', dashboardData.consistency.summary.currentActiveRun, 5);
assertEqual('consistency cells are continuous', dashboardData.consistency.cells.length, 35);
assertEqual('consistency start day is empty', getHeatmapCell(dashboardData.consistency, '2026-03-19').isEmpty, true);
assertEqual('consistency peak day is 2026-04-21', dashboardData.consistency.summary.peakDay.date, '2026-04-21');
assertEqual('consistency peak day bucket', dashboardData.consistency.summary.peakDay.bucket, 'intense');
assertEqual('consistency low bucket', getHeatmapCell(dashboardData.consistency, '2026-04-18').bucket, 'low');
assertEqual('consistency medium bucket', getHeatmapCell(dashboardData.consistency, '2026-04-19').bucket, 'medium');
assertEqual('consistency high bucket', getHeatmapCell(dashboardData.consistency, '2026-04-22').bucket, 'high');
assertEqual('consistency intense bucket', getHeatmapCell(dashboardData.consistency, '2026-04-21').bucket, 'intense');
assertEqual('consistency today flag', getHeatmapCell(dashboardData.consistency, '2026-04-22').isToday, true);
assertEqual(
  'consistency accessibility label',
  typeof getHeatmapCell(dashboardData.consistency, '2026-04-21').accessibilityLabel,
  'string'
);
assertEqual('recentActivity', dashboardData.recentActivity, [
  {
    id: 'skill-created-skill-2-2026-04-23T10:00:00Z-1',
    type: 'skill_created',
    message: 'Guitar added',
    timestamp: '2026-04-23T10:00:00Z',
    skillId: 'skill-2',
    skillName: 'Guitar',
    date: '2026-04-23',
    duration: 0,
  },
  {
    id: 'session-skill-2-2026-04-22T12:00:00Z-2',
    type: 'session',
    message: 'Practiced Guitar',
    timestamp: '2026-04-22T12:00:00Z',
    skillId: 'skill-2',
    skillName: 'Guitar',
    date: '2026-04-22',
    duration: 50,
  },
  {
    id: 'skill-created-skill-1-2026-04-21T11:00:00Z-0',
    type: 'skill_created',
    message: 'Spanish added',
    timestamp: '2026-04-21T11:00:00Z',
    skillId: 'skill-1',
    skillName: 'Spanish',
    date: '2026-04-21',
    duration: 0,
  },
  {
    id: 'session-skill-1-2026-04-21T10:00:00Z-1',
    type: 'session',
    message: 'Practiced Spanish',
    timestamp: '2026-04-21T10:00:00Z',
    skillId: 'skill-1',
    skillName: 'Spanish',
    date: '2026-04-21',
    duration: 25,
  },
  {
    id: 'session-skill-1-2026-04-21T08:00:00Z-0',
    type: 'session',
    message: 'Practiced Spanish',
    timestamp: '2026-04-21T08:00:00Z',
    skillId: 'skill-1',
    skillName: 'Spanish',
    date: '2026-04-21',
    duration: 40,
  },
]);
assertEqual(
  'recentActivity ids and skillIds',
  dashboardData.recentActivity.every((activity) => Boolean(activity.id) && Boolean(activity.skillId)),
  true
);
assertEqual('recentActivity length', dashboardData.recentActivity.length, 5);
assertEqual('skills', dashboardData.skills, [
  {
    skillId: 'skill-1',
    skillName: 'Spanish',
    totalTime: 65,
    status: { type: 'on-track' },
  },
  {
    skillId: 'skill-2',
    skillName: 'Guitar',
    totalTime: 70,
    status: { type: 'on-track' },
  },
  {
    skillId: 'skill-3',
    skillName: 'TypeScript',
    totalTime: 25,
    status: { type: 'behind' },
  },
]);
assertEqual('featuredInsight mode', dashboardData.featuredInsight.mode, 'priority');
assertEqual('featuredInsight state', dashboardData.featuredInsight.state, {
  kind: 'priority',
  reason: null,
  label: 'At risk',
});
assertEqual('featuredInsight skill', dashboardData.featuredInsight.featuredSkill.skillId, 'skill-3');
assertEqual('featuredInsight status', dashboardData.featuredInsight.featuredSkill.status, 'behind');
assertEqual('featuredInsight recommendation title', dashboardData.featuredInsight.recommendation.title, 'Stay on track with TypeScript');
assertEqual('featuredInsight primary action', dashboardData.featuredInsight.primaryAction.label, 'Practice now');
assertEqual('featuredInsight ring readiness', dashboardData.featuredInsight.progressRing.isReady, true);
assertEqual('featuredInsight flags', {
  isAtRisk: dashboardData.featuredInsight.flags.isAtRisk,
  hasMissingGoals: dashboardData.featuredInsight.flags.hasMissingGoals,
  hasInsufficientPacingData: dashboardData.featuredInsight.flags.hasInsufficientPacingData,
}, {
  isAtRisk: true,
  hasMissingGoals: false,
  hasInsufficientPacingData: false,
});

assertEqual(
  'dashboardData keys',
  Object.keys(dashboardData),
  ['globalStats', 'consistency', 'recentActivity', 'skills', 'featuredInsight']
);

const mixedDashboardData = createDashboardData({
  skills: [
    { id: 1778200355041, name: 'Dynamic Skill', createdAt: '2026-04-24T10:00:00Z' },
  ],
  sessions: [
    { skillId: 1778200355041, duration: 20, date: '2026-04-24', createdAt: '2026-04-24T12:00:00Z' },
  ],
});

assertEqual('mixed skill id is normalized', mixedDashboardData.skills[0].skillId, '1778200355041');
assertEqual(
  'mixed activity skillId is normalized',
  mixedDashboardData.recentActivity.find((activity) => activity.type === 'session')?.skillId,
  '1778200355041'
);

console.log('dashboard tests finished');
