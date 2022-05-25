const findFlagIndex = (pkg, flag) => {
  return pkg?.args?.findIndex((arg) => arg === flag)
}

const getKey = (flag) => {
  return flag?.replace(/^-+/, '')
}

export const cleanFlag = (yargs, pkg, flag) => {
  const key = getKey(flag)

  if (key in yargs) {
    let places = 1
    if (typeof yargs?.[key] !== 'boolean') {
      places = 2
    }

    const indexFlag = findFlagIndex(pkg, flag)
    if (indexFlag && indexFlag !== -1) {
      pkg.args.splice(indexFlag, places)
    }
  }
}

const replaceFlag = (pkg, flag, newFlag) => {
  const indexFlag = findFlagIndex(pkg, flag)
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

const replaceCommand = (yargs, pkg, action) => {
  const cmd = yargs._

  if (cmd in action) {
    pkg.args[0] = action[cmd]
  }
}

export const translateFlag = (yargs, pkg, flag, alias) => {
  const key = getKey(flag)

  if (key in yargs) {
    const action = pkg?.config?.args?.[flag]

    if (typeof action === 'string') {
      console.log({ flag, alias, key })
      replaceFlag(pkg, flag, action)
    }

    if (Array.isArray(action)) {
      cleanFlag(yargs, pkg, flag)
      cleanFlag(yargs, pkg, alias)
      moveFlag(pkg, action)
    }

    if (typeof action === 'object') {
      cleanFlag(yargs, pkg, flag)
      cleanFlag(yargs, pkg, alias)
      replaceCommand(yargs, pkg, action)
    }
  }
}
