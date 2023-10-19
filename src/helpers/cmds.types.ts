import type { CommanderPackage } from '../translator/commander.types.js'
import type { ArgumentsCamelCase } from 'yargs'

export type AddArgs = {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flags: (string|number)[]
}

export type ReplaceCommandProps = {
  args: CommanderPackage['args']
  cmd: string | number,
  action: string
}

export type PositionalArray = [string, number]
export type PositionalObject = { [key: string]: string | string[] }

export type AddPositionalProps = {
  args: CommanderPackage['args']
  action: string[] | PositionalArray | PositionalObject
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
