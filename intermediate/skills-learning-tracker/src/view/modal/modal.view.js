import { createModalContentTemplate } from './modal.template.js'

export function createModalView() {
  let elements = {}
  let isInitialized = false
  let isEventsBound = false
  let isOpen = false
  let previousFocus = null

  function getFocusableElements() {
    if (!elements.container) {
      return []
    }

    return Array.from(
      elements.container.querySelectorAll(
        [
          'button:not([disabled])',
          '[href]',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ].join(', ')
      )
    )
  }

  function focusModalContent() {
    const focusableElements = getFocusableElements()
    const focusTarget = focusableElements[0] ?? elements.container

    if (focusTarget && typeof focusTarget.focus === 'function') {
      focusTarget.focus()
    }
  }

  function syncDialogAccessibility() {
    const dialogContent = elements.content?.firstElementChild

    if (!dialogContent || typeof elements.container?.setAttribute !== 'function') {
      return
    }

    const labelledBy = typeof dialogContent.getAttribute === 'function'
      ? dialogContent.getAttribute('aria-labelledby')
      : ''
    const describedBy = typeof dialogContent.getAttribute === 'function'
      ? dialogContent.getAttribute('aria-describedby')
      : ''

    if (typeof labelledBy === 'string' && labelledBy.trim() !== '') {
      elements.container.setAttribute('aria-labelledby', labelledBy.trim())
    } else if (typeof elements.container.removeAttribute === 'function') {
      elements.container.removeAttribute('aria-labelledby')
    }

    if (typeof describedBy === 'string' && describedBy.trim() !== '') {
      elements.container.setAttribute('aria-describedby', describedBy.trim())
    } else if (typeof elements.container.removeAttribute === 'function') {
      elements.container.removeAttribute('aria-describedby')
    }
  }

  function restoreFocus() {
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus()
    }

    previousFocus = null
  }

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
    syncDialogAccessibility()
  }

  function open() {
    if (!isInitialized) {
      throw new Error('createModalView().init() must be called before open().')
    }

    const activeElement = document.activeElement
    previousFocus =
      activeElement && typeof activeElement.focus === 'function' ? activeElement : null
    elements.modal.hidden = false
    isOpen = true
    focusModalContent()
  }

  function close() {
    if (!isInitialized) {
      throw new Error('createModalView().init() must be called before close().')
    }

    elements.modal.hidden = true
    isOpen = false
    restoreFocus()
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
      if (!isOpen) {
        return
      }

      if (event.key === 'Escape') {
        if (typeof onClose === 'function') {
          onClose()
          return
        }

        close()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements()

      if (focusableElements.length === 0) {
        event.preventDefault()
        elements.container.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
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
    focus: focusModalContent,
  }
}
