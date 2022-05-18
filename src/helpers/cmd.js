import { spawn, execSync } from 'node:child_process'
import chalk from 'chalk'

export const execCommand = (command) => {
  try {
    const result = execSync(command)
    return result.toString().trim()
  } catch (error) {
    return false
  }
}

export const showCommand = async ({ cmd, args, config }) => {
  console.log(`${chalk.hex(config.color).bold(cmd)} ${args.join(' ')}`)
}

export const runCommand = async (pkg) => {
  const { cmd, args } = pkg
  await showCommand(pkg)

  spawn(cmd, [...args], { stdio: 'inherit' })
}

export const cleanArguments = (args, key, alias) => {
  const findKey = args.findIndex((arg) => arg === key)
  if (findKey !== -1) {
    args.splice(findKey, 2)
  }

  const findAlias = args.findIndex((arg) => arg === alias)
  if (findAlias !== -1) {
    args.splice(findAlias, 2)
  }
}
