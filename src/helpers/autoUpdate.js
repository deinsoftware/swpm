import updateNotifier from 'update-notifier'
import { getSwpmInfo } from './info.js'

export const autoUpdate = async () => {
  const { name, version } = await getSwpmInfo()

  const option = {
    pkg: {
      name,
      version
    }
  }
  const notifier = updateNotifier(option)
  notifier.notify()
}
