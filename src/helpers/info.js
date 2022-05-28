import { readFile } from 'fs/promises'

export const getSwpmInfo = async () => {
  const pkg = await readFile(new URL('../../package.json', import.meta.url))
  return JSON.parse(pkg)
}
