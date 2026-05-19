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

function getActivityGroup(recentActivity, key) {
  return recentActivity?.groups?.find((group) => group.key === key);
}

const dashboardData = createDashboardData({
  referenceDate: new Date('2026-04-22T12:00:00Z'),
  skills: [
    {
      id: 'skill-1',
      name: 'Spanish',
      goal: { type: 'weekly', targetHours: 5 },
      createdAt: '2026-04-19T10:00:00Z',
    },
    {
      id: 'skill-2',
      name: 'Guitar',
      goal: { type: 'weekly', targetHours: 3 },
      createdAt: '2026-04-21T10:00:00Z',
    },
    {
      id: 'skill-3',
      name: 'TypeScript',
      goal: { type: 'total', targetHours: 200 },
      createdAt: '2026-04-18T10:00:00Z',
    },
  ],
  sessions: [
    { skillId: 'skill-1', duration: 60, date: '2026-04-22', createdAt: '2026-04-22T12:00:00Z' },
    { skillId: 'skill-2', duration: 50, date: '2026-04-20', createdAt: '2026-04-20T12:00:00Z' },
    { skillId: 'skill-1', durationMinutes: 25, date: '2026-04-19', createdAt: '2026-04-19T12:00:00Z' },
    { skillId: 'skill-3', duration: 15, date: '2026-04-17', createdAt: '2026-04-17T12:00:00Z' },
    { skillId: 'skill-2', duration: 10, date: '2026-04-16', createdAt: '2026-04-16T12:00:00Z' },
  ],
});

