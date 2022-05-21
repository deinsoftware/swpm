import { spawn, execSync } from 'node:child_process'
import chalk from 'chalk'

export const showCommand = ({ cmd, args, config }) => {
  console.log(`${chalk.hex(config?.color ?? '').bold(cmd)} ${args?.join(' ')}`)
}

export const runCommand = ({ cmd, args, volta }) => {
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
