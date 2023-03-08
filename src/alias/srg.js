#!/usr/bin/env node

import { runAlias } from '../helpers/cmds.js'

const args = ['remove', ...process.argv.slice(2), '--global']
runAlias('swpm', args)
