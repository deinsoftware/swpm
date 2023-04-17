const setTitle = (title) => {
  if (process.platform === 'win32') {
    process.title = title
  } else {
    process.stdout.write(
      String.fromCharCode(27) + ']0;' + title + String.fromCharCode(7)
    )
  }
}

const ACTION_TITLE_MAX_LEN = 25
const TITLE_MAX_LEN = 30

const titleState = {
  scriptName: null,
  pkg: null,
  action: null,
  status: null
}

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title
  }

  return `${title.slice(0, maxLength)}...`
}

const updateTitle = (status) => {
  if (!status) {
    throw new Error('Terminal title status must be provided.')
  }

  titleState.status = status

  if (!titleState.scriptName || !titleState.pkg || !titleState.action) {
    throw new Error('Terminal title must be initialized before updating it.')
  }

  const actionText = truncateTitle(titleState.action, ACTION_TITLE_MAX_LEN)
  const titleText = `${titleState.status} ${titleState.pkg} ${actionText} (${titleState.scriptName})`
  const title = truncateTitle(titleText, TITLE_MAX_LEN)
  setTitle(title)
}

const initTitle = (
  {
    scriptName,
    pkg,
    args,
    status
  }
) => {
  titleState.scriptName = scriptName
  titleState.pkg = pkg
  titleState.action = Array.isArray(args) ? args.join(' ') : args

  updateTitle(status)
}

export default {
  updateTitle,
  initTitle
}
