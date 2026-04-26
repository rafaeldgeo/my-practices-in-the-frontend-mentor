import { createDashboardData } from '../services/dashboard.service.js';

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);

  if (isEqual) {
    console.log(`✅ ${description}`);
  } else {
    console.error(`❌ ${description}`, { actual, expected });
  }
}

const dashboardData = createDashboardData({
  skills: [
    { id: 'skill-1', name: 'Spanish' },
    { id: 'skill-2', name: 'Guitar' },
    { id: 'skill-3', name: 'TypeScript' },
  ],
  sessions: [
    { skillId: 'skill-1', duration: 40, date: '2026-04-21' },
    { skillId: 'skill-1', durationMinutes: 25, date: '2026-04-21' },
    { skillId: 'skill-2', duration: 50, date: '2026-04-22' },
    { skillId: 'skill-2', duration: 20, date: '2026-04-20' },
    { skillId: 'skill-3', duration: 10, date: '2026-04-19' },
    { skillId: 'skill-3', duration: 15, date: '2026-04-18' },
  ],
});

assertEqual('retorno existe', typeof dashboardData === 'object', true);
assertEqual('featured totalTime', dashboardData.featured.totalTime, 65);
assertEqual('featured status', dashboardData.featured.status, {
  type: 'onTrack',
  label: 'On track',
});
assertEqual('globalStats', dashboardData.globalStats, {
  totalTime: 160,
  totalSessions: 6,
  currentStreak: 0,
});
assertEqual('consistency', dashboardData.consistency, [
  { date: '2026-04-22', totalMinutes: 50 },
  { date: '2026-04-21', totalMinutes: 65 },
  { date: '2026-04-20', totalMinutes: 20 },
  { date: '2026-04-19', totalMinutes: 10 },
  { date: '2026-04-18', totalMinutes: 15 },
]);
assertEqual('recentActivity', dashboardData.recentActivity, [
  { skillId: 'skill-2', skillName: 'Guitar', duration: 50, date: '2026-04-22' },
  { skillId: 'skill-1', skillName: 'Spanish', duration: 40, date: '2026-04-21' },
  { skillId: 'skill-1', skillName: 'Spanish', duration: 25, date: '2026-04-21' },
  { skillId: 'skill-2', skillName: 'Guitar', duration: 20, date: '2026-04-20' },
  { skillId: 'skill-3', skillName: 'TypeScript', duration: 10, date: '2026-04-19' },
]);
assertEqual('skills', dashboardData.skills, [
  {
    skillId: 'skill-1',
    skillName: 'Spanish',
    totalTime: 65,
    status: { type: 'onTrack' },
  },
  {
    skillId: 'skill-2',
    skillName: 'Guitar',
    totalTime: 70,
    status: { type: 'onTrack' },
  },
  {
    skillId: 'skill-3',
    skillName: 'TypeScript',
    totalTime: 25,
    status: { type: 'behind' },
  },
]);

assertEqual(
  'dashboardData keys',
  Object.keys(dashboardData),
  ['featured', 'globalStats', 'consistency', 'recentActivity', 'skills']
);

console.log('dashboard tests finished');
