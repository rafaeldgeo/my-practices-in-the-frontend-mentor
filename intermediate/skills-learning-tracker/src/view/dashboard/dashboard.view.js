const EMPTY_TEXT = 'No data available'; // MENSAGEM DE RETORNO CASO NÃO EXISTA DADO

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


function getPriorityStatusLabel(status) {
  if (status === 'behind') {
    return 'Behind';
  }

  if (status === 'ahead') {
    return 'Ahead';
  }

  if (status === 'on-track') {
    return 'On track';
  }

  return EMPTY_TEXT;
}

function renderDefinitionItems(items) {
  return items
    .filter((item) => item && typeof item.label === 'string' && item.label.trim() !== '')
    .map((item) => `
      <div class="dashboard__definition-item">
        <dt>${escapeHtml(item.label)}</dt>
        <dd>${escapeHtml(String(item.value ?? EMPTY_TEXT))}</dd>
      </div>
    `)
    .join('');
}

function renderFeaturedShell({
  modifierClass = 'dashboard__panel--empty',
  eyebrow,
  title,
  summary,
  statusLabel,
  statusClassName = '',
  details = '',
  emptyMessage = '',
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
          ? `<p class="dashboard__summary">${escapeHtml(summary)}</p>`
          : ''
      }
      ${
        details
          ? `<dl class="dashboard__definition-list dashboard__definition-list--hero">${details}</dl>`
          : ''
      }
      ${
        emptyMessage
          ? `<p class="dashboard__empty">${escapeHtml(emptyMessage)}</p>`
          : ''
      }
    </article>
  `;
}

function renderFeaturedEmpty() {
  return renderFeaturedShell({
    modifierClass: 'dashboard__panel--empty',
    eyebrow: 'Plan status',
    title: 'No learning data yet',
    summary: 'Add your first skill or session to surface the plan state here.',
    statusLabel: 'Awaiting data',
    statusClassName: 'dashboard__status-pill--empty',
    emptyMessage: EMPTY_TEXT,
  });
}

function renderFeaturedPriority(featuredSkill) {
  if (!featuredSkill) {
    return renderFeaturedEmpty();
  }

  const {
    skillName,
    progressDebtPercent,
    progressDebtHours,
    currentProgress,
    expectedProgress,
    totalTime,
    minutesToday,
    status,
  } = featuredSkill;

  return renderFeaturedShell({
    modifierClass: 'dashboard__panel--priority',
    eyebrow: 'Operational priority',
    title: skillName,
    summary: 'This skill has the largest progress debt in the current plan.',
    statusLabel: getPriorityStatusLabel(status),
    statusClassName: `dashboard__status-pill--${status === 'behind' ? 'behind' : status === 'ahead' ? 'ahead' : 'on-track'}`,
    details: renderDefinitionItems([
      {
        label: 'Status',
        value: getPriorityStatusLabel(status),
      },
      {
        label: 'Progress debt',
        value: `${formatNumber(progressDebtPercent)}% / ${formatNumber(progressDebtHours)}h`,
      },
      {
        label: 'Current vs expected',
        value: `${formatNumber(currentProgress)}% / ${formatNumber(expectedProgress)}%`,
      },
      {
        label: 'Total time',
        value: formatMinutes(totalTime),
      },
      {
        label: 'Minutes today',
        value: formatMinutes(minutesToday),
      },
    ]),
  });
}

function renderFeaturedHealthy(summary) {
  if (!summary) {
    return renderFeaturedEmpty();
  }

  const {
    skillsOnTrack,
    skillsAhead,
  } = summary;

  return renderFeaturedShell({
    modifierClass: 'dashboard__panel--healthy',
    eyebrow: 'Healthy plan',
    title: 'Balanced and sustainable',
    summary: 'The current pace is stable across the plan.',
    statusLabel: 'Stable',
    statusClassName: 'dashboard__status-pill--healthy',
    details: renderDefinitionItems([
      {
        label: 'Skills on track',
        value: Number.isFinite(Number(skillsOnTrack)) ? String(Number(skillsOnTrack)) : '0',
      },
      {
        label: 'Skills ahead',
        value: Number.isFinite(Number(skillsAhead)) ? String(Number(skillsAhead)) : '0',
      },
    ]),
  });
}

function renderFeatured(featuredData) {
  switch (featuredData?.mode) {
    case 'priority':
      return renderFeaturedPriority(featuredData.featuredSkill);
    case 'healthy':
      return renderFeaturedHealthy(featuredData.summary);
    case 'empty':
    default:
      return renderFeaturedEmpty();
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


  const {
    totalTime,
    totalSessions,
    currentStreak,
  } = globalStats;


  return `
    <article class="dashboard__panel dashboard__panel--stats">
      <p class="dashboard__eyebrow">Stats</p>
      <dl class="dashboard__definition-list dashboard__definition-list--stats">
        <div class="dashboard__definition-item">
          <dt>Total time</dt>
          <dd>${formatMinutes(totalTime)}</dd>
        </div>
        <div class="dashboard__definition-item">
          <dt>Total sessions</dt>
          <dd>${Number.isFinite(Number(totalSessions)) ? Number(totalSessions) : 0}</dd>
        </div>
        <div class="dashboard__definition-item">
          <dt>Current streak</dt>
          <dd>${Number.isFinite(Number(currentStreak)) ? Number(currentStreak) : 0} days</dd>
        </div>
      </dl>
    </article>
  `;
}


function renderConsistency(consistency) {

  const items = Array.isArray(consistency) ? consistency : [];


  return `
    <article class="dashboard__panel dashboard__panel--consistency">
      <p class="dashboard__eyebrow">Consistency</p>
      ${
        items.length > 0
          ? `
            <ul class="dashboard__list dashboard__list--consistency">
              ${items
                .map((item) => `
                  <li class="dashboard__list-item">
                    <span class="dashboard__list-label">${formatDateLabel(item?.date)}</span>
                    <span class="dashboard__list-value">${formatMinutes(item?.totalMinutes)}</span>
                  </li>
                `)
                .join('')}
            </ul>
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
      featured = null,
      globalStats = null,
      consistency = [],
      recentActivity = [],
    } = dashboardData;


    elements.featured.innerHTML = renderFeatured(featured);
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

    elements.recentActivity.addEventListener('click', handleActivityClick);
    isEventsBound = true;
  }


  const dashboardView = {
    onActivityClick: null,
    init,
    render,
    bindEvents,
  };

  return dashboardView;
}
