#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

(async () => {
  await spreadCommand('swpm', ['clean', '--fresh'])
  await spreadCommand('swpm', ['install', "--frozen"])
})()
