#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

spreadCommand({cmd: 'swpm', args: ['clean', '--build']})
