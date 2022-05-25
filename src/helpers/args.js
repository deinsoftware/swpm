const findFlagIndex = (pkg, flag) => {
  return pkg?.args?.findIndex((arg) => arg === flag)
}

const getKey = (flag) => {
  return flag?.replace(/^-+/, '')
}

export const cleanFlag = (flag) => {
  const { yargs, pkg } = globalThis
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

const replaceFlag = (flag, newFlag) => {
  const { pkg } = globalThis

  const indexFlag = findFlagIndex(pkg, flag)
  if (indexFlag && indexFlag !== -1) {
    pkg.args[indexFlag] = newFlag
  }
}

const moveFlag = (option) => {
  const [action, position] = option
  const { pkg } = globalThis

  if (position === -1) {
    // TODO: not available on this package manager
    return
  }

  pkg.args.splice(position, 0, action)
}

const replaceCommand = (action) => {
  const { yargs, pkg } = globalThis

  const cmd = yargs._

  if (cmd in action) {
    pkg.args[0] = action[cmd]
  }
}

export const translateFlag = (flag, alias) => {
  const { yargs, pkg } = globalThis
  const key = getKey(flag)

  if (key in yargs) {
    const action = pkg?.config?.args?.[flag]

    if (typeof action === 'string') {
      console.log({ flag, alias, key })
      replaceFlag(flag, action)
    }

    if (Array.isArray(action)) {
      cleanFlag(flag)
      cleanFlag(alias)
      moveFlag(action)
    }

    if (typeof action === 'object') {
      cleanFlag(flag)
      cleanFlag(alias)
      replaceCommand(action)
    }
  }
}
