#!/usr/bin/env bun

import { spreadCommand } from 'helpers'

const args = ['run', ...process.argv.slice(2)]
spreadCommand('swpm', args)
