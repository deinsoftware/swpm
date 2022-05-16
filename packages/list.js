import npm from './managers/npm.js'
import yarn from './managers/yarn.js'
import pnpm from './managers/pnpm.js'

const list = [
  npm,
  yarn,
  pnpm
]

export const packageNameList = () => {
  return list.map((pkg) => pkg.cmd)
}

export default list
