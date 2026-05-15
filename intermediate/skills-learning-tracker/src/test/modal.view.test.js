import { createModalView } from '../view/modal/modal.view.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

function createFocusableElement(name) {
  return {
    name,
    focused: false,
    focus() {
      this.focused = true
      document.activeElement = this
    },
  }
}

const trigger = createFocusableElement('trigger')
const firstButton = createFocusableElement('first')
const lastButton = createFocusableElement('last')
const container = {
  focusCalled: false,
  attributes: {},
  focus() {
    this.focusCalled = true
    document.activeElement = this
  },
  setAttribute(name, value) {
    this.attributes[name] = String(value)
  },
  querySelectorAll() {
    return [firstButton, lastButton]
  },
}
const dialogChild = {
  getAttribute(name) {
    if (name === 'aria-labelledby') {
      return 'skill-form-title'
    }

    if (name === 'aria-describedby') {
      return 'skill-form-description'
    }

    return null
  },
}
const content = {
  innerHTML: '',
  firstElementChild: dialogChild,
}
const overlay = {
  listeners: {},
  addEventListener(type, callback) {
    this.listeners[type] = callback
  },
}
const modal = {
  hidden: true,
  querySelector(selector) {
    switch (selector) {
      case '.modal__overlay':
        return overlay
      case '.modal__container':
        return container
      case '.modal__content':
        return content
      default:
        return null
    }
  },
}
const root = {
  querySelector(selector) {
    return selector === '.modal' ? modal : null
  },
}

const documentListeners = {}
const previousDocument = globalThis.document

globalThis.document = {
  activeElement: trigger,
  getElementById(id) {
    return id === 'modal-root' ? root : null
  },
  addEventListener(type, callback) {
    documentListeners[type] = callback
  },
}

try {
  const view = createModalView()

  view.init()
  view.bindEvents()
  view.render('<div class="dialog-body">Content</div>')
  view.open()

  assertEqual('modal content rendered', content.innerHTML, '<div class="dialog-body">Content</div>')
  assertEqual('modal mirrors the dialog title id', container.attributes['aria-labelledby'], 'skill-form-title')
  assertEqual('modal mirrors the dialog description id', container.attributes['aria-describedby'], 'skill-form-description')
  assertEqual('modal opens', modal.hidden, false)
  assertEqual('modal focuses first focusable element', firstButton.focused, true)

  document.activeElement = lastButton
  const tabEvent = {
    key: 'Tab',
    shiftKey: false,
    prevented: false,
    preventDefault() {
      this.prevented = true
    },
  }

  documentListeners.keydown(tabEvent)

  assertEqual('tab trap prevents default', tabEvent.prevented, true)
  assertEqual('tab trap returns to first focusable element', document.activeElement, firstButton)

  view.close()

  assertEqual('modal closes', modal.hidden, true)
  assertEqual('focus returns to trigger', document.activeElement, trigger)

  console.log('modal view tests finished')
} finally {
  globalThis.document = previousDocument
}
