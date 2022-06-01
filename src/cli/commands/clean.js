import chalk from 'chalk'
import { exit } from 'node:process'
import { deleteLockFiles, deleteLogFiles, deletePath } from '../../helpers/delete.js'

const middleware = async (yargs) => {
  console.log(`🧽 ${chalk.bold('Cleaning')}: `)
  
  if ('all' in yargs || 'node-modules' in yargs) {
    await deletePath('node_modules')
  }

  if ('all' in yargs || 'lock' in yargs) {
    await deleteLockFiles()
  }

  if ('all' in yargs || 'log' in yargs) {
    await deleteLogFiles()
  }

  if ('all' in yargs || 'build' in yargs) {
    await deletePath('build')
  }

  if ('all' in yargs || 'coverage' in yargs) {
    await deletePath('coverage')
  }
  
  exit(0)
}

const clean = {
  command: 'clean [FLAGS]',
  aliases: ['c'],
  desc: 'clean packages',
  conflicts: ['add', 'install', 'remove'],
  builder: (yargs) => {
    yargs.option('all', {
      type: 'boolean',
      desc: 'clean project',
      usage: '$0 clean --all',
      conflicts: ['node-modules', 'build', 'coverage']
    })

    yargs.option('node-modules', {
      type: 'boolean',
      desc: 'delete node_modules folder',
      usage: '$0 clean --node-modules',
      conflicts: ['all']
    })

    yargs.option('lock', {
      type: 'boolean',
      desc: 'delete lock files',
      usage: '$0 clean --lock',
      conflicts: ['all']
    })

    yargs.option('log', {
      type: 'boolean',
      desc: 'delete log files',
      usage: '$0 clean --log',
      conflicts: ['all']
    })

    yargs.option('build', {
      type: 'boolean',
      desc: 'delete build folder',
      usage: '$0 clean --build',
      conflicts: ['all']
    })

    yargs.option('coverage', {
      type: 'boolean',
      desc: 'delete coverage folder',
      usage: '$0 clean --coverage',
      conflicts: ['all']
    })

    yargs.middleware(middleware)

    return yargs
  }
}

export default clean
