#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

(async () => {
  await spreadCommand('swpm', ['clean', '--all'])
  await spreadCommand('swpm', ['install'])
})()
