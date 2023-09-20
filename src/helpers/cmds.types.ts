import { CommanderPackage } from '../translator/commander.types.js'
import { ArgumentsCamelCase } from 'yargs'

export type AddArgs = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flags: (string|number)[]
}

export type ReplaceCommandProps = {
  args: CommanderPackage['args']
  action: string
}

export type AddPositionalProps = {
  args: CommanderPackage['args']
  action: string[] | [string, number] | { [key: string]: string | string[] }
}

export type TranslateCommandProp = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
}

export type SpreadCommand = {
  cmd: 'swpm' | 'swpx'
  args: string[]
}

export type GetCommandResultProps = {
  command: string
  volta?: boolean
}