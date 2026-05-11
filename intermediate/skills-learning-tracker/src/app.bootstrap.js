import { createDashboardController } from './controller/dashboard/dashboard.controller.js'

export function createSkillsLearningTrackerApp({
  store,
  activityService,
  dashboardService,
  skillService,
  sessionService,
  dashboardView,
  headerView,
  modalView,
  sessionView,
  skillFormView,
  skillPickerView,
  modalController,
  dashboardController,
} = {}) {
  async function getSkillById(skillId) {
    const normalizedSkillId = typeof skillId === 'string' ? skillId.trim() : ''

    if (normalizedSkillId === '') {
      return null
    }

    const skills = await store.getSkills()

    return skills.find((item) => item?.id === normalizedSkillId) ?? null
  }

  async function openSkillFormModal() {
    const content = skillFormView.render()

    skillFormView.onSubmit = (data) => {
      void handleSkillSubmit(data)
    }

    modalController.open({
      content,
    })

    skillFormView.init()
    skillFormView.bindEvents()
  }

  async function openSkillPickerModal() {
    const skills = await store.getSkills()

    if (!Array.isArray(skills) || skills.length === 0) {
      return
    }

    const content = skillPickerView.render({ skills })

    skillPickerView.onSelect = (skillId) => {
      void openSessionModal(skillId)
    }

    modalController.open({
      content,
    })

    skillPickerView.init()
    skillPickerView.bindEvents()
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
      content,
    })

    sessionView.init()
    sessionView.bindEvents()
  }

  async function handleSkillSubmit(data) {
    try {
      const skill = skillService.createSkill(data)
      await store.saveSkill(skill)
      await controller.updateDashboard()
      modalController.close()
    } catch (error) {
      console.error('Failed to save skill:', error)
    }
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

  async function handleHeroAction(action) {
    if (!action || typeof action !== 'object') {
      return
    }

    switch (action.action) {
      case 'open_session_modal':
        if (typeof action.skillId === 'string' && action.skillId.trim() !== '') {
          await openSessionModal(action.skillId)
        }
        break
      case 'open_skill_picker':
        await openSkillPickerModal()
        break
      case 'open_skill_form':
        await openSkillFormModal()
        break
      default:
        break
    }
  }

  const controller =
    dashboardController ??
    createDashboardController({
      store,
      dashboardService,
      view: dashboardView,
      onActivityClick: openSessionModal,
      onHeroAction: handleHeroAction,
    })

  async function init() {
    headerView.init()
    dashboardView.init()
    modalView.init()

    headerView.onAddSkillClick = () => {
      void openSkillFormModal()
    }

    headerView.bindEvents()

    dashboardView.onActivityClick = (skillId) => {
      controller.handleActivityClick(skillId)
    }

    dashboardView.onHeroAction = (action) => {
      if (typeof controller.handleHeroAction === 'function') {
        controller.handleHeroAction(action)
        return
      }

      void handleHeroAction(action)
    }

    dashboardView.bindEvents()
    modalView.bindEvents({ onClose: () => modalController.close() })

    await controller.initDashboard()
  }

  return {
    init,
    openSessionModal,
    openSkillPickerModal,
    openSkillFormModal,
    handleSessionSubmit,
    handleHeroAction,
  }
}
