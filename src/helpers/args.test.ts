import { describe, test, expect } from 'bun:test'
import { cleanFlag, translateArgs } from './args.js'

describe('cleanFlag()', () => {
  test('should not fail if flag or args are empty or not exists', () => {
    const flag = ''
    const yargs = {
      pkg: {
        args: []
      }
    }
    const result = cleanFlag(yargs, flag)
    expect(result).toBeUndefined()
  })

  test('should not fail when flag is not present on yargs', () => {
    const flag = '--not-exists'
    const yargs = {}
    const result = cleanFlag(yargs, flag)
    expect(result).toBeUndefined()
  })

  test('should remove key for bolean flags', () => {
    const flag = '--test'
    const yargs = {
      _: [ 'install' ],
      test: 'pnpm',
      debug: true,
      d: true,
      t: 'pnpm',
      '$0': 'swpm',
      alias: true,
      pkg: {
        cmd: 'pnpm' as const,
        args: ['command', flag],
        config: {
          cmd: 'pnpm',
          exc: 'pnpm dlx',
          color: '#f7ad24',
          url: 'https://pnpm.io/',
          semver: '',
          lockFiles: [ 'pnpm-lock.yaml' ],
          modulesPath: [],
          modulesFile: [],
          logFile: 'pnpm-debug.log',
          install: 'pnpm install swpm --global',
          cmds: {
            remove: 'uninstall',
            r: 'uninstall',
            rm: 'uninstall',
            un: 'uninstall',
            up: 'update',
            ud: 'update',
            upgrade: [ 'update', '--latest' ],
            ug: [ 'update', '--latest' ],
            interactive: [ 'upgrade', '--interactive' ],
            ui: [ 'upgrade', '--interactive' ]
          },
          args: {
            '--frozen': '--frozen-lockfile',
            '--package-lock': [ '', -1 ],
            '-P': [ '', -1 ]
          }
        }
      }
    }
    cleanFlag(yargs, flag)
    expect(yargs.pkg.args.includes(flag)).toBeFalsy()
  })

  test('should remove key and value for non boolean flags', () => {
    const flag = '--flag'
    const value = 'value'
    const yargs = {
      flag: 'value',
      pkg: {
        args: ['command', flag, value]
      }
    }
    cleanFlag(yargs, flag)
    expect(yargs.pkg.args.includes(flag)).toBeFalsy()
    expect(yargs.pkg.args.includes(value)).toBeFalsy()
  })
})

describe('translateFlag()', () => {
  test('should not fail if flag, alias or args is empty or not exists', () => {
    const flag = ''
    const alias = ''
    const yargs = {
      pkg: {
        args: []
      }
    }
    const result = translateArgs(yargs, flag, alias)
    expect(result).toBeUndefined()
  })

  test('should not fail when flag is not present on yargs', () => {
    const flag = '--not-exists'
    const yargs = {}
    const result = translateArgs(yargs, flag)
    expect(result).toBeUndefined()
  })

  test('should replace a flag with his config translation', () => {
    const cmd = 'command'
    const flag = '--flag'
    const replace = '--new-flag'
    const yargs = {
      _: [cmd],
      flag: true,
      pkg: {
        args: [cmd, flag],
        config: {
          args: {
            [flag]: replace
          }
        }
      }
    }
    translateArgs(yargs, flag)
    expect(yargs.pkg.args.includes(flag)).toBeFalsy()
    expect(yargs.pkg.args[1]).toBe(replace)
  })

  test('should move a flag with his config translation', () => {
    const cmd = 'command'
    const flag = '--flag'
    const replace = ['flag', 1]
    const yargs = {
      flag: true,
      pkg: {
        _: [cmd],
        args: [cmd, 'package', flag],
        config: {
          args: {
            [flag]: replace
          }
        }
      }
    }
    translateArgs(yargs, flag)
    expect(yargs.pkg.args.includes(flag)).toBeFalsy()
    expect(yargs.pkg.args[1]).toBe(replace[0])
  })

  test('should replace the command when detect some flag', () => {
    const cmd = 'command'
    const flag = '--flag'
    const replace = {
      [flag]: {
        [cmd]: 'new-command'
      }
    }
    const yargs = {
      flag: true,
      _: [cmd],
      pkg: {
        args: [cmd, 'package', flag],
        config: {
          args: replace
        }
      }
    }
    translateArgs(yargs, flag)
    expect(yargs.pkg.args.includes(cmd)).toBeFalsy()
    expect(yargs.pkg.args.includes(flag)).toBeFalsy()
    expect(yargs.pkg.args[0]).toBe(replace[flag][cmd])
  })
})
