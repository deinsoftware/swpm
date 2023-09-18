import { exit } from 'node:process'
import { showCommand } from 'helpers/cmds'
import { CommanderPackage } from 'translator/commander.types'

export const testCommand = (cmdr: CommanderPackage) => {
  showCommand(cmdr)
  exit(0)
}
