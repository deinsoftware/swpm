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
    updateCheckInterval: 1000 * 60 * 60 * 24 /* 1 day */
  }
  const notifier = updateNotifier(option)
  await notifier.notify({ isGlobal: true })
}
