#!/usr/bin/env node
import { argv } from 'node:process'
import yargv from './yargs.js'

import { getCurrentPackageManager } from './options/get.js'
import { pinPackageManager } from './options/pin.js'
import { runCommand, cleanSwpmArguments, showCommand } from './helpers/cmd.js'

let command = ''
let args = argv.slice(2)

if (yargv.use) {
  command = yargv.use
  cleanSwpmArguments(args, '--use', '-u')
}

if (yargv.pin) {
  await pinPackageManager(yargv.pin)
}

if (yargv.see) {
  cleanSwpmArguments(args, '--see', '-s')
  showCommand(command, args)
  process.exit(1)
}

if (!command || yargv.get || yargv.info) {
  command = await getCurrentPackageManager()

  if (yargv.info) {
    args = ['--version']
  }

  if (yargv.get) {
    process.exit(1)
  }
}

if (command) {
  runCommand(command, args)
}
