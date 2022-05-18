import { showCommand } from '../helpers/cmd.js'

export const testCommand = async (pkg) => {
  await showCommand(pkg)
  process.exit(0)
}
