import { createSkillPickerTemplate } from './skill-picker.template.js'

export function createSkillPickerView() {
  let elements = {}
  let isInitialized = false
  let isEventsBound = false

  function render({ skills, emptyState } = {}) {
    isInitialized = false
    isEventsBound = false

    return createSkillPickerTemplate({ skills, emptyState })
  }

  function init() {
    const picker = document.querySelector('.skill-picker')
    const list = picker?.querySelector('.skill-picker__list')
    const options = Array.from(picker?.querySelectorAll('.skill-picker__option') ?? [])
    const emptyAction = picker?.querySelector('.skill-picker__empty-action')

    elements = {
      picker,
      list,
      options,
      emptyAction,
    }

    const missingMountPoints = []

    if (!picker) {
      missingMountPoints.push('picker')
    }

    if (list && options.length === 0) {
      missingMountPoints.push('options')
    }

    if (!list && !emptyAction) {
      missingMountPoints.push('emptyState')
    }

    if (missingMountPoints.length > 0) {
      throw new Error(`Missing skill picker mount points: ${missingMountPoints.join(', ')}`)
    }

    isInitialized = true
  }

  function bindEvents() {
    if (!isInitialized) {
      throw new Error('createSkillPickerView().init() must be called before bindEvents().')
    }

    if (isEventsBound) {
      return
    }

    const handleClick = (event) => {
      const target = event.target
      const button =
        target && typeof target.closest === 'function'
          ? target.closest('.skill-picker__option')
          : null

      if (!button || !elements.picker.contains(button)) {
        return
      }

      const skillId = button.dataset.skillId

      if (typeof skillId !== 'string' || skillId.trim() === '') {
        return
      }

      if (typeof skillPickerView.onSelect === 'function') {
        skillPickerView.onSelect(skillId)
      }
    }

    const handleEmptyActionClick = () => {
      if (typeof skillPickerView.onCreateSkill === 'function') {
        skillPickerView.onCreateSkill()
      }
    }

    elements.picker.addEventListener('click', handleClick)
    if (elements.emptyAction) {
      elements.emptyAction.addEventListener('click', handleEmptyActionClick)
    }
    isEventsBound = true
  }

  const skillPickerView = {
    onSelect: null,
    onCreateSkill: null,
    render,
    init,
    bindEvents,
  }

  return skillPickerView
}
