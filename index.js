#!/usr/bin/env node
import { argv } from 'node:process'
import yargv from './yargs.js'

import { getCurrentPackageManager } from './options/get.js'
import { pinPackageManager } from './options/pin.js'
import { cmd, cleanSwpmArguments } from './helpers/cmd.js'

let command = ''
const args = argv.slice(2)

if (yargv.use) {
  command = yargv.use
  cleanSwpmArguments(args, '--use', '-u')
}

if (yargv.pin) {
  await pinPackageManager(yargv.pin)
}

if (!command || yargv.get) {
  command = await getCurrentPackageManager()

  if (yargv.get) {
    process.exit(1)
  }
}

console.log(args)

if (command) {
  cmd(command, args)
}
