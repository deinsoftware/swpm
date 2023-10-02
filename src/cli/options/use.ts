import { availablePackages } from '../../packages/list.js'

const use = {
  alias: 'u',
  describe: 'use a package manager',
  choices: availablePackages(),
  conflicts: ['pin', 'unpin']
} as const

export default use
