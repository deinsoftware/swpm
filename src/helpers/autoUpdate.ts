import chalk, { ForegroundColorName } from 'chalk'
import { stripIndent } from 'common-tags'
import updateNotifier, { NotifyOptions } from 'update-notifier'
import { getCommandResult } from 'helpers/cmds'
import { getSwpmInfo } from 'helpers/info'
import { CommanderPackage } from 'translator/commander.types'

const ONE_DAY_MS = 1000 * 60 * 60 * 24

export const autoUpdate = async (cmdr: CommanderPackage) => {
  const { name, version } = await getSwpmInfo()

  const option = {
    pkg: {
      name,
      version
    },
    shouldNotifyInNpmScript: true,
    updateCheckInterval: ONE_DAY_MS
  }
  const notifier = await updateNotifier(option)

  if (notifier?.update) {
    const { latest, current, type } = notifier.update

    let command = 'bun add --global swpm'
    const voltaVersion = getCommandResult('volta --version')
    if (voltaVersion) {
      command = 'volta install swpm'
    } else {
      const { install } = cmdr?.config || {}
      if (install) {
        command = install
      }
    }

    let color: ForegroundColorName
    switch (type) {
      case 'major':
        color = 'red'
        break;

      case 'minor':
        color = 'yellow'
        break;

      default:
        color = 'green'
        break;
    }

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
