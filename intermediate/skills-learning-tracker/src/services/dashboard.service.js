import { calculateStats } from './stats.service.js';
import { createPriorityPayload } from './priority.service.js';
import { normalizeSkill } from './skill.service.js'
import { calculateStreak } from './streak.service.js';
import { getLocalDateKey } from '../utils/date-key.js';

const GLOBAL_SKILL_ID = '__global__'; 
const FEATURED_MINUTES_THRESHOLD = 60; 
const RECENT_WINDOW_DAYS = 7;
const CONSISTENCY_WINDOW_DAYS = 56;
const RECENT_ACTIVITY_LIMIT = 5;

const RECENT_ACTIVITY_GROUP_LABELS = {
  today: 'Today',
  yesterday: 'Yesterday',
  earlier_this_week: 'Earlier this week',
  earlier: 'Earlier',
};

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

function shiftDateString(dateString, dayOffset) {
  if (!isValidDateString(dateString)) {
    return '';
  }

  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + dayOffset);
  return getLocalDateKey(date);
}

function getDateWindow(referenceDate = new Date(), days = RECENT_WINDOW_DAYS) {
  const referenceDateString = getLocalDateKey(referenceDate);

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

function getHeatmapWindow(referenceDate = new Date(), days = CONSISTENCY_WINDOW_DAYS) {
  const referenceDateString = getLocalDateKey(referenceDate);

  if (referenceDateString === '') {
    return {
      startDate: '',
      endDate: '',
      days: 0,
    };
  }

  const windowDays = Number.isFinite(Number(days)) ? Math.max(1, Number(days)) : CONSISTENCY_WINDOW_DAYS;

  return {
    startDate: shiftDateString(referenceDateString, -(windowDays - 1)),
    endDate: referenceDateString,
    days: windowDays,
  };
}

function getDateRange(startDate, endDate) {
  if (!isValidDateString(startDate) || !isValidDateString(endDate) || startDate > endDate) {
    return [];
  }

  const dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = shiftDateString(currentDate, 1);
  }

  return dates;
}

