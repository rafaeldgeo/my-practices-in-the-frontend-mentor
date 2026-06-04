const EMPTY_TEXT = 'No data available';
const RECENT_ACTIVITY_EMPTY_TITLE = 'No recent activity yet.';
const RECENT_ACTIVITY_EMPTY_BODY = 'Your latest activity will appear here.';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatMinutes(totalMinutes) {

  const minutes = Number.isFinite(Number(totalMinutes)) ? Number(totalMinutes) : 0;
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

function formatDateLabel(date) {
  if (typeof date !== 'string') {
    return EMPTY_TEXT;
  }

  const [year, month, day] = date.split('-');

  if (!year || !month || !day) {
    return escapeHtml(date);
  }

  const monthIndex = Number(month) - 1;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = monthNames[monthIndex] ?? month;

  return `${monthName} ${Number(day)}, ${year}`;
}

function formatCompactDateLabel(date) {
  if (typeof date !== 'string') {
    return EMPTY_TEXT;
  }

  const [year, month, day] = date.split('-');

  if (!year || !month || !day) {
    return escapeHtml(date);
  }

  const monthIndex = Number(month) - 1;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = monthNames[monthIndex] ?? month;

  return `${monthName} ${Number(day)}`;
}

function renderActivityButton(activity, content, modifierClass = '') {
  const className = ['recent-activity__item', modifierClass]
    .filter((item) => typeof item === 'string' && item.trim() !== '')
    .join(' ');

  return `
    <button
      class="${className}"
      data-skill-id="${escapeHtml(String(activity?.skillId ?? ''))}"
      aria-label="${escapeHtml(String(activity?.accessibilityLabel ?? EMPTY_TEXT))}"
      type="button"
    >
      ${content}
    </button>
  `;
}

function getRecentActivityPresenceClass(index, total) {
  const safeIndex = Number.isFinite(Number(index)) ? Number(index) : 0;
  const safeTotal = Number.isFinite(Number(total)) ? Number(total) : 0;

  if (safeIndex <= 0) {
    return 'recent-activity__item--fresh';
  }

  if (safeIndex >= Math.max(0, safeTotal - 1)) {
    return 'recent-activity__item--calm';
  }

  return 'recent-activity__item--settled';
}

function formatActivityMeta(activity) {
  if (!activity || typeof activity !== 'object') {
    return '';
  }

  const recencyLabel =
    typeof activity.recencyLabel === 'string' && activity.recencyLabel.trim() !== ''
      ? activity.recencyLabel.trim()
      : '';
  const meta = typeof activity.meta === 'string' && activity.meta.trim() !== ''
    ? activity.meta.trim()
    : '';

  return [recencyLabel, meta].filter(Boolean).join(' · ');
}

function formatNumber(value, fractionDigits = 1) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return EMPTY_TEXT;
  }

  return numericValue.toFixed(fractionDigits);
}

function renderTrendBadge(trend) {
  const normalizedTrend =
    trend === 'up' || trend === 'down' || trend === 'stable' ? trend : 'stable';
  const trendLabel = {
    up: 'Trending up',
    stable: 'Stable pace',
    down: 'Trending down',
  }[normalizedTrend];
  const trendSymbol = {
    up: '↑',
    stable: '•',
    down: '↓',
  }[normalizedTrend];

  return `
    <span
      class="dashboard__kpi-trend dashboard__kpi-trend--${normalizedTrend}"
      data-kpi-trend="${normalizedTrend}"
      aria-label="${escapeHtml(trendLabel)}"
    >
      <span class="dashboard__kpi-trend-symbol" aria-hidden="true">${trendSymbol}</span>
      <span class="dashboard__kpi-trend-label">${escapeHtml(trendLabel)}</span>
    </span>
  `;
}

function renderKpiItem(kpi, modifierClass = '') {
  if (!kpi || typeof kpi !== 'object') {
    return '';
  }

  const label = typeof kpi.label === 'string' ? kpi.label.trim() : '';
  const displayValue = typeof kpi.displayValue === 'string' ? kpi.displayValue.trim() : '';
  const trend = typeof kpi.trend === 'string' ? kpi.trend.trim() : 'stable';
  const key = typeof kpi.key === 'string' ? kpi.key.trim() : '';
  const periodLabel = typeof kpi.periodLabel === 'string' ? kpi.periodLabel.trim() : '';

  if (label === '' || displayValue === '') {
    return '';
  }

  return `
    <div
      class="dashboard__definition-item ${escapeHtml(modifierClass)}"
      data-kpi-key="${escapeHtml(key)}"
      data-kpi-trend="${escapeHtml(trend)}"
    >
      <dt class="dashboard__definition-term">
        <span class="dashboard__kpi-label">${escapeHtml(label)}</span>
        ${renderTrendBadge(trend)}
      </dt>
      <dd>${escapeHtml(displayValue)}</dd>
      ${
        periodLabel
          ? `<dd class="dashboard__definition-meta">${escapeHtml(periodLabel)}</dd>`
          : ''
      }
    </div>
  `;
}

