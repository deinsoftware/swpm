import updateNotifier from 'update-notifier'
import { getSwpmInfo } from './info.js'

export const autoUpdate = async () => {
  const { name, version } = await getSwpmInfo()

  const option = {
    pkg: {
      name,
      version
    },
    shouldNotifyInNpmScript: true,
    updateCheckInterval: 0
  }
  const notifier = updateNotifier(option)
  await notifier.notify()
}
