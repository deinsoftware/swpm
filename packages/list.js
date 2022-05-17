import npm from './managers/npm.js'
import yarn from './managers/yarn.js'
import pnpm from './managers/pnpm.js'

const list = [
  npm,
  yarn,
  pnpm
]

export const availablePackages = () => {
  return list.map((pkg) => pkg.cmd)
}

export const packageExists = (pkg) => {
  return availablePackages().includes(pkg)
}

export const getPackageConfiguration = async (pkg) => {
  const config = await import(`./managers/${pkg}.js`)
  return config.default
}

export default list
