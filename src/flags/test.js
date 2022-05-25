import { showCommand } from '../helpers/cmds.js'

export const testCommand = (pkg) => {
  showCommand(pkg)
  process.exit(0)
}
