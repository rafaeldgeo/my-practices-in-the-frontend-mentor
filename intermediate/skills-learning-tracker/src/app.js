// Application bootstrap. Wires the dashboard, header, modal, and skill form views.
import * as store from './store/data.store.js'
import * as activityService from './services/activity.service.js'
import * as dashboardService from './services/dashboard.service.js'
import * as skillService from './services/skill.service.js'
import * as sessionService from './services/session.service.js'
import { createDashboardView } from './view/dashboard/dashboard.view.js'
import { createHeaderView } from './view/header/header.view.js'
import { createModalView } from './view/modal/modal.view.js'
import { createSessionView } from './view/session/session.view.js'
import { createSkillFormView } from './view/skill/skill-form.view.js'

import { createDashboardController } from './controller/dashboard/dashboard.controller.js'
import { createModalController } from './controller/modal/modal.controller.js'

const view = createDashboardView()
const headerView = createHeaderView()
const modalView = createModalView()
const sessionView = createSessionView()
const modalController = createModalController({
  view: modalView
})

function openSessionModal(skillId) {
  const content = sessionView.render({ skillId })

  sessionView.onSubmit = (payload) => {
    void handleSessionSubmit(payload)
  }

  modalController.open({
    content
  })

  sessionView.init()
  sessionView.bindEvents()
}

async function handleSessionSubmit(payload) {
  try {
    const skillId = typeof payload?.skillId === 'string' ? payload.skillId : ''

    if (skillId.trim() === '') {
      throw new Error('Skill not found')
    }

    const skills = await store.getSkills()
    const skill = skills.find((item) => item?.id === skillId)

    if (!skill) {
      throw new Error('Skill not found')
    }

    const session = sessionService.createSession({
      skillId,
      duration: payload.duration,
    })

    await store.saveSession(session)

    const activity = activityService.createActivityFromSession({
      session,
      skillName: skill.name,
    })

    await store.saveActivity(activity)
    await controller.updateDashboard()
    modalController.close()
  } catch (error) {
    console.error('Failed to save session:', error)
  }
}

const controller = createDashboardController({
  store,
  dashboardService,
  view,
  onActivityClick: openSessionModal
})

if (typeof document !== 'undefined') {
  headerView.init()
  view.init()
  modalView.init()

  headerView.onAddSkillClick = () => {
    modalController.open({
      content: `
        <h2>Nova Skill</h2>
        <form class="skill-form">
          <div class="skill-form__feedback"></div>

          <div class="skill-form__field">
            <label for="skill-name">Nome da skill</label>
            <input
              id="skill-name"
              name="name"
              type="text"
              required
            />
          </div>

          <button type="submit">Salvar</button>
        </form>
      `
    })

    const skillFormView = createSkillFormView()

    skillFormView.init()
    skillFormView.bindEvents()
    skillFormView.onSubmit = async (data) => {
      const skill = skillService.createSkill(data)
      await store.saveSkill(skill)
      await controller.updateDashboard()
    }
  }

  headerView.bindEvents()
  view.onActivityClick = (skillId) => {
    controller.handleActivityClick(skillId)
  }
  view.bindEvents()
  modalView.bindEvents({ onClose: () => modalController.close() })

  controller.initDashboard()
}
