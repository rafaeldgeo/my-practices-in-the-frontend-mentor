import { calculateStats } from '../services/stats.service.js';

function assertEqual(actual, expected, message) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);

  if (!isEqual) {
    console.error('❌ FAIL:', message);
    console.log('Expected:', expected);
    console.log('Received:', actual);
  } else {
    console.log('✅ PASS:', message);
  }
}

const sessions = [
  { skillId: 'js', duration: 30 },
  { skillId: 'js', duration: 45 },
  { skillId: 'css', duration: 60 },
  { skillId: 'js', duration: 15 },
];

assertEqual(
  calculateStats(sessions),
  { totalTime: 150, totalSessions: 4, averageSessionTime: 37.5 },
  'Stats should aggregate all sessions'
);

assertEqual(
  calculateStats(sessions, 'js'),
  { totalTime: 90, totalSessions: 3, averageSessionTime: 30 },
  'Stats should aggregate only the selected skill'
);

assertEqual(
  calculateStats([], 'js'),
  { totalTime: 0, totalSessions: 0, averageSessionTime: 0 },
  'Empty input should return zeroed stats'
);

console.log('stats tests finished');
