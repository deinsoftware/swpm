import { exit } from 'node:process'
import { spawn, execSync } from 'node:child_process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import exitHook from 'exit-hook'

import { getOriginIcon, getStatusIcon } from './icons.js'
import terminal from './terminal.js'

const addArgs = (yargs, flags) => {
  for (const flag of flags) {
    const key = flag?.replace(/^-+/, '')
    yargs[key] = true
  }

  yargs.pkg.args = [...yargs.pkg.args, ...flags]
}

const replaceCommand = (args, action) => {
  args[0] = action
}

const addPositional = (args, action) => {
  const { 0: key, 1: value } = Object.entries(action)[0]
  const start = args?.findIndex((arg) => arg.startsWith(key))

  if (start > 0) {
    args.splice(start, 0, value)
  }
}

export const translateCommand = (yargs) => {
  if (yargs?._?.length > 0) {
    const key = yargs._[0]
    const action = yargs?.pkg?.config?.cmds?.[key]

    if (typeof action === 'string') {
      replaceCommand(yargs.pkg.args, action)
    }

    if (Array.isArray(action)) {
      const [cmd, ...rest] = action

      if (rest[0] === -1) {
        console.error(`${chalk.red.bold('Error')}: the ${chalk.bold(key)} command is not available on ${chalk.bold(yargs?.pkg?.cmd)} Package Manager.`)
        exit(1)
      }

      replaceCommand(yargs.pkg.args, cmd)
      addArgs(yargs, rest)
    }

    if (typeof action === 'object') {
      addPositional(yargs.pkg.args, action)
    }
  }
}

export const showCommand = ({ origin, cmd, args, config }) => {
  console.log(`${(origin ? getOriginIcon(origin) + ' ' : '')}${chalk.hex(config?.color ?? '').bold(cmd)} ${args?.join(' ')}`)
}

export const runCommand = ({ cmd, args, volta = false }) => {
  if (volta && cmd !== 'volta') {
    args = ['run', cmd, ...args]
    cmd = 'volta'
  }

  const title = {
    scriptName: $0,
    pkg: cmd,
    args,
    status: getStatusIcon('running'),
    canceled: true
  }
  terminal.initTitle(title)

  exitHook(() => {
    if (title.canceled) {
      terminal.updateTitle(getStatusIcon('canceled'))
    }
  })

  spawn(cmd, [...args], { stdio: 'inherit', shell: true })
    .on('error', (error) => {
      console.error(stripIndents`
        ${chalk.red.bold('Error')}:
        ${error}
      `)
      terminal.updateTitle(getStatusIcon('error'))
      title.canceled = false
      exit(1)
    }).on('exit', (code) => {
      title.canceled = false
      const statusIcon = code === 0 ? 'success' : 'error'
      terminal.updateTitle(getStatusIcon(statusIcon))
    })
}

export const runAlias = (cmd, args) => {
  spawn(cmd, args, { stdio: 'inherit', shell: true })
    .on('error', (error) => {
      console.error(stripIndents`
        ${chalk.red.bold('Error')}:
        ${error}
      `)
      exit(1)
    })
}

export const getCommandResult = (command, volta = false) => {
  try {
    if (volta) {
      command = `volta run ${command}`
    }

    const result = execSync(command)
    return result.toString().trim()
  } catch (error) {
    return false
  }
}
