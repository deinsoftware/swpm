import { ProvidersConfiguration } from '../providers.types.js'

const gitLab: ProvidersConfiguration = {
  id: 'gitlab',
  paths: {
    pull: '-/merge_requests',
    branch: '-/tree',
    ci: '-/pipelines',
    diff: '-/compare'
  }
}

export default gitLab
