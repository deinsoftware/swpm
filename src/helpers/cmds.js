import { spawn, execSync } from 'node:child_process'
import chalk from 'chalk'
import { getOriginIcon } from './icons.js'

export const translateCommand = (pkg, key) => {
  const action = pkg?.config?.cmds?.[key]
  if (typeof action === 'string') {
    pkg.args[0] = action
  }
}

export const showCommand = ({ origin, cmd, args, config }) => {
  console.log(`${(origin ? getOriginIcon(origin) + ' ' : '')}${chalk.hex(config?.color ?? '').bold(cmd)} ${args?.join(' ')}`)
}

export const runCommand = ({ cmd, args, volta = false }) => {
  if (volta) {
    args = ['run', cmd, ...args]
    cmd = 'volta'
  }
  spawn(cmd, [...args], { stdio: 'inherit' })
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
