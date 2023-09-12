#!/usr/bin/env bun

import { spreadCommand } from 'helpers'

const args = ['--pin', 'yarn@berry']
spreadCommand('swpm', args)