function getStatsItems(globalStats) {
  if (!globalStats || typeof globalStats !== 'object') {
    return [];
  }

  return [
    globalStats.streak,
    globalStats.weeklyPractice,
    globalStats.skillsPracticed,
    globalStats.totalLearningTime,
  ].filter(Boolean);
}

function getStatGroupingClass(index) {
  return index < 2
    ? 'dashboard__definition-item--primary'
    : 'dashboard__definition-item--secondary';
}

function renderHeroMetric(metric) {
  if (!metric || typeof metric !== 'object') {
    return ''
  }

  const label = typeof metric.label === 'string' ? metric.label.trim() : ''
  const value = typeof metric.value === 'string' ? metric.value.trim() : ''
  const note = typeof metric.note === 'string' ? metric.note.trim() : ''

  if (label === '' || value === '') {
    return ''
  }

  return `
    <div class="dashboard__hero-metric">
      <p class="dashboard__hero-metric-label">${escapeHtml(label)}</p>
      <p class="dashboard__hero-metric-value">${escapeHtml(value)}</p>
      ${
        note
          ? `<p class="dashboard__hero-metric-note">${escapeHtml(note)}</p>`
          : ''
      }
    </div>
  `
}

const JOURNEY_MILESTONES_MINUTES = [60, 300, 600, 1500, 3000, 6000, 12000]

function getJourneyMilestones(targetMinutes) {
  const numericTarget = Number(targetMinutes)
  const safeTarget = Number.isFinite(numericTarget) ? Math.max(0, numericTarget) : 0

  if (safeTarget <= 0) {
    return []
  }

  return [...new Set([...JOURNEY_MILESTONES_MINUTES.filter((minute) => minute < safeTarget), safeTarget])]
    .sort((left, right) => left - right)
}

function getJourneyProgress(currentMinutes, targetMinutes) {
  const numericCurrent = Number(currentMinutes)
  const safeCurrent = Number.isFinite(numericCurrent) ? Math.max(0, numericCurrent) : 0
  const milestones = getJourneyMilestones(targetMinutes)

  if (milestones.length === 0) {
    return 0
  }

  const boundaries = [0, ...milestones]
  const finalBoundary = boundaries.at(-1) ?? 0
  const clampedCurrent = Math.min(safeCurrent, finalBoundary)
  const segmentCount = boundaries.length - 1

  if (segmentCount <= 0) {
    return 0
  }

  const segmentWeight = 100 / segmentCount
  let segmentIndex = 0

  while (
    segmentIndex < segmentCount - 1 &&
    clampedCurrent > boundaries[segmentIndex + 1]
  ) {
    segmentIndex += 1
  }

  const lowerBoundary = boundaries[segmentIndex]
  const upperBoundary = boundaries[segmentIndex + 1]
  const completedProgress = segmentIndex * segmentWeight
  const segmentProgress =
    upperBoundary > lowerBoundary
      ? ((clampedCurrent - lowerBoundary) / (upperBoundary - lowerBoundary)) * segmentWeight
      : 0

  return Math.max(0, Math.min(100, completedProgress + segmentProgress))
}

function renderHeroMetrics(items) {
  return (Array.isArray(items) ? items : [])
    .map((item) => renderHeroMetric(item))
    .filter(Boolean)
    .join('');
}

function getSkillAccentColor(featuredInsight) {
  const candidate =
    featuredInsight?.progressRing?.accentColor ??
    featuredInsight?.focusSkill?.color ??
    featuredInsight?.featuredSkill?.color ??
    ''

  return typeof candidate === 'string' && candidate.trim() !== '' ? candidate.trim() : ''
}

function getProgressRingState(featuredInsight) {
  const progressRing = featuredInsight?.progressRing

  if (!progressRing || progressRing.isReady !== true) {
    return null
  }

  const skillName =
    typeof progressRing.skillName === 'string' && progressRing.skillName.trim() !== ''
      ? progressRing.skillName.trim()
      : typeof featuredInsight?.focusSkill?.skillName === 'string' &&
          featuredInsight.focusSkill.skillName.trim() !== ''
        ? featuredInsight.focusSkill.skillName.trim()
        : typeof featuredInsight?.featuredSkill?.skillName === 'string' &&
            featuredInsight.featuredSkill.skillName.trim() !== ''
        ? featuredInsight.featuredSkill.skillName.trim()
          : 'Current skill'
  const current = Number.isFinite(Number(progressRing.current)) ? Number(progressRing.current) : 0
  const target = Number.isFinite(Number(progressRing.target)) ? Number(progressRing.target) : 0
  const percentage = getJourneyProgress(current, target)
  const investedText = formatMinutes(current)
  const targetText = formatMinutes(target)
  const accentColor = getSkillAccentColor(featuredInsight)

  return {
    skillName,
    percentage,
    investedText,
    targetText,
    accentColor,
  }
}

