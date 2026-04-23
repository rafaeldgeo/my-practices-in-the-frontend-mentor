import { calculateStreak } from '../services/streak.service.js';

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

const referenceDate = new Date('2026-04-22T12:00:00');

const sessions = [
  { skillId: 'js', date: '2026-04-18' },
  { skillId: 'js', date: '2026-04-19' },
  { skillId: 'js', date: '2026-04-19' },
  { skillId: 'js', date: '2026-04-20' },
  { skillId: 'js', date: '2026-04-21' },
  { skillId: 'js', date: '2026-04-21' },
  { skillId: 'js', date: '2026-04-22' },
  { skillId: 'css', date: '2026-04-22' },
  { skillId: 'js', date: '2026-04-10' },
];

assertEqual(
  calculateStreak(sessions, 'js', referenceDate),
  { currentStreak: 5, longestStreak: 5 },
  'JS streak should be 5'
);

assertEqual(
  calculateStreak(sessions, 'css', referenceDate),
  { currentStreak: 1, longestStreak: 1 },
  'CSS streak should be 1'
);

assertEqual(
  calculateStreak(
    [
      { skillId: 'js', date: '2026-04-18' },
      { skillId: 'js', date: '2026-04-19' },
      { skillId: 'js', date: '2026-04-20' },
    ],
    'js',
    new Date('2026-04-22T12:00:00')
  ),
  { currentStreak: 0, longestStreak: 3 },
  'Broken streak should reset currentStreak'
);

console.log('streak tests finished');