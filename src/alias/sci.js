#!/usr/bin/env node

import { runAlias } from '../helpers/cmds.js'

runAlias('swpm', ['clean', '--all'])
runAlias('swpm', ['install', ...process.argv.slice(2)])
