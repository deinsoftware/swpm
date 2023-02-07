#!/usr/bin/env node

import { runAlias } from '../helpers/cmds.js'

const args = ['install', ...process.argv.slice(2), '--frozen']
runAlias('swpm', args)