function getHeatmapDateLabel(dateString) {
  if (!isValidDateString(dateString)) {
    return EMPTY_TEXT;
  }

  const [year, month, day] = dateString.split('-').map((part) => Number(part));

  if (!year || !month || !day) {
    return dateString;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function getIntensityBucket(consistencyScore, isActive) {
  if (!isActive) {
    return 'empty';
  }

  if (consistencyScore >= 75) {
    return 'intense';
  }

  if (consistencyScore >= 50) {
    return 'high';
  }

  if (consistencyScore >= 30) {
    return 'medium';
  }

  return 'low';
}

function getHeatmapSummaryLabel({ sessionCount, totalMinutes, activeRunLength, bucket }) {
  const sessionLabel = formatCountLabel(sessionCount, 'session');
  const minutesLabel = formatMinutesLabel(totalMinutes);
  const rhythmLabel =
    activeRunLength > 1 ? `${activeRunLength}-day active rhythm` : 'single-day rhythm';
  const bucketLabel = `${bucket} consistency`;

  return `${sessionLabel}, ${minutesLabel}, ${bucketLabel}, ${rhythmLabel}`;
}

function createHeatmapCell({
  date,
  totalMinutes,
  sessionCount,
  activeRunLength,
  maxSessionCount,
  maxMinutes,
  isToday,
  isFuture,
}) {
  const isActive = sessionCount > 0;
  const frequencyScore = maxSessionCount > 0 ? sessionCount / maxSessionCount : 0;
  const durationScore = maxMinutes > 0 ? totalMinutes / maxMinutes : 0;
  const continuityScore = isActive ? Math.min(activeRunLength / 7, 1) : 0;
  const consistencyScore = Math.round(
    (continuityScore * 0.45 + frequencyScore * 0.35 + durationScore * 0.2) * 100
  );
  const bucket = getIntensityBucket(consistencyScore, isActive);
  const summaryLabel = getHeatmapSummaryLabel({
    sessionCount,
    totalMinutes,
    activeRunLength,
    bucket,
  });

  return {
    date,
    totalMinutes,
    sessionCount,
    consistencyScore,
    intensityLevel: bucket,
    bucket,
    isActive,
    isEmpty: !isActive,
    isToday,
    isFuture,
    activeRunLength,
    accessibilityLabel: `${getHeatmapDateLabel(date)}: ${summaryLabel}`,
    summaryLabel,
  };
}

function getConsistencyHeatmap(sessions, referenceDate = new Date()) {
  const window = getHeatmapWindow(referenceDate);

  if (!Array.isArray(sessions) || window.startDate === '' || window.endDate === '') {
    return {
      range: window,
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
    };
  }

  const totalsByDate = new Map();
  const sessionsByDate = new Map();

  sessions.forEach((session) => {
    const date = getSessionDate(session);

    if (!date || date < window.startDate || date > window.endDate) {
      return;
    }

    const currentTotals = totalsByDate.get(date) || 0;
    const currentSessions = sessionsByDate.get(date) || 0;

    totalsByDate.set(date, currentTotals + getSessionDuration(session));
    sessionsByDate.set(date, currentSessions + 1);
  });

  const dates = getDateRange(window.startDate, window.endDate);
  const maxSessionCount = Math.max(0, ...sessionsByDate.values());
  const maxMinutes = Math.max(0, ...totalsByDate.values());
  let activeRunLength = 0;
  let longestActiveRun = 0;

  const cells = dates.map((date) => {
    const totalMinutes = totalsByDate.get(date) || 0;
    const sessionCount = sessionsByDate.get(date) || 0;
    const isToday = date === window.endDate;
    const isFuture = date > window.endDate;

    activeRunLength = sessionCount > 0 ? activeRunLength + 1 : 0;
    longestActiveRun = Math.max(longestActiveRun, activeRunLength);

    return createHeatmapCell({
      date,
      totalMinutes,
      sessionCount,
      activeRunLength,
      maxSessionCount,
      maxMinutes,
      isToday,
      isFuture,
    });
  });

  const peakDay = cells.reduce((peakCell, cell) => {
    if (!peakCell || cell.totalMinutes > peakCell.totalMinutes) {
      return cell;
    }

    return peakCell;
  }, null);

  const totalSessions = cells.reduce((total, cell) => total + cell.sessionCount, 0);
  const totalMinutes = cells.reduce((total, cell) => total + cell.totalMinutes, 0);
  const activeDays = cells.filter((cell) => cell.isActive).length;

  return {
    range: window,
    summary: {
      totalMinutes,
      totalSessions,
      activeDays,
      emptyDays: cells.length - activeDays,
      longestActiveRun,
      currentActiveRun: cells.at(-1)?.activeRunLength ?? 0,
      peakDay: peakDay
        ? {
            date: peakDay.date,
            totalMinutes: peakDay.totalMinutes,
            sessionCount: peakDay.sessionCount,
            bucket: peakDay.bucket,
            accessibilityLabel: peakDay.accessibilityLabel,
          }
        : null,
    },
    cells,
  };
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

function getActivitySortPriority(activity) {
  if (!activity || typeof activity !== 'object') {
    return 0;
  }

  return activity.type === 'skill_created' ? 1 : 0;
}

function getActivityDateKey(activity) {
  if (!activity || typeof activity !== 'object') {
    return '';
  }

  if (isValidDateString(activity.date)) {
    return activity.date;
  }

  if (typeof activity.timestamp === 'string' || typeof activity.timestamp === 'number') {
    const parsedTimestamp =
      typeof activity.timestamp === 'number'
        ? activity.timestamp
        : Date.parse(activity.timestamp);

    if (!Number.isNaN(parsedTimestamp)) {
      return getLocalDateKey(new Date(parsedTimestamp));
    }
  }

  return '';
}

function getStartOfWeekKey(referenceDate = new Date()) {
  const date = referenceDate instanceof Date ? referenceDate : new Date(referenceDate);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const mondayOffset = (date.getDay() + 6) % 7;
  const startOfWeek = new Date(date);

  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - mondayOffset);

  return getLocalDateKey(startOfWeek);
}

function getActivityGroupKey(activityDateKey, referenceDate = new Date()) {
  if (!isValidDateString(activityDateKey)) {
    return 'earlier';
  }

  const todayKey = getLocalDateKey(referenceDate);
  const yesterdayKey = shiftDateString(todayKey, -1);

  if (activityDateKey === todayKey) {
    return 'today';
  }

  if (activityDateKey === yesterdayKey) {
    return 'yesterday';
  }

  const startOfWeekKey = getStartOfWeekKey(referenceDate);

  if (isValidDateString(startOfWeekKey) && activityDateKey >= startOfWeekKey && activityDateKey < yesterdayKey) {
    return 'earlier_this_week';
  }

  return 'earlier';
}

function getActivityGroupLabel(groupKey) {
  return RECENT_ACTIVITY_GROUP_LABELS[groupKey] ?? RECENT_ACTIVITY_GROUP_LABELS.earlier;
}

function formatActivityDuration(totalMinutes) {
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

function createActivityAccessibilityLabel({ title, meta, groupLabel }) {
  return [title, meta, groupLabel].filter((value) => typeof value === 'string' && value.trim() !== '').join(', ');
}

function enrichActivity(activity, referenceDate = new Date()) {
  const activityDateKey = getActivityDateKey(activity);
  const groupKey = getActivityGroupKey(activityDateKey, referenceDate);
  const groupLabel = getActivityGroupLabel(groupKey);
  const skillName = typeof activity.skillName === 'string' && activity.skillName.trim() !== ''
    ? activity.skillName
    : activity.skillId;
  const title =
    activity.type === 'skill_created'
      ? `Added ${skillName}`
      : `Practiced ${skillName}`;
  const meta =
    activity.type === 'session'
      ? formatActivityDuration(activity.duration)
      : '';

  return {
    ...activity,
    title,
    message: title,
    meta,
    groupKey,
    groupLabel,
    recencyLabel: groupLabel,
    accessibilityLabel: createActivityAccessibilityLabel({
      title,
      meta,
      groupLabel,
    }),
  };
}

function groupRecentActivity(items) {
  return items.reduce((groups, item) => {
    const lastGroup = groups.at(-1);

    if (!lastGroup || lastGroup.key !== item.groupKey) {
      groups.push({
        key: item.groupKey,
        label: item.groupLabel,
        items: [item],
      });
      return groups;
    }

    lastGroup.items.push(item);
    return groups;
  }, []);
}

function createActivityId(prefix, skillId, timestamp, index) {
  return `${prefix}-${normalizeId(skillId)}-${timestamp}-${index}`;
}

function mapSkillActivities(skills) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills
    .map((skill) => normalizeSkill(skill))
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
      title: `Added ${skill.name}`,
      message: `Added ${skill.name}`,
      timestamp: skill.createdAt,
      sourceIndex: index,
      skillId: normalizeId(skill.id),
      skillName: skill.name,
      date: isValidDateString(skill.createdAt) ? skill.createdAt : getLocalDateKey(new Date(skill.createdAt)),
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
        title: `Practiced ${skillName}`,
        message: `Practiced ${skillName}`,
        timestamp,
        sourceIndex: index,
        skillId,
        skillName,
        date: isValidDateString(session.date)
          ? session.date
          : getLocalDateKey(new Date(timestamp)),
        duration: getSessionDuration(session),
      };
    })
    .filter((activity) => activity.timestamp);
}

