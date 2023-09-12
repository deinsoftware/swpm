#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

(async () => {
  await spreadCommand('swpm', ['clean', '--all'])
  await spreadCommand('swpm', ['install'])
})()
