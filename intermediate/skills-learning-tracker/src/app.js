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
const skillFormView = createSkillFormView()
const modalController = createModalController({
  view: modalView
})

async function getSkillById(skillId) {
  const normalizedSkillId = typeof skillId === 'string' ? skillId.trim() : ''

  if (normalizedSkillId === '') {
    return null
  }

  const skills = await store.getSkills()

  return skills.find((item) => item?.id === normalizedSkillId) ?? null
}

async function openSessionModal(skillId) {
  const skill = await getSkillById(skillId)

  if (!skill) {
    return
  }

  const content = sessionView.render({
    skillId: String(skill.id),
    skillName: skill.name,
  })

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
    const skill = await getSkillById(payload?.skillId)

    if (!skill) {
      throw new Error('Skill not found')
    }

    const session = sessionService.createSession({
      skillId: String(skill.id),
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
      content: skillFormView.render()
    })

    skillFormView.onSubmit = async (data) => {
      try {
        const skill = skillService.createSkill(data)
        await store.saveSkill(skill)
        await controller.updateDashboard()
        modalController.close()
      } catch (error) {
        console.error('Failed to save skill:', error)
      }
    }

    skillFormView.init()
    skillFormView.bindEvents()
  }

  headerView.bindEvents()
  view.onActivityClick = (skillId) => {
    controller.handleActivityClick(skillId)
  }
  view.bindEvents()
  modalView.bindEvents({ onClose: () => modalController.close() })

  controller.initDashboard()
}
