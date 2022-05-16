import { spawn } from 'node:child_process'
import chalk from 'chalk'

export const showCommand = (command, args) => {
  console.log(`${chalk.green.bold(command)} ${args.join(' ')}`)
}

export const runCommand = (command, args) => {
  showCommand(command, args)
  spawn(command, [...args], { stdio: 'inherit' })
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
