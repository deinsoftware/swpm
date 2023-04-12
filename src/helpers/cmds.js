import { exit } from 'node:process'
import { spawn, execSync } from 'node:child_process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import setTitle from "node-bash-title"
import exitHook from "exit-hook"

import { getOriginIcon } from './icons.js'

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

const statuses = {
  running: `🟢`,
  success: `✅`,
  error: `❌`,
  cancelled: `❎`
}

const titleState = {
  cliName: null,
  packageManagerName: null,
  action: null,
  status: null
}

export const updateTerminalTitle = (status) => {
  if (!status) {
    throw new Error(`Terminal title status must be provided.`)
  }

  titleState.status = status

  if (!titleState.cliName || !titleState.packageManagerName || !titleState.action) {
    throw new Error(`Terminal title must be initialized before updating it.`)
  }

  console.log(`status: ${status}`)

  setTitle(`${titleState.status} ${titleState.cliName}: ${titleState.packageManagerName} ${titleState.action}`)
}

const initTerminalTitle = ({
  args,
  packageManagerName,
  cliName,
  status
}) => {
  titleState.action = Array.isArray(args) ? args.join(` `) : args
  titleState.packageManagerName = packageManagerName
  titleState.cliName = cliName

  updateTerminalTitle(status)
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

export const showCommand = ($0, { origin, cmd, args, config }) => {
  if ($0 === 'swpx') {
    cmd = config.exc
  }

  console.log(`${(origin ? getOriginIcon(origin) + ' ' : '')}${chalk.hex(config?.color ?? '').bold(cmd)} ${args?.join(' ')}`)
}

export const runCommand = ($0, { cmd, args, config, volta = false }) => {
  if ($0 === 'swpx') {
    cmd = config.exc
  }

  if (volta && cmd !== 'volta') {
    args = ['run', cmd, ...args]
    cmd = 'volta'
  }

  initTerminalTitle({
    args,
    cliName: $0,
    status: statuses.running,
    packageManagerName: cmd,
  })

  let didCancel = true

  exitHook(() => {
    if (didCancel) {
      updateTerminalTitle(statuses.cancelled)
    }
  })

  spawn(cmd, [...args], { stdio: 'inherit', shell: true })
    .on('error', (error) => {
      console.error(stripIndents`
        ${chalk.red.bold('Error')}:
        ${error}
      `)
      updateTerminalTitle(statuses.error)
      didCancel = false
      exit(1)
    }).on('exit', (code) => {
      didCancel = false
      if (code === 0) {
        updateTerminalTitle(statuses.success)
      } else {
        updateTerminalTitle(statuses.error)
      }
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
