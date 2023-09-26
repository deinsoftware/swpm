import chalk from 'chalk'
import { cwd } from 'node:process'
import { resolve as resolvePath } from 'node:path'
import { pathExists } from 'find-up'
import { ArgumentsCamelCase, CommandModule } from 'yargs'
import { openBrowser, openExplorer } from '../../../helpers/open.js'
import { fileExists, getPackageJson } from '../../../helpers/files.js'
import { gerReposStatus, hasRepository } from '../../../helpers/repos.js'
import { stripIndents } from 'common-tags'
import { checkErrorMessage } from '../../../helpers/messages.js'

type OptionsProps = {
  'explorer'?: boolean
  'coverage'?: boolean
  'git-repo'?: boolean
  'git-branch'?: boolean
  'git-pulls'?: boolean
  'git-compare'?: boolean
  npm?: boolean
  path?: string
  filePath?: string
  branch?: string
  git?: boolean
  url?: `https://${string}`
  provider?: string
  current?: string
  pullPath?: string
  package?: string
}

const hasGitProperty = (yargs: ArgumentsCamelCase<OptionsProps>) => {
  return Object.keys(yargs).some((key) => key.startsWith('git'))
}

const open: CommandModule<Record<string, unknown>, OptionsProps> = {
  command: 'open [resource] [args]',
  aliases: ['o'],
  describe: 'open in the file explore or browser',

  builder: (yargs) =>
    yargs
      .conflicts('open', ['add', 'install', 'remove', 'update', 'upgrade', 'clean'])
      .positional('resource', {
        type: 'string',
        desc: '[resource]'
      })
      .positional('path', {
        type: 'string',
        desc: '[path]',
        default: '.'
      })
      .positional('filePath', {
        type: 'string',
        desc: '[filePath]',
        default: './coverage/index.html'
      })
      .positional('branch', {
        type: 'string',
        desc: '[branch]',
        default: 'dev'
      })
      .positional('package', {
        type: 'string',
        desc: '[package]',
        default: '.'
      })
      .option('explorer', {
        alias: 'E',
        type: 'boolean',
        desc: 'open path on file explorer in [path]',
        usage: '$0 open [path] --explorer',
        conflicts: ['coverage', 'git-repo', 'git-branch', 'git-pulls', 'git-compare', 'npm'],
        implies: ['path']
      })
      .option('git-repo', {
        alias: 'R',
        type: 'boolean',
        desc: 'browse current repo',
        usage: '$0 open --git-repo',
        conflicts: ['explorer', 'coverage', 'git-branch', 'git-pulls', 'git-compare', 'npm']
      })
      .option('git-branch', {
        alias: 'B',
        type: 'boolean',
        desc: 'browse current branch',
        usage: '$0 open --git-branch',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-pulls', 'git-compare', 'npm']
      })
      .option('git-actions', {
        alias: 'A',
        type: 'boolean',
        desc: 'browse actions tab (only github.com)',
        usage: '$0 open --git-branch',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-pulls', 'git-compare', 'npm']
      })
      .option('git-pulls', {
        alias: 'P',
        type: 'boolean',
        desc: 'browse pull request tab',
        usage: '$0 open --git-pulls',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-compare', 'npm']
      })
      .option('git-compare', {
        alias: 'C',
        type: 'boolean',
        desc: 'browse compare current with another [branch]',
        usage: '$0 open [branch] --git-compare',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-pulls', 'npm'],
        implies: ['branch']
      })
      .option('coverage', {
        alias: 'V',
        type: 'boolean',
        desc: 'view coverage report in [filePath]',
        usage: '$0 open [filePath] --coverage',
        conflicts: ['explorer', 'git-repo', 'git-branch', 'git-pulls', 'git-compare', 'npm'],
        implies: ['filePath']
      })
      .option('npm', {
        alias: 'N',
        type: 'boolean',
        desc: 'browse package on npmjs.com',
        usage: '$0 open --npm',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-pulls', 'git-compare'],
        implies: ['package']
      })
      .check(async (yargs) => {
        const options = yargs.explorer ||
        yargs.coverage ||
        yargs['git-repo'] ||
        yargs['git-branch'] ||
        yargs['git-actions'] ||
        yargs['git-pulls'] ||
        yargs['git-compare'] ||
        yargs.npm

        if (!options) {
          const errorMessage = 'clean command requires to be combined with at least one available option'
          checkErrorMessage(yargs.$0, 'open', errorMessage)
        }

        if ('resource' in yargs) {
          if ('explorer' in yargs) {
            yargs.path = yargs.resource ?? '.'
          }
          if ('git-compare' in yargs) {
            yargs.branch = yargs.resource ?? 'dev'
          }
          if ('coverage' in yargs) {
            yargs.filePath = yargs.resource ?? './coverage/index.html'
          }
          if ('npm' in yargs) {
            yargs.package = yargs.resource ?? '.'
          }
        }

        if (hasGitProperty(yargs)) {
          yargs.git = await hasRepository()

          if (!yargs.git) {
            const errorMessage = 'no repository found'
            checkErrorMessage(yargs.$0, 'open', errorMessage)
          } else {
            const { url, provider, current, pullPath } = gerReposStatus()
            yargs.url = url
            yargs.provider = provider
            yargs.current = current
            yargs.pullPath = pullPath
          }

          if (('git-actions' in yargs) && yargs.url !== 'github.com') {
            const errorMessage = 'git-actions" option is only available for github'
            checkErrorMessage(yargs.$0, 'open', errorMessage)
          }

          if (('git-pulls' in yargs) && !yargs?.pullPath) {
            const errorMessage = `"git-pulls" option is not available for  ${yargs.provider}`
            checkErrorMessage(yargs.$0, 'open', errorMessage)
          }
        }

        if ('npm' in yargs) {
          if (yargs.package === '.') {
            const packageJson = await getPackageJson()

            if (!packageJson) {
              const errorMessage = 'no package.json found'
              checkErrorMessage(yargs.$0, 'open', errorMessage)
            } else {
              yargs.package = packageJson.name
            }
          }
        }

        return true
      }),

  handler: async (yargs) => {
    console.log(`🚀 ${chalk.bold('Opening')}: `)

    if ('explorer' in yargs) {
      const path = resolvePath(cwd(), yargs?.path ?? '.')

      if (await pathExists(path)) {
        openExplorer(path)
      } else {
        console.error(stripIndents`
          ${chalk.red.bold('Error')}: ${chalk.bold(path)} path not found.
        `)
      }
    }

    if ('git' in yargs && yargs?.url) {
      if ('git-repo' in yargs) {
        await openBrowser(yargs.url)
      }

      if ('git-branch' in yargs) {
        const url = `${yargs.url}/tree/${yargs.current}`
        await openBrowser(url)
      }

      if ('git-actions' in yargs) {
        await openBrowser(`${yargs.url}/actions`)
      }

      if ('git-pulls' in yargs) {
        await openBrowser(`${yargs.url}/${yargs?.pullPath}`)
      }

      if ('git-compare' in yargs) {
        const baseBranch = yargs.branch ?? 'dev'

        const url = `${yargs.url}/compare/${baseBranch}..${yargs.current}`
        await openBrowser(url)
      }
    }

    if ('coverage' in yargs) {
      const filePath = resolvePath(cwd(), yargs?.filePath ?? './coverage/lcov-report/index.html')

      if (await fileExists(filePath)) {
        await openBrowser(filePath)
      } else {
        console.error(stripIndents`
        ${chalk.red.bold('Error')}: ${chalk.bold(filePath)} file not found.
      `)
      }
    }

    if ('npm' in yargs && yargs?.package) {
      const url = `https://www.npmjs.com/package/${yargs.package}`
      await openBrowser(url)
    }
  }
}

export default open
