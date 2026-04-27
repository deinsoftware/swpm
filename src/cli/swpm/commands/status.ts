import { exit } from 'node:process'
import { getCommandResult } from '../../../helpers/cmds.js'
import { getSwpmInfo } from '../../../helpers/info.js'
import { commandVerification, getPackageVersion } from '../../../helpers/get.js'
import { checkErrorMessage } from '../../../helpers/messages.js'
import cmdr from '../../../translator/commander.js'

import type { CommandModule } from 'yargs'
import type { StatusData, StatusProps } from './status.types.js'

const getProperty = (obj: StatusData, path: string) => {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

const status: CommandModule<Record<string, unknown>, StatusProps> = {
  command: 'status [format]',
  aliases: ['s'],
  describe: 'show information in different formats',

  builder: (yargs) =>
    yargs
      .positional('format', {
        type: 'string',
        desc: 'output format (json, json:path, plain:path)',
        default: 'json'
      })
      .check((yargs) => {
        const { format } = yargs
        if (format) {
          const isValid = format === 'json' ||
                          format.startsWith('json:') ||
                          format.startsWith('plain:')
          if (!isValid) {
            const errorMessage = `invalid format: ${format}`
            checkErrorMessage(yargs.$0, 'status', errorMessage)
          }
        }
        return true
      }),

  handler: async (yargs) => {
    const { cmd, origin, volta } = cmdr
    const nodeVersion = getCommandResult({ command: 'node --version', volta })
    const { version: swpmVersion } = await getSwpmInfo()

    const isInstalled = !!cmd && await commandVerification(cmd)
    const packageVersion = isInstalled ? getPackageVersion(cmd, volta ?? false) : 'not found'

    const data: StatusData = {
      _: cmd || 'unknown',
      using: cmd || 'unknown',
      error: cmd ? null : 'no Package Manager or Environment Variable was found',
      ready: !!cmd,
      origin: origin || 'unknown',
      volta: !!volta,
      versions: {
        swpm: swpmVersion,
        node: nodeVersion?.replace(/v/, ''),
        [cmd || 'unknown']: packageVersion
      }
    }

    const format = yargs.format || 'json'

    if (format === 'json') {
      console.log(JSON.stringify(data, null, 2))
    } else if (format.startsWith('json:') || format.startsWith('plain:')) {
      const isJson = format.startsWith('json:')
      const path = format.replace(isJson ? 'json:' : 'plain:', '')
      const value = getProperty(data, path)

      if (value === undefined) {
        const errorMessage = `property not found: ${path}`
        checkErrorMessage(yargs.$0, 'status', errorMessage)
      }

      if (isJson) {
        console.log(JSON.stringify(value, null, 2))
      } else {
        console.log(value)
      }
    } else {
      console.log(JSON.stringify(data, null, 2))
    }

    exit(0)
  }
}

export default status