function renderProgressRing(featuredInsight) {
  const progressState = getProgressRingState(featuredInsight)

  if (!progressState) {
    return ''
  }

  const {
    skillName,
    percentage,
    investedText,
    targetText,
    accentColor,
  } = progressState
  const inlineStyle = [
    `--progress-ring-progress:${percentage}`,
    accentColor ? `--hero-accent:${accentColor}` : '',
  ]
    .filter(Boolean)
    .join(';')
  const ringLabel = `${skillName}, ${investedText} invested, target ${targetText}`

  return `
    <div
      class="dashboard__hero-progress"
      ${inlineStyle ? `style="${escapeHtml(inlineStyle)}"` : ''}
      role="img"
      aria-label="${escapeHtml(ringLabel)}"
      data-progress-state="${escapeHtml(String(featuredInsight?.mode ?? ''))}"
    >
      <div class="dashboard__hero-progress-ring" aria-hidden="true">
        <svg viewBox="0 0 100 100" focusable="false" aria-hidden="true">
          <circle class="dashboard__hero-progress-track" cx="50" cy="50" r="41.5"></circle>
          <circle class="dashboard__hero-progress-value" cx="50" cy="50" r="41.5"></circle>
        </svg>
      </div>
      <div class="dashboard__hero-progress-copy">
        <span class="dashboard__hero-progress-label">Invested</span>
        <strong class="dashboard__hero-progress-value-text">${escapeHtml(investedText)}</strong>
        <span class="dashboard__hero-progress-skill">${escapeHtml(skillName)}</span>
      </div>
      <p class="dashboard__hero-progress-meta">
        <span class="dashboard__hero-progress-target">target ${escapeHtml(targetText)}</span>
      </p>
    </div>
  `
}

function normalizeHeroSummary(summary) {
  return String(summary)
    .replace(/\bcurrent pace\b/gi, 'ongoing pace')
    .replace(/\bcurrent progress\b/gi, 'ongoing progress')
}

function renderActionButton(action, modifierClass = '') {
  if (!action || typeof action !== 'object' || !action.label) {
    return ''
  }

  const className = ['dashboard__hero-action', modifierClass]
    .filter((item) => typeof item === 'string' && item.trim() !== '')
    .join(' ')
  const skillId =
    typeof action.skillId === 'string' && action.skillId.trim() !== ''
      ? action.skillId
      : ''

  return `
    <button
      class="${className}"
      data-action="${escapeHtml(String(action.action ?? ''))}"
      data-intent="${escapeHtml(String(action.intent ?? ''))}"
      ${skillId ? `data-skill-id="${escapeHtml(skillId)}"` : ''}
      type="button"
    >
      ${escapeHtml(action.label)}
    </button>
  `
}

function renderActionButtons(primaryAction, secondaryAction) {
  const buttons = [
    renderActionButton(primaryAction, 'dashboard__hero-action--primary'),
    renderActionButton(secondaryAction, 'dashboard__hero-action--secondary'),
  ].filter(Boolean)

  if (buttons.length === 0) {
    return ''
  }

  return `
    <div class="dashboard__hero-actions">
      ${buttons.join('')}
    </div>
  `
}

function renderFeatureDetails(featuredInsight) {

  if (featuredInsight?.mode === 'priority') {
    const featuredSkill = featuredInsight.featuredSkill ?? featuredInsight.focusSkill

    return renderHeroMetrics([
      {
        label: 'Progress debt',
        value: featuredSkill
          ? `${formatNumber(featuredSkill.progressDebtPercent)}% behind pace`
          : EMPTY_TEXT,
        note: featuredSkill ? `${formatNumber(featuredSkill.progressDebtHours)}h gap` : '',
      },
      {
        label: 'Progress pace',
        value: featuredSkill
          ? `${formatNumber(featuredSkill.currentProgress)}% completed`
          : EMPTY_TEXT,
        note: featuredSkill ? `Expected by now ${formatNumber(featuredSkill.expectedProgress)}%` : '',
      },
      {
        label: 'Today',
        value: featuredSkill ? formatMinutes(featuredSkill.minutesToday) : EMPTY_TEXT,
        note: 'Momentum logged today',
      },
    ])
  }

  if (featuredInsight?.mode === 'healthy') {
    const summary = featuredInsight.summary ?? {}
    const focusSkill = featuredInsight.focusSkill

    return renderHeroMetrics([
      {
        label: 'Progress pace',
        value: focusSkill
          ? `${formatNumber(focusSkill.currentProgress)}% completed`
          : EMPTY_TEXT,
        note: focusSkill ? `Expected by now ${formatNumber(focusSkill.expectedProgress)}%` : '',
      },
      {
        label: 'Today',
        value: focusSkill ? formatMinutes(focusSkill.minutesToday) : EMPTY_TEXT,
        note: 'Momentum logged today',
      },
      {
        label: 'Balance',
        value: Number.isFinite(Number(summary.skillsOnTrack))
          ? `${Number(summary.skillsOnTrack)} on track`
          : `0 on track`,
        note: Number.isFinite(Number(summary.skillsAhead))
          ? `${Number(summary.skillsAhead)} ahead`
          : '0 ahead',
      },
    ])
  }

  return ''
}

