#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['update', ...process.argv.slice(2)]
spreadCommand('swpm', args)
