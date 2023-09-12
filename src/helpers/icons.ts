import chalk from 'chalk'
import { OriginIcons, ResultIcons } from './icons.types'

export const originIcons = {
  pinned: '📌',
  packageManager: '📦',
  environment: '🌐',
  lock: '🔒'
}
export const getOriginIcon = (name: OriginIcons) => {
  return originIcons[name] ?? ''
}

export const resultIcons = {
  success: chalk.green.bold('✔'),
  failure: chalk.red.bold('❌')
}
export const getResultIcon = (name: ResultIcons) => {
  return resultIcons[name] ?? ''
}
