import { createSkillPickerView } from '../view/skill/skill-picker.view.js'

function assertEqual(description, actual, expected) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected)

  if (isEqual) {
    console.log(`✅ ${description}`)
    return
  }

  console.error(`❌ ${description}`, { actual, expected })
}

function createMockElement(tag = 'div') {
  const listeners = {}

  return {
    tag,
    innerHTML: '',
    hidden: false,
    listeners,
    addEventListener(type, callback) {
      listeners[type] = callback
    },
    querySelector(selector) {
      return this.children?.[selector] ?? null
    },
    querySelectorAll(selector) {
      return this.all?.[selector] ?? []
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

const picker = createMockElement('section')
const list = createMockElement('ul')
const option = createMockElement('button')
const emptyAction = createMockElement('button')
list.children = {}
list.all = { '.skill-picker__option': [option] }
picker.children = {
  '.skill-picker__list': list,
  '.skill-picker__empty-action': null,
}
picker.all = {
  '.skill-picker__option': [option],
}
option.dataset = { skillId: 'skill-1' }
emptyAction.dataset = {}

const previousDocument = globalThis.document

globalThis.document = {
  querySelector(selector) {
    return selector === '.skill-picker' ? picker : null
  },
}

try {
  const view = createSkillPickerView()
  let selectedSkillId = null
  let createSkillCalled = false

  const html = view.render({
    skills: [
      {
        id: 'skill-1',
        name: 'Spanish',
        progressLabel: '35.6% completed',
        sortRank: 0,
      },
    ],
  })

  assertEqual('picker template includes progress label', html.includes('35.6% completed'), true)
  assertEqual('picker template includes content wrapper', html.includes('skill-picker__content'), true)
  assertEqual('picker template exposes accessible description', html.includes('skill-picker__description'), true)
  assertEqual('picker button uses labelled-by semantics', html.includes('aria-labelledby="skill-picker-item-skill-1-name"'), true)
  assertEqual('picker button uses described-by semantics', html.includes('aria-describedby="skill-picker-item-skill-1-progress"'), true)

  view.onSelect = (skillId) => {
    selectedSkillId = skillId
  }
  view.onCreateSkill = () => {
    createSkillCalled = true
  }

  view.init()
  view.bindEvents()

  picker.dispatchEvent({
    type: 'click',
    target: {
      closest() {
        return option
      },
    },
  })

  assertEqual('skill option click forwards skill id', selectedSkillId, 'skill-1')

  const emptyHtml = view.render({
    skills: [],
    emptyState: {
      title: 'No skills available yet',
      description: 'Add your first skill to start picking a practice target.',
      actionLabel: 'Create your first skill',
    },
  })

  assertEqual('empty picker template uses live status region', emptyHtml.includes('role="status"'), true)
  assertEqual('empty picker template includes copy wrapper', emptyHtml.includes('skill-picker__empty-copy'), true)

  picker.children['.skill-picker__list'] = null
  picker.children['.skill-picker__empty-action'] = emptyAction
  picker.all['.skill-picker__option'] = []

  globalThis.document.querySelector = (selector) => (selector === '.skill-picker' ? picker : null)
  view.init()
  view.bindEvents()

  emptyAction.dispatchEvent({
    type: 'click',
    target: emptyAction,
  })

  assertEqual('empty state action forwards create skill intent', createSkillCalled, true)

  console.log('skill picker view tests finished')
} finally {
  globalThis.document = previousDocument
}