function renderFeaturedShell({
  modifierClass = 'dashboard__panel--empty',
  eyebrow,
  title,
  summary,
  statusLabel,
  statusClassName = '',
  featuredInsight = null,
  details = '',
  actions = '',
}) {
  const accentColor = getSkillAccentColor(featuredInsight)
  const inlineStyle = accentColor ? `--hero-accent:${accentColor}` : ''

  return `
    <article
      class="dashboard__panel dashboard__panel--featured ${modifierClass}"
      ${inlineStyle ? `style="${escapeHtml(inlineStyle)}"` : ''}
    >
      <div class="dashboard__hero-main">
        <header class="dashboard__hero-header">
          <div class="dashboard__hero-copy">
            <p class="dashboard__eyebrow">${escapeHtml(eyebrow ?? EMPTY_TEXT)}</p>
            <h2 class="dashboard__heading">${escapeHtml(title ?? EMPTY_TEXT)}</h2>
            ${
              statusLabel
                ? `<span class="dashboard__status-pill ${statusClassName}">${escapeHtml(statusLabel)}</span>`
                : ''
            }
            ${
              summary
                ? `<p class="dashboard__summary">${escapeHtml(normalizeHeroSummary(summary))}</p>`
                : ''
            }
          </div>
        </header>
        ${
          actions
            ? actions
            : ''
        }
      </div>
      <div class="dashboard__hero-meta">
        ${renderProgressRing(featuredInsight)}
      </div>
      ${
        details
          ? `<div class="dashboard__hero-metrics">${details}</div>`
          : ''
      }
    </article>
  `;
}

function renderFeaturedInsightEmpty(featuredInsight = {}) {
  return renderFeaturedShell({
    modifierClass: 'dashboard__panel--empty',
    eyebrow: featuredInsight?.recommendation?.eyebrow ?? 'Plan status',
    title: featuredInsight?.recommendation?.title ?? 'No learning data yet',
    summary: featuredInsight?.recommendation?.description ?? 'Add your first skill or session to surface the plan state here.',
    statusLabel: featuredInsight?.state?.label ?? 'Awaiting data',
    statusClassName: 'dashboard__status-pill--empty',
    featuredInsight,
    details: renderFeatureDetails(featuredInsight),
    actions: renderActionButtons(featuredInsight?.primaryAction, featuredInsight?.secondaryAction),
  });
}

function renderFeaturedInsightPriority(featuredInsight) {
  return renderFeaturedShell({
    modifierClass: 'dashboard__panel--priority',
    eyebrow: featuredInsight?.recommendation?.eyebrow ?? 'Operational priority',
    title: featuredInsight?.recommendation?.title ?? EMPTY_TEXT,
    summary: featuredInsight?.recommendation?.description ?? EMPTY_TEXT,
    statusLabel: featuredInsight?.state?.label ?? 'At risk',
    statusClassName: 'dashboard__status-pill--behind',
    featuredInsight,
    details: renderFeatureDetails(featuredInsight),
    actions: renderActionButtons(featuredInsight?.primaryAction, featuredInsight?.secondaryAction),
  });
}

function renderFeaturedInsightHealthy(featuredInsight) {
  return renderFeaturedShell({
    modifierClass: 'dashboard__panel--healthy',
    eyebrow: featuredInsight?.recommendation?.eyebrow ?? 'Healthy plan',
    title: featuredInsight?.recommendation?.title ?? 'Balanced and sustainable',
    summary: featuredInsight?.recommendation?.description ?? 'The pace is stable across the plan.',
    statusLabel: featuredInsight?.state?.label ?? 'Stable',
    statusClassName: 'dashboard__status-pill--healthy',
    featuredInsight,
    details: renderFeatureDetails(featuredInsight),
    actions: renderActionButtons(featuredInsight?.primaryAction, featuredInsight?.secondaryAction),
  });
}

function renderFeaturedInsight(featuredInsight) {
  switch (featuredInsight?.mode) {
    case 'priority':
      return renderFeaturedInsightPriority(featuredInsight);
    case 'healthy':
      return renderFeaturedInsightHealthy(featuredInsight);
    case 'empty':
    default:
      return renderFeaturedInsightEmpty(featuredInsight);
  }
}


