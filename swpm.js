#!/usr/bin/env node

import yargs from './src/cli/yargs.js'

import { pinPackageManager } from './src/flags/pin.js'
import { showCommand, runCommand } from './src/helpers/cmds.js'
import { getPackageInformation } from './src/flags/info.js'
import { testCommand } from './src/flags/test.js'

const { pkg } = globalThis

if (yargs.debug) {
  console.debug(yargs)
  console.debug(pkg)
}

if (yargs?.pin) {
  await pinPackageManager()
}

if (yargs?.test) {
  testCommand(pkg)
}

if (yargs?.info) {
  await getPackageInformation()
}

if (pkg?.cmd) {
  showCommand(pkg)
  runCommand(pkg)
}
