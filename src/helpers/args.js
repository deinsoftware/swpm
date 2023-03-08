import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { getCommandResult } from './cmds'

export const findVoltaGlobals = (yargs, flags) => {
  const hasGlobalOperations = (
    yargs?.global &&
    flags.some((flag) => yargs?.pkg?.args.includes(flag))
  )
  return hasGlobalOperations && getCommandResult('volta --version', yargs?.pkg?.volta)
}

const findFlagIndex = (args, flag) => {
  return args?.findIndex((arg) => arg === flag)
}

const getKey = (args, flag) => {
  const indexFlag = findFlagIndex(args, flag)
  if (indexFlag !== -1) {
    return flag?.replace(/^-+/, '')
  }
}

export const cleanFlag = (yargs, flag) => {
  const key = getKey(yargs?.pkg?.args, flag)

  if (key in yargs) {
    let places = 1
    if (typeof yargs?.[key] !== 'boolean') {
      places = 2
    }

    const indexFlag = findFlagIndex(yargs?.pkg?.args, flag)
    if (indexFlag !== -1) {
      yargs?.pkg?.args.splice(indexFlag, places)
    }
  }
}

const replaceFlag = (pkg, flag, newFlag) => {
  const indexFlag = findFlagIndex(pkg?.args, flag)
  if (indexFlag && indexFlag !== -1) {
    pkg.args[indexFlag] = newFlag
  }
}

const moveFlag = (yargs, flag, option) => {
  let [action, start] = option
  let count = 0

  if (start === -1) {
    console.log(stripIndents`
      ${chalk.yellow.bold('Warning')}: the ${chalk.bold(flag)} flag is not compatible on ${chalk.bold(yargs?.pkg?.cmd)} Package Manager.
    `)
  }

  if (action.includes('<package>')) {
    count = 1
    action = action.replace('<package>', yargs.package)
  }
  yargs.pkg.args.splice(start, count, action)
}

const replaceCommand = (yargs, action) => {
  const cmd = yargs._

  if (cmd in action) {
    yargs.pkg.args[0] = action[cmd]
  }
}

const getAction = (args, key) => {
  return args?.[key]
}

function translateFlag (yargs, name) {
  const action = getAction(yargs?.pkg?.config?.args, name)

  if (typeof action === 'string') {
    replaceFlag(yargs?.pkg, name, action)
  }

  if (Array.isArray(action)) {
    cleanFlag(yargs, name)
    moveFlag(yargs, name, action)
  }

  if (typeof action === 'object') {
    cleanFlag(yargs, name)
    replaceCommand(yargs, action)
  }
}

export const translateArgs = (yargs, flag, alias) => {
  const flagKey = getKey(yargs?.pkg?.args, flag)
  let aliasKey = getKey(yargs?.pkg?.args, alias)

  if (flagKey && aliasKey) {
    cleanFlag(yargs, alias)
    aliasKey = ''
  }

  if (flagKey in yargs) {
    translateFlag(yargs, flag)
  }

  if (aliasKey in yargs) {
    translateFlag(yargs, alias)
  }
}
