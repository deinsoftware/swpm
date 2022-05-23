const npm = {
  cmd: 'npm',
  color: '#e32e37',
  url: 'https://www.npmjs.com/',
  version: '',
  lockFile: 'package-lock.json',
  cmds: {
    remove: 'uninstall',
    r: 'uninstall',
    rm: 'uninstall',
    un: 'uninstall'
  },
  args: {
    '--frozen-lockfile': {
      i: 'ci',
      install: 'ci'
    },
    '--latest': ['', -1],
    '-L': ['', -1]
  }
}

export default npm
