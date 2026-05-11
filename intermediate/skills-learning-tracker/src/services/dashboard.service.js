import { calculateStats } from './stats.service.js';
import { createPriorityPayload } from './priority.service.js';
import { calculateStreak } from './streak.service.js';

const GLOBAL_SKILL_ID = '__global__'; 
const FEATURED_MINUTES_THRESHOLD = 60; 
const RECENT_WINDOW_DAYS = 7;

function normalizeId(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return '';
}

function getSessionDuration(session) {
  if (!session || typeof session !== 'object') {
    return 0;
  }

  if (
    typeof session.durationMinutes === 'number' &&
    !Number.isNaN(session.durationMinutes)
  ) {
    return session.durationMinutes;
  }

  if (typeof session.duration === 'number' && !Number.isNaN(session.duration)) {
    return session.duration;
  }

  return 0;
}

function isValidDateString(date) {
  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function getSessionDate(session) {
  if (!session || typeof session !== 'object' || !isValidDateString(session.date)) {
    return null;
  }

  return session.date;
}

function getDateString(referenceDate = new Date()) {
  const date = referenceDate instanceof Date ? referenceDate : new Date(referenceDate);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function shiftDateString(dateString, dayOffset) {
  if (!isValidDateString(dateString)) {
    return '';
  }

  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + dayOffset);
  return getDateString(date);
}

function getDateWindow(referenceDate = new Date(), days = RECENT_WINDOW_DAYS) {
  const referenceDateString = getDateString(referenceDate);

  if (referenceDateString === '') {
    return {
      currentStart: '',
      currentEnd: '',
      previousStart: '',
      previousEnd: '',
    };
  }

  const currentStart = shiftDateString(referenceDateString, -(days - 1));
  const currentEnd = referenceDateString;
  const previousStart = shiftDateString(currentStart, -days);
  const previousEnd = shiftDateString(currentStart, -1);

  return {
    currentStart,
    currentEnd,
    previousStart,
    previousEnd,
  };
}

function isSessionInRange(session, startDate, endDate) {
  const date = getSessionDate(session);

  if (!date || !isValidDateString(startDate) || !isValidDateString(endDate)) {
    return false;
  }

  return date >= startDate && date <= endDate;
}

function getSessionsInRange(sessions, startDate, endDate) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions.filter((session) => isSessionInRange(session, startDate, endDate));
}

function getTotalMinutes(sessions) {
  return sessions.reduce((total, session) => total + getSessionDuration(session), 0);
}

function getDistinctSkillCount(sessions) {
  return new Set(
    sessions
      .filter(
        (session) =>
          session && (typeof session.skillId === 'string' || typeof session.skillId === 'number')
      )
      .map((session) => normalizeId(session.skillId))
      .filter((skillId) => skillId !== '')
  ).size;
}

function getTrend(currentValue, previousValue) {
  if (currentValue > previousValue) {
    return 'up';
  }

  if (currentValue < previousValue) {
    return 'down';
  }

  return 'stable';
}

function getStreakTrend(currentStreak) {
  if (currentStreak >= 3) {
    return 'up';
  }

  if (currentStreak > 0) {
    return 'stable';
  }

  return 'down';
}

