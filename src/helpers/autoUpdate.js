import chalk from 'chalk'
import { stripIndent } from 'common-tags'
import updateNotifier from 'update-notifier'
import { getCommandResult } from './cmds.js'
import { getSwpmInfo } from './info.js'

export const autoUpdate = async (yargs) => {
  const { name, version } = await getSwpmInfo()

  const option = {
    pkg: {
      name,
      version
    },
    shouldNotifyInNpmScript: true,
    updateCheckInterval: 1000 * 60 * 60 * 24 /* 1 day */
  }
  const notifier = await updateNotifier(option)

  if (notifier?.update) {
    const { latest, current, type } = notifier.update

    let command = 'npm install swpm --location=global'
    const voltaVersion = await getCommandResult('volta --version')
    if (voltaVersion) {
      command = 'volta install swpm'
    } else {
      const { install } = yargs?.pkg?.config || {}
      if (install) {
        command = install
      }
    }

    const color = {
      major: 'red',
      minor: 'yellow',
      patch: 'green'
    }

    const message = stripIndent`
    New ${type} version available: ${chalk.dim(`${current}`)}${chalk.reset(' → ')}${chalk[color[type] || 'green'](`${latest}`)}
    Run ${chalk.cyan(command)} to update`

    const boxenOptions = {
      padding: 1,
      margin: 1,
      textAlignment: 'center',
      borderColor: 'yellow',
      borderStyle: 'round',
      backgroundColor: 'black'
    }

    const notification = {
      message,
      boxenOptions
    }

    notifier.notify(notification)
  }
}
