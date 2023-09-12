#!/usr/bin/env bun

import { spreadCommand } from 'helpers'

(async () => {
  await spreadCommand('swpm', ['clean', '--fresh'])
  await spreadCommand('swpm', ['install', '--frozen'])
})()
