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


function renderRecentActivity(recentActivity) {

  const items = Array.isArray(recentActivity) ? recentActivity : [];


  return `
    <article class="dashboard__panel dashboard__panel--activity">
      <p class="dashboard__eyebrow">Recent activity</p>
      ${
        items.length > 0
          ? `
            <ol class="dashboard__list dashboard__list--activity">
              ${items
                .map((item) => `
                  <li class="dashboard__list-item">
                    <span class="dashboard__list-label">${escapeHtml(item?.skillName ?? item?.skillId ?? EMPTY_TEXT)}</span>
                    <span class="dashboard__list-meta">${formatDateLabel(item?.date)}</span>
                    <span class="dashboard__list-value">${formatMinutes(item?.duration)}</span>
                  </li>
                `)
                .join('')}
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


  return {
    init,
    render,
  };
}
