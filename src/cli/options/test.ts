import { availablePackages } from '../../packages/list'

const test = {
  alias: 't',
  describe: 'test command (without running)',
  choices: availablePackages(),
  conflicts: ['pin', 'use']
} as const

export default test
