import type { PackageConfiguration } from '../packages.types.js'

const yarn: PackageConfiguration = {
  cmd: 'yarn',
  exc: 'yarn dlx',
  color: '#3a90b8',
  url: 'https://yarnpkg.com/',
  semver: '1',
  version: 'classic',
  lockFiles: ['yarn.lock', '.yarnrc'],
  modulesPath: [],
  modulesFile: [],
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
    update: 'upgrade',
    up: 'upgrade',
    ud: 'upgrade',
    upgrade: ['upgrade', '--latest'],
    ug: ['upgrade', '--latest']
  },
  args: {
    '--frozen': '--frozen-lockfile',
    '-F': '--frozen-lockfile',
    '--global': ['global', 0],
    '-g': ['global', 0],
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

export default yarn
