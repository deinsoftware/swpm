#!/usr/bin/env node

import { runAlias } from '../helpers/cmds.js'

const args = ['update', ...process.argv.slice(2)]
runAlias('swpm', args)
