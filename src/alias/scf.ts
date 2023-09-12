#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

(async () => {
  await spreadCommand('swpm', ['clean', '--fresh'])
  await spreadCommand('swpm', ['install', '--frozen'])
})()
