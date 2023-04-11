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

  if (notifier.update) {
    const { last, current } = notifier.update

    const updateMessage = {
      versions: [
        'Update available',
        last ?? '',
        ' →',
        current
      ],
      command: [
        'Run',
        'volta install swpm',
        'to update'
      ]
    }

    const voltaVersion = getCommandResult('volta --version')
    if (!voltaVersion) {
      const { install } = yargs?.pkg?.config || {}
      if (!install) {
        updateMessage.command[1] = 'npm install swpm -global'
      } else {
        updateMessage.command[1] = install
      }
    }

    const { versions, command } = updateMessage
    const maxLen = Math.max(versions.join(' ').length, command.join(' ').length)
    const verLen = maxLen - versions.join(' ').length
    const cmdLen = maxLen - command.join(' ').length

    let message = ''
    message += `      ╭───${'─'.repeat(maxLen)}───╮      \n`
    message += `      │   ${' '.repeat(maxLen)}   │      \n`
    message += `      │   ${versions[0]} `
    message += `${chalk.hex('#4e4e4e').bold(versions[1])} `
    message += `${versions[2]} `
    message += `${chalk.hex('#689e65').bold(versions[3])}`
    message += `${' '.repeat(verLen)}   │      \n`
    message += `      │   ${command[0]} `
    message += `${chalk.hex('#368fb9').bold(command[1])} `
    message += `${command[2]}`
    message += `${' '.repeat(cmdLen)}   │      \n`
    message += `      │   ${' '.repeat(maxLen)}   │      \n`
    message += `      ╰───${'─'.repeat(maxLen)}───╯      \n`

    console.log(stripIndent`${message}`)
  }
}
