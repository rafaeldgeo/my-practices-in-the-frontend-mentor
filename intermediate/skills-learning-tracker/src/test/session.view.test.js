import { createSessionView } from '../view/session/session.view.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

function createMockButton({ duration, label }) {
  const attributes = {}
  const listeners = {}

  return {
    dataset: {
      duration,
    },
    textContent: label,
    attributes,
    listeners,
    classList: {
      toggle() {},
    },
    addEventListener(type, callback) {
      listeners[type] = callback
    },
    setAttribute(name, value) {
      attributes[name] = String(value)
    },
    dispatchEvent(event) {
      const handler = listeners[event.type]

      if (typeof handler === 'function') {
        handler(event)
      }
    },
  }
}

function createMockInput(value = '') {
  return {
    value,
    hidden: false,
    focused: false,
    focus() {
      this.focused = true
      document.activeElement = this
    },
  }
}

function createMockFeedback() {
  return {
    hidden: true,
    textContent: '',
    focused: false,
    focus() {
      this.focused = true
      document.activeElement = this
    },
  }
}

function createMockPresetsGroup() {
  const listeners = {}

  return {
    listeners,
    addEventListener(type, callback) {
      listeners[type] = callback
    },
    contains() {
      return true
    },
    dispatchEvent(event) {
      const handler = listeners[event.type]

      if (typeof handler === 'function') {
        handler(event)
      }
    },
  }
}

function createMockForm(fields) {
  const listeners = {}

  return {
    noValidate: false,
    listeners,
    dataset: {},
    addEventListener(type, callback) {
      listeners[type] = callback
    },
    querySelector(selector) {
      return fields[selector] ?? null
    },
    querySelectorAll(selector) {
      return fields[selector] ?? []
    },
    contains() {
      return true
    },
    dispatchSubmit() {
      const handler = listeners.submit

      if (typeof handler === 'function') {
        handler({
          preventDefault() {},
        })
      }
    },
  }
}

const previousDocument = globalThis.document

try {
  const presetButton = createMockButton({ duration: '15', label: 'Quarter Hour' })
  const customButton = createMockButton({ duration: 'custom', label: 'Custom' })
  const closeButton = createMockButton({ duration: '', label: 'Close' })
  const customInput = createMockInput('25')
  const customContainer = { hidden: true }
  const feedbackEl = createMockFeedback()
  const presetsGroup = createMockPresetsGroup()
  const form = createMockForm({
    '.session-form__presets': presetsGroup,
    '.session-form__preset': [presetButton, customButton],
    '.session-form__custom': customContainer,
    '.session-form__input': customInput,
    '.session-form__feedback': feedbackEl,
    '[data-session-close]': [closeButton],
  })

  globalThis.document = {
    activeElement: null,
    querySelector(selector) {
      return selector === '.session-form' ? form : null
    },
  }

  const view = createSessionView()
  let submittedPayload = null
  let closeCalls = 0

  view.render({
    skillId: 'skill-1',
    skillName: 'Spanish',
  })

  view.onSubmit = (payload) => {
    submittedPayload = payload
  }
  view.onClose = () => {
    closeCalls += 1
  }

  view.init()
  view.bindEvents()

  const clickEvent = {
    target: {
      closest() {
        return presetButton
      },
    },
  }

  presetsGroup.dispatchEvent({
    type: 'click',
    target: clickEvent.target,
  })

  form.dispatchSubmit()

  assertEqual('preset duration is read from explicit data attributes', submittedPayload, {
    skillId: 'skill-1',
    duration: 15,
  })

  view.setFeedbackMessage('Pick a duration to log this practice.')

  assertEqual('feedback becomes visible', feedbackEl.hidden, false)
  assertEqual('feedback text is rendered', feedbackEl.textContent, 'Pick a duration to log this practice.')
  assertEqual('feedback receives focus', feedbackEl.focused, true)

  view.clearFeedbackMessage()

  assertEqual('feedback clears after correction', feedbackEl.hidden, true)
  assertEqual('custom preset opens custom mode', (() => {
    const customClick = {
      target: {
        closest() {
          return customButton
        },
      },
    }

    presetsGroup.dispatchEvent({
      type: 'click',
      target: customClick.target,
    })

    return customContainer.hidden
  })(), false)

  customInput.value = '25'
  form.dispatchSubmit()

  assertEqual('custom duration submits numeric value', submittedPayload.duration, 25)

  closeButton.dispatchEvent({ type: 'click' })

  assertEqual('close action notifies the host view', closeCalls, 1)

  console.log('session view tests finished')
} finally {
  globalThis.document = previousDocument
}
