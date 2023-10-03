import { PackageConfiguration } from '../packages.types.js'

const bun: PackageConfiguration = {
  cmd: 'bun',
  exc: 'bunx',
  color: '#fbf0df',
  url: 'https://bun.sh/',
  semver: '',
  lockFiles: ['bun.lockb'],
  modulesPath: [],
  modulesFile: [],
  logFile: '',
  install: 'bun install -g swpm',
  cmds: {
    i: 'install',
    a: 'add',
    r: 'remove',
    rm: 'remove',
    un: 'remove',
    upgrade: ['', -1],
    interactive: ['', -1]
  },
  args: {
    '--save-dev': '--dev',
    '-D': '-d',
    '--save-exact': '--exact',
    '-E': '--exact',
    '--save-optional': '--optional',
    '-O': '--optional',
    '--frozen': '--frozen-lockfile',
    '-F': '--frozen-lockfile',
    '--package-lock': '--no-save',
    '-P': '--no-save'
  }
}

export default bun
