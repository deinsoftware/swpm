import chalk, { ForegroundColorName } from 'chalk'
import { stripIndent } from 'common-tags'
import updateNotifier, { NotifyOptions } from 'update-notifier'

import { getSwpmInfo } from '../helpers/info.js'

import { CommanderPackage } from '../translator/commander.types.js'

const ONE_DAY_MS = 1000 * 60 * 60 * 24

export const autoUpdate = async (cmdr: CommanderPackage) => {
  const { name, version } = await getSwpmInfo()

  const settings = {
    pkg: {
      name,
      version
    },
    shouldNotifyInNpmScript: true,
    updateCheckInterval: ONE_DAY_MS
  }
  const notifier = await updateNotifier(settings)

  if (notifier?.update) {
    const { latest, current, type } = notifier.update

    let command = 'npm install swpm --location=global'

    if (!cmdr?.config) {
      const { install } = cmdr?.config ?? {}
      if (install) {
        command = install
      }
    }

    const colors: Record<string, ForegroundColorName> = {
      major: 'red',
      minor: 'yellow'
    }
    const color = colors[type] ?? 'green'

    const message = stripIndent`
      New ${type} version available: ${chalk.dim(`${current}`)}${chalk.reset(' → ')}${chalk[color](`${latest}`)}
      Run ${chalk.cyan(command)} to update`

    const boxenOptions = {
      padding: 1,
      margin: 1,
      textAlignment: 'center',
      borderColor: 'yellow',
      borderStyle: 'single',
      backgroundColor: 'black'
    } as const

    const notification: NotifyOptions = {
      message,
      boxenOptions
    }

    notifier.notify(notification)
  }
}
