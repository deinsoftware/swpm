const yarn = {
  cmd: 'yarn',
  color: '#3a90b8',
  url: 'https://yarnpkg.com/',
  version: '',
  lockFile: 'yarn.lock',
  logFile: 'yarn-error.log',
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
    '--global': ['global', 1],
    '-g': ['global', 1],
    '--interactive': {
      upgrade: ''
    },
    '--save-dev': '--dev',
    '--save-optional': '--optional',
    '--save-peer': '--peer',
    '--save-exact': '--exact'
  }
}

export default yarn
