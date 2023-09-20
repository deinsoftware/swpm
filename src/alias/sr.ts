#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds'

const args = ['run', ...process.argv.slice(2)]
spreadCommand({cmd: 'swpm', args})
