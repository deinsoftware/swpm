#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = [...process.argv.slice(2)]
spreadCommand({ cmd: 'swpx', args })
