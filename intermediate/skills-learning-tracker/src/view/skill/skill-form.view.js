import { createSkillFormTemplate } from './skill.template.js'

/**
 * Skill form view.
 * Owns the form DOM lookup inside the rendered modal content and emits submit payloads.
 */
export function createSkillFormView() {
  let elements = {}
  let isInitialized = false
  let isEventsBound = false
  let isGoalExpanded = false

  function render({ mode = 'create', skill = null } = {}) {
    isInitialized = false
    isEventsBound = false
    isGoalExpanded = mode === 'goal_setup'

    return createSkillFormTemplate({ mode, skill })
  }

  function init() {
    const form = document.querySelector('.skill-form')
    const feedbackEl = document.querySelector('.skill-form__feedback')
    const mode = form?.dataset.mode ?? 'create'
    const nameInput = form?.querySelector('input[name="name"]')
    const colorInput = form?.querySelector('input[name="color"]')
    const goalToggleButton = form?.querySelector('.skill-form__goal-toggle')
    const goalPanel = form?.querySelector('.skill-form__goal-panel')
    const goalTypeInput = form?.querySelector('select[name="goalType"]')
    const targetHoursInput = form?.querySelector('input[name="targetHours"]')

    elements = {
      form,
      feedbackEl,
      mode,
      nameInput,
      colorInput,
      goalToggleButton,
      goalPanel,
      goalTypeInput,
      targetHoursInput,
    }

    const requiredElements =
      mode === 'goal_setup'
        ? {
            form,
            feedbackEl,
            goalTypeInput,
            targetHoursInput,
          }
        : {
            form,
            feedbackEl,
            nameInput,
            colorInput,
          }

    const missingMountPoints = Object.entries(requiredElements)
      .filter(([, element]) => !element)
      .map(([key]) => key)

    if (missingMountPoints.length > 0) {
      throw new Error(`Missing skill form mount points: ${missingMountPoints.join(', ')}`)
    }

    if (elements.goalToggleButton && elements.goalPanel) {
      elements.goalToggleButton.setAttribute('aria-expanded', String(isGoalExpanded))
      elements.goalPanel.hidden = !isGoalExpanded
    }

    isInitialized = true
  }

  function setGoalInputsState(enabled) {
    if (!elements.goalTypeInput || !elements.targetHoursInput) {
      return
    }

    elements.goalTypeInput.disabled = !enabled
    elements.targetHoursInput.disabled = !enabled
    elements.goalTypeInput.required = Boolean(enabled)
    elements.targetHoursInput.required = Boolean(enabled)
  }

  function syncGoalState(nextExpanded) {
    isGoalExpanded = Boolean(nextExpanded)

    if (!elements.goalToggleButton || !elements.goalPanel) {
      return
    }

    elements.goalToggleButton.setAttribute('aria-expanded', String(isGoalExpanded))
    elements.goalPanel.hidden = !isGoalExpanded
    setGoalInputsState(isGoalExpanded)

    if (isGoalExpanded && elements.goalTypeInput && typeof elements.goalTypeInput.focus === 'function') {
      elements.goalTypeInput.focus()
    }

    if (!isGoalExpanded && elements.goalToggleButton && typeof elements.goalToggleButton.focus === 'function') {
      elements.goalToggleButton.focus()
    }
  }

  function bindEvents() {
    if (!isInitialized) {
      throw new Error('createSkillFormView().init() must be called before bindEvents().')
    }

    if (isEventsBound) {
      return
    }

    const handleSubmit = (event) => {
      event.preventDefault()

      const data =
        elements.mode === 'goal_setup'
          ? {
              goalType: elements.goalTypeInput.value,
              targetHours: elements.targetHoursInput.value,
            }
          : {
              name: elements.nameInput.value.trim(),
              color: elements.colorInput.value,
              ...(isGoalExpanded
                ? {
                    goalType: elements.goalTypeInput.value,
                    targetHours: elements.targetHoursInput.value,
                  }
                : {}),
            }

      if (typeof skillFormView.onSubmit === 'function') {
        skillFormView.onSubmit(data)
      }

      elements.feedbackEl.textContent =
        elements.mode === 'goal_setup' ? 'Goal updated' : `Skill added: ${data.name}`
      elements.form.reset()
    }

    elements.form.addEventListener('submit', handleSubmit)

    if (elements.goalToggleButton && elements.goalPanel) {
      setGoalInputsState(isGoalExpanded)

      const handleGoalToggle = () => {
        syncGoalState(!isGoalExpanded)
      }

      elements.goalToggleButton.addEventListener('click', handleGoalToggle)
    }

    isEventsBound = true
  }

  const skillFormView = {
    onSubmit: null,
    render,
    init,
    bindEvents,
  }

  return skillFormView
}
