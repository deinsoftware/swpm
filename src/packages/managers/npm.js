const npm = {
  cmd: 'npm',
  exc: 'npx',
  color: '#e32e37',
  url: 'https://www.npmjs.com/',
  version: '',
  lockFile: 'package-lock.json',
  logFile: 'npm-debug.log',
  cmds: {
    remove: 'uninstall',
    r: 'uninstall',
    rm: 'uninstall',
    un: 'uninstall',
    up: 'update',
    ud: 'update',
    upgrade: ['install', '--latest'],
    ug: ['install', '--latest'],
    interactive: ['', -1],
    run: {'--': '--'},
    create: {'--': '--'},
  },
  args: {
    '--frozen': {
      i: 'ci',
      install: 'ci'
    },
    '-F': {
      i: 'ci',
      install: 'ci'
    },
    '--global': '--location=global',
    '-g': '--location=global',
    '--latest': ['<package>@latest', 1],
    '-L': ['<package>@latest', 1],
    '--package-lock': '--no-package-lock',
    '-P': '--no-package-lock'
  }
}

export default npm
