import { inspect } from 'node:util'

import type { ArgumentsCamelCase } from 'yargs'
import type { CommanderPackage } from '../translator/commander.types.js'

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
