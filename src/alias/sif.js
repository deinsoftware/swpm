#!/usr/bin/env bun

import { spreadCommand } from 'helpers'

const args = ['install', ...process.argv.slice(2), '--frozen']
spreadCommand('swpm', args)
