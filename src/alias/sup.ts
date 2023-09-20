#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds'

const args = ['update', ...process.argv.slice(2)]
spreadCommand({cmd: 'swpm', args})
