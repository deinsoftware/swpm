import { describe, test, expect } from 'vitest'
import { cwd } from 'node:process'
import { resolve as resolvePath } from 'node:path'
import { fileExists, getPackageJson, lockFileExists } from './files.js'

describe('fileExists', () => {
  test('should return true if file exists', async () => {
    const path = resolvePath(cwd(), 'package.json')
    const result = await fileExists(path)
    expect(result).toBe(true)
  })

  test('should return false if file does not exist', async () => {
    const path = resolvePath(cwd(), 'non-existent-file.json')
    const result = await fileExists(path)
    expect(result).toBe(false)
  })
})

describe('getPackageJson', () => {
  test('should return the contents of the package.json file', async () => {
    const fileName = 'package.json'
    const pkg = await getPackageJson(fileName)
    expect(pkg).toBeDefined()
  })

  test('should return undefined if the package.json file does not exist', async () => {
    const fileName = 'non-existent-file.json'
    const pkg = await getPackageJson(fileName)
    expect(pkg).toBeUndefined()
  })
})

describe('lockFileExists', () => {
  test('should return true if lock file exists', async () => {
    const fileName = 'package-lock.json'
    const result = await lockFileExists(fileName)
    expect(result).toBe(true)
  })

  test('should return false if lock file does not exist', async () => {
    const fileName = 'non-existent-file.json'
    const result = await lockFileExists(fileName)
    expect(result).toBe(false)
  })
})
