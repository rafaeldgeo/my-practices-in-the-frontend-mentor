export function createHeaderView() {
  let elements = {}
  let isInitialized = false
  let isEventsBound = false

  function init() {
    const root = document.querySelector('.header')
    const addSkillButton = root?.querySelector('.header__add-skill')

    elements = {
      root,
      addSkillButton,
    }

    const missingMountPoints = Object.entries(elements)
      .filter(([, element]) => !element)
      .map(([key]) => key)

    if (missingMountPoints.length > 0) {
      throw new Error(`Missing header mount points: ${missingMountPoints.join(', ')}`)
    }

    isInitialized = true
  }

  function bindEvents() {
    if (!isInitialized) {
      throw new Error('createHeaderView().init() must be called before bindEvents().')
    }

    if (isEventsBound) {
      return
    }

    elements.addSkillButton.addEventListener('click', () => {
      if (typeof headerView.onAddSkillClick === 'function') {
        headerView.onAddSkillClick()
      }
    })

    isEventsBound = true
  }

  const headerView = {
    onAddSkillClick: null,
    init,
    bindEvents,
  }

  return headerView
}
