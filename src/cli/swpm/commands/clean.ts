import chalk from 'chalk'
import { CommandModule } from 'yargs'
import { deleteModulesPath, deleteModulesFiles, deleteLockFiles, deleteLogFiles, deletePath } from '../../../helpers/delete.js'

type OptionsProps = {
  'all'?: boolean,
  'fresh'?: boolean,
  'modules'?: boolean,
  'lock'?: boolean,
  'log'?: boolean,
  'build'?: boolean,
  'dist'?: boolean,
  'coverage'?: boolean
}

const clean: CommandModule<Record<string, unknown>, OptionsProps> = {
  command: 'clean [FLAGS]',
  aliases: ['c'],
  describe: 'clean packages',

  builder: (yargs) =>
    yargs
      .conflicts('clean', ['add', 'install', 'remove', 'update', 'upgrade'])
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
      })
      .check((yargs) => {
        const options = yargs.all ||
        yargs.fresh ||
        yargs.modules ||
        yargs.lock ||
        yargs.log ||
        yargs.build ||
        yargs.dist ||
        yargs.coverage

        if (!options) {
          throw new Error('Error: clean command requires at least one option')
        }
        return true
      }),

  handler: async (yargs) => {
    console.log(`🧽 ${chalk.bold('Cleaning')}: `)

    if (('all' in yargs) || ('fresh' in yargs) || ('modules' in yargs)) {
      await deletePath('node_modules')
      await deleteModulesFiles()
    }

    if ('modules' in yargs) {
      await deleteModulesPath()
    }

    if ('all' in yargs) {
      await deletePath('.yarn')
    }

    if (('all' in yargs) || ('lock' in yargs)) {
      await deleteLockFiles()
    }

    if (('all' in yargs) || ('fresh' in yargs) || ('log' in yargs)) {
      await deleteLogFiles()
    }

    if (('all' in yargs) || ('fresh' in yargs) || ('build' in yargs)) {
      await deletePath('build')
    }

    if (('all' in yargs) || ('fresh' in yargs) || ('dist' in yargs)) {
      await deletePath('dist')
    }

    if (('all' in yargs) || ('fresh' in yargs) || ('coverage' in yargs)) {
      await deletePath('coverage')
    }
  }
}

export default clean
