import { ProvidersConfiguration } from '../providers.types.js'

const gitHub: ProvidersConfiguration = {
  id: 'github',
  paths: {
    pull: 'pulls',
    branch: 'tree',
    ci: 'actions',
    diff: 'compare'
  }
}

export default gitHub
