#!/usr/bin/env node
import { argv } from 'node:process'
import yargv from './yargs.js'

import { getCurrentPackageManager, showCurrentPackageManager } from './options/get.js'
import { pinPackageManager } from './options/pin.js'
import { runCommand, cleanSwpmArguments, showCommand } from './helpers/cmd.js'
import { getPackageInformation } from './options/info.js'

let pkg = ''
const args = argv.slice(2)

if (yargv.use) {
  pkg = yargv.use
  cleanSwpmArguments(args, '--use', '-u')
}

if (yargv.pin) {
  await pinPackageManager(yargv.pin)
}

if (yargv.see) {
  cleanSwpmArguments(args, '--see', '-s')
  await showCommand(pkg, args)
  process.exit(1)
}

if (!pkg || yargv.get || yargv.info) {
  pkg = await getCurrentPackageManager()

  if (yargv.get) {
    await showCurrentPackageManager(pkg)
  }

  if (yargv.info) {
    await getPackageInformation(pkg)
  }
}

if (pkg) {
  await runCommand(pkg, args)
}
