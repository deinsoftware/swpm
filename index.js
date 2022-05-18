#!/usr/bin/env node

import yargv from './yargs.js'

import { pinPackageManager } from './options/pin.js'
import { runCommand } from './helpers/cmd.js'
import { getPackageInformation } from './options/info.js'
import { testCommand } from './options/test.js'

if (yargv.debug) {
  console.log(yargv)
}

if (yargv?.pin) {
  await pinPackageManager(yargv.pkg)
}

if (yargv?.test) {
  await testCommand(yargv.pkg)
}

if (yargv?.info) {
  await getPackageInformation(yargv.pkg)
}

if (yargv?.pkg?.cmd) {
  await runCommand(yargv.pkg)
}
