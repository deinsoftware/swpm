#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['create', ...process.argv.slice(2)]
spreadCommand('swpm', args)
