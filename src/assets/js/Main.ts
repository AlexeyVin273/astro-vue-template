import Core from './core/Core'

const initApp = async () => {
  const core = Core.getInstance()
  await core.init()
}

document.addEventListener('DOMContentLoaded', initApp)
