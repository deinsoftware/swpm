#!/usr/bin/env node

import yargv from './src/cli/yargs.js'

import { pinPackageManager } from './src/flags/pin.js'
import { showCommand, runCommand } from './src/helpers/cmds.js'
import { getPackageInformation } from './src/flags/info.js'
import { testCommand } from './src/flags/test.js'

if (yargv.debug) {
  const { yargs, pkg } = globalThis
  console.debug(yargs)
  console.debug(pkg)
}

if (yargv?.pin) {
  await pinPackageManager()
}

if (yargv?.test) {
  testCommand()
}

if (yargv?.info) {
  await getPackageInformation()
}

if (globalThis?.pkg?.cmd) {
  showCommand()
  runCommand()
}
