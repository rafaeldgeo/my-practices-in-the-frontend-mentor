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

  return {
    updateDashboard,
    initDashboard,
  };
}
