import npm from './managers/npm.js'
import yarn from './managers/yarn.js'
import pnpm from './managers/pnpm.js'

const list = [
  npm,
  yarn,
  pnpm
]

export const availablePackages = () => {
  return list.map(({ cmd }) => cmd)
}

export const packageExists = (cmd) => {
  return availablePackages().includes(cmd)
}

export const getPackageConfiguration = async ({ cmd }) => {
  const config = await import(`./managers/${cmd}.js`)
  return config.default ?? {}
}

export default list