function formatMinutesLabel(totalMinutes) {
  const minutes = Number.isFinite(Number(totalMinutes)) ? Math.max(0, Number(totalMinutes)) : 0;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  if (hours > 0 && remainder > 0) {
    return `${hours}h ${remainder}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
}

function formatCountLabel(value, noun, suffix = '') {
  const count = Number.isFinite(Number(value)) ? Number(value) : 0;
  const pluralizedNoun = count === 1 ? noun : `${noun}s`;

  return `${count} ${pluralizedNoun}${suffix}`;
}

function createKpi({ key, label, value, displayValue, trend, periodLabel }) {
  return {
    key,
    label,
    value,
    displayValue,
    trend,
    periodLabel,
  };
}

function normalizeSessionsForStats(sessions) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions
    .filter(Boolean)
    .map((session) => ({
      skillId: GLOBAL_SKILL_ID,
      duration: getSessionDuration(session),
    }));
}

function normalizeSessionsForStreak(sessions) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions
    .filter(Boolean)
    .map((session) => ({
      skillId: GLOBAL_SKILL_ID,
      date: getSessionDate(session),
    }));
}

function getSkillSessions(sessions, skillId) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  const normalizedSkillId = normalizeId(skillId);

  if (normalizedSkillId === '') {
    return [];
  }

  return sessions.filter(
    (session) => session && normalizeId(session.skillId) === normalizedSkillId
  );
}

function getSkillStatus(totalTime) {
  return totalTime < FEATURED_MINUTES_THRESHOLD ? 'behind' : 'on-track';
}

function getSkillStats(sessions, skillId) {
  const normalizedSkillId = normalizeId(skillId);
  const normalizedSessions = getSkillSessions(sessions, skillId).map((session) => ({
    skillId: normalizedSkillId,
    duration: getSessionDuration(session),
  }));

  return calculateStats(normalizedSessions, normalizedSkillId);
}

function getConsistencyByDate(sessions) {
  const totalsByDate = new Map();

  if (!Array.isArray(sessions)) {
    return [];
  }

  sessions.forEach((session) => {
    const date = getSessionDate(session);

    if (!date) {
      return;
    }

    const currentTotal = totalsByDate.get(date) || 0;
    totalsByDate.set(date, currentTotal + getSessionDuration(session));
  });

  return [...totalsByDate.entries()]
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([date, totalMinutes]) => ({
      date,
      totalMinutes,
    }));
}

function getSkillNameById(skills, skillId) {
  if (!Array.isArray(skills)) {
    return undefined;
  }

  const normalizedSkillId = normalizeId(skillId);

  if (normalizedSkillId === '') {
    return undefined;
  }

  const skill = skills.find((item) => item && normalizeId(item.id) === normalizedSkillId);
  return skill ? skill.name : undefined;
}

function getActivitySortValue(timestamp) {
  if (typeof timestamp === 'number' && !Number.isNaN(timestamp)) {
    return timestamp;
  }

  if (typeof timestamp === 'string') {
    const parsedTimestamp = Date.parse(timestamp);

    if (!Number.isNaN(parsedTimestamp)) {
      return parsedTimestamp;
    }
  }

  return Number.NEGATIVE_INFINITY;
}

function getActivityDateLabel(timestamp) {
  if (typeof timestamp !== 'string') {
    return undefined;
  }

  return timestamp.includes('T') ? timestamp.split('T')[0] : timestamp;
}

function createActivityId(prefix, skillId, timestamp, index) {
  return `${prefix}-${normalizeId(skillId)}-${timestamp}-${index}`;
}

function mapSkillActivities(skills) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills
    .filter(
      (skill) =>
        skill &&
        (typeof skill.id === 'string' || typeof skill.id === 'number') &&
        typeof skill.name === 'string' &&
        skill.name.trim() !== '' &&
        skill.createdAt
    )
    .map((skill, index) => ({
      id: createActivityId('skill-created', skill.id, skill.createdAt, index),
      type: 'skill_created',
      message: `${skill.name} added`,
      timestamp: skill.createdAt,
      skillId: normalizeId(skill.id),
      skillName: skill.name,
      date: getActivityDateLabel(skill.createdAt),
      duration: 0,
    }));
}

function mapSessionActivities(sessions, skills) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions
    .filter(
      (session) =>
        session &&
        (typeof session.skillId === 'string' || typeof session.skillId === 'number')
    )
    .map((session, index) => {
      const skillId = normalizeId(session.skillId);
      const skillName = getSkillNameById(skills, skillId) ?? skillId;
      const timestamp = session.createdAt ?? session.date;
      const id =
        typeof session.id === 'string' && session.id.trim() !== ''
          ? session.id
          : createActivityId('session', skillId, timestamp, index);

      return {
        id,
        type: 'session',
        message: `Practiced ${skillName}`,
        timestamp,
        skillId,
        skillName,
        date: getActivityDateLabel(timestamp),
        duration: getSessionDuration(session),
      };
    })
    .filter((activity) => activity.timestamp);
}

function getRecentActivity(sessions, skills) {
  const skillActivities = mapSkillActivities(skills);
  const sessionActivities = mapSessionActivities(sessions, skills);
  const activities = [...skillActivities, ...sessionActivities];

  activities.sort((activityA, activityB) => {
    return getActivitySortValue(activityB.timestamp) - getActivitySortValue(activityA.timestamp);
  });

  return activities.slice(0, 5);
}

function mapSkills(skills, sessions) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills.map((skill) => {
    const skillId = normalizeId(skill.id);
    const skillStats = getSkillStats(sessions, skillId);
    const statusType = getSkillStatus(skillStats.totalTime);

    return {
      skillId,
      skillName: skill.name,
      totalTime: skillStats.totalTime,
      status: { type: statusType },
    };
  });
}

export function createDashboardData({
  skills = [],
  sessions = [],
  referenceDate = new Date(),
} = {}) {
  const skillStats = calculateStats(normalizeSessionsForStats(sessions), GLOBAL_SKILL_ID);
  const skillStreak = calculateStreak(
    normalizeSessionsForStreak(sessions),
    GLOBAL_SKILL_ID,
    referenceDate
  );
  const dateWindow = getDateWindow(referenceDate);
  const currentWindowSessions = getSessionsInRange(
    sessions,
    dateWindow.currentStart,
    dateWindow.currentEnd
  );
  const previousWindowSessions = getSessionsInRange(
    sessions,
    dateWindow.previousStart,
    dateWindow.previousEnd
  );
  const weeklyPracticeMinutes = getTotalMinutes(currentWindowSessions);
  const previousWeeklyPracticeMinutes = getTotalMinutes(previousWindowSessions);
  const skillsPracticed = getDistinctSkillCount(currentWindowSessions);
  const previousSkillsPracticed = getDistinctSkillCount(previousWindowSessions);

  return {
    globalStats: {
      streak: createKpi({
        key: 'streak',
        label: 'Current streak',
        value: skillStreak.currentStreak,
        displayValue: formatCountLabel(skillStreak.currentStreak, 'day'),
        trend: getStreakTrend(skillStreak.currentStreak),
        periodLabel: 'Current day chain',
      }),
      weeklyPractice: createKpi({
        key: 'weeklyPractice',
        label: 'Weekly practice',
        value: weeklyPracticeMinutes,
        displayValue: `${formatMinutesLabel(weeklyPracticeMinutes)} this week`,
        trend: getTrend(weeklyPracticeMinutes, previousWeeklyPracticeMinutes),
        periodLabel: 'Last 7 days',
      }),
      skillsPracticed: createKpi({
        key: 'skillsPracticed',
        label: 'Skills practiced',
        value: skillsPracticed,
        displayValue: formatCountLabel(skillsPracticed, 'skill', ' this week'),
        trend: getTrend(skillsPracticed, previousSkillsPracticed),
        periodLabel: 'Last 7 days',
      }),
      totalLearningTime: createKpi({
        key: 'totalLearningTime',
        label: 'Total learning time',
        value: skillStats.totalTime,
        displayValue: `${formatMinutesLabel(skillStats.totalTime)} total`,
        trend: getTrend(weeklyPracticeMinutes, previousWeeklyPracticeMinutes),
        periodLabel: 'All time',
      }),
    },
    consistency: getConsistencyByDate(sessions),
    recentActivity: getRecentActivity(sessions, skills),
    skills: mapSkills(skills, sessions),
    featuredInsight: createPriorityPayload({ skills, sessions, referenceDate }),
  };
}
