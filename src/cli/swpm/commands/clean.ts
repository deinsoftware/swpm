import chalk from 'chalk'
import { exit } from 'node:process'
import { Argv, CommandModule, MiddlewareFunction } from 'yargs'
import { Yargs } from 'types/swpm.types'
import { deleteModulesPath, deleteModulesFiles, deleteLockFiles, deleteLogFiles, deletePath } from 'helpers/delete'

const middleware: MiddlewareFunction = async (yargs: Yargs) => {
  console.log(`🧽 ${chalk.bold('Cleaning')}: `)

  if ('all' in yargs || 'fresh' in yargs || 'modules' in yargs) {
    await deletePath('node_modules')
    await deleteModulesFiles()
  }
  if ('modules' in yargs) {
    await deleteModulesPath()
  }
  if ('all' in yargs) {
    await deletePath('.yarn')
  }

  if ('all' in yargs || 'lock' in yargs) {
    await deleteLockFiles()
  }

  if ('all' in yargs || 'fresh' in yargs || 'log' in yargs) {
    await deleteLogFiles()
  }

  if ('all' in yargs || 'fresh' in yargs || 'build' in yargs) {
    await deletePath('build')
  }

  if ('all' in yargs || 'fresh' in yargs || 'dist' in yargs) {
    await deletePath('dist')
  }

  if ('all' in yargs || 'fresh' in yargs || 'coverage' in yargs) {
    await deletePath('coverage')
  }

  exit(0)
}

const clean: CommandModule = {
  command: 'clean [FLAGS]',
  aliases: ['c'],
  describe: 'clean packages',

  builder: (yargs: Argv<{}>) => {
    yargs.conflicts('clean',['add', 'install', 'remove', 'update', 'upgrade'])

    yargs.option('all', {
      type: 'boolean',
      desc: 'clean project',
      usage: '$0 clean --all',
      conflicts: ['fresh', 'modules', 'lock', 'log', 'build', 'dist', 'coverage']
    })

    yargs.option('fresh', {
      type: 'boolean',
      desc: 'clean project',
      usage: '$0 clean --fresh',
      conflicts: ['all', 'modules', 'lock', 'log', 'build', 'dist', 'coverage']
    })

    yargs.option('modules', {
      type: 'boolean',
      desc: 'delete node_modules folder',
      usage: '$0 clean --modules',
      conflicts: ['all', 'fresh']
    })

    yargs.option('lock', {
      type: 'boolean',
      desc: 'delete lock files',
      usage: '$0 clean --lock',
      conflicts: ['all', 'fresh']
    })

    yargs.option('log', {
      type: 'boolean',
      desc: 'delete log files',
      usage: '$0 clean --log',
      conflicts: ['all', 'fresh']
    })

    yargs.option('build', {
      type: 'boolean',
      desc: 'delete build folder',
      usage: '$0 clean --build',
      conflicts: ['all', 'fresh']
    })

    yargs.option('dist', {
      type: 'boolean',
      desc: 'delete dist folder',
      usage: '$0 clean --dist',
      conflicts: ['all', 'fresh']
    })

    yargs.option('coverage', {
      type: 'boolean',
      desc: 'delete coverage folder',
      usage: '$0 clean --coverage',
      conflicts: ['all', 'fresh']
    })

    yargs.middleware(middleware)

    return yargs
  },

  handler: (): void => {}
}

export default clean
