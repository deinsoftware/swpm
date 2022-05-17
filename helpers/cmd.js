import { spawn, execSync } from 'node:child_process'
import chalk from 'chalk'
import { getPackageConfiguration } from '../packages/list.js'

export const execCommand = (command) => {
  try {
    const result = execSync(command)
    return result.toString().trim()
  } catch (error) {
    return false
  }
}

export const showCommand = async (pkg, args) => {
  const config = await getPackageConfiguration(pkg)
  console.log(`${chalk.hex(config.color).bold(pkg)} ${args.join(' ')}`)
}

export const runCommand = async (pkg, args) => {
  await showCommand(pkg, args)
  spawn(pkg, [...args], { stdio: 'inherit' })
}

export const cleanSwpmArguments = (args, key, alias) => {
  const findKey = args.findIndex((arg) => arg === key)
  if (findKey !== -1) {
    args.splice(findKey, 2)
  }

  const findAlias = args.findIndex((arg) => arg === alias)
  if (findAlias !== -1) {
    args.splice(findAlias, 2)
  }
}
