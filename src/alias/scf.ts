#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds'

(async () => {
  await spreadCommand({cmd: 'swpm', args: ['clean', '--fresh']})
  await spreadCommand({cmd: 'swpm', args: ['install', '--frozen']})
})()
