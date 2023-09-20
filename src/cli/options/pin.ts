import { availablePackages } from '../../packages/list.js'

const pin = {
  alias: 'p',
  describe: 'pin a package manager',
  choices: availablePackages(),
  conflicts: ['use']
} as const

export default pin
