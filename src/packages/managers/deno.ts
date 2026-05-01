import type { PackageConfiguration } from '../packages.types.js'

const deno: PackageConfiguration = {
  cmd: 'deno',
  exc: 'deno run',
  color: '#ffffff',
  url: 'https://deno.com/',
  semver: '>=2.0.0',
  lockFiles: ['deno.lock'],
  modulesPath: ['node_modules'],
  modulesFile: ['deno.json', 'deno.jsonc'],
  logFile: '',
  install: 'deno install -g npm:swpm',
  cmds: {
    remove: 'remove',
    r: 'remove',
    rm: 'remove',
    un: 'remove',
    up: ['outdated', '--update'],
    ud: ['outdated', '--update'],
    upgrade: 'add',
    ug: 'add',
    interactive: ['', -1],
    run: 'task',
    test: 'test',
    init: 'init',
    create: 'init',
    build: ['', -1],
    publish: 'publish',
    outdated: 'outdated'
  },
  args: {
    '--frozen': '--frozen',
    '-F': '--frozen',
    '--package-lock': '--no-lock',
    '-P': '--no-lock',
    '--save-dev': '--dev',
    '-D': '--dev',
    '--save-optional': '--optional',
    '-O': '--optional',
    '--save-peer': '--peer',
    '--save-exact': ['', -1],
    '-E': ['', -1],
    '--global': '-g',
    '-g': '-g',
    '--latest': ['', -1],
    '-L': ['', -1]
  }
}

export default deno
