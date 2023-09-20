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
    '--save-dev': '-d',
    '-D': '-d',
    '--frozen': '--frozen-lockfile',
    '-F': '--frozen-lockfile',
    '--package-lock': ['', -1],
    '-P': ['', -1]
  }
}

export default bun
