import { exit } from 'node:process'
import { showCommand } from '../helpers/cmds.js'
import { CommanderPackage } from '../translator/commander.types.js'

export const testCommand = (cmdr: CommanderPackage) => {
  showCommand(cmdr)
  exit(0)
}