assertEqual('retorno existe', typeof dashboardData === 'object', true);
assertEqual('globalStats streak', dashboardData.globalStats.streak, {
  key: 'streak',
  label: 'Current streak',
  value: 1,
  displayValue: '1 day',
  trend: 'stable',
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
  startDate: '2026-02-26',
  endDate: '2026-04-22',
  days: 56,
});
assertEqual('consistency total minutes', dashboardData.consistency.summary.totalMinutes, 160);
assertEqual('consistency total sessions', dashboardData.consistency.summary.totalSessions, 5);
assertEqual('consistency active days', dashboardData.consistency.summary.activeDays, 5);
assertEqual('consistency empty days', dashboardData.consistency.summary.emptyDays, 51);
assertEqual('consistency longest active run', dashboardData.consistency.summary.longestActiveRun, 2);
assertEqual('consistency current active run', dashboardData.consistency.summary.currentActiveRun, 1);
assertEqual('consistency cells are continuous', dashboardData.consistency.cells.length, 56);
assertEqual('consistency start day is empty', getHeatmapCell(dashboardData.consistency, '2026-02-26').isEmpty, true);
assertEqual('consistency peak day is 2026-04-22', dashboardData.consistency.summary.peakDay.date, '2026-04-22');
assertEqual('consistency peak day bucket', dashboardData.consistency.summary.peakDay.bucket, 'high');
assertEqual('consistency low bucket', getHeatmapCell(dashboardData.consistency, '2026-04-18').bucket, 'empty');
assertEqual('consistency medium bucket', getHeatmapCell(dashboardData.consistency, '2026-04-19').bucket, 'high');
assertEqual('consistency high bucket', getHeatmapCell(dashboardData.consistency, '2026-04-22').bucket, 'high');
assertEqual('consistency intense bucket', getHeatmapCell(dashboardData.consistency, '2026-04-21').bucket, 'empty');
assertEqual('consistency today flag', getHeatmapCell(dashboardData.consistency, '2026-04-22').isToday, true);
assertEqual(
  'consistency accessibility label',
  typeof getHeatmapCell(dashboardData.consistency, '2026-04-21').accessibilityLabel,
  'string'
);
assertEqual('recentActivity totalCount', dashboardData.recentActivity.totalCount, 8);
assertEqual('recentActivity hasMore', dashboardData.recentActivity.hasMore, true);
assertEqual('recentActivity group labels', dashboardData.recentActivity.groups.map((group) => group.label), [
  'Today',
  'Yesterday',
  'Earlier this week',
  'Earlier',
]);
assertEqual('recentActivity Today group title', getActivityGroup(dashboardData.recentActivity, 'today').items[0].title, 'Practiced Spanish');
assertEqual('recentActivity Today group meta', getActivityGroup(dashboardData.recentActivity, 'today').items[0].meta, '1h');
assertEqual('recentActivity Yesterday group title', getActivityGroup(dashboardData.recentActivity, 'yesterday').items[0].title, 'Added Guitar');
assertEqual('recentActivity Yesterday group meta', getActivityGroup(dashboardData.recentActivity, 'yesterday').items[0].meta, '');
assertEqual('recentActivity Earlier this week group title', getActivityGroup(dashboardData.recentActivity, 'earlier_this_week').items[0].title, 'Practiced Guitar');
assertEqual('recentActivity Earlier group count', getActivityGroup(dashboardData.recentActivity, 'earlier').items.length, 2);
assertEqual(
  'recentActivity accessibility label',
  getActivityGroup(dashboardData.recentActivity, 'yesterday').items[0].accessibilityLabel,
  'Added Guitar, Yesterday'
);
assertEqual(
  'recentActivity ids and skillIds',
  dashboardData.recentActivity.groups.flatMap((group) => group.items).every((activity) => Boolean(activity.id) && Boolean(activity.skillId)),
  true
);
assertEqual('skills', dashboardData.skills, [
  {
    skillId: 'skill-1',
    skillName: 'Spanish',
    totalTime: 85,
    status: { type: 'on-track' },
  },
  {
    skillId: 'skill-2',
    skillName: 'Guitar',
    totalTime: 60,
    status: { type: 'on-track' },
  },
  {
    skillId: 'skill-3',
    skillName: 'TypeScript',
    totalTime: 15,
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
assertEqual('featuredInsight skill color', dashboardData.featuredInsight.featuredSkill.color, '#059669');
assertEqual('featuredInsight recommendation title', dashboardData.featuredInsight.recommendation.title, 'Stay on track with TypeScript');
assertEqual('featuredInsight primary action', dashboardData.featuredInsight.primaryAction.label, 'Practice now');
assertEqual('featuredInsight ring readiness', dashboardData.featuredInsight.progressRing.isReady, true);
assertEqual('featuredInsight ring accent color', dashboardData.featuredInsight.progressRing.accentColor, '#059669');
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

const goalLessDashboardData = createDashboardData({
  referenceDate: new Date('2026-04-22T12:00:00Z'),
  skills: [
    {
      id: 'skill-goal-less',
      name: 'Sketching',
      color: '#059669',
      createdAt: '2026-04-21T09:00:00Z',
      goal: null,
    },
  ],
  sessions: [
    {
      skillId: 'skill-goal-less',
      durationMinutes: 30,
      date: '2026-04-22',
      createdAt: '2026-04-22T12:00:00Z',
    },
  ],
});

assertEqual('goal-less dashboard mode', goalLessDashboardData.featuredInsight.mode, 'empty');
assertEqual('goal-less dashboard reason', goalLessDashboardData.featuredInsight.state.reason, 'missing-goals');
assertEqual('goal-less dashboard preserves skill', goalLessDashboardData.skills[0], {
  skillId: 'skill-goal-less',
  skillName: 'Sketching',
  totalTime: 30,
  status: { type: 'behind' },
});
assertEqual('goal-less dashboard keeps empty hero state valid', goalLessDashboardData.featuredInsight.progressRing.isReady, false);

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
  mixedDashboardData.recentActivity.groups.flatMap((group) => group.items).find((activity) => activity.type === 'session')?.skillId,
  '1778200355041'
);

const sameDayOrderingDashboardData = createDashboardData({
  referenceDate: new Date('2026-04-22T18:00:00Z'),
  skills: [
    {
      id: 'skill-live',
      name: 'Live Session Skill',
      createdAt: '2026-04-22T08:00:00Z',
    },
  ],
  sessions: [
    {
      skillId: 'skill-live',
      duration: 20,
      date: '2026-04-22',
      createdAt: '2026-04-22T15:00:00Z',
    },
    {
      skillId: 'skill-live',
      duration: 20,
      date: '2026-04-22',
      createdAt: '2026-04-22T11:51:15Z',
    },
  ],
});

assertEqual(
  'latest timestamp wins for same-day recent activity',
  sameDayOrderingDashboardData.recentActivity.groups.flatMap((group) => group.items)[0].timestamp,
  '2026-04-22T15:00:00Z'
);

console.log('dashboard tests finished');
