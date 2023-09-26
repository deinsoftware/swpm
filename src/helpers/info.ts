import { readFile } from 'fs/promises'

export const getSwpmInfo = async () => {
  const pkg = await readFile(new URL('../../package.json', import.meta.url), 'utf-8')
  return JSON.parse(pkg)
}
