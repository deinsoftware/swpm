#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

(async () => {
  await spreadCommand({ cmd: 'swpm', args: ['clean', '--all'] })
  await spreadCommand({ cmd: 'swpm', args: ['install'] })
})()
