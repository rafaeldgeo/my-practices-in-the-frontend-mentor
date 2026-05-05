import { createModalContentTemplate } from './modal.template.js'

export function createModalView() {
  let elements = {}
  let isInitialized = false
  let isEventsBound = false
  let isOpen = false

  function init() {
    const root = document.getElementById('modal-root')
    const modal = root?.querySelector('.modal')
    const overlay = modal?.querySelector('.modal__overlay')
    const container = modal?.querySelector('.modal__container')
    const content = modal?.querySelector('.modal__content')

    elements = {
      root,
      modal,
      overlay,
      container,
      content
    }

    const missingMountPoints = Object.entries(elements)
      .filter(([, element]) => !element)
      .map(([key]) => key)

    if (missingMountPoints.length > 0) {
      throw new Error(`Missing modal mount points: ${missingMountPoints.join(', ')}`)
    }

    isInitialized = true
  }

  function render(content = '') {
    if (!isInitialized) {
      throw new Error('createModalView().init() must be called before render().')
    }

    elements.content.innerHTML = createModalContentTemplate(content)
  }

  function open() {
    if (!isInitialized) {
      throw new Error('createModalView().init() must be called before open().')
    }

    elements.modal.hidden = false
    isOpen = true
  }

  function close() {
    if (!isInitialized) {
      throw new Error('createModalView().init() must be called before close().')
    }

    elements.modal.hidden = true
    isOpen = false
  }

  function bindEvents({ onClose } = {}) {
    if (!isInitialized) {
      throw new Error('createModalView().init() must be called before bindEvents().')
    }

    if (isEventsBound) {
      return
    }

    const handleOverlayClick = () => {
      if (isOpen) {
        if (typeof onClose === 'function') {
          onClose()
          return
        }

        close()
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        if (typeof onClose === 'function') {
          onClose()
          return
        }

        close()
      }
    }

    elements.overlay.addEventListener('click', handleOverlayClick)
    document.addEventListener('keydown', handleKeyDown)

    isEventsBound = true
  }

  return {
    init,
    render,
    bindEvents,
    open,
    close,
  }
}
