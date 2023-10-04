import { PackageConfiguration } from '../packages/packages.types.js'
import { CommanderPackage } from '../translator/commander.types.js'
import { ArgumentsCamelCase } from 'yargs'

export type FindFlagIndexProps = {
  args: CommanderPackage['args']
  flag: string
}

export type GetKeyProps = {
  args: CommanderPackage['args']
  flag: string
}

export type ClanFlagProp = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flag: string
}

export type ReplaceFlagProps = {
  cmdr: CommanderPackage
  flag: string
  newFlag: string
}

export type MoveFlagProps = {
  yargs: ArgumentsCamelCase<{package?: string}>
  cmdr: CommanderPackage
  flag: string,
  argConfig: [string, number]
}

export type ReplaceCommandProps = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  cmdConfig: {
    [key: string]: string
  }
}

export type GetActionProp = {
  args: PackageConfiguration['args']
  key: string
}

export type TranslateFlagProp = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flag: string
}

export type TranslateArgsProp = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flag: string
  alias?: string
}
