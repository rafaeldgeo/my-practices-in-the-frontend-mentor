// import './test/session.test.js'
// import './test/skill.test.js'
// import './test/data.test.js'
// import './test/streak.test.js'
// import './test/stats.test.js'
// import './test/dashboard.test.js'

import * as store from './store/data.store.js'
import * as dashboardService from './services/dashboard.service.js'
import { createDashboardView } from './view/dashboard/dashboard.view.js'

import { createDashboardController } from './controller/dashboard.controller.js'

const view = createDashboardView()

const controller = createDashboardController({
  store,
  dashboardService,
  view
})

if (typeof document !== 'undefined') {
  view.init()
  void controller.initDashboard()
}
