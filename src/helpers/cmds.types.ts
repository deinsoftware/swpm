import { CommanderPackage } from '../translator/commander.types.js'
import { ArgumentsCamelCase } from 'yargs'

export interface AddArgs {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
  flags: (string|number)[]
}

export interface ReplaceCommandProps {
  args: CommanderPackage['args']
  action: string
}

export interface AddPositionalProps {
  args: CommanderPackage['args']
  action: string[] | [string, number] | { [key: string]: string | string[] }
}

export interface TranslateCommandProp {
  yargs: ArgumentsCamelCase
  cmdr: CommanderPackage
}

export interface SpreadCommand {
  cmd: 'swpm' | 'swpx'
  args: string[]
}

export interface GetCommandResultProps {
  command: string
  volta?: boolean
}
