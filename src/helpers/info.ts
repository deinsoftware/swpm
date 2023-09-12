export const getSwpmInfo = async () => {
  const path = new URL('../../package.json', import.meta.url)
  const file = Bun.file(path)
  return await file.json()
}
