import { calculateStats } from './stats.service.js';
import { calculateStreak } from './streak.service.js';

const GLOBAL_SKILL_ID = '__global__'; 
const FEATURED_MINUTES_THRESHOLD = 60; 

function getFirstSkill(skills) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return null;
  }

  return skills[0];
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

  return sessions.filter((session) => session && session.skillId === skillId);
}

function getSkillStatus(totalTime) {
  return totalTime < FEATURED_MINUTES_THRESHOLD ? 'behind' : 'onTrack';
}

function getStatusLabel(type) {
  return type === 'behind' ? 'Behind' : 'On track';
}

function getSkillStats(sessions, skillId) {
  const normalizedSessions = getSkillSessions(sessions, skillId).map((session) => ({
    skillId,
    duration: getSessionDuration(session),
  }));

  return calculateStats(normalizedSessions, skillId);
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

  const skill = skills.find((item) => item && item.id === skillId);
  return skill ? skill.name : undefined;
}

function getRecentActivity(sessions, skills) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions
    .filter((session) => session && typeof session.skillId === 'string' && getSessionDate(session))
    .map((session) => ({
      skillId: session.skillId,
      skillName: getSkillNameById(skills, session.skillId),
      duration: getSessionDuration(session),
      date: session.date,
    }))
    .sort((activityA, activityB) => activityB.date.localeCompare(activityA.date))
    .slice(0, 5);
}

function mapSkills(skills, sessions) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills.map((skill) => {
    const skillStats = getSkillStats(sessions, skill.id);
    const statusType = getSkillStatus(skillStats.totalTime);

    return {
      skillId: skill.id,
      skillName: skill.name,
      totalTime: skillStats.totalTime,
      status: { type: statusType },
    };
  });
}

export function createDashboardData({ skills = [], sessions = [] } = {}) {
  const firstSkill = getFirstSkill(skills); 
  const skillStats = calculateStats(normalizeSessionsForStats(sessions), GLOBAL_SKILL_ID); 
  const skillStreak = calculateStreak(normalizeSessionsForStreak(sessions), GLOBAL_SKILL_ID); 
  const featuredSkillStats = firstSkill ? getSkillStats(sessions, firstSkill.id) : null; 
  const featuredStatusType = featuredSkillStats 
    ? getSkillStatus(featuredSkillStats.totalTime)
    : 'behind'; 

  return {
    featured: firstSkill
      ? {
          skillId: firstSkill.id,
          skillName: firstSkill.name,
          totalTime: featuredSkillStats.totalTime,
          status: {
            type: featuredStatusType,
            label: getStatusLabel(featuredStatusType),
          },
          minutesToday: 30,
        }
      : null,
    globalStats: {
      totalTime: skillStats.totalTime,
      totalSessions: skillStats.totalSessions,
      currentStreak: skillStreak.currentStreak,
    },
    consistency: getConsistencyByDate(sessions),
    recentActivity: getRecentActivity(sessions, skills),
    skills: mapSkills(skills, sessions),
  };

}
