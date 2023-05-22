#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'yarn']
spreadCommand('swpm', args)
