import chalk from 'chalk'
import { exit, cwd } from 'node:process'
import { resolve as resolvePath } from 'node:path'
import { ArgumentsCamelCase, CommandModule } from 'yargs'
import { openBrowser, openFileExplorer } from '../../../helpers/open.js'
import { fileExists, getPackageJson, pathExists } from '../../../helpers/files.js'
import { getReposStatus, hasRepository } from '../../../helpers/repos.js'
import { stripIndents } from 'common-tags'
import { checkErrorMessage } from '../../../helpers/messages.js'
import { Repository } from '../../../helpers/repos.types.js'

type OptionsProps = {
  'explorer'?: boolean
  'coverage'?: boolean
  'git-repo'?: boolean
  'git-branch'?: boolean
  'git-merge'?: boolean
  'git-diff'?: boolean
  npm?: boolean
  path?: string
  git?: boolean
  branch?: string
  repo?: Repository
  filePath?: string
  package?: string
}

const hasGitProperty = (yargs: ArgumentsCamelCase<OptionsProps>) => {
  return Object.keys(yargs).some((key) => key.startsWith('git'))
}

const openExplorer = async (yargs: ArgumentsCamelCase<OptionsProps>) => {
  const path = resolvePath(cwd(), yargs?.path ?? '.')

  if (await pathExists(path)) {
    await openFileExplorer(path)
  } else {
    console.error(stripIndents`
          ${chalk.red.bold('Error')}: ${chalk.bold(path)} path not found.
        `)
    exit(1)
  }
}

const openCoverage = async (yargs: ArgumentsCamelCase<OptionsProps>) => {
  const filePath = resolvePath(cwd(), yargs?.filePath ?? './coverage/lcov-report/index.html')

  if (await fileExists(filePath)) {
    await openBrowser(filePath)
  } else {
    console.error(stripIndents`
          ${chalk.red.bold('Error')}: ${chalk.bold(filePath)} file not found.
        `)
    exit(1)
  }
}

const openGit = async (yargs: ArgumentsCamelCase<OptionsProps>) => {
  if (!yargs?.repo?.url) return

  if ('git-repo' in yargs) {
    await openBrowser(yargs.repo.url)
  }

  if ('git-branch' in yargs) {
    const url = `${yargs.repo.url}/${yargs?.repo?.paths?.branch ?? 'tree'}/${yargs.repo.current}`
    await openBrowser(url)
  }

  if ('git-pipeline' in yargs) {
    await openBrowser(`${yargs.repo.url}/${yargs?.repo?.paths?.ci ?? 'actions'}`)
  }

  if ('git-merge' in yargs) {
    await openBrowser(`${yargs.repo.url}/${yargs?.repo?.paths?.pull ?? 'pulls'}`)
  }

  if ('git-diff' in yargs) {
    const baseBranch = yargs.branch ?? 'dev'

    const url = `${yargs.repo.url}/${yargs?.repo?.paths?.diff ?? 'compare'}/${baseBranch}..${yargs.repo.current}`
    await openBrowser(url)
  }
}

