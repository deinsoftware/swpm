const npm = {
  cmd: 'npm',
  color: '#e32e37',
  url: 'https://www.npmjs.com/',
  version: '',
  lockFile: 'package-lock.json',
  logFile: 'npm-debug.log',
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
    '--global': '--location=global',
    '-g': '--location=global',
    '--latest': ['', -1],
    '-L': ['', -1],
    '--local': '--location=local'
  }
}

export default npm
