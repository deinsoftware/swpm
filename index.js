#!/usr/bin/env node
import { argv } from 'node:process'
// import { args } from "args";
import { spawn } from 'node:child_process'

import { getCurrent } from './helpers/current.js'

argv.forEach(async (val, index) => {
  // console.log(`${index}: ${val}`)
})

const current = await getCurrent()
console.log({ current })

spawn(current, ['--version'], { stdio: 'inherit' })
