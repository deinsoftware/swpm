#!/usr/bin/env bun

import { spreadCommand } from 'helpers'

const args = ['add', ...process.argv.slice(2), '--global']
spreadCommand('swpm', args)
