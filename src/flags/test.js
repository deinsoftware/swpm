import { exit } from 'node:process'
import { showCommand } from '../helpers/cmds.js'

export const testCommand = ($0, pkg) => {
  showCommand($0, pkg)
  exit(0)
}
