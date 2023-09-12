import { availablePackages } from 'packages/list'

const use = {
  alias: 'u',
  describe: 'use a package manager',
  choices: availablePackages(),
  conflicts: ['pin']
}

export default use
