import type { CommanderPackage } from '../../../translator/commander.types.js'

export async function doneCommand(_cmdr: CommanderPackage) {
  console.log('Done command executed')
}