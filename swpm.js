#!/usr/bin/env node

import yargs from './src/cli/yargs.js'

import { pinPackageManager } from './src/flags/pin.js'
import { showCommand, runCommand } from './src/helpers/cmds.js'
import { showPackageInformation } from './src/flags/info.js'
import { testCommand } from './src/flags/test.js'

if (yargs.debug) {
  console.debug(yargs)
}

if (yargs?.pin) {
  await pinPackageManager(yargs.pkg)
}

if (yargs?.test) {
  testCommand(yargs.pkg)
}

if (yargs?.info) {
  await showPackageInformation(yargs.pkg)
}

if (yargs?.pkg?.cmd) {
  showCommand(yargs.pkg)
  runCommand(yargs.pkg)
}
