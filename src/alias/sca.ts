#!/usr/bin/env node

import { spreadCommand } from 'helpers/cmds'

spreadCommand({cmd: 'swpm', args: ['clean', '--all']})
