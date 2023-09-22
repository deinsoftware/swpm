import { inspect } from 'node:util'
import { ArgumentsCamelCase } from 'yargs'
import { CommanderPackage } from '../translator/commander.types'

export const debug = (object: CommanderPackage | ArgumentsCamelCase) => {
  console.log(
    inspect(
      object,
      {
        showHidden: false,
        depth: null,
        colors: true
      }
    )
  )
}
