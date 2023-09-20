import { availablePackages } from '../../packages/list.js'

const use = {
  alias: 'u',
  describe: 'use a package manager',
  choices: availablePackages(),
  conflicts: ['pin']
} as const

export default use
