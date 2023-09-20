import { CommanderPackage } from './commander.types.js'

const commanderInitValues: CommanderPackage = {
  cmd: undefined,
  args: [],
  origin: undefined,
  config: undefined,
  volta: false,
}

declare global {
  var commander: CommanderPackage
}

export const getCommander = (): CommanderPackage => {
  if (!globalThis?.commander){
    globalThis.commander = commanderInitValues
  }

  return globalThis.commander
}

export const setCommander = (cmdr: Partial<CommanderPackage>) => {
  globalThis.commander = {
      ...globalThis.commander,
      ...cmdr
  }
}

export default getCommander()
