import chalk from 'chalk'
import { exit } from 'node:process'
import { CommandModule } from 'yargs'
import { deleteModulesPath, deleteModulesFiles, deleteLockFiles, deleteLogFiles, deletePath } from '../../../helpers/delete.js'

type Options = {
  'all'?: boolean,
  'fresh'?: boolean,
  'modules'?: boolean,
  'lock'?: boolean,
  'log'?: boolean,
  'build'?: boolean,
  'dist'?: boolean,
  'coverage'?: boolean
}

const clean: CommandModule<Record<string, unknown>, Options> = {
  command: 'clean [FLAGS]',
  aliases: ['c'],
  describe: 'clean packages',

  builder: (yargs) =>
    yargs
      .conflicts('clean',['add', 'install', 'remove', 'update', 'upgrade'])
      .option('all', {
        type: 'boolean',
        desc: 'clean project',
        usage: '$0 clean --all',
        conflicts: ['fresh', 'modules', 'lock', 'log', 'build', 'dist', 'coverage']
      })
      .option('fresh', {
        type: 'boolean',
        desc: 'clean project',
        usage: '$0 clean --fresh',
        conflicts: ['all', 'modules', 'lock', 'log', 'build', 'dist', 'coverage']
      })
      .option('modules', {
        type: 'boolean',
        desc: 'delete node_modules folder',
        usage: '$0 clean --modules',
        conflicts: ['all', 'fresh']
      })
      .option('lock', {
        type: 'boolean',
        desc: 'delete lock files',
        usage: '$0 clean --lock',
        conflicts: ['all', 'fresh']
      })
      .option('log', {
        type: 'boolean',
        desc: 'delete log files',
        usage: '$0 clean --log',
        conflicts: ['all', 'fresh']
      })
      .option('build', {
        type: 'boolean',
        desc: 'delete build folder',
        usage: '$0 clean --build',
        conflicts: ['all', 'fresh']
      })
      .option('dist', {
        type: 'boolean',
        desc: 'delete dist folder',
        usage: '$0 clean --dist',
        conflicts: ['all', 'fresh']
      })
      .option('coverage', {
        type: 'boolean',
        desc: 'delete coverage folder',
        usage: '$0 clean --coverage',
        conflicts: ['all', 'fresh']
      }),

  handler: async(yargs) => {

    console.log(`🧽 ${chalk.bold('Cleaning')}: `)

    if (yargs?.all || yargs?.fresh || yargs?.modules) {
      await deletePath('node_modules')
      await deleteModulesFiles()
    }
    if (yargs?.modules) {
      await deleteModulesPath()
    }
    if (yargs?.all) {
      await deletePath('.yarn')
    }

    if (yargs?.all || yargs?.lock) {
      await deleteLockFiles()
    }

    if (yargs?.all || yargs?.fresh || yargs?.log) {
      await deleteLogFiles()
    }

    if (yargs?.all || yargs?.fresh || yargs?.build) {
      await deletePath('build')
    }

    if (yargs?.all || yargs?.fresh || yargs?.dist) {
      await deletePath('dist')
    }

    if (yargs?.all || yargs?.fresh || yargs?.coverage) {
      await deletePath('coverage')
    }

    exit(0)
  }
}

export default clean
