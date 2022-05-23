import { spawn, execSync } from 'node:child_process'
import chalk from 'chalk'
import { getOriginIcon } from './get.js'

export const translateCommand = (key) => {
  const { pkg } = globalThis

  const action = pkg?.config?.cmds?.[key]

  if (typeof action === 'string') {
    pkg.args[0] = action
  }
}

export const showCommand = () => {
  const { origin, cmd, args, config } = globalThis.pkg
  console.log(`${(origin ? getOriginIcon(origin) + ' ' : '')}${chalk.hex(config?.color ?? '').bold(cmd)} ${args?.join(' ')}`)
}

export const runCommand = () => {
  let { cmd, args, volta } = globalThis.pkg

  if (volta) {
    args = ['run', cmd, ...args]
    cmd = 'volta'
  }
  spawn(cmd, [...args], { stdio: 'inherit' })
}

export const getCommandResult = (command) => {
  try {
    const result = execSync(command)
    return result.toString().trim()
  } catch (error) {
    return false
  }
}
