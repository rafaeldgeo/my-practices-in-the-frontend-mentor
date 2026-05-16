import { createSessionTemplate } from './session.template.js'

function readPresetDuration(button) {
  if (!button || typeof button !== 'object') {
    return null
  }

  const durationValue = typeof button.dataset?.duration === 'string' ? button.dataset.duration.trim() : ''

  if (durationValue === '' || durationValue === 'custom') {
    return null
  }

  const duration = Number(durationValue)

  return Number.isFinite(duration) && duration > 0 ? duration : null
}

export function createSessionView() {
  let elements = {}
  let isInitialized = false
  let isEventsBound = false
  let state = {
    skillId: '',
    skillName: '',
    selectedDuration: null,
    isCustomOpen: false,
    feedbackMessage: '',
  }

  function render({ skillId, skillName, feedbackMessage = '' } = {}) {
    state.skillId = typeof skillId === 'string' ? skillId : ''
    state.skillName = typeof skillName === 'string' ? skillName : ''
    state.selectedDuration = null
    state.isCustomOpen = false
    state.feedbackMessage = typeof feedbackMessage === 'string' ? feedbackMessage : ''
    isInitialized = false
    isEventsBound = false
    return createSessionTemplate({
      skillId: state.skillId,
      skillName: state.skillName,
      feedbackMessage: state.feedbackMessage,
    })
  }

  function init() {
    const form = document.querySelector('.session-form')
    const presetsGroup = form?.querySelector('.session-form__presets')
    const presetButtons = Array.from(form?.querySelectorAll('.session-form__preset') ?? [])
    const customContainer = form?.querySelector('.session-form__custom')
    const customInput = form?.querySelector('.session-form__input')
    const feedbackEl = form?.querySelector('.session-form__feedback')
    const closeButtons = Array.from(form?.querySelectorAll('[data-session-close]') ?? [])

    elements = {
      form,
      presetsGroup,
      presetButtons,
      customContainer,
      customInput,
      feedbackEl,
      closeButtons,
    }

    const missingMountPoints = Object.entries(elements)
      .filter(([, element]) => {
        if (Array.isArray(element)) {
          return element.length === 0
        }

        return !element
      })
      .map(([key]) => key)

    if (missingMountPoints.length > 0) {
      throw new Error(`Missing session view mount points: ${missingMountPoints.join(', ')}`)
    }

    syncVisualState()
    syncFeedback()
    isInitialized = true
  }

  function setPresetActive(activeButton) {
    elements.presetButtons.forEach((button) => {
      button.classList.toggle('is-active', button === activeButton)
      button.setAttribute('aria-pressed', button === activeButton ? 'true' : 'false')
    })
  }

  function getCustomButton() {
    return (
      elements.presetButtons.find((button) => {
        const duration = readPresetDuration(button)
        return duration === null && button?.dataset?.duration === 'custom'
      }) ?? null
    )
  }

  function openCustomMode() {
    state.selectedDuration = null
    state.isCustomOpen = true
    clearFeedbackMessage()

    setPresetActive(getCustomButton())
    elements.customContainer.hidden = false
    elements.customInput.value = ''
    elements.customInput.focus()
  }

  function selectPreset(button) {
    const duration = readPresetDuration(button)

    if (duration === null) {
      openCustomMode()
      return
    }

    state.selectedDuration = duration
    state.isCustomOpen = false
    clearFeedbackMessage()

    setPresetActive(button)
    elements.customContainer.hidden = true
    elements.customInput.value = ''
  }

  function syncVisualState() {
    const activePreset = elements.presetButtons.find((button) => {
      const duration = readPresetDuration(button)
      return duration !== null && duration === state.selectedDuration
    })

    setPresetActive(state.isCustomOpen ? getCustomButton() : activePreset ?? null)
    elements.customContainer.hidden = !state.isCustomOpen
  }

  function syncFeedback() {
    if (!elements.feedbackEl) {
      return
    }

    const hasMessage = typeof state.feedbackMessage === 'string' && state.feedbackMessage.trim() !== ''

    elements.feedbackEl.hidden = !hasMessage
    elements.feedbackEl.textContent = hasMessage ? state.feedbackMessage.trim() : ''
  }

  function setFeedbackMessage(message = '') {
    state.feedbackMessage = typeof message === 'string' ? message : ''

    if (!elements.feedbackEl) {
      return
    }

    syncFeedback()

    if (typeof elements.feedbackEl.focus === 'function' && state.feedbackMessage.trim() !== '') {
      elements.feedbackEl.focus()
    }
  }

  function clearFeedbackMessage() {
    setFeedbackMessage('')
  }

  function bindEvents() {
    if (!isInitialized) {
      throw new Error('createSessionView().init() must be called before bindEvents().')
    }

    if (isEventsBound) {
      return
    }

    const handlePresetClick = (event) => {
      const button = event.target.closest('.session-form__preset')

      if (!button || !elements.presetsGroup.contains(button)) {
        return
      }

      selectPreset(button)
    }

    const handleSubmit = (event) => {
      event.preventDefault()

      const duration = state.isCustomOpen
        ? Number(elements.customInput.value)
        : state.selectedDuration

      if (typeof sessionView.onSubmit === 'function') {
        sessionView.onSubmit({
          skillId: state.skillId,
          duration,
        })
      }
    }

    const handleClose = () => {
      if (typeof sessionView.onClose === 'function') {
        sessionView.onClose()
      }
    }

    elements.presetsGroup.addEventListener('click', handlePresetClick)
    elements.form.addEventListener('submit', handleSubmit)
    elements.form.noValidate = true
    elements.closeButtons.forEach((button) => {
      button.addEventListener('click', handleClose)
    })

    isEventsBound = true
  }

  const sessionView = {
    onSubmit: null,
    onClose: null,
    render,
    init,
    bindEvents,
    setFeedbackMessage,
    clearFeedbackMessage,
  }

  return sessionView
}
