const findFlagIndex = (flag) => {
  const { pkg } = globalThis
  return pkg?.args?.findIndex((arg) => arg === flag)
}

const getKey = (option) => {
  return option?.replace(/^-+/, '')
}

export const cleanFlag = (option) => {
  const { yargs, pkg } = globalThis
  const key = getKey(option)

  if (key in yargs) {
    let places = 1

    if (typeof yargs?.[key] !== 'boolean') {
      places = 2
    }

    const indexFlag = findFlagIndex(option)
    if (indexFlag && indexFlag !== -1) {
      pkg.args.splice(indexFlag, places)
    }
  }
}

// const processAction = (yargs, flag, action) => {
//   if (typeof action === 'array') {

//   }
// }

const replaceFlag = (option, newOption) => {
  const { pkg } = globalThis

  const indexFlag = findFlagIndex(option)
  if (indexFlag && indexFlag !== -1) {
    pkg.args[indexFlag] = newOption
  }
}

const insertFlag = (option) => {
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

export const translateFlag = (option, alias) => {
  const { yargs, pkg } = globalThis
  const key = getKey(option)

  if (key in yargs) {
    const action = pkg?.config?.args?.[option]

    if (typeof action === 'string') {
      cleanFlag()
      replaceFlag(option, action)
    }

    if (Array.isArray(action)) {
      cleanFlag(option)
      cleanFlag(alias)
      insertFlag(action)
    }

    if (typeof action === 'object') {
      cleanFlag(option)
      cleanFlag(alias)
      replaceCommand(action)
    }
  }
}