function getRecentActivity(sessions, skills, referenceDate = new Date()) {
  const skillActivities = mapSkillActivities(skills);
  const sessionActivities = mapSessionActivities(sessions, skills);
  const activities = [...skillActivities, ...sessionActivities];

  activities.sort((activityA, activityB) => {
    const timestampDelta = getActivitySortValue(activityB.timestamp) - getActivitySortValue(activityA.timestamp);

    if (timestampDelta !== 0) {
      return timestampDelta;
    }

    const typePriorityDelta = getActivitySortPriority(activityB) - getActivitySortPriority(activityA);

    if (typePriorityDelta !== 0) {
      return typePriorityDelta;
    }

    return (Number(activityB.sourceIndex) || 0) - (Number(activityA.sourceIndex) || 0);
  });

  const visibleActivities = activities
    .slice(0, RECENT_ACTIVITY_LIMIT)
    .map((activity) => enrichActivity(activity, referenceDate));

  return {
    totalCount: activities.length,
    hasMore: activities.length > RECENT_ACTIVITY_LIMIT,
    groups: groupRecentActivity(visibleActivities),
  };
}

function mapSkills(skills, sessions) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills.map((skill) => {
    const normalizedSkill = normalizeSkill(skill);

    if (!normalizedSkill) {
      return null;
    }

    const skillId = normalizeId(normalizedSkill.id);
    const skillStats = getSkillStats(sessions, skillId);
    const statusType = getSkillStatus(skillStats.totalTime);

    return {
      skillId,
      skillName: normalizedSkill.name,
      totalTime: skillStats.totalTime,
      status: { type: statusType },
    };
  }).filter(Boolean);
}

export function createDashboardData({
  skills = [],
  sessions = [],
  referenceDate = new Date(),
} = {}) {
  const normalizedSkills = Array.isArray(skills)
    ? skills.map((skill) => normalizeSkill(skill)).filter(Boolean)
    : [];
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
    consistency: getConsistencyHeatmap(sessions, referenceDate),
    recentActivity: getRecentActivity(sessions, normalizedSkills, referenceDate),
    skills: mapSkills(normalizedSkills, sessions),
    featuredInsight: createPriorityPayload({ skills: normalizedSkills, sessions, referenceDate }),
  };
}
