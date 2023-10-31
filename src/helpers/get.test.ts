import { it, expect, describe, vi } from 'vitest'
import { commandVerification, detectVoltaPin } from './get'
import { CommanderPackage, PackageJson } from '../translator/commander.types'
import { getPackageJson } from './files.js'

vi.mock('./files.ts', async () => {
  const mod = await vi.importActual<typeof import('./files.ts')>('./files.ts')
  return {
    ...mod,
    getPackageJson: await vi.fn()
  }
})

describe('detectVoltaPin', () => {
  it('should return undefined if cmdr is undefined', async () => {
    const cmdr = undefined
    // @ts-expect-error cmdr is intentionally undefined
    const result = await detectVoltaPin(cmdr)
    expect(result).toBeUndefined()
  })

  it('should return undefined if cmd in cmdr is undefined', async () => {
    const cmdr: CommanderPackage = {
      args: []
    }
    const result = await detectVoltaPin(cmdr)
    expect(result).toBeUndefined()
  })

  it('should return undefined if "volta" property does not exist in packageJson', async () => {
    const packageJson: PackageJson = {
      name: 'swpm'
    }
    vi.mocked(getPackageJson).mockResolvedValue(packageJson)

    const cmdr: CommanderPackage = {
      cmd: 'npm',
      args: []
    }
    const result = await detectVoltaPin(cmdr)
    expect(result).toBeUndefined()

    vi.mocked(getPackageJson).mockRestore()
  })

  it('should return true if cmdr.cmd is found in packageJson.volta', async () => {
    const packageJson: PackageJson = {
      name: 'swpm',
      volta: {
        npm: '1.0.0'
      }
    }
    vi.mocked(getPackageJson).mockResolvedValue(packageJson)

    const cmdr: CommanderPackage = {
      cmd: 'npm',
      args: []
    }

    const isVoltaInstalled = await commandVerification('volta')
    if (isVoltaInstalled) {
      const result = await detectVoltaPin(cmdr)
      expect(result).toBe(true)
    }
  })

  it('should return false if cmdr.cmd is found in packageJson.volta', async () => {
    const packageJson: PackageJson = {
      name: 'swpm',
      volta: {
        yarn: '1.0.0'
      }
    }
    vi.mocked(getPackageJson).mockResolvedValue(packageJson)

    const cmdr: CommanderPackage = {
      cmd: 'npm',
      args: []
    }

    const isVoltaInstalled = await commandVerification('volta')
    const result = await detectVoltaPin(cmdr)
    expect(isVoltaInstalled && result).toBe(false)
  })
})
