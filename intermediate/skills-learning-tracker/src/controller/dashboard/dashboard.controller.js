import { createPriorityPayload } from '../../services/priority.service.js';

export function createDashboardController({
  store,
  dashboardService,
  view,
  onActivityClick,
  createPriorityPayload: buildPriorityPayload = createPriorityPayload,
} = {}) {
  async function updateDashboard() {
    const [skills, sessions] = await Promise.all([
      store.getSkills(),
      store.getSessions(),
    ]);
    const dashboardData = dashboardService.createDashboardData({ skills, sessions });
    const featured = buildPriorityPayload({ skills, sessions });

    view.render({
      ...dashboardData,
      featured,
    });
  }

  async function initDashboard() {
    await updateDashboard();
  }

  function handleActivityClick(skillId) {
    if (typeof onActivityClick === 'function') {
      onActivityClick(skillId);
    }
  }

  return {
    updateDashboard,
    initDashboard,
    handleActivityClick,
  };
}
