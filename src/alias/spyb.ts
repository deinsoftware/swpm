#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['--pin', 'yarn@berry']
spreadCommand('swpm', args)