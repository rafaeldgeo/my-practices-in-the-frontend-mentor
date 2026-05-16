import { createDashboardController } from './controller/dashboard/dashboard.controller.js'

export function createSkillsLearningTrackerApp({
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
  modalController,
  dashboardController,
} = {}) {
  function getSessionValidationMessage(errors = []) {
    if (!Array.isArray(errors) || errors.length === 0) {
      return 'Pick a duration to log this practice.'
    }

    const firstError = String(errors[0] ?? '')

    if (firstError.includes('duration')) {
      return 'Pick a duration to log this practice.'
    }

    if (firstError.includes('skillId')) {
      return 'Select a skill before logging practice.'
    }

    return 'Review the session and try again.'
  }

  async function getSkillById(skillId) {
    const normalizedSkillId = typeof skillId === 'string' ? skillId.trim() : ''

    if (normalizedSkillId === '') {
      return null
    }

    const skills = await store.getSkills()

    return skills.find((item) => item?.id === normalizedSkillId) ?? null
  }

  async function openSkillFormModal() {
    const content = skillFormView.render({
      mode: 'create',
    })

    skillFormView.onSubmit = (data) => {
      void handleSkillSubmit(data)
    }

    modalController.open({
      content,
    })

    skillFormView.init()
    skillFormView.bindEvents()
  }

  async function openSkillGoalSetupModal(skillId) {
    const skill = await getSkillById(skillId)

    if (!skill) {
      return
    }

    const content = skillFormView.render({
      mode: 'goal_setup',
      skill,
    })

    skillFormView.onSubmit = (data) => {
      void handleSkillGoalSubmit(skill, data)
    }

    modalController.open({
      content,
    })

    skillFormView.init()
    skillFormView.bindEvents()
  }

  async function openSkillPickerModal(currentSkillId = '', { purpose = 'practice', onSelect } = {}) {
    const [skills, sessions] = await Promise.all([
      store.getSkills(),
      store.getSessions(),
    ])
    const payload = skillPickerService.createSkillPickerPayload({
      skills,
      sessions,
      currentSkillId,
      purpose,
    })
    const content = skillPickerView.render(payload)

    skillPickerView.onSelect = (skillId) => {
      const selectionHandler =
        typeof onSelect === 'function'
          ? onSelect
          : openSessionModal

      void selectionHandler(skillId)
    }
    skillPickerView.onCreateSkill = () => {
      void openSkillFormModal()
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
      feedbackMessage: '',
    })

    sessionView.onSubmit = (payload) => {
      void handleSessionSubmit(payload)
    }
    sessionView.onClose = () => {
      modalController.close()
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

  async function handleSkillGoalSubmit(skill, data) {
    try {
      const updatedSkill = skillService.updateSkillGoal(skill, data)

      if (!updatedSkill) {
        throw new Error('Invalid goal setup payload')
      }

      if (typeof store.updateSkill === 'function') {
        await store.updateSkill(updatedSkill)
      } else {
        await store.saveSkill(updatedSkill)
      }

      await controller.updateDashboard()
      modalController.close()
    } catch (error) {
      console.error('Failed to save goal setup:', error)
    }
  }

  async function handleSessionSubmit(payload) {
    try {
      const skill = await getSkillById(payload?.skillId)

      if (!skill) {
        throw new Error('Skill not found')
      }

      const validation =
        typeof sessionService.validateSessionInput === 'function'
          ? sessionService.validateSessionInput({
              skillId: String(skill.id),
              duration: payload?.duration,
            })
          : { isValid: true, errors: [] }

      if (!validation.isValid) {
        if (typeof sessionView.setFeedbackMessage === 'function') {
          sessionView.setFeedbackMessage(getSessionValidationMessage(validation.errors))
        }
        return
      }

      if (typeof sessionView.clearFeedbackMessage === 'function') {
        sessionView.clearFeedbackMessage()
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
      if (typeof sessionView.setFeedbackMessage === 'function') {
        sessionView.setFeedbackMessage('Could not save this practice right now. Try again.')
      }
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
        await openSkillPickerModal(action.skillId)
        break
      case 'open_skill_goal_setup':
        if (typeof action.skillId === 'string' && action.skillId.trim() !== '') {
          await openSkillGoalSetupModal(action.skillId)
          break
        }

        await openSkillPickerModal('', {
          purpose: 'goal_setup',
          onSelect: openSkillGoalSetupModal,
        })
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
    openSkillGoalSetupModal,
    handleSessionSubmit,
    handleHeroAction,
  }
}
