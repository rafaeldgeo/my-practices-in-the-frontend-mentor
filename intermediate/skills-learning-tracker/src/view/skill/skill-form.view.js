import { createSkillFormTemplate } from './skill.template.js'

/**
 * Skill form view.
 * Owns the form DOM lookup inside the rendered modal content and emits submit payloads.
 */
export function createSkillFormView() {
  let elements = {}
  let isInitialized = false
  let isEventsBound = false

  function render({ color } = {}) {
    isInitialized = false
    isEventsBound = false

    return createSkillFormTemplate({ color })
  }

  function init() {
    const form = document.querySelector('.skill-form')
    const feedbackEl = document.querySelector('.skill-form__feedback')
    const input = form?.querySelector('input[name="name"]')
    const colorInput = form?.querySelector('input[name="color"]')

    elements = {
      form,
      feedbackEl,
      input,
      colorInput,
    }

    const missingMountPoints = Object.entries(elements)
      .filter(([, element]) => !element)
      .map(([key]) => key)

    if (missingMountPoints.length > 0) {
      throw new Error(`Missing skill form mount points: ${missingMountPoints.join(', ')}`)
    }

    isInitialized = true
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

      const data = {
        name: elements.input.value.trim(),
        color: elements.colorInput.value,
      }

      if (typeof skillFormView.onSubmit === 'function') {
        skillFormView.onSubmit(data)
      }

      elements.feedbackEl.textContent = `✔ ${data.name} adicionada`
      elements.form.reset()
    }

    elements.form.addEventListener('submit', handleSubmit)

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
