export function createDashboardController({ store, dashboardService, view, onActivityClick } = {}) {
  async function updateDashboard() {
    const [skills, sessions] = await Promise.all([
      store.getSkills(),
      store.getSessions(),
    ]);
    const dashboardData = dashboardService.createDashboardData({ skills, sessions }); 

    view.render(dashboardData); 
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
