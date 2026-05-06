export function createDashboardController({ store, dashboardService, view }) {
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
    console.log('Open session for:', skillId);
  }

  return {
    updateDashboard,
    initDashboard,
    handleActivityClick,
  };
}
