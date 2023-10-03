#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

spreadCommand({ cmd: 'swpm', args: ['clean', '--modules'] })
