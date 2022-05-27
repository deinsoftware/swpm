import { readFile } from 'fs/promises'

export const getSwpmInfo = async () => {
  const pkg = JSON.parse(await readFile(new URL('../../package.json', import.meta.url)))
  return pkg
}
