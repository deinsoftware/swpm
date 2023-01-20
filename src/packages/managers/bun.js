const bun = {
  cmd: 'bun',
  exc: 'bunx',
  color: '#fbf0df',
  url: 'https://bun.sh/',
  version: '',
  lockFile: 'bun.lockb',
  logFile: '',
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
    '--frozen-lockfile': '--no-save',
    '-F': '--no-save',
    '--package-lock': ['', -1],
    '-P': ['', -1]
  }
}

export default bun
