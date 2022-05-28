import { describe, test, expect } from 'vitest'
import { getSwpmInfo } from './info.js'

describe('getSwpmInfo()', () => {
  test('should return an object literal with project information', async () => {
    const projectInfo = {
      name: 'swpm',
      description: 'Switch Package Manager'
    }
    const versionProperty = 'version'

    const result = await getSwpmInfo()
    expect(result).toEqual(
      expect.objectContaining(projectInfo)
    )
    expect(result).toHaveProperty(versionProperty)
  })
})