function renderStats(globalStats) {

  if (!globalStats) {
    return `
      <article
        class="dashboard__panel dashboard__panel--stats dashboard__panel--empty"
        aria-labelledby="stats-title"
      >
        <header class="dashboard__panel-header dashboard__panel-header--stats">
          <div class="dashboard__panel-copy dashboard__panel-copy--stats">
            <p class="dashboard__eyebrow">Stats</p>
            <h2 id="stats-title" class="dashboard__panel-title">Momentum at a glance</h2>
          </div>
        </header>
        <p class="dashboard__empty">${EMPTY_TEXT}</p>
      </article>
    `;
  }


  const items = getStatsItems(globalStats);

  if (items.length === 0) {
    return `
      <article
        class="dashboard__panel dashboard__panel--stats dashboard__panel--empty"
        aria-labelledby="stats-title"
      >
        <header class="dashboard__panel-header dashboard__panel-header--stats">
          <div class="dashboard__panel-copy dashboard__panel-copy--stats">
            <p class="dashboard__eyebrow">Stats</p>
            <h2 id="stats-title" class="dashboard__panel-title">Momentum at a glance</h2>
          </div>
        </header>
        <p class="dashboard__empty">${EMPTY_TEXT}</p>
      </article>
    `;
  }


  const primaryItems = items.slice(0, 2);
  const supportingItems = items.slice(2);

  return `
    <article
      class="dashboard__panel dashboard__panel--stats"
      aria-labelledby="stats-title"
    >
      <header class="dashboard__panel-header dashboard__panel-header--stats">
        <div class="dashboard__panel-copy dashboard__panel-copy--stats">
          <p class="dashboard__eyebrow">Stats</p>
          <h2 id="stats-title" class="dashboard__panel-title">Momentum at a glance</h2>
        </div>
      </header>
      <div class="dashboard__stats-groups">
        <dl class="dashboard__definition-list dashboard__definition-list--stats dashboard__definition-list--primary">
          ${primaryItems
            .map((item, index) => renderKpiItem(item, getStatGroupingClass(index)))
            .join('')}
        </dl>
        <dl class="dashboard__definition-list dashboard__definition-list--stats dashboard__definition-list--secondary">
          ${supportingItems
            .map((item, index) => renderKpiItem(item, getStatGroupingClass(index + primaryItems.length)))
            .join('')}
        </dl>
      </div>
    </article>
  `;
}

function getConsistencyCells(consistency) {
  if (Array.isArray(consistency)) {
    return consistency;
  }

  if (consistency && Array.isArray(consistency.cells)) {
    return consistency.cells;
  }

  return [];
}

