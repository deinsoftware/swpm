import { PackageConfiguration } from '../packages.types.js'

const pnpm: PackageConfiguration = {
  cmd: 'pnpm',
  exc: 'pnpm dlx',
  color: '#f7ad24',
  url: 'https://pnpm.io/',
  semver: '',
  lockFiles: ['pnpm-lock.yaml'],
  modulesPath: [],
  modulesFile: [],
  logFile: 'pnpm-debug.log',
  install: 'pnpm install swpm --global',
  cmds: {
    remove: 'uninstall',
    r: 'uninstall',
    rm: 'uninstall',
    un: 'uninstall',
    up: 'update',
    ud: 'update',
    upgrade: ['update', '--latest'],
    ug: ['update', '--latest'],
    interactive: ['upgrade', '--interactive'],
    ui: ['upgrade', '--interactive']
  },
  args: {
    '--frozen': '--frozen-lockfile',
    '--package-lock': ['', -1],
    '-P': ['', -1]
  }
}

export default pnpm
