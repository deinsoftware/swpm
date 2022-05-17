import { getPackageJson, savePackageJson } from '../helpers/files.js'

export const pinPackageManager = async (packageCommand) => {
  const packageJson = getPackageJson()
  if (packageJson) {
    packageJson.swpm = packageCommand
    await savePackageJson(packageJson)
  }
  process.exit(1)
}
