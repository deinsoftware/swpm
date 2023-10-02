#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['upgrade', ...process.argv.slice(2)]
spreadCommand({ cmd: 'swpm', args })
