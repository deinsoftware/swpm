#!/usr/bin/env node

import yargv from './src/cli/yargs.js'

import { pinPackageManager } from './src/flags/pin.js'
import { showCommand, runCommand } from './src/helpers/cmd.js'
import { getPackageInformation } from './src/flags/info.js'
import { testCommand } from './src/flags/test.js'

if (yargv.debug) {
  const { yargs, pkg } = globalThis
  console.debug(yargs)
  console.debug(pkg)
}

if (yargv?.pin) {
  await pinPackageManager(globalThis.pkg)
}

if (yargv?.test) {
  testCommand(globalThis.pkg)
}

if (yargv?.info) {
  await getPackageInformation(globalThis.pkg)
}

if (globalThis?.pkg?.cmd) {
  showCommand(globalThis.pkg)
  runCommand(globalThis.pkg)
}
