import { CommanderPackage } from "./commander.types";

const commanderInitValues: CommanderPackage = {
  cmd: undefined,
  args: [],
  origin: undefined,
  config: undefined,
  volta: false,
}

const value = commanderInitValues['args']

declare global {
  var commander: CommanderPackage
}

export const getCommander = (): CommanderPackage => {
  if (!('commander' in globalThis)){
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
