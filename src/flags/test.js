import { exit } from 'node:process'
import { showCommand } from '../helpers/cmds.js'

export const testCommand = (pkg) => {
  showCommand(pkg)
  exit(0)
}
