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
    un: 'remove'
  },
  args: {
    '--global': ['global', 1],
    '-g': ['global', 1],
    '--save-dev': '--dev',
    '--save-optional': '--optional',
    '--save-peer': '--peer',
    '--save-exact': '--exact',
    '-L': '--latest'
  }
}

export default yarn
