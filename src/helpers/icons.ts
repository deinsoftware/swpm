import type { OriginIcons } from './icons.types.js'

export const originIcons = {
  pinned: '📌',
  packageManager: '📦',
  environment: '🌐',
  lock: '🔒'
}
export const getOriginIcon = (name: OriginIcons) => {
  return originIcons[name] ?? ''
}
