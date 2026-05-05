export function createModalController({ view }) {
  let isOpen = false

  function open({ content = '' } = {}) {
    if (isOpen) {
      view.render(content)
      return
    }

    view.render(content)
    view.open()
    isOpen = true
  }

  function close() {
    if (!isOpen) {
      return
    }

    view.close()
    isOpen = false
  }

  return {
    open,
    close,
  }
}
