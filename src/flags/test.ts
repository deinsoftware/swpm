import { exit } from 'node:process'
import { showCommand } from 'helpers/cmds'
import { PackageCommand } from 'types/swpm.types'

export const testCommand = (pkg: PackageCommand) => {
  showCommand(pkg)
  exit(0)
}
