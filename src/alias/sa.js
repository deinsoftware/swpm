#!/usr/bin/env node

import { runAlias } from '../helpers/cmds.js'

const args = ['add', ...process.argv.slice(2)]
runAlias('swpm', args)
