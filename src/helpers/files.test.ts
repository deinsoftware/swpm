import { it, expect, describe } from 'vitest'
import { cwd } from 'node:process'
import { resolve as resolvePath } from 'node:path'
import { fileExists, pathExists, getPackageJson, lockFileExists } from './files.js'

describe('fileExists', () => {
  it('should return true if file exists', async () => {
    const path = resolvePath(cwd(), 'package.json')
    const result = await fileExists(path)
    expect(result).toBe(true)
  })

  it('should return false if file does not exist', async () => {
    const path = resolvePath(cwd(), 'non-existent-file.json')
    const result = await fileExists(path)
    expect(result).toBe(false)
  })
})

describe('pathExists', () => {
  it('should return true if path exists', async () => {
    const path = resolvePath(cwd(), '.vscode')
    const result = await pathExists(path)
    expect(result).toBe(true)
  })

  it('should return false if file does not exist', async () => {
    const path = resolvePath(cwd(), 'non-existent-folder')
    const result = await pathExists(path)
    expect(result).toBe(false)
  })
})

describe('getPackageJson', () => {
  it('should return the contents of the package.json file', async () => {
    const fileName = 'package.json'
    const pkg = await getPackageJson(fileName)
    expect(pkg).toBeDefined()
  })

  it('should return the contents of the package.json file even when in a subdirectory', async () => {
    const currentCwd = cwd()
    process.chdir(__dirname)
    const fileName = 'package.json'
    const pkg = await getPackageJson(fileName)
    expect(pkg).toBeDefined()
    expect(pkg?.name).toBe('swpm')
    process.chdir(currentCwd)
  })

  it('should return undefined if the package.json file does not exist', async () => {
    const fileName = 'non-existent-file.json'
    const pkg = await getPackageJson(fileName)
    expect(pkg).toBeUndefined()
  })
})

describe('lockFileExists', () => {
  it('should return true if lock file exists', async () => {
    const fileName = 'package-lock.json'
    const result = await lockFileExists(fileName)
    expect(result).toBe(true)
  })

  it('should return true if lock file exists in a parent directory', async () => {
    const currentCwd = cwd()
    process.chdir(__dirname)
    const fileName = 'package-lock.json'
    const result = await lockFileExists(fileName)
    expect(result).toBe(true)
    process.chdir(currentCwd)
  })

  it('should return false if lock file does not exist', async () => {
    const fileName = 'non-existent-file.json'
    const result = await lockFileExists(fileName)
    expect(result).toBe(false)
  })
})
