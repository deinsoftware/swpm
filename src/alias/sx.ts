#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = [...process.argv.slice(2)]
spreadCommand('swpx', args)
