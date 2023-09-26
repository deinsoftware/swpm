import { ProvidersConfiguration } from '../providers.types.js'

const bitBucket: ProvidersConfiguration = {
  id: 'bitbucket',
  paths: {
    pull: 'pull-requests',
    branch: 'src',
    ci: 'pipelines',
    diff: 'compare'
  }
}

export default bitBucket