function getConsistencyWeeks(cells) {
  const weeks = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

const CONSISTENCY_WINDOW_COLUMNS = 28;
const CONSISTENCY_DAYS_PER_WEEK = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function shiftDateKey(date, dayOffset = 0) {
  if (typeof date !== 'string' || date.trim() === '') {
    return '';
  }

  const parsedTimestamp = Date.parse(`${date.trim()}T00:00:00Z`);

  if (Number.isNaN(parsedTimestamp)) {
    return '';
  }

  return new Date(parsedTimestamp + dayOffset * MS_PER_DAY).toISOString().slice(0, 10);
}

function getConsistencyCellMap(cells) {
  return new Map(
    cells
      .filter((cell) => cell && typeof cell === 'object' && typeof cell.date === 'string')
      .map((cell) => [cell.date.trim(), cell])
      .filter(([date]) => date !== '')
  );
}

function createConsistencyEmptyCell(date) {
  const label = typeof date === 'string' && date.trim() !== '' ? formatDateLabel(date) : EMPTY_TEXT;

  return {
    bucket: 'empty',
    sessionCount: 0,
    totalMinutes: 0,
    consistencyScore: 0,
    activeRunLength: 0,
    accessibilityLabel: `${label}: no activity recorded`,
    summaryLabel: 'No activity recorded',
    isActive: false,
    isEmpty: true,
    date,
    intensityLevel: 'empty',
  };
}

function getConsistencyWindowWeeks(consistency, windowWeeks = CONSISTENCY_WINDOW_COLUMNS) {
  const items = getConsistencyCells(consistency);
  const totalWeeks = Number.isFinite(Number(windowWeeks)) ? Number(windowWeeks) : CONSISTENCY_WINDOW_COLUMNS;

  if (items.length === 0 || totalWeeks <= 0) {
    return [];
  }

  const normalizedTotalWeeks = Math.max(1, Math.floor(totalWeeks));
  const windowLength = normalizedTotalWeeks * CONSISTENCY_DAYS_PER_WEEK;
  const fallbackEndDate =
    typeof consistency?.range?.endDate === 'string' && consistency.range.endDate.trim() !== ''
      ? consistency.range.endDate.trim()
      : typeof items[items.length - 1]?.date === 'string'
      ? items[items.length - 1].date.trim()
      : '';
  const endDate = shiftDateKey(fallbackEndDate, 0);

  if (endDate === '') {
    return getConsistencyWeeks(items).slice(-normalizedTotalWeeks);
  }

  const startDate = shiftDateKey(endDate, -(windowLength - 1));

  if (startDate === '') {
    return getConsistencyWeeks(items).slice(-normalizedTotalWeeks);
  }

  const cellMap = getConsistencyCellMap(items);
  const windowCells = Array.from({ length: windowLength }, (_, dayOffset) => {
    const date = shiftDateKey(startDate, dayOffset);

    return cellMap.get(date) ?? createConsistencyEmptyCell(date);
  });

  return getConsistencyWeeks(windowCells);
}

function getConsistencyWeekSummaryLabel(week, weekIndex) {
  const currentDate = week?.[0]?.date;

  if (typeof currentDate !== 'string' || currentDate.trim() === '') {
    return `Week ${weekIndex + 1}`;
  }

  return `Week ${weekIndex + 1}, starting ${formatDateLabel(currentDate)}`;
}

function getConsistencyCellIds(date, weekIndex = 0, dayIndex = 0) {
  const safeDate =
    typeof date === 'string' && date.trim() !== ''
      ? date.trim()
      : `missing-week-${weekIndex + 1}-day-${dayIndex + 1}`;

  return {
    labelId: `consistency-cell-${safeDate}-label`,
    descriptionId: `consistency-cell-${safeDate}-description`,
    fallbackId: `consistency-cell-${safeDate}-fallback`,
  };
}

function renderConsistencyLegendItem(bucket, label) {
  return `
    <li class="dashboard__heatmap-legend-item dashboard__heatmap-legend-item--${escapeHtml(bucket)}">
      <span class="dashboard__heatmap-legend-swatch" aria-hidden="true"></span>
      <span class="dashboard__heatmap-legend-label">${escapeHtml(label)}</span>
    </li>
  `;
}

function renderConsistencyLegend() {
  return `
    <ul id="consistency-legend" class="dashboard__heatmap-legend" aria-label="Consistency intensity legend">
      ${[
        ['empty', 'Empty'],
        ['low', 'Low'],
        ['medium', 'Medium'],
        ['high', 'High'],
        ['intense', 'Intense'],
      ]
        .map(([bucket, label]) => renderConsistencyLegendItem(bucket, label))
        .join('')}
    </ul>
  `;
}

function renderConsistencyCell(cell, weekIndex = 0, dayIndex = 0) {
  const fallbackCell = {
    bucket: 'empty',
    sessionCount: 0,
    totalMinutes: 0,
    consistencyScore: 0,
    activeRunLength: 0,
    accessibilityLabel: EMPTY_TEXT,
    isActive: false,
    isEmpty: true,
    date: '',
    intensityLevel: 'empty',
  };

  const normalizedCell = cell && typeof cell === 'object' ? cell : fallbackCell;

  const bucket =
    typeof normalizedCell.bucket === 'string' && normalizedCell.bucket.trim() !== ''
      ? normalizedCell.bucket
      : 'empty';
  const sessionCount = Number.isFinite(Number(normalizedCell.sessionCount))
    ? Number(normalizedCell.sessionCount)
    : 0;
  const totalMinutes = Number.isFinite(Number(normalizedCell.totalMinutes))
    ? Number(normalizedCell.totalMinutes)
    : 0;
  const consistencyScore = Number.isFinite(Number(normalizedCell.consistencyScore))
    ? Number(normalizedCell.consistencyScore)
    : 0;
  const activeRunLength = Number.isFinite(Number(normalizedCell.activeRunLength))
    ? Number(normalizedCell.activeRunLength)
    : 0;
  const accessibilityLabel =
    typeof normalizedCell.accessibilityLabel === 'string'
      ? normalizedCell.accessibilityLabel.trim()
      : EMPTY_TEXT;
  const isActive = Boolean(normalizedCell.isActive);
  const isEmpty = Boolean(normalizedCell.isEmpty);
  const cellIds = getConsistencyCellIds(normalizedCell.date, weekIndex, dayIndex);
  const tooltipReadyLabel = accessibilityLabel;
  const tooltipReadyDescription = [
    `Date ${formatDateLabel(normalizedCell?.date)}`,
    `${sessionCount} ${sessionCount === 1 ? 'session' : 'sessions'}`,
    `${formatMinutes(totalMinutes)} total`,
    `Score ${consistencyScore}`,
    `${bucket} intensity`,
    activeRunLength > 0 ? `${activeRunLength}-day run` : 'No active run',
  ].join(', ');

  return `
    <div
      class="dashboard__heatmap-cell dashboard__heatmap-cell--${escapeHtml(bucket)}"
      role="gridcell"
      aria-colindex="${escapeHtml(String(weekIndex + 1))}"
      aria-rowindex="${escapeHtml(String(dayIndex + 1))}"
      tabindex="0"
      aria-label="${escapeHtml(accessibilityLabel)}"
      aria-labelledby="${escapeHtml(cellIds.labelId)}"
      aria-describedby="${escapeHtml(cellIds.descriptionId)} ${escapeHtml(cellIds.fallbackId)}"
      data-bucket="${escapeHtml(bucket)}"
      data-consistency-score="${escapeHtml(String(consistencyScore))}"
      data-date="${escapeHtml(String(normalizedCell.date ?? ''))}"
      data-intensity-level="${escapeHtml(String(normalizedCell.intensityLevel ?? bucket))}"
      data-week-index="${escapeHtml(String(weekIndex))}"
      data-day-index="${escapeHtml(String(dayIndex))}"
      data-is-active="${String(isActive)}"
      data-is-empty="${String(isEmpty)}"
      data-session-count="${escapeHtml(String(sessionCount))}"
      data-total-minutes="${escapeHtml(String(totalMinutes))}"
      data-active-run-length="${escapeHtml(String(activeRunLength))}"
    >
      <span class="dashboard__heatmap-cell-swatch" aria-hidden="true"></span>
      <span id="${escapeHtml(cellIds.labelId)}" class="dashboard__sr-only">${escapeHtml(
        tooltipReadyLabel
      )}</span>
      <span id="${escapeHtml(cellIds.descriptionId)}" class="dashboard__sr-only">${escapeHtml(
        tooltipReadyDescription
      )}</span>
      <span id="${escapeHtml(cellIds.fallbackId)}" class="dashboard__sr-only">
        ${escapeHtml(isEmpty ? 'Empty day' : 'Tooltip metadata ready')}
      </span>
    </div>
  `;
}

function renderConsistencyWeekSummary(weeks) {
  if (!Array.isArray(weeks) || weeks.length === 0) {
    return '';
  }

  return `
    <ol id="consistency-week-summary" class="dashboard__sr-only">
      ${weeks
        .map((week, weekIndex) => `<li>${escapeHtml(getConsistencyWeekSummaryLabel(week, weekIndex))}</li>`)
        .join('')}
    </ol>
  `;
}

function renderConsistency(consistency) {
  const items = getConsistencyCells(consistency);
  const weeks = getConsistencyWindowWeeks(consistency);
  const range = consistency?.range ?? {};
  const summary = consistency?.summary ?? {};
  const renderedStartDate = weeks?.[0]?.[0]?.date ?? range.startDate ?? '';
  const renderedEndDate = weeks?.[weeks.length - 1]?.[CONSISTENCY_DAYS_PER_WEEK - 1]?.date ?? range.endDate ?? '';
  const rangeLabel =
    typeof renderedStartDate === 'string' &&
    typeof renderedEndDate === 'string' &&
    renderedStartDate !== '' &&
    renderedEndDate !== ''
      ? `${formatDateLabel(renderedStartDate)} to ${formatDateLabel(renderedEndDate)}`
      : EMPTY_TEXT;
  const summaryLabel = [
    Number.isFinite(Number(summary.totalSessions)) ? `${Number(summary.totalSessions)} sessions` : null,
    Number.isFinite(Number(summary.totalMinutes)) ? `${formatMinutes(summary.totalMinutes)} total` : null,
    Number.isFinite(Number(summary.activeDays)) ? `${Number(summary.activeDays)} active days` : null,
  ]
    .filter(Boolean)
    .join(' · ');
  const rowCount = CONSISTENCY_DAYS_PER_WEEK;

  return `
    <article
      class="dashboard__panel dashboard__panel--consistency"
      aria-labelledby="consistency-title"
      aria-describedby="consistency-summary consistency-week-summary consistency-legend"
    >
      <header class="dashboard__panel-header dashboard__panel-header--consistency">
        <div class="dashboard__panel-copy">
          <p class="dashboard__eyebrow">Consistency</p>
          <h2 id="consistency-title" class="dashboard__sr-only">Consistency</h2>
        </div>
        <p id="consistency-summary" class="dashboard__panel-kicker">
          ${escapeHtml(rangeLabel)}
        </p>
      </header>
      ${
        items.length > 0
          ? `
            <div class="dashboard__heatmap" role="grid" aria-label="Practice consistency over time">
              <div
                class="dashboard__heatmap-grid"
                role="rowgroup"
              >
                ${Array.from({ length: rowCount }, (_, dayIndex) => `
                  <div class="dashboard__heatmap-row" role="row">
                    ${weeks
                      .map((week, weekIndex) =>
                        renderConsistencyCell(week[dayIndex], weekIndex, dayIndex)
                      )
                      .filter(Boolean)
                      .join('')}
                  </div>
                `).join('')}
              </div>
              ${renderConsistencyWeekSummary(weeks)}
              ${renderConsistencyLegend()}
              <p class="dashboard__heatmap-fallback">
                ${escapeHtml(
                  summaryLabel ||
                    `${items.length} days tracked across ${weeks.length} weeks`
                )}
              </p>
            </div>
          `
          : `<p class="dashboard__empty">${EMPTY_TEXT}</p>`
      }
    </article>
  `;
}

function renderActivityItem(activity, index = 0, total = 0) {
  if (!activity || typeof activity !== 'object') {
    return '';
  }

  const title = typeof activity.title === 'string' && activity.title.trim() !== ''
    ? activity.title
      : typeof activity.message === 'string' && activity.message.trim() !== ''
      ? activity.message
      : EMPTY_TEXT;
  const meta = formatActivityMeta(activity);
  const presenceClass = getRecentActivityPresenceClass(index, total);

  return `
    <li class="dashboard__list-item">
      ${renderActivityButton(
        activity,
        `
          <span class="dashboard__list-label">${escapeHtml(title)}</span>
          ${
            meta
              ? `<span class="recent-activity__meta">${escapeHtml(meta)}</span>`
              : ''
          }
        `,
        presenceClass
      )}
    </li>
  `;
}

function getRecentActivityGroups(recentActivity) {
  if (recentActivity && typeof recentActivity === 'object' && !Array.isArray(recentActivity)) {
    return Array.isArray(recentActivity.groups) ? recentActivity.groups : [];
  }

  return [];
}

function getRecentActivityItems(recentActivity) {
  return getRecentActivityGroups(recentActivity)
    .flatMap((group) => (group && Array.isArray(group.items) ? group.items : []));
}

function renderRecentActivity(recentActivity) {
  const items = getRecentActivityItems(recentActivity);
  const renderedItems = items
    .map((item, index) => renderActivityItem(item, index, items.length))
    .filter(Boolean)
    .join('');

  return `
    <article class="dashboard__panel dashboard__panel--activity">
      <p class="dashboard__eyebrow">Recent activity</p>
      ${
        renderedItems
          ? `
            <ol class="dashboard__list dashboard__list--activity" aria-label="Recent activity feed">
              ${renderedItems}
            </ol>
          `
          : `
            <div class="dashboard__empty-state">
              <p class="dashboard__empty-state-title">${RECENT_ACTIVITY_EMPTY_TITLE}</p>
              <p class="dashboard__empty">${RECENT_ACTIVITY_EMPTY_BODY}</p>
            </div>
          `
      }
    </article>
  `;
}


export function createDashboardView() {
  let elements = {};
  let isInitialized = false;
  let isEventsBound = false;


  function init() {
    elements = {
      featured: document.getElementById('featured'),
      stats: document.getElementById('stats'),
      consistency: document.getElementById('consistency'),
      recentActivity: document.getElementById('recent-activity'),
    };


    const missingMountPoints = Object.entries(elements)
      .filter(([, element]) => !element)
      .map(([key]) => key);

    if (missingMountPoints.length > 0) {
      throw new Error(`Missing dashboard mount points: ${missingMountPoints.join(', ')}`);
    }

    isInitialized = true;
  }


  function render(dashboardData = {}) {
   
    if (!isInitialized) {
      throw new Error('createDashboardView().init() must be called before render().');
    }

    const {
      featuredInsight = null,
      globalStats = null,
      consistency = [],
      recentActivity = [],
    } = dashboardData;


    elements.featured.innerHTML = renderFeaturedInsight(featuredInsight);
    elements.stats.innerHTML = renderStats(globalStats);
    elements.consistency.innerHTML = renderConsistency(consistency);
    elements.recentActivity.innerHTML = renderRecentActivity(recentActivity);
  }


  function bindEvents() {
    if (!isInitialized) {
      throw new Error('createDashboardView().init() must be called before bindEvents().');
    }

    if (isEventsBound) {
      return;
    }

    const handleActivityClick = (event) => {
      const target = event.target;
      const button =
        target && typeof target.closest === 'function'
          ? target.closest('.recent-activity__item')
          : null;

      if (!button || !elements.recentActivity.contains(button)) {
        return;
      }

      const skillId = button.dataset.skillId;

      if (typeof skillId !== 'string' || skillId.trim() === '') {
        return;
      }

      if (typeof dashboardView.onActivityClick === 'function') {
        dashboardView.onActivityClick(skillId);
      }
    };

    const handleHeroActionClick = (event) => {
      const target = event.target;
      const button =
        target && typeof target.closest === 'function'
          ? target.closest('.dashboard__hero-action')
          : null;

      if (!button || !elements.featured.contains(button)) {
        return;
      }

      const action = button.dataset.action;

      if (typeof action !== 'string' || action.trim() === '') {
        return;
      }

      if (typeof dashboardView.onHeroAction === 'function') {
        dashboardView.onHeroAction({
          action,
          intent: typeof button.dataset.intent === 'string' ? button.dataset.intent : '',
          skillId:
            typeof button.dataset.skillId === 'string' ? button.dataset.skillId : '',
        });
      }
    };

    elements.featured.addEventListener('click', handleHeroActionClick);
    elements.recentActivity.addEventListener('click', handleActivityClick);
    isEventsBound = true;
  }


  const dashboardView = {
    onActivityClick: null,
    onHeroAction: null,
    init,
    render,
    bindEvents,
  };

  return dashboardView;
}
