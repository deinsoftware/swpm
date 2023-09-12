#!/usr/bin/env bun

import { spreadCommand } from 'helpers'

(async () => {
  await spreadCommand('swpm', ['clean', '--all'])
  await spreadCommand('swpm', ['install'])
})()
