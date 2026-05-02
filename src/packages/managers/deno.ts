import type { PackageConfiguration } from '../packages.types.js'

const deno: PackageConfiguration = {
  cmd: 'deno',
  exc: 'deno run',
  color: '#ffffff',
  url: 'https://deno.com/',
  semver: '>=2.0.0',
  lockFiles: ['deno.lock'],
  modulesPath: ['node_modules'],
  modulesFile: [],
  logFile: '',
  install: 'deno install -g npm:swpm',
  cmds: {
    remove: 'remove',
    r: 'remove',
    rm: 'remove',
    uninstall: 'remove',
    un: 'remove',
    update: ['outdated', '--update'],
    up: ['outdated', '--update'],
    ud: ['outdated', '--update'],
    upgrade: ['outdated', '--update'],
    ug: ['outdated', '--update'],
    interactive: ['', -1],
    run: 'task',
    create: 'init'
  },
  args: {
    '--package-lock': '--no-lock',
    '-P': '--no-lock',
    '--save-dev': '--dev',
    '-D': '--dev',
    '--save-optional': '--optional',
    '-O': '--optional',
    '--save-peer': ['', -1],
    '--save-exact': ['', -1],
    '-E': ['', -1],
    '--global': ['', -1],
    '-g': ['', -1],
    '--latest': ['<package>@latest', 1],
    '-L': ['<package>@latest', 1]
  }
}

export default deno
