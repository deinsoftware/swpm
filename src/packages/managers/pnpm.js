const pnpm = {
  cmd: 'pnpm',
  exc: 'pnpm dlx',
  color: '#f7ad24',
  url: 'https://pnpm.io/',
  version: '',
  lockFile: 'pnpm-lock.yaml',
  logFile: 'pnpm-debug.log',
  cmds: {
    remove: 'uninstall',
    r: 'uninstall',
    rm: 'uninstall',
    un: 'uninstall',
    up: 'update',
    ud: 'update',
    upgrade: ['update', '--latest'],
    ug: ['update', '--latest'],
    interactive: ['upgrade', '--interactive'],
    ui: ['upgrade', '--interactive']
  },
  args: {
    '--frozen': '--frozen-lockfile',
    '--package-lock': ['', -1],
    '-P': ['', -1]
  }
}

export default pnpm
