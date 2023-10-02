#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['open', '--explorer', ...process.argv.slice(2)]
spreadCommand({ cmd: 'swpm', args })
