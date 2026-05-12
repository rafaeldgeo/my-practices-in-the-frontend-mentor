const EMPTY_TEXT = 'No data available'; 

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

function formatRelativeTime(timestamp) {
  const parsedTimestamp =
    typeof timestamp === 'number' && Number.isFinite(timestamp)
      ? timestamp
      : typeof timestamp === 'string'
        ? Date.parse(timestamp)
        : NaN;

  if (!Number.isFinite(parsedTimestamp)) {
    return EMPTY_TEXT;
  }

  const now = Date.now();
  const diff = now - parsedTimestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;

  if (diff < minute) {
    return 'just now';
  }

  if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}m ago`;
  }

  if (diff < 24 * hour) {
    const hours = Math.floor(diff / hour);
    return `${hours}h ago`;
  }

  const date = new Date(parsedTimestamp);
  return date.toLocaleDateString();
}

function renderActivityButton(activity, content) {
  return `
    <button
      class="recent-activity__item"
      data-skill-id="${escapeHtml(String(activity?.skillId ?? ''))}"
      type="button"
    >
      ${content}
    </button>
  `;
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

function renderHeroMetrics(items) {
  return (Array.isArray(items) ? items : [])
    .map((item) => renderHeroMetric(item))
    .filter(Boolean)
    .join('');
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
  details = '',
  actions = '',
}) {
  return `
    <article class="dashboard__panel dashboard__panel--featured ${modifierClass}">
      <header class="dashboard__hero-header">
        <div class="dashboard__hero-copy">
          <p class="dashboard__eyebrow">${escapeHtml(eyebrow ?? EMPTY_TEXT)}</p>
          <h2 class="dashboard__heading">${escapeHtml(title ?? EMPTY_TEXT)}</h2>
        </div>
        ${
          statusLabel
            ? `<span class="dashboard__status-pill ${statusClassName}">${escapeHtml(statusLabel)}</span>`
            : ''
        }
      </header>
      ${
        summary
          ? `<p class="dashboard__summary">${escapeHtml(normalizeHeroSummary(summary))}</p>`
          : ''
      }
      ${
      details
          ? `<div class="dashboard__hero-metrics">${details}</div>`
          : ''
      }
      ${
        actions
          ? actions
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
      <article class="dashboard__panel dashboard__panel--stats dashboard__panel--empty">
        <p class="dashboard__eyebrow">Stats</p>
        <p class="dashboard__empty">${EMPTY_TEXT}</p>
      </article>
    `;
  }


  const items = getStatsItems(globalStats);

  if (items.length === 0) {
    return `
      <article class="dashboard__panel dashboard__panel--stats dashboard__panel--empty">
        <p class="dashboard__eyebrow">Stats</p>
        <p class="dashboard__empty">${EMPTY_TEXT}</p>
      </article>
    `;
  }


  const primaryItems = items.slice(0, 2);
  const supportingItems = items.slice(2);

  return `
    <article class="dashboard__panel dashboard__panel--stats">
      <header class="dashboard__panel-header dashboard__panel-header--stats">
        <p class="dashboard__eyebrow">Stats</p>
        <p class="dashboard__panel-kicker">Momentum at a glance</p>
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

function renderConsistencyCell(cell) {
  if (!cell || typeof cell !== 'object') {
    return '';
  }

  const bucket = typeof cell.bucket === 'string' && cell.bucket.trim() !== '' ? cell.bucket : 'empty';
  const sessionCount = Number.isFinite(Number(cell.sessionCount)) ? Number(cell.sessionCount) : 0;
  const totalMinutes = Number.isFinite(Number(cell.totalMinutes)) ? Number(cell.totalMinutes) : 0;
  const summaryLabel = typeof cell.summaryLabel === 'string' ? cell.summaryLabel.trim() : '';
  const accessibilityLabel =
    typeof cell.accessibilityLabel === 'string' ? cell.accessibilityLabel.trim() : EMPTY_TEXT;
  const isActive = Boolean(cell.isActive);
  const isEmpty = Boolean(cell.isEmpty);

  return `
    <div
      class="dashboard__heatmap-cell dashboard__heatmap-cell--${escapeHtml(bucket)}"
      role="gridcell"
      tabindex="0"
      data-bucket="${escapeHtml(bucket)}"
      data-consistency-score="${escapeHtml(String(Number(cell.consistencyScore) || 0))}"
      data-date="${escapeHtml(String(cell.date ?? ''))}"
      data-intensity-level="${escapeHtml(String(cell.intensityLevel ?? bucket))}"
      data-is-active="${String(isActive)}"
      data-is-empty="${String(isEmpty)}"
      data-session-count="${escapeHtml(String(sessionCount))}"
      data-total-minutes="${escapeHtml(String(totalMinutes))}"
      aria-label="${escapeHtml(accessibilityLabel)}"
    >
      <span class="dashboard__heatmap-cell-swatch" aria-hidden="true"></span>
      <span class="dashboard__heatmap-cell-copy">
        <span class="dashboard__heatmap-cell-label">${escapeHtml(formatDateLabel(cell?.date))}</span>
        <span class="dashboard__heatmap-cell-value">
          ${
            isEmpty
              ? 'No practice'
              : `${escapeHtml(String(sessionCount))} ${sessionCount === 1 ? 'session' : 'sessions'}`
          }
        </span>
        <span class="dashboard__heatmap-cell-meta">
          ${escapeHtml(summaryLabel || `${formatMinutes(totalMinutes)} total`)}
        </span>
      </span>
    </div>
  `;
}


function renderConsistency(consistency) {

  const items = getConsistencyCells(consistency);
  const weeks = getConsistencyWeeks(items);
  const range = consistency?.range ?? {};
  const summary = consistency?.summary ?? {};
  const rangeLabel =
    typeof range.startDate === 'string' && typeof range.endDate === 'string'
      ? `${formatDateLabel(range.startDate)} to ${formatDateLabel(range.endDate)}`
      : EMPTY_TEXT;
  const summaryLabel = [
    Number.isFinite(Number(summary.totalSessions)) ? `${Number(summary.totalSessions)} sessions` : null,
    Number.isFinite(Number(summary.totalMinutes)) ? `${formatMinutes(summary.totalMinutes)} total` : null,
    Number.isFinite(Number(summary.activeDays)) ? `${Number(summary.activeDays)} active days` : null,
  ]
    .filter(Boolean)
    .join(' · ');


  return `
    <article
      class="dashboard__panel dashboard__panel--consistency"
      aria-labelledby="consistency-title"
      aria-describedby="consistency-summary consistency-legend"
    >
      <header class="dashboard__panel-header dashboard__panel-header--consistency">
        <div class="dashboard__panel-copy">
          <p class="dashboard__eyebrow">Consistency</p>
          <h2 id="consistency-title" class="dashboard__panel-title">Heatmap</h2>
        </div>
        <p id="consistency-summary" class="dashboard__panel-kicker">
          ${escapeHtml(rangeLabel)}${summaryLabel ? ` · ${escapeHtml(summaryLabel)}` : ''}
        </p>
      </header>
      ${
        items.length > 0
          ? `
            <div class="dashboard__heatmap" role="grid" aria-label="Practice consistency by week">
              ${renderConsistencyLegend()}
              <div class="dashboard__heatmap-grid" role="rowgroup">
                ${weeks
                  .map(
                    (week, weekIndex) => `
                      <div
                        class="dashboard__heatmap-week"
                        role="row"
                        aria-label="Week ${weekIndex + 1}${week[0]?.date ? `, starting ${formatDateLabel(week[0].date)}` : ''}"
                      >
                        <span class="dashboard__heatmap-week-label">
                          ${escapeHtml(week[0]?.date ? formatDateLabel(week[0].date) : `Week ${weekIndex + 1}`)}
                        </span>
                        <div class="dashboard__heatmap-week-cells">
                          ${week
                            .map((item) => renderConsistencyCell(item))
                            .filter(Boolean)
                            .join('')}
                        </div>
                      </div>
                    `
                  )
                  .join('')}
              </div>
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

function renderSkillCreated(activity) {
  return `
    <li class="dashboard__list-item">
      ${renderActivityButton(
        activity,
        `
          <span class="dashboard__list-label">${escapeHtml(activity?.message ?? EMPTY_TEXT)}</span>
          <span class="dashboard__list-meta">${escapeHtml(formatRelativeTime(activity?.timestamp))}</span>
        `
      )}
    </li>
  `;
}

function renderSession(activity) {
  const formattedDate = new Date(activity?.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return `
    <li class="dashboard__list-item">
      ${renderActivityButton(
        activity,
        `
          <span class="dashboard__list-label">${escapeHtml(activity?.message ?? EMPTY_TEXT)}</span>
          <span class="recent-activity__meta">
            <span class="dashboard__list-meta">${escapeHtml(formattedDate)}</span>
            <span class="dashboard__list-value">${formatMinutes(activity?.duration)}</span>
          </span>
        `
      )}
    </li>
  `;
}

function renderActivityItem(activity) {
  if (activity?.type === 'skill_created') {
    return renderSkillCreated(activity);
  }

  if (activity?.type === 'session') {
    return renderSession(activity);
  }

  return null;
}

function renderRecentActivity(recentActivity) {

  const items = Array.isArray(recentActivity) ? recentActivity : [];
  const renderedItems = items
    .map((item) => renderActivityItem(item))
    .filter(Boolean)
    .join('');


  return `
    <article class="dashboard__panel dashboard__panel--activity">
      <p class="dashboard__eyebrow">Recent activity</p>
      ${
        renderedItems
          ? `
            <ol class="dashboard__list dashboard__list--activity">
              ${renderedItems}
            </ol>
          `
          : `<p class="dashboard__empty">${EMPTY_TEXT}</p>`
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
