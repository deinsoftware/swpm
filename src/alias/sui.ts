#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['interactive', ...process.argv.slice(2)]
spreadCommand('swpm', args)