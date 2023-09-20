import { PackageConfiguration } from '../packages/packages.types.js'
import { CommanderPackage } from '../translator/commander.types.js'
import { ArgumentsCamelCase } from 'yargs'

export interface FindVoltaGlobalsProps {
  yargs: ArgumentsCamelCase<{global?: boolean}>
  cmdr: CommanderPackage
  flags: ('add' | 'install' | 'uninstall' | 'remove')[]
}

export interface FindFlagIndexProps {
  args: CommanderPackage['args']
  flag: string
}

export interface GetKeyProps {
  args: CommanderPackage['args']
  flag: string
}

export interface ClanFlagProp {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flag: string
}

export interface ReplaceFlagProps {
  cmdr: CommanderPackage
  flag: string
  newFlag: string
}

export interface MoveFlagProps {
  yargs: ArgumentsCamelCase<{package?: string}>
  cmdr: CommanderPackage
  flag: string,
  argConfig: [string, number]
}

export interface ReplaceCommandProps {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  cmdConfig: {
    [key: string]: string
  }
}

export interface GetActionProp {
  args: PackageConfiguration['args']
  key: string
}

export interface TranslateFlagProp {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flag: string
}

export interface TranslateArgsProp {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flag: string
  alias?: string
}
