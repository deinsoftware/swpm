import { PackageConfiguration } from '../packages.types.js'

const yarnBerry: PackageConfiguration = {
  cmd: 'yarn@berry',
  exc: 'yarn dlx',
  color: '#3a90b8',
  url: 'https://yarnpkg.com/',
  semver: '>=2',
  version: 'berry',
  lockFiles: ['yarn.lock', '.yarnrc.yml'],
  modulesPath: ['.yarn/cache', '.yarn/unplugged'],
  modulesFile: ['.pnp.cjs', '.pnp.loader.mjs'],
  logFile: 'yarn-error.log',
  install: 'yarn global add swpm',
  cmds: {
    i: 'install',
    a: 'add',
    r: 'remove',
    rm: 'remove',
    un: 'remove',
    interactive: 'upgrade-interactive',
    ui: 'upgrade-interactive',
    update: 'semver up',
    up: 'semver up',
    ud: 'semver up',
    upgrade: 'up',
    ug: 'up',
    publish: 'npm publish',
    outdated: 'upgrade-interactive'
  },
  args: {
    '--frozen': '--immutable',
    '-F': '--immutable',
    '--global': ['global', 1],
    '-g': ['global', 1],
    '--interactive': {
      upgrade: ''
    },
    '--save-dev': '--dev',
    '--save-optional': '--optional',
    '--save-peer': '--peer',
    '--save-exact': '--exact',
    '--package-lock': '--no-lockfile',
    '-P': '--no-lockfile'
  }
}

export default yarnBerry
