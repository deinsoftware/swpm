const pnpm = {
  cmd: 'pnpm',
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
    '--audit': ['', -1],
    '-A': ['', -1]
  }
}

export default pnpm
