#!/usr/bin/env node

import { runAlias } from '../helpers/cmds.js'

const args = [...process.argv.slice(2)]
runAlias('swpx', args)
