import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { exit } from 'node:process'
import prompts from 'prompts'

import type { CommanderPackage } from '../translator/commander.types.js'
import type {
  ClanFlagProp,
  FindFlagIndexProps,
  FindVoltaGlobalsProps,
  GetActionProp,
  GetKeyProps,
  MoveFlagProps,
  ReplaceCommandProps,
  ReplaceFlagProps,
  TranslateArgsProp,
  TranslateFlagProp
} from './args.types.js'
import { commandVerification } from './get.js'

export const findVoltaGlobals = async ({ yargs, cmdr, flags }: FindVoltaGlobalsProps) => {
  const hasGlobalOperations = (
    yargs?.global &&
    flags.some((flag) => cmdr?.args.includes(flag))
  )
  const isVoltaInstalled = await commandVerification('volta')
  return hasGlobalOperations && isVoltaInstalled
}

const findFlagIndex = ({ args, flag }: FindFlagIndexProps) => {
  return args?.findIndex((arg) => arg === flag)
}

const getKey = ({ args, flag }: GetKeyProps) => {
  const indexFlag = findFlagIndex({ args, flag })
  if (indexFlag !== -1) {
    return flag?.replace(/^-+/, '')
  }
}

export const cleanFlag = ({ yargs, cmdr, flag }: ClanFlagProp) => {
  const key = getKey({ args: cmdr?.args, flag }) as keyof CommanderPackage
  if (!key) return

  if (key in yargs) {
    let places = 1
    if (typeof yargs?.[key] !== 'boolean') {
      places = 2
    }

    const indexFlag = findFlagIndex({ args: cmdr?.args, flag })
    if (indexFlag !== -1) {
      cmdr?.args.splice(indexFlag, places)
    }
  }
}

const replaceFlag = ({ cmdr, flag, newFlag }: ReplaceFlagProps) => {
  const indexFlag = findFlagIndex({ args: cmdr?.args, flag })
  if (indexFlag && indexFlag !== -1) {
    cmdr.args[indexFlag] = newFlag
  }
}

const moveFlag = async ({ yargs, cmdr, flag, argConfig }: MoveFlagProps) => {
  let [action, start] = argConfig
  let count = 0

  if (start === -1) {
    console.log(stripIndents`
      ${chalk.yellow.bold('Warning')}: the ${chalk.bold(flag)} flag is not compatible on ${chalk.bold(cmdr?.cmd)} Package Manager.
    `)

    const response = await prompts({
      type: 'confirm',
      name: 'value',
      message: `Do you want to run it excluding the ${chalk.blue.bold(flag)} flag?`,
      initial: true
    })

    if (!response.value) {
      exit(1)
    }
  }

  if (('package' in yargs) && action.includes('<package>')) {
    count = 1
    action = action.replace('<package>', yargs.package!)
  }
  cmdr.args.splice(start, count, action)
}

const replaceCommand = ({ yargs, cmdr, cmdConfig }: ReplaceCommandProps) => {
  const command = yargs._.toString()

  if (command && command in cmdConfig) {
    const args = cmdConfig[command]
    cmdr.args[0] = args!
  }
}

const getAction = ({ args, key }: GetActionProp) => {
  return args[key]
}

const translateFlag = async ({ yargs, cmdr, flag }: TranslateFlagProp) => {
  const action = getAction({ args: cmdr?.config!.args, key: flag })

  if (typeof action === 'string') {
    replaceFlag({ cmdr, flag, newFlag: action })
  } else if (Array.isArray(action)) {
    cleanFlag({ yargs, cmdr, flag })
    await moveFlag({ yargs, cmdr, flag, argConfig: action })
  } else if (typeof action === 'object') {
    cleanFlag({ yargs, cmdr, flag })
    replaceCommand({ yargs, cmdr, cmdConfig: action })
  }
}

export const translateArgs = async ({ yargs, cmdr, flag, alias = '' }: TranslateArgsProp) => {
  const flagKey = getKey({ args: cmdr?.args, flag })
  let aliasKey = getKey({ args: cmdr?.args, flag: alias })

  if (flagKey && aliasKey) {
    cleanFlag({ yargs, cmdr, flag: alias })
    aliasKey = ''
  }

  if (flagKey && flagKey in yargs) {
    await translateFlag({ yargs, cmdr, flag })
  }

  if (aliasKey && aliasKey in yargs) {
    await translateFlag({ yargs, cmdr, flag: alias })
  }
}
