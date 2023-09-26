import chalk from 'chalk'
import { exit } from 'node:process'

import { stripIndents } from 'common-tags'

export const checkErrorMessage = ($0:string, command: string, errorMessage?: string) => {
  if (errorMessage) {
    console.error(stripIndents`
      ${chalk.red.bold('Error')}: ${errorMessage}.
    `)
  }

  console.info(stripIndents`
    Run ${chalk.bold(`${$0} ${command} --help`)} for available options.
  `)
  exit(1)
}
