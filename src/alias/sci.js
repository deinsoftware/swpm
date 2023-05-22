#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

spreadCommand('swpm', ['clean', '--all'])
spreadCommand('swpm', ['install', ...process.argv.slice(2)])
