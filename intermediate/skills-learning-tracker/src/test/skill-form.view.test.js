import { createSkillFormView } from '../view/skill/skill-form.view.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

function createMockInput(value = '') {
  return {
    value,
    disabled: false,
    required: false,
    focused: false,
    focus() {
      this.focused = true
      document.activeElement = this
    },
  }
}

function createMockButton() {
  const listeners = {}

  return {
    listeners,
    attributes: {},
    focused: false,
    addEventListener(type, callback) {
      listeners[type] = callback
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value)
    },
    getAttribute(name) {
      return this.attributes[name]
    },
    click() {
      const handler = listeners.click

      if (typeof handler === 'function') {
        handler({
          preventDefault() {},
        })
      }
    },
    focus() {
      this.focused = true
      document.activeElement = this
    },
  }
}

function createMockPanel() {
  return {
    hidden: true,
  }
}

function createFormMock(mode, fields) {
  const listeners = {}

  return {
    dataset: { mode },
    listeners,
    resetCalled: false,
    addEventListener(type, callback) {
      listeners[type] = callback
    },
    querySelector(selector) {
      return fields[selector] ?? null
    },
    reset() {
      this.resetCalled = true
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
  const createView = createSkillFormView()
  const createGoalToggle = createMockButton()
  const createGoalPanel = createMockPanel()
  const createGoalType = createMockInput('weekly')
  const createTargetHours = createMockInput('8')
  const createForm = createFormMock('create', {
    'input[name="name"]': createMockInput('Japanese'),
    'input[name="color"]': createMockInput('#22c55e'),
    '.skill-form__goal-toggle': createGoalToggle,
    '.skill-form__goal-panel': createGoalPanel,
    'select[name="goalType"]': createGoalType,
    'input[name="targetHours"]': createTargetHours,
  })
  const createFeedback = { textContent: '' }

  globalThis.document = {
    activeElement: null,
    querySelector(selector) {
      switch (selector) {
        case '.skill-form':
          return createForm
        case '.skill-form__feedback':
          return createFeedback
        default:
          return null
      }
    },
  }

  const createHtml = createView.render()

  assertEqual('create mode exposes accessibility description', createHtml.includes('aria-describedby="skill-form-description"'), true)
  assertEqual('create mode title', createHtml.includes('Add a Skill'), true)
  assertEqual('create mode exposes optional goal toggle', createHtml.includes('Optional goal'), true)
  assertEqual('create mode omits goal helper copy', createHtml.includes('Goals help track long-term progress. You can add one later.'), false)

  let createPayload = null

  createView.onSubmit = (data) => {
    createPayload = data
  }

  createView.init()
  createView.bindEvents()

  assertEqual('create mode keeps goal collapsed by default', createGoalPanel.hidden, true)
  assertEqual('create mode disables goal fields until expanded', createGoalType.disabled, true)

  createForm.dispatchSubmit()

  assertEqual('create mode submit payload', createPayload, {
    name: 'Japanese',
    color: '#22c55e',
  })
  assertEqual('create mode clears the form', createForm.resetCalled, true)
  assertEqual('create mode feedback is updated', createFeedback.textContent, 'Skill added: Japanese')

  const goalView = createSkillFormView()
  const goalTypeInput = createMockInput('weekly')
  const targetHoursInput = createMockInput('12')
  const goalForm = createFormMock('goal_setup', {
    'select[name="goalType"]': goalTypeInput,
    'input[name="targetHours"]': targetHoursInput,
  })
  const goalFeedback = { textContent: '' }

  globalThis.document = {
    activeElement: null,
    querySelector(selector) {
      switch (selector) {
        case '.skill-form':
          return goalForm
        case '.skill-form__feedback':
          return goalFeedback
        default:
          return null
      }
    },
  }

  const goalHtml = goalView.render({
    mode: 'goal_setup',
    skill: {
      id: 'skill-1',
      name: 'Spanish',
      color: '#059669',
      goal: null,
    },
  })

  assertEqual('goal mode title', goalHtml.includes('Set a goal for Spanish'), true)
  assertEqual('goal mode exposes goal fields', goalHtml.includes('name="goalType"'), true)
  assertEqual('goal mode exposes target hours field', goalHtml.includes('name="targetHours"'), true)
  assertEqual('goal mode marks goal fields as required', goalHtml.includes('name="goalType" required'), true)

  let goalPayload = null

  goalView.onSubmit = (data) => {
    goalPayload = data
  }

  goalView.init()
  goalView.bindEvents()

  goalForm.dispatchSubmit()

  assertEqual('goal mode submit payload', goalPayload, {
    goalType: 'weekly',
    targetHours: '12',
  })
  assertEqual('goal mode clears the form', goalForm.resetCalled, true)
  assertEqual('goal mode feedback is updated', goalFeedback.textContent, 'Goal updated')

  const optionalGoalView = createSkillFormView()
  const optionalGoalToggle = createMockButton()
  const optionalGoalPanel = createMockPanel()
  const optionalGoalType = createMockInput('total')
  const optionalTargetHours = createMockInput('10')
  const optionalGoalForm = createFormMock('create', {
    'input[name="name"]': createMockInput('Spanish'),
    'input[name="color"]': createMockInput('#f59e0b'),
    '.skill-form__goal-toggle': optionalGoalToggle,
    '.skill-form__goal-panel': optionalGoalPanel,
    'select[name="goalType"]': optionalGoalType,
    'input[name="targetHours"]': optionalTargetHours,
  })
  const optionalGoalFeedback = { textContent: '' }

  globalThis.document = {
    activeElement: null,
    querySelector(selector) {
      switch (selector) {
        case '.skill-form':
          return optionalGoalForm
        case '.skill-form__feedback':
          return optionalGoalFeedback
        default:
          return null
      }
    },
  }

  const optionalGoalHtml = optionalGoalView.render()

  assertEqual('create mode keeps goal panel hidden in markup', optionalGoalHtml.includes('hidden'), true)

  let optionalGoalPayload = null

  optionalGoalView.onSubmit = (data) => {
    optionalGoalPayload = data
  }

  optionalGoalView.init()
  optionalGoalView.bindEvents()
  optionalGoalToggle.click()
  optionalGoalForm.dispatchSubmit()

  assertEqual('optional goal submit payload includes goal fields', optionalGoalPayload, {
    name: 'Spanish',
    color: '#f59e0b',
    goalType: 'total',
    targetHours: '10',
  })

  console.log('skill form view tests finished')
} finally {
  globalThis.document = previousDocument
}
