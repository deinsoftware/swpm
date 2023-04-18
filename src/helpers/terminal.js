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

const setTitle = (title) => {
  const titleText = truncateTitle(title, TITLE_MAX_LEN)

  if (process.platform === 'win32') {
    process.title = titleText
  } else {
    process.stdout.write(
      String.fromCharCode(27) + ']0;' + titleText + String.fromCharCode(7)
    )
  }
}

const updateTitle = (statusResult = '') => {
  titleState.status = statusResult

  const { scriptName, pkg, action, status } = titleState || {}
  if (!scriptName || !pkg || !action) {
    return
  }

  const actionText = truncateTitle(action, ACTION_TITLE_MAX_LEN)
  const title = `${status} ${pkg} ${actionText} (${scriptName})`
  setTitle(title)
}

const initTitle = ({ scriptName, pkg, args, status }) => {
  titleState.scriptName = scriptName
  titleState.pkg = pkg
  titleState.action = Array.isArray(args) ? args.join(' ') : (args || '')

  updateTitle(status)
}

export default {
  updateTitle,
  initTitle
}
