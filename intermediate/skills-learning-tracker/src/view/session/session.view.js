import { createSessionTemplate } from './session.template.js'

function parsePresetDuration(label) {
  const text = String(label ?? '').trim()

  if (text.toLowerCase() === 'custom') {
    return null
  }

  const value = Number.parseInt(text, 10)

  return Number.isFinite(value) ? value : null
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
  }

  function render({ skillId, skillName } = {}) {
    state.skillId = typeof skillId === 'string' ? skillId : ''
    state.skillName = typeof skillName === 'string' ? skillName : ''
    state.selectedDuration = null
    state.isCustomOpen = false
    isInitialized = false
    isEventsBound = false
    return createSessionTemplate({
      skillId: state.skillId,
      skillName: state.skillName,
    })
  }

  function init() {
    const form = document.querySelector('.session-form')
    const presetsGroup = form?.querySelector('.session-form__presets')
    const presetButtons = Array.from(form?.querySelectorAll('.session-form__preset') ?? [])
    const customContainer = form?.querySelector('.session-form__custom')
    const customInput = form?.querySelector('.session-form__input')

    elements = {
      form,
      presetsGroup,
      presetButtons,
      customContainer,
      customInput,
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
    isInitialized = true
  }

  function setPresetActive(activeButton) {
    elements.presetButtons.forEach((button) => {
      button.classList.toggle('is-active', button === activeButton)
      button.setAttribute('aria-pressed', button === activeButton ? 'true' : 'false')
    })
  }

  function getCustomButton() {
    return elements.presetButtons.find((button) => parsePresetDuration(button.textContent) === null) ?? null
  }

  function openCustomMode() {
    state.selectedDuration = null
    state.isCustomOpen = true

    setPresetActive(getCustomButton())
    elements.customContainer.hidden = false
    elements.customInput.value = ''
    elements.customInput.focus()
  }

  function selectPreset(button) {
    const duration = parsePresetDuration(button.textContent)

    if (duration === null) {
      openCustomMode()
      return
    }

    state.selectedDuration = duration
    state.isCustomOpen = false

    setPresetActive(button)
    elements.customContainer.hidden = true
    elements.customInput.value = ''
  }

  function syncVisualState() {
    const activePreset = elements.presetButtons.find((button) => {
      const duration = parsePresetDuration(button.textContent)
      return duration !== null && duration === state.selectedDuration
    })

    setPresetActive(state.isCustomOpen ? getCustomButton() : activePreset ?? null)
    elements.customContainer.hidden = !state.isCustomOpen
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

    elements.presetsGroup.addEventListener('click', handlePresetClick)
    elements.form.addEventListener('submit', handleSubmit)

    isEventsBound = true
  }

  const sessionView = {
    onSubmit: null,
    render,
    init,
    bindEvents,
  }

  return sessionView
}
