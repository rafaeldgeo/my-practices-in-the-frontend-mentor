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


function renderFeatured(featuredData) {

  if (!featuredData) {
    return `
      <article class="dashboard__panel dashboard__panel--featured dashboard__panel--empty">
        <p class="dashboard__eyebrow">Featured skill</p>
        <h2 class="dashboard__heading">No featured skill yet</h2>
        <p class="dashboard__empty">${EMPTY_TEXT}</p>
      </article>
    `;
  }


  const {
    skillName,
    totalTime,
    status,
    minutesToday,
  } = featuredData;


  return `
    <article class="dashboard__panel dashboard__panel--featured">
      <p class="dashboard__eyebrow">Featured skill</p>
      <h2 class="dashboard__heading">${escapeHtml(skillName)}</h2>
      <dl class="dashboard__definition-list">
        <div class="dashboard__definition-item">
          <dt>Total time</dt>
          <dd>${formatMinutes(totalTime)}</dd>
        </div>
        <div class="dashboard__definition-item">
          <dt>Status</dt>
          <dd>${escapeHtml(status?.label ?? EMPTY_TEXT)}</dd>
        </div>
        <div class="dashboard__definition-item">
          <dt>Minutes today</dt>
          <dd>${formatMinutes(minutesToday)}</dd>
        </div>
      </dl>
    </article>
  `;
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
