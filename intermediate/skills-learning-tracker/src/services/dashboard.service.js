import { calculateStats } from './stats.service.js';
import { createPriorityPayload } from './priority.service.js';
import { calculateStreak } from './streak.service.js';

const GLOBAL_SKILL_ID = '__global__'; 
const FEATURED_MINUTES_THRESHOLD = 60; 

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

  if (typeof session.duration === 'number' && !Number.isNaN(session.duration)) {
    return session.duration;
  }

  if (
    typeof session.durationMinutes === 'number' &&
    !Number.isNaN(session.durationMinutes)
  ) {
    return session.durationMinutes;
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
  const skillStreak = calculateStreak(normalizeSessionsForStreak(sessions), GLOBAL_SKILL_ID);

  return {
    globalStats: {
      totalTime: skillStats.totalTime,
      totalSessions: skillStats.totalSessions,
      currentStreak: skillStreak.currentStreak,
    },
    consistency: getConsistencyByDate(sessions),
    recentActivity: getRecentActivity(sessions, skills),
    skills: mapSkills(skills, sessions),
    featuredInsight: createPriorityPayload({ skills, sessions, referenceDate }),
  };
}
