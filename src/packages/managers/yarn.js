const yarn = {
  cmd: 'yarn',
  color: '#3a90b8',
  url: 'https://yarnpkg.com/',
  version: '',
  lockFile: 'yarn.lock',
  cmds: {
    i: 'install'
  },
  args: {
    '--global': ['global', 1],
    '-g': ['global', 1],
    '--save-dev': '--dev',
    '--save-exact': '--exact',
    '-L': '--latest'
  }
}

export default yarn
