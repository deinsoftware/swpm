import { getPackageInformation, savePackageManager } from '../helpers/files.js'

export const pinPackageManager = async (packageCommand) => {
  const packageJson = getPackageInformation()
  if (packageJson) {
    packageJson.swpm = packageCommand
    await savePackageManager(packageJson)
  }
  process.exit(1)
}
