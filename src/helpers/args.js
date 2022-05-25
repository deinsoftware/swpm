const findFlagIndex = (args, flag) => {
  return args?.findIndex((arg) => arg === flag)
}

const getKey = (flag) => {
  return flag?.replace(/^-+/, '')
}

export const cleanFlag = (yargs, flag) => {
  const key = getKey(flag)

  if (key in yargs) {
    let places = 1
    if (typeof yargs?.[key] !== 'boolean') {
      places = 2
    }

    const indexFlag = findFlagIndex(yargs?.pkg?.args, flag)
    if (indexFlag && indexFlag !== -1) {
      yargs?.pkg?.args.splice(indexFlag, places)
    }
  }
}

const replaceFlag = (pkg, flag, newFlag) => {
  const indexFlag = findFlagIndex(pkg?.args, flag)
  if (indexFlag && indexFlag !== -1) {
    pkg.args[indexFlag] = newFlag
  }
}

const moveFlag = (pkg, option) => {
  const [action, position] = option

  if (position === -1) {
    // TODO: not available on this package manager
    return
  }

  pkg.args.splice(position, 0, action)
}

const replaceCommand = (yargs, action) => {
  const cmd = yargs._

  if (cmd in action) {
    yargs.pkg.args[0] = action[cmd]
  }
}

export const translateFlag = (yargs, flag, alias) => {
  const key = getKey(flag)

  if (key in yargs) {
    const action = yargs?.pkg?.config?.args?.[flag]

    if (typeof action === 'string') {
      replaceFlag(yargs?.pkg, flag, action)
    }

    if (Array.isArray(action)) {
      cleanFlag(yargs, flag)
      cleanFlag(yargs, alias)
      moveFlag(yargs?.pkg, action)
    }

    if (typeof action === 'object') {
      cleanFlag(yargs, flag)
      cleanFlag(yargs, alias)
      replaceCommand(yargs, action)
    }
  }
}
