#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'npm']
spreadCommand('swpm', args)
