import { showCommand } from '../helpers/cmd.js'

export const testCommand = ({ cmd, args, config }) => {
  showCommand({ cmd, args, config })
  process.exit(0)
}
