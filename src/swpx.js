#!/usr/bin/env node

import { autoUpdate } from './helpers/autoUpdate.js'

console.log('npx runner js')

await autoUpdate()