const openNpm = async (yargs: ArgumentsCamelCase<OptionsProps>) => {
  const url = `https://www.npmjs.com/package/${yargs.package}`
  await openBrowser(url)
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
        desc: 'open [path] on file explorer',
        usage: '$0 open [path] --explorer',
        conflicts: ['coverage', 'git-repo', 'git-branch', 'git-pipeline', 'git-merge', 'git-diff', 'npm'],
        implies: ['path']
      })
      .option('git-repo', {
        alias: 'R',
        type: 'boolean',
        desc: 'browse current repo',
        usage: '$0 open --git-repo',
        conflicts: ['explorer', 'coverage', 'git-branch', 'git-pipeline', 'git-merge', 'git-diff', 'npm']
      })
      .option('git-branch', {
        alias: 'B',
        type: 'boolean',
        desc: 'browse current branch',
        usage: '$0 open --git-branch',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-pipeline', 'git-merge', 'git-diff', 'npm']
      })
      .option('git-pipeline', {
        alias: 'P',
        type: 'boolean',
        desc: 'browse pipeline/actions tab',
        usage: '$0 open --git-branch',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-merge', 'git-diff', 'npm']
      })
      .option('git-merge', {
        alias: 'M',
        type: 'boolean',
        desc: 'browse merge/pull request tab',
        usage: '$0 open --git-merge',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-pipeline', 'git-diff', 'npm']
      })
      .option('git-diff', {
        alias: 'D',
        type: 'boolean',
        desc: 'browse diff current with another [branch]',
        usage: '$0 open [branch] --git-diff',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-pipeline', 'git-merge', 'npm'],
        implies: ['branch']
      })
      .option('coverage', {
        alias: 'C',
        type: 'boolean',
        desc: 'browse coverage report in [filePath]',
        usage: '$0 open [filePath] --coverage',
        conflicts: ['explorer', 'git-repo', 'git-branch', 'git-pipeline', 'git-merge', 'git-diff', 'npm'],
        implies: ['filePath']
      })
      .option('npm', {
        alias: 'N',
        type: 'boolean',
        desc: 'browse [package] on npmjs.com',
        usage: '$0 open --npm',
        conflicts: ['explorer', 'coverage', 'git-repo', 'git-branch', 'git-pipeline', 'git-merge', 'git-diff'],
        implies: ['package']
      })
      .check(async (yargs) => {
        const checkOptions = () => {
          const options = yargs.explorer ||
            yargs.coverage ||
            yargs['git-repo'] ||
            yargs['git-branch'] ||
            yargs['git-pipeline'] ||
            yargs['git-merge'] ||
            yargs['git-diff'] ||
            yargs.npm

          if (!options) {
            const errorMessage = 'clean command requires to be combined with at least one available option'
            checkErrorMessage(yargs.$0, 'open', errorMessage)
          }
        }

        const checkResource = () => {
          if ('explorer' in yargs) {
            yargs.path = yargs.resource ?? '.'
          } else if ('git-diff' in yargs) {
            yargs.branch = yargs.resource ?? 'dev'
          } else if ('coverage' in yargs) {
            yargs.filePath = yargs.resource ?? './coverage/index.html'
          } else if ('npm' in yargs) {
            yargs.package = yargs.resource ?? '.'
          }
        }

        const checkGit = async () => {
          const git = await hasRepository()
          if (!git) {
            const errorMessage = 'no repository found'
            checkErrorMessage(yargs.$0, 'open', errorMessage)
          }

          const repo = await getReposStatus()

          if (('git-branch' in yargs) && !repo?.paths?.branch) {
            const errorMessage = `"git-branch" option is not available for ${yargs.provider}`
            checkErrorMessage(yargs.$0, 'open', errorMessage)
          } else if (('git-pipeline' in yargs) && !repo?.paths?.ci) {
            const errorMessage = `"git-pipeline" option is not available for ${yargs.provider}`
            checkErrorMessage(yargs.$0, 'open', errorMessage)
          } else if (('git-merge' in yargs) && !repo?.paths?.pull) {
            const errorMessage = `"git-merge" option is not available for ${yargs.provider}`
            checkErrorMessage(yargs.$0, 'open', errorMessage)
          }

          yargs.git = git
          yargs.repo = repo
        }

        const checkNpm = async () => {
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

        checkOptions()
        if ('resource' in yargs) checkResource()
        if (hasGitProperty(yargs)) await checkGit()
        if ('npm' in yargs) await checkNpm()

        return true
      }),

  handler: async (yargs) => {
    console.log(`🚀 ${chalk.bold('Opening')}: `)

    if ('explorer' in yargs) await openExplorer(yargs)
    else if ('git' in yargs) await openGit(yargs)
    else if ('coverage' in yargs) await openCoverage(yargs)
    else if ('npm' in yargs && yargs?.package) await openNpm(yargs)
  }
}

export default open
