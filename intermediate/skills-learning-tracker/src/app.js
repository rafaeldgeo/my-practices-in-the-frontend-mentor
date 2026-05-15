// Application bootstrap. Wires the dashboard, header, modal, and skill forms.
import * as store from './store/data.store.js'
import * as activityService from './services/activity.service.js'
import * as dashboardService from './services/dashboard.service.js'
import * as skillService from './services/skill.service.js'
import * as skillPickerService from './services/skill-picker.service.js'
import * as sessionService from './services/session.service.js'
import { createSkillsLearningTrackerApp } from './app.bootstrap.js'
import { createDashboardView } from './view/dashboard/dashboard.view.js'
import { createHeaderView } from './view/header/header.view.js'
import { createModalView } from './view/modal/modal.view.js'
import { createSessionView } from './view/session/session.view.js'
import { createSkillFormView } from './view/skill/skill-form.view.js'
import { createSkillPickerView } from './view/skill/skill-picker.view.js'
import { createModalController } from './controller/modal/modal.controller.js'

const dashboardView = createDashboardView()
const headerView = createHeaderView()
const modalView = createModalView()
const sessionView = createSessionView()
const skillFormView = createSkillFormView()
const skillPickerView = createSkillPickerView()

const app = createSkillsLearningTrackerApp({
  store,
  activityService,
  dashboardService,
  skillService,
  skillPickerService,
  sessionService,
  dashboardView,
  headerView,
  modalView,
  sessionView,
  skillFormView,
  skillPickerView,
  modalController: createModalController({
    view: modalView,
  }),
})

if (typeof document !== 'undefined') {
  void app.init()
}
