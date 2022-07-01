import { describe, afterEach, test, expect, vi } from 'vitest'
import { autoUpdate } from './autoUpdate.js'
import { getSwpmInfo } from './info.js'

describe('autoUpdate()', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const notifier = {
    items: [{
      name: 'swpm',
      version: '0.0.1-test.1'
    }],
    notification
  }

  test.skip('should check if there is a new version available', () => {
    const spy = vi.spyOn(pkg, 'getSwpmInfo')
    expect(spy.getMockName()).toEqual('getSwpmInfo')
  })
})
